import { TLayoutConfig } from "./types";
import teacherIcon from "@/public/layout/teach-icon.svg";
import studentIcon from "@/public/layout/student-icon.svg";
import alumniIcon from "@/public/layout/alumni-icon.svg";
import parentIcon from "@/public/layout/parent-icon.svg";
import applyIcon from "@/public/layout/apply-icon.svg";

export const TOPICSCONFIG: TLayoutConfig[] = [
  {
    title: "อาจารย์และบุคลากร",
    isFixColor: false,
    url: "https://sci.src.ku.ac.th/%e0%b8%ad%e0%b8%b2%e0%b8%88%e0%b8%b2%e0%b8%a3%e0%b8%a2%e0%b9%8c%e0%b9%81%e0%b8%a5%e0%b8%b0%e0%b8%9a%e0%b8%b8%e0%b8%84%e0%b8%a5%e0%b8%b2%e0%b8%81%e0%b8%a3/",
    icon: teacherIcon
  },
  {
    title: "นิสิต",
    isFixColor: false,
    url: "https://sci.src.ku.ac.th/%e0%b8%99%e0%b8%b4%e0%b8%aa%e0%b8%b4%e0%b8%95/",
    icon: studentIcon
  },
  {
    title: "ศิษย์เก่า",
    isFixColor: false,
    url: "https://sci.src.ku.ac.th/%e0%b8%a8%e0%b8%b4%e0%b8%a9%e0%b8%a2%e0%b9%8c%e0%b9%80%e0%b8%81%e0%b9%88%e0%b8%b2/",
    icon: alumniIcon
  },
  {
    title: "ผู้ปกครอง",
    isFixColor: false,
    url: "https://sci.src.ku.ac.th/%e0%b8%9c%e0%b8%b9%e0%b9%89%e0%b8%9b%e0%b8%81%e0%b8%84%e0%b8%a3%e0%b8%ad%e0%b8%87-2-2/",
    icon: parentIcon
  },
  {
    title: "สมัครเรียน",
    isFixColor: true,
    url: "https://admissions.src.ku.ac.th/",
    icon: applyIcon
  }
];
