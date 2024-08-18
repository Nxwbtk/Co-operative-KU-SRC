"use client";

import { useFacultyStore } from "@/lib/store/faculty-store";
import { TGetClubMember, TGetFaculty, TGetMajor } from "../_actions/types";
import { useEffect } from "react";

export type TDataClubProps = {
  facultyData: TGetFaculty[];
  allStudentClub: TGetClubMember[];
  allMajor: TGetMajor[];
};

export function DataClubComponent(props: TDataClubProps) {
  const { facultyData, allStudentClub, allMajor } = props;
  const [setFaculty, setAllStudentClub, setAllMajor] = useFacultyStore((state) => [
    state.setFaculty,
    state.setAllStudentClub,
    state.setAllMajor,
  ]);
  useEffect(
    () => {
      setFaculty(facultyData);
      setAllStudentClub(allStudentClub);
      setAllMajor(allMajor);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [facultyData]
  );
  return null;
}
