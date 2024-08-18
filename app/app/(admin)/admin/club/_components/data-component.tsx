'use client'

import { TGetFaculty } from "../_actions/types";

export type TDataClubProps = {
  facultyData: TGetFaculty[];
}

export function DataClubComponent(props: TDataClubProps) {
  const { facultyData } = props;
  console.log(facultyData);
  return null;
}