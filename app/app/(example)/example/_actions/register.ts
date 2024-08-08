"use server";

import { TServerActionResponse } from "@/lib/server-action-response";

export type TRegisterPayload = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export async function registerPost(
  payload: TRegisterPayload
): Promise<TServerActionResponse<string>> {
  try {
    const response = await fetch(`${process.env.FE_URL}/api/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    return {
      data: "Success",
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: "Error",
    };
  }
}
