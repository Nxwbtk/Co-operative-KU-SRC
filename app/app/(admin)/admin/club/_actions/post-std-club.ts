"use server";

import getMyServerSession from "@/lib/my-server-session";
import { TServerActionResponse } from "@/lib/server-action-response";
import { revalidateTag } from "next/cache";
import {
  TNewDataFromSheet,
  TPayloadSheetClub,
  TPostNewDataFromSheet,
  TPostUpdateStdClub,
} from "./types";
export async function postStdClub(
  body: TPostUpdateStdClub
): Promise<TServerActionResponse<any>> {
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

const parseJsonData = (data: TNewDataFromSheet[]): TPayloadSheetClub[] => {
  const rest = data.map((item) => {
    const { _id, ...rest } = item;
    return rest;
  });
  return rest;
};

export async function postNewSheetClub(
  payload: TPostNewDataFromSheet
): Promise<TServerActionResponse<any>> {
  const omitData = parseJsonData(payload.data);
  const session = await getMyServerSession();
  if (!session) {
    return {
      error: "Unauthorized",
      data: null,
    };
  }
  const res = await fetch(`${process.env.FE_URL}/api/std-club/many`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.accessToken}`,
    },
    body: JSON.stringify(omitData),
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
