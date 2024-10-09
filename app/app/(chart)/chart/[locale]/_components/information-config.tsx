import { TInformationConfig } from "./types";
import sciChem from "@/public/layout/major-icon/sci-chem-icon.png";
import dataAnalyst from "@/public/layout/major-icon/data-analyst-icon.png";
import physics from "@/public/layout/major-icon/physics-icon.png";
import pe from "@/public/layout/major-icon/pe-icon.png";
import cs from "@/public/layout/major-icon/cs-icon.png";
import technoDigital from "@/public/layout/major-icon/techno-digital-icon.png";
import naturalProduct from "@/public/layout/major-icon/natural-product-icon.png";
import envi from "@/public/layout/major-icon/envi-icon.png";

export const InformationConfig: TInformationConfig[] = [
  {
    title: "เกี่ยวกับคณะ",
    isButtonOnly: false,
    parentConfig: [
      {
        title: "ข้อมูลทั่วไปของคณะ",
        url: "https://sci.src.ku.ac.th/%e0%b8%82%e0%b9%89%e0%b8%ad%e0%b8%a1%e0%b8%b9%e0%b8%a5%e0%b8%97%e0%b8%b1%e0%b9%88%e0%b8%a7%e0%b9%84%e0%b8%9b%e0%b8%82%e0%b8%ad%e0%b8%87%e0%b8%84%e0%b8%93%e0%b8%b0/",
        isParent: false,
        children: [],
      },
      {
        title: "ทำเนียบคณบดี",
        url: "https://sci.src.ku.ac.th/%e0%b8%82%e0%b9%89%e0%b8%ad%e0%b8%a1%e0%b8%b9%e0%b8%a5%e0%b8%97%e0%b8%b1%e0%b9%88%e0%b8%a7%e0%b9%84%e0%b8%9b%e0%b8%82%e0%b8%ad%e0%b8%87%e0%b8%84%e0%b8%93%e0%b8%b0/%e0%b8%97%e0%b8%b3%e0%b9%80%e0%b8%99%e0%b8%b5%e0%b8%a2%e0%b8%9a%e0%b8%84%e0%b8%93%e0%b8%9a%e0%b8%94%e0%b8%b5/",
        isParent: false,
        children: [],
      },
      {
        title: "คณบดีและผู้บริหาร",
        url: "https://sci.src.ku.ac.th/%e0%b8%82%e0%b9%89%e0%b8%ad%e0%b8%a1%e0%b8%b9%e0%b8%a5%e0%b8%97%e0%b8%b1%e0%b9%88%e0%b8%a7%e0%b9%84%e0%b8%9b%e0%b8%82%e0%b8%ad%e0%b8%87%e0%b8%84%e0%b8%93%e0%b8%b0/%e0%b8%84%e0%b8%93%e0%b8%9a%e0%b8%94%e0%b8%b5%e0%b9%81%e0%b8%a5%e0%b8%b0%e0%b8%9c%e0%b8%b9%e0%b9%89%e0%b8%9a%e0%b8%a3%e0%b8%b4%e0%b8%ab%e0%b8%b2%e0%b8%a3/",
        isParent: false,
        children: [],
      },
      {
        title: "บุคลากรวิชาการ",
        url: "https://sci.src.ku.ac.th/%e0%b8%82%e0%b9%89%e0%b8%ad%e0%b8%a1%e0%b8%b9%e0%b8%a5%e0%b8%97%e0%b8%b1%e0%b9%88%e0%b8%a7%e0%b9%84%e0%b8%9b%e0%b8%82%e0%b8%ad%e0%b8%87%e0%b8%84%e0%b8%93%e0%b8%b0/%e0%b8%9a%e0%b8%b8%e0%b8%84%e0%b8%a5%e0%b8%b2%e0%b8%81%e0%b8%a3%e0%b8%a7%e0%b8%b4%e0%b8%8a%e0%b8%b2%e0%b8%81%e0%b8%b2%e0%b8%a3-2/",
        isParent: true,
        children: [
          {
            title: "ภาควิชาวิทยาศาสตร์พื้นฐานและพลศึกษา",
            url: "#",
            icon: null,
          },
          {
            title: "สาขาวิชาวิทยาศาสตร์และเทคโนโลยีเคมีประยุกต์",
            url: "https://sci.src.ku.ac.th/department/applied-chemical-science-and-technology/",
            icon: sciChem,
          },
          {
            title: "สาขาวิชาวิทยาการวิเคราะห์ข้อมูลและคณิตศาสตร์ประกันภัย",
            url: "https://sci.src.ku.ac.th/department/data-analytics-and-actuarial-science/",
            icon: dataAnalyst,
          },
          {
            title: "สาขาวิชาฟิสิกส์",
            url: "https://sci.src.ku.ac.th/department/physics/",
            icon: physics,
          },
          {
            title: "สาขาวิชาพลศึกษา",
            url: "https://sci.src.ku.ac.th/department/sports-science/",
            icon: pe,
          },
          {
            title: "ภาควิชาคอมพิวเตอร์และสารสนเทศ",
            url: "#",
            icon: null,
          },
          {
            title: "สาขาวิชาวิทยาการคอมพิวเตอร์",
            url: "https://sci.src.ku.ac.th/department/computer-science/",
            icon: cs,
          },
          {
            title: "สาขาวิชาวิทยาการและเทคโนโลยีดิจิทัล",
            url: "https://sci.src.ku.ac.th/department/digital-science-and-technology/",
            icon: technoDigital,
          },
          {
            title: "ภาควิชาทรัพยากรและสิ่งแวดล้อม",
            url: "#",
            icon: null,
          },
          {
            title: "สาขาวิชาวิทยาศาสตร์และเทคโนโลยีผลิตภัณฑ์ธรรมชาติ (ป.โท)",
            url: "https://sci.src.ku.ac.th/department/natural-product-science-technology-master/",
            icon: naturalProduct,
          },
          {
            title: "สาขาวิชาวิทยาศาสตร์และเทคโนโลยีสิ่งแวดล้อม",
            url: "https://sci.src.ku.ac.th/department/natural-product-science-technology/",
            icon: envi,
          },
        ],
      },
      {
        title: "บุคลากรสนับสนุน",
        url: "https://sci.src.ku.ac.th/%e0%b8%82%e0%b9%89%e0%b8%ad%e0%b8%a1%e0%b8%b9%e0%b8%a5%e0%b8%97%e0%b8%b1%e0%b9%88%e0%b8%a7%e0%b9%84%e0%b8%9b%e0%b8%82%e0%b8%ad%e0%b8%87%e0%b8%84%e0%b8%93%e0%b8%b0/%e0%b8%9a%e0%b8%b8%e0%b8%84%e0%b8%a5%e0%b8%b2%e0%b8%81%e0%b8%a3%e0%b8%aa%e0%b8%99%e0%b8%b1%e0%b8%9a%e0%b8%aa%e0%b8%99%e0%b8%b8%e0%b8%99/",
        isParent: false,
        children: [],
      },
      {
        title: "รางวัลและความความภูมิใจ",
        url: "https://sci.src.ku.ac.th/%e0%b8%82%e0%b9%89%e0%b8%ad%e0%b8%a1%e0%b8%b9%e0%b8%a5%e0%b8%97%e0%b8%b1%e0%b9%88%e0%b8%a7%e0%b9%84%e0%b8%9b%e0%b8%82%e0%b8%ad%e0%b8%87%e0%b8%84%e0%b8%93%e0%b8%b0/award/",
        isParent: false,
        children: [],
      },
      {
        title: "ผลงานและสินค้าของคณะ",
        url: "https://sci.src.ku.ac.th/%e0%b8%82%e0%b9%89%e0%b8%ad%e0%b8%a1%e0%b8%b9%e0%b8%a5%e0%b8%97%e0%b8%b1%e0%b9%88%e0%b8%a7%e0%b9%84%e0%b8%9b%e0%b8%82%e0%b8%ad%e0%b8%87%e0%b8%84%e0%b8%93%e0%b8%b0/products/",
        isParent: false,
        children: [],
      },
      {
        title: "Knowledge Management",
        url: "https://sci.src.ku.ac.th/knowledge-management/",
        isParent: false,
        children: [],
      },
    ],
  },
  {
    title: "หลักสูตร",
    isButtonOnly: false,
    parentConfig: [
      {
        title: "ปริญญาตรี",
        url: "#", // Placeholder URL, replace with appropriate one if needed
        isParent: true,
        children: [
          {
            title: "วิทยาการคอมพิวเตอร์",
            url: "https://sci.src.ku.ac.th/program/computer-science/",
            icon: null,
          },
          {
            title: "เทคโนโลยีสารสนเทศ",
            url: "https://sci.src.ku.ac.th/program/information-technology/",
            icon: null,
          },
          {
            title: "วิทยาการและเทคโนโลยีดิจิทัล",
            url: "https://sci.src.ku.ac.th/program/digital-science-and-technology/",
            icon: null,
          },
          {
            title: "วิทยาศาสตร์และเทคโนโลยีสิ่งแวดล้อม",
            url: "https://sci.src.ku.ac.th/program/environmental-science-and-technology/",
            icon: null,
          },
          {
            title: "วิทยาศาสตร์และเทคโนโลยีเคมีประยุกต์",
            url: "https://sci.src.ku.ac.th/program/applied-chemical-science-and-technology/",
            icon: null,
          },
          {
            title: "ฟิสิกส์",
            url: "https://sci.src.ku.ac.th/program/physics/",
            icon: null,
          },
          {
            title: "วิทยาการวิเคราะห์ข้อมูลและคณิตศาสตร์ประกันภัย",
            url: "https://sci.src.ku.ac.th/program/data-analytics-and-actuarial-science/",
            icon: null,
          },
        ],
      },
      {
        title: "ปริญญาตรีภาคพิเศษ",
        url: "#", // Placeholder URL, replace with appropriate one if needed
        isParent: true,
        children: [
          {
            title: "วิทยาการคอมพิวเตอร์",
            url: "https://sci.src.ku.ac.th/program/special-computer-science/",
            icon: null,
          },
          {
            title: "เทคโนโลยีสารสนเทศ",
            url: "https://sci.src.ku.ac.th/program/special-information-technology/",
            icon: null,
          },
          {
            title: "วิทยาการและเทคโนโลยีดิจิทัล",
            url: "https://sci.src.ku.ac.th/program/special-digital-science-and-technology/",
            icon: null,
          },
        ],
      },
      {
        title: "ปริญญาโท",
        url: "#", // Placeholder URL, replace with appropriate one if needed
        isParent: true,
        children: [
          {
            title: "วิทยาศาสตร์และเทคโนโลยีผลิตภัณฑ์ธรรมชาติ",
            url: "https://sci.src.ku.ac.th/program/natural-product-science-technology/",
            icon: null,
          },
        ],
      },
    ],
  },
  {
    title: "บริการการศึกษา",
    isButtonOnly: false,
    parentConfig: [
      {
        title: "ข่าวประชาสัมพันธ์",
        url: "https://sci.src.ku.ac.th/category/news/",
        isParent: false,
        children: [],
      },
      {
        title: "ปฏิทินการศึกษา",
        url: "https://sci.src.ku.ac.th/%e0%b8%9b%e0%b8%8f%e0%b8%b4%e0%b8%97%e0%b8%b4%e0%b8%99%e0%b8%81%e0%b8%b2%e0%b8%a3%e0%b8%a8%e0%b8%b6%e0%b8%81%e0%b8%a9%e0%b8%b2/",
        isParent: false,
        children: [],
      },
      {
        title: "ขั้นตอนการยื่นคำร้อง",
        url: "https://docs.google.com/forms/d/e/1FAIpQLScrQgqPPbulH1ApX2GtmfsuY0zT28nwi9cndLOCUYDZhpXc-A",
        isParent: false,
        children: [],
      },
      {
        title: "การติดตามสถานะใบคำร้อง",
        url: "http://158.108.101.2:8080/PetitionTracking/",
        isParent: false,
        children: [],
      },
      {
        title: "ค่าธรรมเนียมการศึกษา",
        url: "https://sci.src.ku.ac.th/%e0%b8%84%e0%b9%88%e0%b8%b2%e0%b8%98%e0%b8%a3%e0%b8%a3%e0%b8%a1%e0%b9%80%e0%b8%99%e0%b8%b5%e0%b8%a2%e0%b8%a1%e0%b8%81%e0%b8%b2%e0%b8%a3%e0%b8%a8%e0%b8%b6%e0%b8%81%e0%b8%a9%e0%b8%b2/",
        isParent: false,
        children: [],
      },
      {
        title: "การรับสมัคร",
        url: "https://sci.src.ku.ac.th/%e0%b8%81%e0%b8%b2%e0%b8%a3%e0%b8%a3%e0%b8%b1%e0%b8%9a%e0%b8%aa%e0%b8%a1%e0%b8%b1%e0%b8%84%e0%b8%a3/",
        isParent: false,
        children: [],
      },
    ],
  },
  {
    title: "วิจัยและนวัตกรรม",
    isButtonOnly: false,
    parentConfig: [
      {
        title: "ฐานข้อมูลนักวิจัย",
        url: "https://research.ku.ac.th/forest/OutputByDepartment.aspx?CampusID=03&FacultyID=46#Publish1",
        isParent: false,
        children: [],
      },
      {
        title: "ผลงานวิจัย",
        url: "https://sci.src.ku.ac.th/research-group/individual-research/",
        isParent: false,
        children: [],
      },
      {
        title: "กลุ่มวิจัย",
        url: "https://sci.src.ku.ac.th/research-group/group-research/",
        isParent: false,
        children: [],
      },
      {
        title: "Dashboard งานวิจัย",
        url: "http://158.108.101.32/ResearchDashboard/",
        isParent: false,
        children: [],
      },
      {
        title: "บริการงานวิจัย",
        url: "#",
        isParent: true,
        children: [
          {
            title: "เอกสารดาวน์โหลด",
            url: "https://sci.src.ku.ac.th/%e0%b9%80%e0%b8%ad%e0%b8%81%e0%b8%aa%e0%b8%b2%e0%b8%a3%e0%b8%94%e0%b8%b2%e0%b8%A7%e0%b8%99%e0%b9%8c%e0%b9%82%e0%b8%ab%e0%b8%a5%e0%b8%94%e0%b8%9a%e0%b8%a3%e0%b8%b4%e0%b8%81%e0%b8%b2%e0%b8%a3%e0%b8%87/",
            icon: null,
          },
          {
            title: "บริการตรวจสอบการคัดลอกผลงาน",
            url: "https://www.lib.ku.ac.th/2024/article/view/98",
            icon: null,
          },
          {
            title: "แจ้งปัญหาเกี่ยวกับโครงการวิจัย",
            url: "https://forms.gle/EQLip2tjAfysXs7p7",
            icon: null,
          },
        ],
      },
    ],
  },
  {
    title: "บริการเพื่อสังคม",
    isButtonOnly: true,
    url: "https://sci.src.ku.ac.th/%e0%b8%9a%e0%b8%a3%e0%b8%b4%e0%b8%81%e0%b8%b2%e0%b8%a3%e0%b8%a7%e0%b8%b4%e0%b8%8a%e0%b8%b2%e0%b8%81%e0%b8%b2%e0%b8%a3/",
    parentConfig: [],
  },
  {
    title: "ระบบสารสนเทศการให้บริการ",
    isButtonOnly: false,
    parentConfig: [
      {
        title: "ระบบสารสนเทศ",
        url: "#",
        isParent: true,
        children: [
          {
            title: "บุคลากร",
            url: "https://sci.src.ku.ac.th/%e0%b8%ad%e0%b8%b2%e0%b8%88%e0%b8%b2%e0%b8%a3%e0%b9%8c%e0%b9%81%e0%b8%a5%e0%b8%b0%e0%b8%9a%e0%b8%b8%e0%b8%84%e0%b8%a5%e0%b8%b2%e0%b8%81%e0%b8%a3/",
            icon: null,
          },
          {
            title: "นิสิต",
            url: "https://sci.src.ku.ac.th/%e0%b8%a3%e0%b8%b0%e0%b8%9a%e0%b8%9a%e0%b8%aa%e0%b8%b2%e0%b8%a3%e0%b8%aa%e0%b8%99%e0%b9%80%e0%b8%97%e0%b8%a8/",
            icon: null,
          },
        ],
      },
      {
        title: "Online learning",
        url: "http://online.sci.src.ku.ac.th/",
        isParent: false,
        children: [],
      },
    ],
  },
  {
    title: "ความร่วมมือภายนอก",
    isButtonOnly: true,
    url: "https://sci.src.ku.ac.th/%e0%b8%84%e0%b8%a7%e0%b8%b2%e0%b8%a1%e0%b8%a3%e0%b9%88%e0%b8%a7%e0%b8%a1%e0%b8%b7%e0%b8%ad%e0%b8%a0%e0%b8%b2%e0%b8%a2%e0%b8%99%e0%b8%ad%e0%b8%81/",
    parentConfig: [],
  },
  {
    title: "Q&A",
    isButtonOnly: true,
    url: "https://sci.src.ku.ac.th/qa/",
    parentConfig: [],
  },
  {
    title: "ติดต่อเรา",
    isButtonOnly: true,
    url: "https://sci.src.ku.ac.th/%e0%b8%95%e0%b8%b4%e0%b8%94%e0%b8%95%e0%b9%88%e0%b8%ad%e0%b9%80%e0%b8%a3%e0%b8%b2/",
    parentConfig: [],
  },
];

