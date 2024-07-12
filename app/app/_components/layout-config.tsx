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
    url: "",
    icon: teacherIcon
  },
  {
    title: "นิสิต",
    isFixColor: false,
    url: "",
    icon: studentIcon
  },
  {
    title: "ศิษย์เก่า",
    isFixColor: false,
    url: "",
    icon: alumniIcon
  },
  {
    title: "ทำเนียบศิษย์เก่าดีเด่น",
    isFixColor: false,
    url: "",
    icon: teacherIcon
  },
  {
    title: "ผู้ปกครอง",
    isFixColor: false,
    url: "",
    icon: parentIcon
  },
  {
    title: "สมัครเรียน",
    isFixColor: true,
    url: "",
    icon: applyIcon
  }
];
