'use server'

import { TServerActionResponse } from "@/lib/server-action-response";

export type TRegisterPayload = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export async function registerPost(payload: TRegisterPayload): Promise<TServerActionResponse<string>> {
  try {
    console.log(payload)
    const response = await fetch("http://localhost:3000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    // console.log(response.json())
    return {
      data: "Success",
      error: null,
    }
  } catch (error) {
    // console.log(error)
    return {
      data: null,
      error: "Error",
    }
  }
}