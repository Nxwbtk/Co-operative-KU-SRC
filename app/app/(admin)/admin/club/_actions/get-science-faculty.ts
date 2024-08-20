'use server'

import { connectToDatabase } from "@/lib/mongo-db";
import { TServerActionResponse } from "@/lib/server-action-response";
import Faculty from "@/models/faculty";

export async function getScienceFaculty(): Promise<TServerActionResponse<any>> {
  const res = await fetch(`${process.env.FE_URL}/api/faculty/science`, {
    method: "GET",
  });
  if (!res.ok) {
    return {
      error: "Failed to fetch",
      data: null,
    }
  }
  const data = await res.json();
  return {
    error: null,
    data,
  };
}