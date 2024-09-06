import { TScienceFacultyAndMajors } from "./club/_actions/types";
import { TGetAward } from "./outstanding-student/types";

export type TOption = {
  label: string;
  value: string;
};

export type AmountData = {
  title: string;
  amount: number;
};

export type TPayloadDashboard = {
  majorsData: TScienceFacultyAndMajors["majorsAndId"];
  awardsData: TGetAward[];
  amountData: AmountData[];
};