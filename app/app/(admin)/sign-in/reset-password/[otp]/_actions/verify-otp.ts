"use server";

import { TServerActionResponse } from "@/lib/server-action-response";
import { TPostVerifyOTP, TVerifiyOTPResponse } from "../types";

export async function postVerifyOTP({
  otp,
}: TPostVerifyOTP): Promise<TServerActionResponse<TVerifiyOTPResponse>> {
  const res = await fetch(`${process.env.FE_URL}/api/otp/verify`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ otp }),
    cache: "no-store",
  });
  if (!res.ok) {
    return {
      data: null,
      error: "Fail",
    };
  }
  const data = await res.json();
  return { data: data.data, error: null };
}
