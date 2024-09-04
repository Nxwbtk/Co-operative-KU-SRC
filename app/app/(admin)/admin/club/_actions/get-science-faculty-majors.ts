"use server";

import { TServerActionResponse } from "@/lib/server-action-response";
import { TScienceFacultyAndMajors } from "./types";

export async function getScienceFacultyMajors(): Promise<
  TServerActionResponse<TScienceFacultyAndMajors>
> {
  const res = await fetch(`${process.env.FE_URL}/api/faculty/science`, {
    method: "GET",
  });
  if (!res.ok) {
    return {
      error: "Failed to fetch",
      data: null,
    };
  }
  const data = await res.json();
  const resMajors = await fetch(
    `${process.env.FE_URL}/api/faculty/${data._id}/major`,
    {
      method: "GET",
      next: {
        tags: ["MajorOFScienceFaculty"],
      }
    }
  );
  if (!resMajors.ok) {
    return {
      error: "Failed to fetch",
      data: null,
    };
  }
  const dataMajors = await resMajors.json();
  const scienceFacultyAndMajors: TScienceFacultyAndMajors = {
    majorsAndId: dataMajors,
    ...data,
  };
  return {
    error: null,
    data: scienceFacultyAndMajors,
  };
}
