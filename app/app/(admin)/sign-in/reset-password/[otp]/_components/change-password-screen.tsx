"use client";
import { InputFormField } from "@/components/input-form-field/input-field";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormReturn } from "react-hook-form";
import * as z from "zod";
import { TVerifiyOTPResponse } from "../_actions/verify-otp";

export const changePasswordSchema = z.object({
  password: z
    .string()
    .min(8, "รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัวอักษร และประกอบด้วยตัวอักษรพิมพ์เล็ก, ตัวอักษรพิมพ์ใหญ่, ตัวเลข และอักขระพิเศษ")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัวอักษร และประกอบด้วยตัวอักษรพิมพ์เล็ก, ตัวอักษรพิมพ์ใหญ่, ตัวเลข และอักขระพิเศษ"
    ),
  confirmPassword: z
    .string()
    .min(8, "รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัวอักษร และประกอบด้วยตัวอักษรพิมพ์เล็ก, ตัวอักษรพิมพ์ใหญ่, ตัวเลข และอักขระพิเศษ")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัวอักษร และประกอบด้วยตัวอักษรพิมพ์เล็ก, ตัวอักษรพิมพ์ใหญ่, ตัวเลข และอักขระพิเศษ"
    ),
});


export type TChangePasswordSchema = z.infer<typeof changePasswordSchema>;


export const ChangePasswordScreen = () => {
  // console.log(data);
  const form: UseFormReturn<TChangePasswordSchema> =
    useForm<TChangePasswordSchema>({
      resolver: zodResolver(changePasswordSchema),
      defaultValues: {
        password: "",
        confirmPassword: "",
      },
    });
  const handleSubmit = async (body: TChangePasswordSchema) => {
    if (body.password !== body.confirmPassword) {
      form.setError("confirmPassword", {
        type: "manual",
        message: "รหัสผ่านไม่ตรงกัน",
      });
      return;
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5B21F] p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl sm:text-3xl font-bold text-center text-[#302782]">
            เปลี่ยนรหัสผ่าน
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-4"
            >
              <InputFormField
                type="password"
                form={form}
                name="password"
                required
                label="รหัสผ่านใหม่"
                placeholder="รหัสผ่านใหม่"
              />

              <InputFormField
                type="password"
                form={form}
                name="confirmPassword"
                required
                label="ยืนยันรหัสผ่านใหม่"
                placeholder="ยืนยันรหัสผ่านใหม่"
              />
              <Button
                type="submit"
                className="w-full bg-[#302782] hover:bg-[#302782]/90 text-white"
              >
                เปลี่ยนรหัสผ่าน
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
