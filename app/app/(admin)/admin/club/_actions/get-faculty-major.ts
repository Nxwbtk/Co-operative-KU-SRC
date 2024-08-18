'use server'

import { TServerActionResponse } from "@/lib/server-action-response";
import { TGetFaculty, TGetMajor } from "./types";


export async function getAllFaculty(): Promise<TServerActionResponse<TGetFaculty[]>> {
  const res = await fetch(`${process.env.FE_URL}/api/faculty`, {
    method: "GET",
  });
  if (!res.ok) {
    return {
      error: "Failed to fetch",
      data: null,
    }
  }
  const data = await res.json();
  return {
    error: null,
    data,
  };

}

export async function getMajorById({ facultyId }: { facultyId: string }): Promise<TServerActionResponse<TGetFaculty[]>> {
  const res = await fetch(`${process.env.FE_URL}/api/faculty/${facultyId}/major`, {
    method: "GET",
  });
  if (!res.ok) {
    return {
      error: "Failed to fetch",
      data: null,
    }
  }
  const data = await res.json();
  return {
    error: null,
    data,
  };
  
}

export async function getAllMajor(): Promise<TServerActionResponse<TGetMajor[]>> {
  const res = await fetch(`${process.env.FE_URL}/api/major`, {
    method: "GET",
  });
  if (!res.ok) {
    return {
      error: "Failed to fetch",
      data: null,
    }
  }
  const data = await res.json();
  return {
    error: null,
    data,
  };
  
}