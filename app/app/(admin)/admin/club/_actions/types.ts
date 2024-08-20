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
};

export type TGetMajor = {
  _id: string;
  name: string;
  program: string;
  faculty: string;
  __v: number;
  createdAt: string;
  updatedAt: string;
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
