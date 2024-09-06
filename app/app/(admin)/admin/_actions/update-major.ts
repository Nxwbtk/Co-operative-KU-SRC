"use server";

import getMyServerSession from "@/lib/my-server-session";
import { TServerActionResponse } from "@/lib/server-action-response";
import { revalidateTag } from "next/cache";

export async function updateMajor(
  { name, description }: { name: string; description: string },
  { id }: { id: string }
): Promise<TServerActionResponse<any>> {
  const session = await getMyServerSession();
  if (!session) {
    return {
      error: "Unauthorized",
      data: null,
    };
  }
  const res = await fetch(`${process.env.FE_URL}/api/major/${id}`, {
    method: "PUT",
    body: JSON.stringify({ name, description }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.accessToken}`,
    },
  });
  if (!res.ok) {
    return {
      error: "Failed to update",
      data: null,
    };
  }
  revalidateTag("MajorOFScienceFaculty");
  const data = await res.json();
  return {
    error: null,
    data,
  };
}
