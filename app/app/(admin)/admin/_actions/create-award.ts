"use server";

import getMyServerSession from "@/lib/my-server-session";
import { TServerActionResponse } from "@/lib/server-action-response";
import { revalidateTag } from "next/cache";

export async function postAward({
  name,
  description,
}: {
  name: string;
  description: string;
}): Promise<TServerActionResponse<any>> {
  const session = await getMyServerSession();
  if (!session) {
    return { data: null, error: "Unauthorized" };
  }
  const res = await fetch(`${process.env.FE_URL}/api/type-of-award`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.accessToken}`,
    },
    body: JSON.stringify({ name, description }),
  });
  if (!res.ok) {
    return { data: null, error: "Failed" };
  }
  revalidateTag("type-of-award");
  return { data: await res.json(), error: null };
}
