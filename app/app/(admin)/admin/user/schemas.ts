import * as z from "zod";
const passwordSchema = z
  .string()
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    {
      message:
        "รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัวอักษร และต้องประกอบด้วยตัวอักษรพิมพ์ใหญ่ ตัวอักษรพิมพ์เล็ก ตัวเลข และอักขระพิเศษ",
    }
  );

export const createUserSchema = z.object({
  honorific: z.object({
    value: z.string(),
    label: z.string(),
  }),
  firstName: z.string().min(1, { message: "กรุณากรอกชื่อ" }),
  lastName: z.string().min(1, { message: "กรุณากรอกนามสกุล" }),
  email: z.string().email().min(1, { message: "กรุณากรอกอีเมล" }),
  role: z.object({
    value: z.string(),
    label: z.string(),
  }),
  password: z.string().nullable(),
  confirmPassword: z.string().nullable(),
});
