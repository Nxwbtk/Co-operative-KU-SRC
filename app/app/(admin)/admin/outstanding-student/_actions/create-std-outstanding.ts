'use server'

import getMyServerSession from "@/lib/my-server-session";
import { TServerActionResponse } from "@/lib/server-action-response";

export type TCreateOutStanding = {
  payload: {
    honorific: string;
    firstName: string;
    lastName: string;
    majorId: string;
    year: string;
    academicYear: string;
    typeOfOutstanding: string; // Optional because it might not be present in all cases
  }
}

export async function createStdOutstanding(body: TCreateOutStanding): Promise<TServerActionResponse<any>> {
  const session = await getMyServerSession();
  if (!session) {
    return {
      error: "No session",
      data: null
    }
  }
  const res = await fetch(`${process.env.FE_URL}/api/outstanding-student`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${session.accessToken}`
    },
    body: JSON.stringify(body.payload)
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