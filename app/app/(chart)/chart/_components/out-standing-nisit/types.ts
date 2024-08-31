export type TAlumniData = {
  _id: string;
  academic_year: string;
  honorific: string;
  first_name: string;
  last_name: string;
  year: string;
  major_id: string;
  type_of_award_id: string;
  awardName: string;
  majorName: string;
};

export type TAlumniConfig = {
  year: string;
  data: TAlumniData[];
};
