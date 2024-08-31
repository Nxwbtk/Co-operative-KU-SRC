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
  academicYear: string;
  data: TTypeOfOutstanding[];
  createdAt: string;
  updatedAt: string;
  __v: number;
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
    honorific: string;
    firstName: string;
    lastName: string;
    majorId: string;
    year: string;
    _id: string;
    majorName: string;
    typeOfOutstandingId: string;
    typeOfOutStandingName: string;
    academicYear: string;
  };
