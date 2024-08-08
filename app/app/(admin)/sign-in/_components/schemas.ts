import * as z from 'zod';
export const logInSchema = z.object({
  email: z.string().email({ message: "โปรดกรอกอีเมลให้ถูกต้อง" }),
    password: z.string().regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
    message: "รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร, 1 ตัวอักษร, 1 ตัวเลข และ 1 อักขระพิเศษ"
  })
  // password: z.string()
});

export type TLogInSchema = z.infer<typeof logInSchema>;