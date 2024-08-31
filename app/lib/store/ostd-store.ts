import { TScienceFacultyAndMajors } from "@/app/(admin)/admin/club/_actions/types";
import { TGetAward, TOutStandingData } from "@/app/(admin)/admin/outstanding-student/types"
import { create } from "zustand";

type GlobalState = {
  allOStdData: TOutStandingData[];
  allMajors: TScienceFacultyAndMajors["majorsAndId"];
  allAwards: TGetAward[];
}

type GlobalAction = {
  setAllOStdData: (allOStdData: TOutStandingData[]) => void;
  setAllMajors: (allMajors: TScienceFacultyAndMajors["majorsAndId"]) => void;
  setAllAwards: (allAwards: TGetAward[]) => void;
}

export const useOStdStore = create<GlobalState & GlobalAction>((set) => ({
  allOStdData: [],
  setAllOStdData: (allOStdData) => set({ allOStdData }),
  allMajors: [],
  setAllMajors: (allMajors) => set({ allMajors }),
  allAwards: [],
  setAllAwards: (allAwards) => set({ allAwards }),
}))