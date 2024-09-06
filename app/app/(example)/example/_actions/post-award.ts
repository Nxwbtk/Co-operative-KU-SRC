'use server'

import { generateAward } from "@/lib/generate-faculty";
import getMyServerSession from "@/lib/my-server-session";
import { TServerActionResponse } from "@/lib/server-action-response";

export async function postManyAward(): Promise<TServerActionResponse<any>> {
  const session = await getMyServerSession();
  if (!session) {
    return {
      error: "Unauthorized",
      data: null,
    };
  }
  const res = await fetch(`${process.env.FE_URL}/api/type-of-award/init`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.accessToken}`,
    },
    next: {
      tags: ["type-of-award"],
    },
    body: JSON.stringify(generateAward()),
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