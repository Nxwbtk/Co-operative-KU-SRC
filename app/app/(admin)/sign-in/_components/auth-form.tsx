"use client";

import { useForm, UseFormReturn } from "react-hook-form";
import { logInSchema, TLogInSchema } from "./schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { InputFormField } from "@/components/input-form-field/input-field";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";
import { AlertCircle, Circle, Loader2Icon } from "lucide-react";

export const AuthForm = () => {
  const router = useRouter();
  const [loading, setIsloading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const form: UseFormReturn<TLogInSchema> = useForm<TLogInSchema>({
    resolver: zodResolver(logInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const handleSubmit = async (data: TLogInSchema) => {
    setIsloading(true);
    try {
      const res = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });
      if (res?.error) {
        toast.error("อีเมลหรือรหัสผ่านไม่ถูกต้อง");
        setIsError(true);
        setIsloading(false);
      } else {
        router.push("/admin");
      }
    } catch (error) {
      toast.error("เกิดข้อผิดพลาด");
      setIsloading(false);
    }
  };

  const handleForgotPassword = () => {
    router.push("/sign-in/forgot-password");
  }
  return (
    <div className="flex flex-col">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col gap-2"
        >
          <InputFormField
            form={form}
            name="email"
            label="อีเมล"
            placeholder="example@example.com"
          />
          <InputFormField
            form={form}
            name="password"
            label="รหัสผ่าน"
            placeholder="Example12345"
            type="password"
          />
          {isError && (
            <div className="flex items-center gap-2 text-red-500 text-sm">
              <AlertCircle size={12} />
              <span>อีเมลหรือรหัสผ่านไม่ถูกต้อง</span>
            </div>
          )}
          <Button disabled={loading}>
            {loading ? (
              <Loader2Icon size={16} className="animate-spin" />
            ) : (
              "เข้าสู่ระบบ"
            )}
          </Button>
          <Button type="button" variant="link" className="self-end" onClick={handleForgotPassword}>
            ลืมรหัสผ่าน?
          </Button>
        </form>
      </Form>
    </div>
  );
};
