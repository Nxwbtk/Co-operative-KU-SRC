"use server";

import getMyServerSession from "@/lib/my-server-session";
import { TServerActionResponse } from "@/lib/server-action-response";
import { TGetUser } from "../types";

export async function getUsers(): Promise<TServerActionResponse<TGetUser[]>> {
  const session = await getMyServerSession();
  if (!session) {
    return { error: "Unauthorized", data: null };
  }
  const res = await fetch(`${process.env.FE_URL}/api/admin/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.accessToken}`,
    },
    next: {
      tags: ["users"],
    },
  });
  if (!res.ok) {
    return { error: "Failed to fetch", data: null };
  }
  const data = await res.json();
  return { error: null, data };
}
