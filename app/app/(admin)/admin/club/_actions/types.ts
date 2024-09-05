export type TGetFaculty = {
  _id: string;
  name: string;
  majors: string[]; // Replace `any` with the appropriate type if known
  __v: number;
  createdAt: string;
  updatedAt: string;
};

export type TGetClubMember = {
  _id: string;
  firstName: string;
  lastName: string;
  clubPosition: string;
  faculty: string;
  major: string;
  year: string;
  imgUrl: string;
  academicYear: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  img: string;
  stdId: string;
  honorific: string;
};

export type TGetMajor = {
  _id: string;
  name: string;
  program: string;
  faculty: string;
  __v: number;
  createdAt: string;
  updatedAt: string;
  description: string;
};

export type TScienceFacultyAndMajors = {
  _id: string;
  name: string;
  majors: string[];
  __v: number;
  createdAt: string;
  updatedAt: string;
  majorsAndId: TGetMajor[];
};

export type TPostUpdateStdClub = {
  payload: {
    firstName: string;
    lastName: string;
    faculty: string;
    major: string;
    academicYear: string;
    clubPosition: string;
    year: string;
    img: string;
    stdId: string;
    honorific: string;
  };
  id?: string;
};
