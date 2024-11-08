"use server";

import { TServerActionResponse } from "@/lib/server-action-response";
import getMyServerSession from "@/lib/my-server-session";
import { revalidateTag } from "next/cache";

export type TPostNewSheetOStdPayload = {
  data: {
    academic_year: string;
    honorific: string;
    first_name: string;
    last_name: string;
    year: string;
    major_id: string;
    type_of_award_id: string;
    image: string;
  }[];
};

export async function postNewSheetOStd({
  data,
}: TPostNewSheetOStdPayload): Promise<TServerActionResponse<any>> {
  const session = await getMyServerSession();
  if (!session) {
    return {
      error: "Unauthorized",
      data: null,
    };
  }
  const res = await fetch(`${process.env.FE_URL}/api/outstanding-student/many`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.accessToken}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    return {
      error: "Something went wrong",
      data: null,
    };
  }
  revalidateTag("nisit-outstanding");
  return {
    error: null,
    data: await res.json(),
  };
}
