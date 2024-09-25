import * as z from "zod";

export const changePasswordSchema = z.object({
  password: z
    .string()
    .min(
      8,
      "รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัวอักษร และประกอบด้วยตัวอักษรพิมพ์เล็ก, ตัวอักษรพิมพ์ใหญ่, ตัวเลข และอักขระพิเศษ"
    )
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัวอักษร และประกอบด้วยตัวอักษรพิมพ์เล็ก, ตัวอักษรพิมพ์ใหญ่, ตัวเลข และอักขระพิเศษ"
    ),
  confirmPassword: z
    .string()
    .min(
      8,
      "รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัวอักษร และประกอบด้วยตัวอักษรพิมพ์เล็ก, ตัวอักษรพิมพ์ใหญ่, ตัวเลข และอักขระพิเศษ"
    )
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัวอักษร และประกอบด้วยตัวอักษรพิมพ์เล็ก, ตัวอักษรพิมพ์ใหญ่, ตัวเลข และอักขระพิเศษ"
    ),
});

export type TChangePasswordSchema = z.infer<typeof changePasswordSchema>;

export type TChangePasswordProps = {
  email: string;
  password: string;
};


export type TPostVerifyOTP = {
    otp: string;
}

export type TVerifiyOTPResponse = {
    _id: string;
    otp: string;
    email: string;
    isUsed: boolean;
    expireAt: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };