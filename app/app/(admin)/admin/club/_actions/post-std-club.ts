"use server";

import getMyServerSession from "@/lib/my-server-session";
import { TServerActionResponse } from "@/lib/server-action-response";
import { revalidateTag } from "next/cache";

type TPostStdClub = {
  payload: {
    firstName: string;
    lastName: string;
    faculty: string;
    major: string;
    academicYear: string;
    clubPosition: string;
    year: string;
  };
};


export async function postStdClub(body: TPostStdClub): Promise<TServerActionResponse<any>> {
  const session = await getMyServerSession();
  if (!session) {
    return {
      error: "Unauthorized",
      data: null,
    };
  }
  const res = await fetch(`${process.env.FE_URL}/api/std-club`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.accessToken}`,
    },
    body: JSON.stringify(body.payload),
  });
  if (!res.ok) {
    return {
      error: "Failed to fetch",
      data: null,
    };
  }
  revalidateTag("std-club");
  const data = await res.json();
  return {
    error: null,
    data,
  };
}
