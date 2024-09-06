"use server";

import getMyServerSession from "@/lib/my-server-session";
import { TServerActionResponse } from "@/lib/server-action-response";
import { revalidateTag } from "next/cache";

export async function postMajor({
  name,
  description,
}: {
  name: string;
  description: string;
}): Promise<TServerActionResponse<any>> {
  const session = await getMyServerSession();
  if (!session) {
    return { data: null, error: "Unauthorized" };
  }
  const scienceId = await fetch(
    `${process.env.FE_URL}/api/faculty/science/id`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessToken}`,
      },
      method: "GET",
    }
  );
  if (!scienceId.ok) {
    return { data: null, error: "Error" };
  }
  const data = await scienceId.json();
  const payload = {
    name,
    description,
    faculty: data._id,
    program: "หลักสูตรภาคภาษาไทย (Thai Program)",
  };
  const res = await fetch(`${process.env.FE_URL}/api/major/science`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.accessToken}`,
    },
    body: JSON.stringify(payload),
    method: "POST",
  });
  if (!res.ok) {
    return { data: null, error: "Error" };
  }
  revalidateTag("MajorOFScienceFaculty");
  const resData = await res.json();
  return { data: resData, error: null };
}
