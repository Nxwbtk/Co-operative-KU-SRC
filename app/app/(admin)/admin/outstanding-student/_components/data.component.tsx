"use client";

import { useOStdStore } from "@/lib/store/ostd-store";
import { TScienceFacultyAndMajors } from "../../club/_actions/types";
import { TGetAward, TOutStandingData } from "../types";
import { useEffect } from "react";

export type THandleDataComponentProps = {
  data: TOutStandingData[];
  allMajors: TScienceFacultyAndMajors["majorsAndId"];
  allAwards: TGetAward[];
};

export const HandleDataComponent = (props: THandleDataComponentProps) => {
  const { data, allMajors, allAwards } = props;
  const [setOstdData, setAllMajors, setAllAwards] = useOStdStore((state) => [
    state.setAllOStdData,
    state.setAllMajors,
    state.setAllAwards,
  ]);
  useEffect(() => {
    setOstdData(data);
    setAllMajors(allMajors);
    setAllAwards(allAwards);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, allMajors, allAwards]);
  return null;
};
