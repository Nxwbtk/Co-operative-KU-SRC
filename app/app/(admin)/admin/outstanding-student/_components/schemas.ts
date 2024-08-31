import * as z from "zod";

export const outstandingCreateSchema = z.object({
  honorific: z.string().optional(),
  firstName: z.string().min(1, { message: "กรุณากรอกชื่อ" }),
  lastName: z.string().min(1, { message: "กรุณากรอกนามสกุล" }),
  major: z.object({
    value: z.string(),
    label: z.string(),
  }).nullable(),
  year: z
    .string()
    .min(1, { message: "กรุณากรอกชั้นปี" }),
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
  typeOfOutstanding: z.object({
    value: z.string(),
    label: z.string(),
  }).nullable(),
  newTypeOfOutstanding: z.string().optional(),
});

export type TOutstandingCreateForm = z.infer<typeof outstandingCreateSchema>;
