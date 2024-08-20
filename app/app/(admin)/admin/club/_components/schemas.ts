import * as z from "zod";

export const createClubSchema = z.object({
  firstName: z.string().min(1, { message: "กรุณากรอกชื่อ" }),
  lastName: z.string().min(1, { message: "กรุณากรอกนามสกุล" }),
  major: z
    .object({
      label: z.string(),
      value: z.string(),
    })
    .refine((data) => data.value !== "", { message: "กรุณาเลือกสาขา" }),
  academicYear: z
    .string()
    .min(1, { message: "กรุณาเลือกปีการศึกษา" })
    .refine(
      (data) => {
        const year = parseInt(data, 10);
        const currentYear = new Date().getFullYear();
        return year <= currentYear + 543;
      },
      { message: "ปีการศึกษาไม่สามารถมากกว่าปีปัจจุบัน" }
    ),
  clubPosition: z.string().min(1, { message: "กรุณากรอกตำแหน่งในสโมสรนิสิต" }),
  year: z
    .string()
    .min(1, { message: "กรุณากรอกปีการศึกษา" }),
});

export type TCreateStdClubForm = z.input<typeof createClubSchema>;
