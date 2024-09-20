import * as z from "zod";

export const majorCreateSchema = z.object({
  name: z.string().min(1, { message: "กรุณากรอกชื่อสาขาวิชา" }),
  description: z.string(),
});

export type MajorCreateInput = z.infer<typeof majorCreateSchema>;

export const editProfileSchema = z.object({
  honorific: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
});

export type TEditProfileForm = z.infer<typeof editProfileSchema>;
