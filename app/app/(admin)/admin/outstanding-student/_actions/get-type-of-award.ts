'use server'

import { TServerActionResponse } from "@/lib/server-action-response";
import { TGetAward } from "../types";

export async function getTypeOfAward(): Promise<TServerActionResponse<TGetAward[]>> {
  const res = await fetch(`${process.env.FE_URL}/api/type-of-award`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    next: {
      tags: ["type-of-award"]
    },
    cache: "no-store"
  });
  if (!res.ok) {
    return {
      error: "Failed",
      data: null
    }
  }
  const data = await res.json();
  if (!data) {
    return {
      error: null,
      data: []
    }
  }
  return {
    data,
    error: null
  }
}