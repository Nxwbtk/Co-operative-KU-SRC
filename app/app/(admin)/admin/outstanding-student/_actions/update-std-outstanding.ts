"use server";

import getMyServerSession from "@/lib/my-server-session";
import { TServerActionResponse } from "@/lib/server-action-response";
import { revalidateTag } from "next/cache";

export type TUpdateOStdPayload = {
  payload: {
    honorific: string;
    first_name: string;
    last_name: string;
    major_id: string;
    year: string;
    academic_year: string;
    type_of_award_id: string; // Optional because it might not be present in all cases
  };
  id: string;
};

export async function updateOStd({
  payload,
  id,
}: TUpdateOStdPayload): Promise<TServerActionResponse<any>> {
  const session = await getMyServerSession();
  if (!session) {
    return {
      error: "No session",
      data: null,
    };
  }
  const res = await fetch(
    `${process.env.FE_URL}/api/outstanding-student/manage/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessToken}`,
      },
      body: JSON.stringify(payload),
    }
  );
  if (!res.ok) {
    return {
      error: "Failed",
      data: null,
    };
  }
  revalidateTag("outstanding-student");
  const data = await res.json();
  return {
    data,
    error: null,
  };
}
