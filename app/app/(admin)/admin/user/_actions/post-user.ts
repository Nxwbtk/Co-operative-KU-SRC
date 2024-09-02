"use server";

import getMyServerSession from "@/lib/my-server-session";
import { TServerActionResponse } from "@/lib/server-action-response";
import { revalidateTag } from "next/cache";

export type TPostUser = {
  payload: {
    honorific: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: string[];
    image: string;
  };
};

export async function postUser({
  payload,
}: TPostUser): Promise<TServerActionResponse<any>> {
  const session = await getMyServerSession();
  if (!session) {
    return { error: "Unauthorized", data: null };
  }
  const res = await fetch(`${process.env.FE_URL}/api/admin/user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.accessToken}`,
    },
    body: JSON.stringify({ payload }),
  });
  if (!res.ok) {
    return { error: "Failed to fetch", data: null };
  }
  revalidateTag("users");
  const data = await res.json();
  return { error: null, data };
}
