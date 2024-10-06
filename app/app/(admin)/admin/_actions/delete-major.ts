"use server";

import getMyServerSession from "@/lib/my-server-session";
import { TServerActionResponse } from "@/lib/server-action-response";
import { revalidateTag } from "next/cache";

export async function deleteMajor({
  id,
}: {
  id: string;
}): Promise<TServerActionResponse<any>> {
  const session = await getMyServerSession();
  if (!session) {
    return {
      error: "Unauthorized",
      data: null,
    };
  }
  const res = await fetch(`${process.env.FE_URL}/api/major/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.accessToken}`,
    },
  });
  if (!res.ok) {
    return {
      error: "Failed to delete",
      data: null,
    };
  }
  const data = await res.json();
  revalidateTag("ScienceFacultyAndMajors");
  return {
    error: null,
    data: data,
  };
}
