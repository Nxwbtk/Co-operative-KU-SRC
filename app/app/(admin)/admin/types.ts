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
export type TEditProfileDialogProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  editData: {
    honorific: string;
    firstName: string;
    lastName: string;
    email: string;
    image: string;
  }
}

export type TGetSTDClubResponse = {
  _id: string;
  major: string;
}

export type TGetOSTDResponse = {
  _id: string;
  type_of_award_id: string;
  major_id: string;
};

export type TDeleteMajorBtnProps = {
  isDeleteable?: boolean;
  majorId?: string;
}

export type TDeleteAwardBtnProps = {
  isDeleteable?: boolean;
  awardId?: string;
}