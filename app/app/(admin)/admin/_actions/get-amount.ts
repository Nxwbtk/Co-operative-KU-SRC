"use server";

import { TServerActionResponse } from "@/lib/server-action-response";

export async function getAmountSmo(): Promise<TServerActionResponse<number>> {
  const res = await fetch(`${process.env.FE_URL}/api/std-club/amount`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    return {
      error: "Failed to fetch",
      data: null,
    };
  }
  const data = await res.json();
  return {
    error: null,
    data: data.length,
  };
}

export async function getNisitOutstandingAmount(): Promise<
  TServerActionResponse<number>
> {
  const res = await fetch(
    `${process.env.FE_URL}/api/outstanding-student/amount`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (!res.ok) {
    return {
      error: "Failed to fetch",
      data: null,
    };
  }
  const data = await res.json();
  return {
    error: null,
    data: data.length,
  };
}

export async function getMajorAmount(): Promise<TServerActionResponse<number>> {
  // Change this url if you wanted to scale up this project to use whole university for all faculties
  const res = await fetch(`${process.env.FE_URL}/api/faculty/science`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    return {
      error: "Failed to fetch",
      data: null,
    };
  }
  const data = await res.json();
  return {
    error: null,
    data: data.length,
  };
}
