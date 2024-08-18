"use server";

type TPostMajorType = {
  majorData: {
    name: string;
    program: string;
    faculty: string;
  }[];
};

export async function postMajor(params: TPostMajorType) {
  const { majorData } = params;
  // console.log(majorData);
  const res = await fetch(`${process.env.FE_URL}/api/major`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ majorData }),
  });
  const data = await res.json();
  return data;
}
