"use server";

import getMyServerSession from "@/lib/my-server-session";
import { TServerActionResponse } from "@/lib/server-action-response";
import { revalidateTag } from "next/cache";

export type TDeleteOStd = {
  year: string;
  id: string;
  award: string;
};

export async function deleteOStd({
  year,
  id,
  award,
}: TDeleteOStd): Promise<TServerActionResponse<any>> {
  const session = await getMyServerSession();
  if (!session) {
    return {
      data: null,
      error: "Unauthorized",
    };
  }
  const res = await fetch(
    `${process.env.FE_URL}/api/outstanding-student/${year}/${award}/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessToken}`,
      },
    }
  );
  if (!res.ok) {
    return {
      data: null,
      error: "Failed to delete outstanding student",
    };
  }
  revalidateTag("nisit-outstanding");
  const data = await res.json();
  return {
    data: data,
    error: null,
  };
}
