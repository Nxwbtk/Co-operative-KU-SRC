import * as z from "zod";

export const majorCreateSchema = z.object({
  name: z.string().min(1, { message: "กรุณากรอกชื่อสาขาวิชา" }),
  description: z.string(),
});

export type MajorCreateInput = z.infer<typeof majorCreateSchema>;
