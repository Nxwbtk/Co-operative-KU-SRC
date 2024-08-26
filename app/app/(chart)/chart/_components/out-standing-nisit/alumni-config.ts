import { TOptionsGroup } from "@/components/select/types";
import { TAlumniConfig } from "./types";

function generateYearOptions(startYear: number): { value: string, label: string }[] {
  const currentYear = new Date().getFullYear() + 543; // Convert to Thai Buddhist calendar year
  const options = [];

  for (let year = startYear; year <= currentYear; year++) {
    options.push({ value: year.toString(), label: `ปีการศึกษา ${year}` });
  }

  return options.reverse();
}

export const YEAROPTIONS: TOptionsGroup[] = [
  {
    label: "ปีการศึกษา",
    options: generateYearOptions(2532),
  },
];

export const ALUMNI: TAlumniConfig[] = [
  {
    year: "2567",
    data: [
      {
        name: "บุญทกานต์ ศิริกมลทิพย์",
        type: "ประเภทเรียนดี",
        major: "สาขาวิทยาการคอมพิวเตอร์",
        img: "https://avatars.githubusercontent.com/u/124599?v=4",
      },
      {
        name: "บุญทกานต์ ศิริกมลทิพย์",
        type: "ประเภทเรียนดี",
        major: "สาขาวิทยาการคอมพิวเตอร์",
        img: "https://avatars.githubusercontent.com/u/124599?v=4",
      },
      {
        name: "บุญทกานต์ ศิริกมลทิพย์",
        type: "ประเภทเรียนดี",
        major: "สาขาวิทยาการคอมพิวเตอร์",
        img: "https://avatars.githubusercontent.com/u/124599?v=4",
      },
      {
        name: "บุญทกานต์ ศิริกมลทิพย์",
        type: "ประเภทเรียนดี",
        major: "สาขาวิทยาการคอมพิวเตอร์",
        img: "https://avatars.githubusercontent.com/u/124599?v=4",
      },
      {
        name: "บุญทกานต์ ศิริกมลทิพย์",
        type: "ประเภทเรียนดี",
        major: "สาขาวิทยาการคอมพิวเตอร์",
        img: "https://avatars.githubusercontent.com/u/124599?v=4",
      },
    ],
  },
  {
    year: "2566",
    data: [
      {
        name: "ประวิทย์ สุขสวัสดิ์",
        type: "ประเภทเรียนดี",
        major: "สาขาวิทยาการคอมพิวเตอร์",
        img: "https://avatars.githubusercontent.com/u/124599?v=4",
      },
      {
        name: "ประวิทย์ สุขสวัสดิ์",
        type: "ประเภทเรียนดี",
        major: "สาขาวิทยาการคอมพิวเตอร์",
        img: "https://avatars.githubusercontent.com/u/124599?v=4",
      },
      {
        name: "ประวิทย์ สุขสวัสดิ์",
        type: "ประเภทเรียนดี",
        major: "สาขาวิทยาการคอมพิวเตอร์",
        img: "https://avatars.githubusercontent.com/u/124599?v=4",
      },
      {
        name: "ประวิทย์ สุขสวัสดิ์",
        type: "ประเภทเรียนดี",
        major: "สาขาวิทยาการคอมพิวเตอร์",
        img: "https://avatars.githubusercontent.com/u/124599?v=4",
      },
      {
        name: "ประวิทย์ สุขสวัสดิ์",
        type: "ประเภทเรียนดี",
        major: "สาขาวิทยาการคอมพิวเตอร์",
        img: "https://avatars.githubusercontent.com/u/124599?v=4",
      }
    ]
  }
];
