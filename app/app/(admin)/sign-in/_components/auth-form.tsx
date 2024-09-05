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
import { Circle, Loader2Icon } from "lucide-react";

export const AuthForm = () => {
  const router = useRouter();
  const [loading, setIsloading] = useState<boolean>(false);
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
        setIsloading(false);
      } else {
        router.push("/admin");
      }
    } catch (error) {
      toast.error("เกิดข้อผิดพลาด");
      setIsloading(false);
    }
  };
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
          <Button disabled={loading}>
            {loading ? (
              <Loader2Icon size={16} className="animate-spin" />
            ) : (
              "เข้าสู่ระบบ"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};
