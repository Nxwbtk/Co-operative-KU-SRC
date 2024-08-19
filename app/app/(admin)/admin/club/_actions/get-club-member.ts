"use server";

import { TServerActionResponse } from "@/lib/server-action-response";
import { TGetClubMember } from "./types";

export async function getAllStdClub(): Promise<TServerActionResponse<TGetClubMember[]>> {
  const res = await fetch("http://localhost:3000/api/std-club", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    next: {
      tags: ["std-club"],
    },
    cache: "no-store",
  });
  if (!res.ok) {
    return {
      data: null,
      error: "An error occurred while fetching student clubs",
    };
  }
  const data = await res.json();
  return { data, error: null };
}
