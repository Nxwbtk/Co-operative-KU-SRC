"use server";

import getMyServerSession from "@/lib/my-server-session";
import { TServerActionResponse } from "@/lib/server-action-response";
import { revalidateTag } from "next/cache";

export type TUpdateOStdPayload = {
  payload: {
    honorific: string;
    firstName: string;
    lastName: string;
    majorId: string;
    year: string;
    academicYear: string;
    typeOfOutstanding: string; // Optional because it might not be present in all cases
  };
  year: string;
  award: string;
  id: string;
};

export async function updateOStd({ payload, year, award, id }: TUpdateOStdPayload): Promise<TServerActionResponse<any>> {
    const session = await getMyServerSession();
    if (!session) {
        return {
        error: "No session",
        data: null,
        };
    }
    const res = await fetch(`${process.env.FE_URL}/api/outstanding-student/${year}/${award}/${id}`, {
        method: "PUT",
        headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessToken}`,
        },
        body: JSON.stringify(payload),
    });
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
