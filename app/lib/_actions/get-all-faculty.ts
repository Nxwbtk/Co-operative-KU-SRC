'use server'

import { TServerActionResponse } from "../server-action-response";

type TGetAllFacultyResponse = {
    [x: string]: any;
    id: string;
    name: string;
    majors: string[];
};

export async function getAllFacuty(): Promise<TServerActionResponse<TGetAllFacultyResponse[]>> {
  const res = await fetch(`${process.env.FE_URL}/api/faculty`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    return {
      error: "Error",
      data: null,
    }
  }
  const data = await res.json();
  return {
    error: null,
    data: data
  }
}