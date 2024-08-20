"use client";

import { useFacultyStore } from "@/lib/store/faculty-store";
import { TGetClubMember, TGetFaculty, TGetMajor, TScienceFacultyAndMajors } from "../_actions/types";
import { useEffect } from "react";

export type TDataClubProps = {
  scienceFacultyAndMajors: TScienceFacultyAndMajors;
  allStudentClub: TGetClubMember[];
};

export function DataClubComponent(props: TDataClubProps) {
  const { allStudentClub, scienceFacultyAndMajors } = props;
  const [setFaculty, setAllStudentClub, setAllMajor] = useFacultyStore((state) => [
    state.setFaculty,
    state.setAllStudentClub,
    state.setAllMajor,
  ]);
  const facultyData: TGetFaculty = {
    _id: scienceFacultyAndMajors._id,
    name: scienceFacultyAndMajors.name,
    majors: scienceFacultyAndMajors.majors,
    __v: scienceFacultyAndMajors.__v,
    createdAt: scienceFacultyAndMajors.createdAt,
    updatedAt: scienceFacultyAndMajors.updatedAt,
  };
  useEffect(
    () => {
      setFaculty([facultyData]);
      setAllStudentClub(allStudentClub);
      setAllMajor(scienceFacultyAndMajors.majorsAndId);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [allStudentClub]
  );
  return null;
}
