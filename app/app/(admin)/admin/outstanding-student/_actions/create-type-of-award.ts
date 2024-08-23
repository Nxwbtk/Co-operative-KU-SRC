"use server";

import getMyServerSession from "@/lib/my-server-session";

export type TCreateTypeOfAward = {
  name: string;
  description: string;
};

export async function postTypeOfAward(payload: TCreateTypeOfAward) {
  const session = await getMyServerSession();
  if (!session) {
    return {
      error: "No session",
      data: null,
    };
  }
  const res = await fetch(`${process.env.FE_URL}/api/type-of-award`, {
    method: "POST",
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
  const data = await res.json();
  return {
    data,
    error: null,
  };
}
