export type TNisitData = {
  honorific: string;
  firstName: string;
  lastName: string;
  majorId: string;
  year: string;
  _id: string;
};

export type TTypeOfOutstanding = {
  typeOfOutstanding: string;
  nisitData: TNisitData[];
  _id: string;
};

export type TGetOutStandingData = {
  _id: string;
  academic_year: string;
  honorific: string;
  first_name: string;
  last_name: string;
  year: string;
  major_id: string;
  type_of_award_id: string;
};

export type TGetAward = {
  _id: string;
  name: string;
  description: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
};

export type TOutStandingData = {
  _id: string;
  academic_year: string;
  honorific: string;
  first_name: string;
  last_name: string;
  year: string;
  major_id: string;
  type_of_award_id: string;
  majorName: string;
  typeOfOutStandingName: string;
};
