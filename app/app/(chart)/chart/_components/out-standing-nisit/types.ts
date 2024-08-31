export type TAlumniData = {
  award: string;
  awardId: string;
  nisitData: {
    honorific: string;
    firstName: string;
    lastName: string;
    majorId: string;
    year: string;
    _id: string;
    major: string;
  }[];
};

export type TAlumniConfig = {
  year: string;
  data: TAlumniData[];
};
