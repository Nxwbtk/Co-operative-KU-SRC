"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import * as z from "zod";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Form } from "@/components/ui/form";
import { InputFormField } from "@/components/input-form-field/input-field";
import { postRequestOTP } from "./_actions/post-request-otp";
import { useState } from "react";
import { Loader2Icon } from "lucide-react";

export const forgotPasswordSchema = z.object({
  email: z.string().email(),
});

export type TForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const handleBack = () => {
    router.push("/sign-in");
  }
  const form: UseFormReturn<TForgotPasswordSchema> =
    useForm<TForgotPasswordSchema>({
      resolver: zodResolver(forgotPasswordSchema),
      defaultValues: {
        email: "",
      },
    });
  const handleSubmit = async (data: TForgotPasswordSchema) => {
    setIsLoading(true);
    const otp = Math.floor(100000 + Math.random() * 900000);
    const payload = {
      email: data.email,
      otp: otp.toString(),
    }
    const res = await postRequestOTP(payload);
    if (res.error) {
      toast.error("เกิดข้อผิดพลาด");
      setIsLoading(false);
      return ;
    }
    toast.success("สำเร็จ", {
      description: "กรุณาตรวจสอบอีเมลของคุณ"
    });
    router.push("/sign-in/forgot-password/success");
  };
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-[#302782]">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-start">
              ใส่อีเมลของคุณ
              <CardDescription>
                เราจะส่งลิงก์เพื่อรีเซ็ตรหัสผ่านของคุณ
              </CardDescription>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-4"
            >
              <div className="space-y-2">
                {/* <Input
                  type="email"
                  placeholder="อีเมล"
                  required
                  className="border-[#F5B21F] focus:ring-[#302782]"
                /> */}
                <InputFormField
                  type="email"
                  placeholder="อีเมล"
                  form={form}
                  name="email"
                  label=""
                />
              </div>
              <div className="flex flex-row">
              <Button
                type="submit"
                className="w-full rounded-none"
                disabled={isLoading}
              >
                {isLoading ? <Loader2Icon className="animate-spin" size={16} /> : "ส่งลิงก์เพื่อรีเซ็ตรหัสผ่าน"}
              </Button>
              <Button variant="secondary" type="button" className="rounded-none" onClick={handleBack}>
                กลับไปหน้าเข้าสู่ระบบ
              </Button>
              </div>
            </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
