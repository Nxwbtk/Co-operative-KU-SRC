"use server";

import getMyServerSession from "@/lib/my-server-session";
import { TServerActionResponse } from "@/lib/server-action-response";
import { revalidateTag } from "next/cache";

export type TPutUserBody = {
  payload: {
    honorific: string;
    image: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string[];
  };
  id: string;
};

export async function putUser(
  body: TPutUserBody
): Promise<TServerActionResponse<any>> {
  const session = await getMyServerSession();
  if (!session) {
    return { error: "Unauthorized", data: null };
  }
  const res = await fetch(`${process.env.FE_URL}/api/admin/user/${body.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.accessToken}`,
    },
    body: JSON.stringify(body.payload),
  });
  if (!res.ok) {
    return { error: "Error", data: null };
  }
  revalidateTag("users");
  return { error: null, data: await res.json() };
}
