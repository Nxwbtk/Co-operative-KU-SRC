import { uuid } from "uuidv4";
import { getAllFacuty } from "./_actions/get-all-faculty";
const ALLFACULTY = [
  "คณะวิทยาการจัดการ",
  "คณะวิศวกรรมศาสตร์ศรีราชา",
  "คณะวิทยาศาสตร์ ศรีราชา",
  "คณะเศรษฐศาสตร์ ศรีราชา",
  "คณะพาณิชยนาวีนานาชาติ",
];
export const generateFaculty = () => {
  return ALLFACULTY.map((faculty) => {
    return {
      name: faculty,
    };
  });
};

const ALLMAJOR = [
  {
    facultyName: "คณะวิทยาการจัดการ",
    major: [
      {
        name: "หลักสูตรบริหารธุรกิจบัณฑิต (การจัดการ)",
        program: "หลักสูตรภาคภาษาไทย (Thai Program)",
      },
      {
        name: "หลักสูตรบริหารธุรกิจบัณฑิต (ธุรกิจระหว่างประเทศ)",
        program: "หลักสูตรภาคภาษาไทย (Thai Program)",
      },
      {
        name: "หลักสูตรบริหารธุรกิจบัณฑิต (การจัดการอุตสาหกรรมการบริการ)",
        program: "หลักสูตรภาคภาษาไทย (Thai Program)",
      },
      {
        name: "หลักสูตรบริหารธุรกิจบัณฑิต (การบัญชี)",
        program: "หลักสูตรภาคภาษาไทย (Thai Program)",
      },
      {
        name: "หลักสูตรบริหารธุรกิจบัณฑิต (การตลาดดิจิทัลและการสร้างตรา)",
        program: "หลักสูตรภาคภาษาไทย (Thai Program)",
      },
      {
        name: "หลักสูตรบริหารธุรกิจบัณฑิต (การจัดการโลจิสติกส์)",
        program: "หลักสูตรภาคภาษาไทย (Thai Program)",
      },
      {
        name: "หลักสูตรบริหารธุรกิจบัณฑิต (การเงินและการลงทุน)",
        program: "หลักสูตรภาคภาษาไทย (Thai Program)",
      },
      {
        name: "หลักสูตรบริหารธุรกิจบัณฑิต (ปริญญาโทและเอก)",
        program: "หลักสูตรภาคภาษาไทย (Thai Program)",
      },
      {
        name: "หลักสูตรบริหารธุรกิจบัณฑิต (การเงินและการลงทุน)",
        program: "หลักสูตรภาคภาษาอังกฤษ (English Program)",
      },
      {
        name: "หลักสูตรบริหารธุรกิจบัณฑิต (ธุรกิจระหว่างประเทศ)",
        program: "หลักสูตรภาคภาษาอังกฤษ (English Program)",
      },
      {
        name: "หลักสูตรบริหารธุรกิจบัณฑิต (การจัดการ)",
        program: "หลักสูตรภาคภาษาอังกฤษ (English Program)",
      },
      {
        name: "หลักสูตรบริหารธุรกิจบัณฑิต (การตลาดดิจิทัลและการสร้างตรา)",
        program: "หลักสูตรภาคภาษาอังกฤษ (English Program)",
      },
      {
        name: "หลักสูตรบริหารธุรกิจบัณฑิต (การบัญชี)",
        program: "หลักสูตรภาคภาษาอังกฤษ (English Program)",
      },
      {
        name: "หลักสูตรบริหารธุรกิจบัณฑิต (การจัดการโลจิสติกส์)",
        program: "หลักสูตรภาคภาษาอังกฤษ (English Program)",
      },
      {
        name: "หลักสูตรบริหารธุรกิจบัณฑิต (การจัดการอุตสาหกรรมการบริการ)",
        program: "หลักสูตรภาคภาษาอังกฤษ (English Program)",
      },
    ],
  },
  {
    facultyName: "คณะวิศวกรรมศาสตร์ ศรีราชา",
    major: [
      {
        name: "ภาควิชาวิศวกรรมไฟฟ้า",
        program: "หลักสูตรภาคภาษาไทย (Thai Program)",
      },
      {
        name: "ภาควิชาวิศวกรรมอุตสาหการ",
        program: "หลักสูตรภาคภาษาไทย (Thai Program)",
      },
      {
        name: "ภาควิชาวิศวกรรมคอมพิวเตอร์",
        program: "หลักสูตรภาคภาษาไทย (Thai Program)",
      },
      {
        name: "ภาควิชาวิศวกรรมโยธา",
        program: "หลักสูตรภาคภาษาไทย (Thai Program)",
      },
      {
        name: "ภาควิชาวิศวกรรมเครื่องกล",
        program: "หลักสูตรภาคภาษาไทย (Thai Program)",
      },
    ],
  },
  {
    facultyName: "คณะวิทยาศาสตร์ ศรีราชา",
    major: [
      {
        name: "ภาควิชาทรัพยากรและสิ่งแวดล้อม",
        program: "หลักสูตรภาคภาษาไทย (Thai Program)",
      },
      {
        name: "ภาควิชาวิทยาศาสตร์พื้นฐานและพลศึกษา",
        program: "หลักสูตรภาคภาษาไทย (Thai Program)",
      },
      {
        name: "ภาควิชาวิทยาการคอมพิวเตอร์และสารสนเทศ",
        program: "หลักสูตรภาคภาษาไทย (Thai Program)",
      },
    ],
  },
  {
    facultyName: "คณะเศรษฐศาสตร์ ศรีราชา",
    major: [
      {
        name: "ภาควิชาเศรษฐศาสตร์",
        program: "หลักสูตรภาคภาษาไทย (Thai Program)",
      },
      {
        name: "ภาควิชาเศรษฐศาสตร์ประยุกต์",
        program: "หลักสูตรภาคภาษาไทย (Thai Program)",
      },
    ],
  },
  {
    facultyName: "คณะพาณิชยนาวีนานาชาติ",
    major: [
      {
        name: "ภาควิชาวิทยาการเดินเรือและโลจิสติกส์ทางทะเล",
        program: "หลักสูตรภาคภาษาไทย (Thai Program)",
      },
      {
        name: "ภาควิชาวิศวกรรมทางทะเล",
        program: "หลักสูตรภาคภาษาไทย (Thai Program)",
      },
    ],
  },
];

export const generateMajor = async () => {
  const allFaculty = await getAllFacuty();
  if (!allFaculty.data) {
    return null;
  }
  const { data: facultyData } = allFaculty;
  const majorData: { name: string; program: string; faculty: string }[] | null =
    ALLMAJOR.flatMap((major) => {
      const faculty = facultyData.find(
        (faculty) => faculty.name === major.facultyName
      );
      if (!faculty) {
        return [];
      }
      return major.major.map((major) => ({
        name: major.name,
        program: major.program,
        faculty: faculty._id as string,
      }));
    });

  return majorData.length > 0 ? majorData : null;
};