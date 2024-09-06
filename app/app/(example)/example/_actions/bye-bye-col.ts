"use server";

import getMyServerSession from "@/lib/my-server-session";
import { TServerActionResponse } from "@/lib/server-action-response";

export async function byeByeCol(): Promise<TServerActionResponse<any>> {
  const session = await getMyServerSession();
  if (!session) {
    return {
      error: "Unauthorized",
      data: null,
    };
  }
  const res = await fetch(`${process.env.FE_URL}/api/drop-db`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.accessToken}`,
    },
    next: {
      tags: ["drop-db"],
    },
  });
  if (!res.ok) {
    return {
      error: "Failed to fetch",
      data: null,
    };
  }
  const data = await res.json();
  if (!data) {
    return {
      error: null,
      data: [],
    };
  }
  return {
    error: null,
    data,
  };
}
