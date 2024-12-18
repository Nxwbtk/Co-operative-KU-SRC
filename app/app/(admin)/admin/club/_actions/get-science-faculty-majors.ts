"use server";

import { TServerActionResponse } from "@/lib/server-action-response";
import { TScienceFacultyAndMajors } from "./types";

export async function getScienceFacultyMajors(): Promise<
  TServerActionResponse<TScienceFacultyAndMajors>
> {
  const res = await fetch(`${process.env.FE_URL}/api/faculty/science`, {
    method: "GET",
    next: {
      tags: ["ScienceFacultyAndMajors"],
    }
  });
  if (!res.ok) {
    return {
      error: "Failed to fetch",
      data: null,
    };
  }
 
  const data = await res.json();
  if (!data) {
    return {
      error: null,
      data: {
        _id: "",
        name: "",
        majors: [],
        __v: 0,
        createdAt: "",
        updatedAt: "",
        majorsAndId: [],
      },
    };
  }
  const resMajors = await fetch(
    `${process.env.FE_URL}/api/faculty/${data._id}/major`,
    {
      method: "GET",
      next: {
        tags: ["MajorOFScienceFaculty"],
      },
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
