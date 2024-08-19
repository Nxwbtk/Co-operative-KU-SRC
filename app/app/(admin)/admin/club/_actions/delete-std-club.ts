"use server";

import getMyServerSession from "@/lib/my-server-session";
import { revalidateTag } from "next/cache";

type TDeleteStdClub = {
  id: string;
};

export async function deleteStdClub(body: TDeleteStdClub) {
  const session = await getMyServerSession();
  if (!session) {
    return {
      error: "Unauthorized",
      data: null,
    }
  }
  const res = await fetch(`${process.env.FE_URL}/api/std-club/${body.id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${session.accessToken}`,
    },
  });
  if (!res.ok) {
    return {
      error: "Failed to fetch",
      data: null,
    };
  }
  revalidateTag("std-club");
  return {
    error: null,
    data: null,
  };
}
