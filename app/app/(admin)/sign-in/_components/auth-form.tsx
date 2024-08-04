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
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          {/* <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex-1 w-full">
                <FormLabel htmlFor="email-field">อีเมล</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="mail@example.com"
                    id="email-field"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}
          <InputFormField form={form} name="email" label="อีเมล" />
        </form>
      </Form>
    </div>
  );
};
