"use client";

import { useForm, UseFormReturn } from "react-hook-form";
import { logInSchema, TLogInSchema } from "./schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { InputFormField } from "@/components/input-form-field/input-field";
import { Button } from "@/components/ui/button";

export const AuthForm = () => {
  const form: UseFormReturn<TLogInSchema> = useForm<TLogInSchema>({
    resolver: zodResolver(logInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const handleSubmit = (data: TLogInSchema) => {};
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
          />
          <Button className="bg-green-700 hover:bg-green-500">
            เข้าสู่ระบบ
          </Button>
        </form>
      </Form>
    </div>
  );
};
