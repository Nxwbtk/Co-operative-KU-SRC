"use client";
import { InputFormField } from "@/components/input-form-field/input-field";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormReturn } from "react-hook-form";
import { putChangePassword } from "../_actions/change-passoword";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { changePasswordSchema, TChangePasswordSchema } from "../types";
import { useState } from "react";
import { Loader2Icon } from "lucide-react";

export const ChangePasswordScreen = ({ email }: { email: string }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const form: UseFormReturn<TChangePasswordSchema> =
    useForm<TChangePasswordSchema>({
      resolver: zodResolver(changePasswordSchema),
      defaultValues: {
        password: "",
        confirmPassword: "",
      },
    });
  const handleSubmit = async (body: TChangePasswordSchema) => {
    setIsLoading(true);
    if (body.password !== body.confirmPassword) {
      form.setError("confirmPassword", {
        type: "manual",
        message: "รหัสผ่านไม่ตรงกัน",
      });
      setIsLoading(false);
      return;
    }
    const res = await putChangePassword({
      email: email,
      password: body.password,
    });
    if (res.error) {
      toast.error("เกิดข้อผิดพลาด", { description: "กรุณาลองใหม่อีกครั้ง" });
      setIsLoading(false);
      return;
    }
    toast.success("เปลี่ยนรหัสผ่านสำเร็จ", {
      description: "กรุณาเข้าสู่ระบบใหม่",
    });
    router.push("/sign-in");
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
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2Icon className="animate-spin" size={16} />
                ) : (
                  "เปลี่ยนรหัสผ่าน"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
