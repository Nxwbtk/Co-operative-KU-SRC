'use server'

import { TServerActionResponse } from "@/lib/server-action-response";

export async function getTypeOfAward(): Promise<TServerActionResponse<any>> {
  const res = await fetch(`${process.env.FE_URL}/api/type-of-award`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    return {
      error: "Failed",
      data: null
    }
  }
  const data = await res.json();
  return {
    data,
    error: null
  }
}