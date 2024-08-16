"use client";

import { InputFormField } from "@/components/input-form-field/input-field";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm, UseFormReturn } from "react-hook-form";
import { createClubSchema, TCreateStdClubForm } from "./schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { AppFormLabel } from "@/components/shared/label";
import { SelectComponent } from "@/components/select";

export const CreateBtn = () => {
  const form: UseFormReturn<TCreateStdClubForm> = useForm<TCreateStdClubForm>({
    resolver: zodResolver(createClubSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      faculty: "",
      major: "",
      year: "",
      clubPosition: "",
    },
  });

  const onSubmit = async (data: TCreateStdClubForm) => {};
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-green-700 hover:bg-green-500">เพิ่มสมาชิก</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <div className="grid grid-cols-4 items-center">
          <div className="grid col-span-1">
            <div className="flex flex-col justify-center items-center">
              <Avatar>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
          </div>
          <div className="grid col-span-3">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex flex-col justify-center items-center gap-2">
                  <div className="grid grid-cols-2 gap-2">
                    <InputFormField
                      label="ชื่อ"
                      name="firstName"
                      form={form}
                      placeholder={""}
                    />
                    <InputFormField
                      label="นามสกุล"
                      name="lastName"
                      form={form}
                      placeholder={""}
                    />
                  </div>
                  <div className="grid grid-cols-1 w-full">
                    <FormField
                      control={form.control}
                      name="faculty"
                      render={({ field }) => (
                        <FormItem>
                          <AppFormLabel
                            htmlFor="faculty"
                            label="คณะ"
                            required
                          />
                          <SelectComponent
                            createAble={false}
                            options={[]}
                            placeholder="เลือกคณะ"
                            {...field}
                          />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </form>
            </Form>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
