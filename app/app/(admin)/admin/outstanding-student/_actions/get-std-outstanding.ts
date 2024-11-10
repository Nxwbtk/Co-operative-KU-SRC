'use server'

import { TServerActionResponse } from "@/lib/server-action-response";
import { TGetOutStandingData } from "../types";

export async function getNisitOutstanding(): Promise<TServerActionResponse<TGetOutStandingData[]>> {
  const res = await fetch(`${process.env.FE_URL}/api/outstanding-student`, {
    method: "GET",
    next: {
      tags: ["nisit-outstanding"],
    },
    cache: "no-store",
  });
  if (!res.ok) {
    return {
      data: null,
      error: "Something went wrong",
    }
  }
  const data = await res.json();
  if (!data) {
    return {
      data: [],
      error: null,
    }
  }
  return {
    data,
    error: null,
  }
}