export const InformationConfig_ENG: TInformationConfig[] = [
  {
    title: "About the Faculty",
    isButtonOnly: false,
    parentConfig: [
      {
        title: "General Information",
        url: "#",
        isParent: false,
        children: [],
      },
      {
        title: "Dean's Gallery",
        url: "#",
        isParent: false,
        children: [],
      },
      {
        title: "Dean and Executives",
        url: "#",
        isParent: false,
        children: [],
      },
      {
        title: "Academic Staff",
        url: "#",
        isParent: true,
        children: [
          {
            title: "Department of Basic Science and Physical Education",
            url: "#",
            icon: null,
          },
          {
            title: "Applied Chemical Science and Technology",
            url: "#",
            icon: sciChem,
          },
          {
            title: "Data Analytics and Actuarial Science",
            url: "#",
            icon: dataAnalyst,
          },
          {
            title: "Physics",
            url: "#",
            icon: physics,
          },
          {
            title: "Physical Education",
            url: "#",
            icon: pe,
          },
          {
            title: "Department of Computer and Information",
            url: "#",
            icon: null,
          },
          {
            title: "Computer Science",
            url: "#",
            icon: cs,
          },
          {
            title: "Digital Science and Technology",
            url: "#",
            icon: technoDigital,
          },
          {
            title: "Department of Resources and Environment",
            url: "#",
            icon: null,
          },
          {
            title: "Natural Product Science and Technology (Master's)",
            url: "#",
            icon: naturalProduct,
          },
          {
            title: "Environmental Science and Technology",
            url: "#",
            icon: envi,
          },
        ],
      },
      {
        title: "Supporting Staff",
        url: "#",
        isParent: false,
        children: [],
      },
      {
        title: "Awards and Pride",
        url: "#",
        isParent: false,
        children: [],
      },
      {
        title: "Faculty Products",
        url: "#",
        isParent: false,
        children: [],
      },
      {
        title: "Knowledge Management",
        url: "#",
        isParent: false,
        children: [],
      },
    ],
  },
  {
    title: "Programs",
    isButtonOnly: false,
    parentConfig: [
      {
        title: "Bachelor's Degree",
        url: "#",
        isParent: true,
        children: [
          {
            title: "Computer Science",
            url: "#",
            icon: null,
          },
          {
            title: "Information Technology",
            url: "#",
            icon: null,
          },
          {
            title: "Digital Science and Technology",
            url: "#",
            icon: null,
          },
          {
            title: "Environmental Science and Technology",
            url: "#",
            icon: null,
          },
          {
            title: "Applied Chemical Science and Technology",
            url: "#",
            icon: null,
          },
          {
            title: "Physics",
            url: "#",
            icon: null,
          },
          {
            title: "Data Analytics and Actuarial Science",
            url: "#",
            icon: null,
          },
        ],
      },
      {
        title: "Special Bachelor's Degree",
        url: "#",
        isParent: true,
        children: [
          {
            title: "Computer Science",
            url: "#",
            icon: null,
          },
          {
            title: "Information Technology",
            url: "#",
            icon: null,
          },
          {
            title: "Digital Science and Technology",
            url: "#",
            icon: null,
          },
        ],
      },
      {
        title: "Master's Degree",
        url: "#",
        isParent: true,
        children: [
          {
            title: "Natural Product Science and Technology",
            url: "#",
            icon: null,
          },
        ],
      },
    ],
  },
  {
    title: "Educational Services",
    isButtonOnly: false,
    parentConfig: [
      {
        title: "News and Announcements",
        url: "#",
        isParent: false,
        children: [],
      },
      {
        title: "Academic Calendar",
        url: "#",
        isParent: false,
        children: [],
      },
      {
        title: "Petition Submission Process",
        url: "#",
        isParent: false,
        children: [],
      },
      {
        title: "Petition Status Tracking",
        url: "#",
        isParent: false,
        children: [],
      },
      {
        title: "Tuition Fees",
        url: "#",
        isParent: false,
        children: [],
      },
      {
        title: "Admissions",
        url: "#",
        isParent: false,
        children: [],
      },
    ],
  },
  {
    title: "Research and Innovation",
    isButtonOnly: false,
    parentConfig: [
      {
        title: "Researcher Database",
        url: "#",
        isParent: false,
        children: [],
      },
      {
        title: "Research Output",
        url: "#",
        isParent: false,
        children: [],
      },
      {
        title: "Research Groups",
        url: "#",
        isParent: false,
        children: [],
      },
      {
        title: "Research Dashboard",
        url: "#",
        isParent: false,
        children: [],
      },
      {
        title: "Research Services",
        url: "#",
        isParent: true,
        children: [
          {
            title: "Downloadable Documents",
            url: "#",
            icon: null,
          },
          {
            title: "Plagiarism Check Service",
            url: "#",
            icon: null,
          },
          {
            title: "Report Research Project Issues",
            url: "#",
            icon: null,
          },
        ],
      },
    ],
  },
  {
    title: "Social Services",
    isButtonOnly: true,
    url: "#",
    parentConfig: [],
  },
  {
    title: "Information Systems",
    isButtonOnly: false,
    parentConfig: [
      {
        title: "Information Systems",
        url: "#",
        isParent: true,
        children: [
          {
            title: "Staff",
            url: "#",
            icon: null,
          },
          {
            title: "Students",
            url: "#",
            icon: null,
          },
        ],
      },
      {
        title: "Online Learning",
        url: "#",
        isParent: false,
        children: [],
      },
    ],
  },
  {
    title: "External Collaborations",
    isButtonOnly: true,
    url: "#",
    parentConfig: [],
  },
  {
    title: "Q&A",
    isButtonOnly: true,
    url: "#",
    parentConfig: [],
  },
  {
    title: "Contact Us",
    isButtonOnly: true,
    url: "#",
    parentConfig: [],
  },
];