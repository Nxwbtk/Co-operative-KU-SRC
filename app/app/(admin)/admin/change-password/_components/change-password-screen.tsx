"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useForm, UseFormReturn } from "react-hook-form";
import { TChangePasswordForm } from "./types";
import { zodResolver } from "@hookform/resolvers/zod";
import { changePasswordSchema } from "./schemas";
import { Form } from "@/components/ui/form";
import { InputFormField } from "@/components/input-form-field/input-field";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { EyeIcon, EyeOffIcon, Loader2Icon } from "lucide-react";
import { toast } from "sonner";
import { changePassword } from "../_actions/change-password";
import { signOut } from "next-auth/react";
import { handleLogout } from "@/lib/logout-fn";

export const ChangePassWordScreen = () => {
  const [isLoading, setIsloading] = useState(false);
  const form: UseFormReturn<TChangePasswordForm> = useForm<TChangePasswordForm>(
    {
      resolver: zodResolver(changePasswordSchema),
      defaultValues: {
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      },
    }
  );
  const handleSubmit = async (data: TChangePasswordForm) => {
    setIsloading(true);
    if ((data.newPassword === data.confirmPassword) && (data.newPassword === data.oldPassword)) {
      toast.error("รหัสผ่านใหม่ต้องไม่เหมือนรหัสผ่านเดิม");
      setIsloading(false);
      return;
    }

    if (data.newPassword !== data.confirmPassword) {
      form.setError("confirmPassword", {
        type: "manual",
        message: "รหัสผ่านไม่ตรงกัน",
      });
      form.setError("newPassword", {
        type: "manual",
        message: "รหัสผ่านไม่ตรงกัน",
      });
      setIsloading(false);
      return;
    }
    const res = await changePassword({ payload: data });
    if (res.error) {
      toast.error("เกิดข้อผิดพลาด");
      setIsloading(false);
      return;
    } else {
      toast.success("เปลี่ยนรหัสผ่านสำเร็จ");
      form.reset();
      handleLogout();
    }
  };
  return (
    <>
      <Card className="sm:w-full lg:w-[500px]">
        <CardHeader>
          <CardTitle>แก้ไขรหัสผ่าน</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="flex flex-col gap-2"
            >
              <InputFormField
                form={form}
                name="oldPassword"
                label="รหัสผ่านเดิม"
                placeholder="Example12345"
                type="password"
                required
              />
              <InputFormField
                form={form}
                name="newPassword"
                label="รหัสผ่านใหม่"
                placeholder="Example12345"
                type="password"
                required
              />
              <InputFormField
                form={form}
                name="confirmPassword"
                label="ยืนยันรหัสผ่านใหม่"
                placeholder="Example12345"
                type="password"
                required
              />
              <Button type="submit" className="mt-4" disabled={isLoading}>
                {isLoading ? (
                  <Loader2Icon size={16} className="animate-spin" />
                ) : (
                  "บันทึกการเปลี่ยนแปลง"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
};
