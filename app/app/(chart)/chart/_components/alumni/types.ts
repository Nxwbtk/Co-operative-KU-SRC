export type TAlumniData = {
  name: string;
  type: string;
  major: string;
  img: string;
}

export type TAlumniConfig = {
  year: string;
  data: TAlumniData[];
}