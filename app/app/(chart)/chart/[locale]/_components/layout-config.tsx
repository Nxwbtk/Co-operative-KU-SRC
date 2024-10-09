import { TLayoutConfig } from "./types";
import teacherIcon from "@/public/layout/teach-icon.svg";
import studentIcon from "@/public/layout/student-icon.svg";
import alumniIcon from "@/public/layout/alumni-icon.svg";
import parentIcon from "@/public/layout/parent-icon.svg";
import applyIcon from "@/public/layout/apply-icon.svg";
import megaphone from "@/public/layout/ion--ios-megaphone.svg";

export const TOPICSCONFIG: TLayoutConfig[] = [
  {
    title: "ข่าวประชาสัมพันธ์",
    isFixColor: true,
    url: "https://sci.src.ku.ac.th/category/news/",
    icon: megaphone
  },
  {
    title: "สมัครเรียน",
    isFixColor: true,
    url: "https://admissions.src.ku.ac.th/",
    icon: applyIcon
  },
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
];


export const TOPICSCONFIG_ENG: TLayoutConfig[] = [
  {
    title: "News and Announcements",
    isFixColor: true,
    url: "https://sci.src.ku.ac.th/category/news/",
    icon: megaphone
  },
  {
    title: "Apply for Admission",
    isFixColor: true,
    url: "https://admissions.src.ku.ac.th/",
    icon: applyIcon
  },
  {
    title: "Faculty and Staff",
    isFixColor: false,
    url: "https://sci.src.ku.ac.th/%e0%b8%ad%e0%b8%b2%e0%b8%88%e0%b8%b2%e0%b8%a3%e0%b8%a2%e0%b9%8c%e0%b9%81%e0%b8%a5%e0%b8%b0%e0%b8%9a%e0%b8%b8%e0%b8%84%e0%b8%a5%e0%b8%b2%e0%b8%81%e0%b8%a3/",
    icon: teacherIcon
  },
  {
    title: "Students",
    isFixColor: false,
    url: "https://sci.src.ku.ac.th/%e0%b8%99%e0%b8%b4%e0%b8%aa%e0%b8%b4%e0%b8%95/",
    icon: studentIcon
  },
  {
    title: "Alumni",
    isFixColor: false,
    url: "https://sci.src.ku.ac.th/%e0%b8%a8%e0%b8%b4%e0%b8%a9%e0%b8%a2%e0%b9%8c%e0%b9%80%e0%b8%81%e0%b9%88%e0%b8%b2/",
    icon: alumniIcon
  },
  {
    title: "Parents",
    isFixColor: false,
    url: "https://sci.src.ku.ac.th/%e0%b8%9c%e0%b8%b9%e0%b9%89%e0%b8%9b%e0%b8%81%e0%b8%84%e0%b8%a3%e0%b8%ad%e0%b8%87-2-2/",
    icon: parentIcon
  },
];
