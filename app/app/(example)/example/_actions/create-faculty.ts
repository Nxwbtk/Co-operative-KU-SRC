"use server"

import getMyServerSession from "@/lib/my-server-session";

type TCreateFacultyPost = {
  payload: {
    name: string;
  }[];
}

export async function createFacultyPost({ payload }: TCreateFacultyPost) {
  const session = await getMyServerSession();
  const token = session?.accessToken;
  const res = await fetch(`${process.env.FE_URL}/api/faculty`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify({payload}),
  });
  const data = await res.json();
  return data;
}