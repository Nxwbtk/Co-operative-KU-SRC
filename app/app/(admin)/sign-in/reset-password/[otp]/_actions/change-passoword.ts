"use server";

import { TChangePasswordProps } from "../types";

export async function putChangePassword({
  email,
  password,
}: TChangePasswordProps) {
  const res = await fetch(`${process.env.FE_URL}/api/admin/user`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
    cache: "no-store",
  });
  if (!res.ok) {
    return {
      data: null,
      error: "Fail",
    };
  }
  const data = await res.json();
  return { data, error: null };
}
