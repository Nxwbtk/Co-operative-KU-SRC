"use server";

import getMyServerSession from "@/lib/my-server-session";
import { TPostUpdateStdClub } from "./types";
import { TServerActionResponse } from "@/lib/server-action-response";
import { revalidateTag } from "next/cache";

export async function putStdClub({
  payload,
  id,
}: TPostUpdateStdClub): Promise<TServerActionResponse<any>> {
  const session = await getMyServerSession();
  if (!session) {
    return {
      error: "Unauthorized",
      data: null,
    };
  }

  const res = await fetch(`${process.env.FE_URL}/api/std-club/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.accessToken}`,
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    return {
      error: "Failed to fetch",
      data: null,
    };
  }
  const data = await res.json();
  revalidateTag("std-club");
  return {
    error: null,
    data,
  };
}
