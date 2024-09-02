"use client";

import { InputFormField } from "@/components/input-form-field/input-field";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { AppFormLabel } from "@/components/shared/label";
import { SelectComponent } from "@/components/select";
import { ChangeEvent, useEffect, useState } from "react";
import { toast } from "sonner";
import { CameraIcon } from "lucide-react";
import { convertImgToText } from "@/lib/convert-img-to-text";
import { createUserSchema } from "../schemas";
import { TCreateUserForm } from "../types";
import { postUser } from "../_actions/post-user";

export const ROLE_OPTIONS = [
  {
    value: "default",
    label: "เลือกตำแหน่ง",
  },
  {
    value: "SUPER_ADMIN",
    label: "ผู้จัดการระบบ",
  },
  {
    value: "ADMIN",
    label: "ผู้ดูแลระบบ",
  },
];

export const CreateUserBtn = () => {
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const form: UseFormReturn<TCreateUserForm> = useForm<TCreateUserForm>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      honorific: "",
      firstName: "",
      lastName: "",
      email: "",
      role: { value: "default", label: "เลือกตำแหน่ง" },
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: TCreateUserForm) => {
    if (data.password !== data.confirmPassword) {
      form.setError("confirmPassword", {
        type: "manual",
        message: "รหัสผ่านไม่ตรงกัน",
      });
      return;
    }
    if (form.getValues("role").value === "default") {
      form.setError("role", {
        type: "manual",
        message: "กรุณาเลือกตำแหน่ง",
      });
      return;
    }
    let imgstr = "";
    if (file) {
      imgstr = await convertImgToText(file);
    }
    const payload = {
      honorific: data.honorific ?? "",
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      role:
        data.role.value === "SUPER_ADMIN"
          ? ["SUPER_ADMIN", "ADMIN"]
          : ["ADMIN"],
      password: data.password,
      image: imgstr,
    };
    const res = await postUser({ payload: payload });
    if (res.error) {
      toast.error("เกิดข้อผิดพลาด");
      return;
    } else {
      toast.success("เพิ่มสมาชิกสำเร็จ");
      setOpen(false);
    }
  };

  useEffect(() => {
    if (open) {
      form.reset();
      setImage(null);
      setFile(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const onClose = () => {
    setOpen(false);
  };
  const handleChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    const maxSize = 4194304;
    const fileTarget = e.target.files && e.target.files[0];
    if (fileTarget) {
      if (fileTarget.size > maxSize) {
        toast.error("ไฟล์รูปภาพต้องมีขนาดไม่เกิน 4 MB");
        return;
      }
      if (fileTarget.type !== "image/jpeg" && fileTarget.type !== "image/png") {
        toast.error("ไฟล์รูปภาพต้องเป็นนามสกุล .jpg หรือ .png เท่านั้น");
        return;
      }

      const reader = new FileReader();

      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = function () {
          if (img.width > 1024 || img.height > 1024) {
            toast.error("ขนาดรูปภาพต้องไม่เกิน 1024 x 1024 พิกเซล");
            return;
          }
          setFile(fileTarget);
          setImage(event.target?.result as string);
        };
      };

      reader.readAsDataURL(fileTarget);
    }
  };
  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        form.reset();
        setOpen((prev) => !prev);
      }}
    >
      <DialogTrigger asChild>
        <Button className="bg-green-700 hover:bg-green-500">เพิ่มสมาชิก</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <div className="grid grid-cols-6 items-center">
          <div className="grid col-span-2">
            <div className="flex flex-col justify-center items-center gap-4">
              <div>
                <Avatar className="h-28 w-28">
                  <AvatarImage
                    src={image ?? ""}
                    alt=""
                    width={40}
                    height={40}
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>
              <div className="flex items-center justify-center">
                <label htmlFor="pic-profile">
                  <Button
                    type="button"
                    size="sm"
                    className="relative border-black"
                    variant="outline"
                  >
                    <div className="flex flex-row items-center gap-1">
                      <CameraIcon size={16} />
                      {image ? <span>เปลี่ยนรูป</span> : <span>เพิ่มรูป</span>}
                    </div>

                    <Input
                      accept="image/*"
                      type="file"
                      onChange={handleChangeFile}
                      className="absolute w-full h-full opacity-0"
                      id="pic-profile"
                    />
                  </Button>
                </label>
              </div>
            </div>
          </div>
          <div className="grid col-span-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex flex-col justify-center items-center gap-2 pb-4">
                  <div className="grid grid-cols-5 gap-2 w-full">
                    <div className="col-span-1">
                      <InputFormField
                        label="คำนำหน้า"
                        name="honorific"
                        form={form}
                        placeholder={""}
                      />
                    </div>
                    <div className="col-span-2">
                      <InputFormField
                        label="ชื่อ"
                        name="firstName"
                        form={form}
                        placeholder={""}
                        required
                      />
                    </div>
                    <div className="col-span-2">
                      <InputFormField
                        label="นามสกุล"
                        name="lastName"
                        form={form}
                        placeholder={""}
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-4 w-full gap-2 items-center">
                    <div className="grid col-span-2">
                      <FormField
                        control={form.control}
                        name="role"
                        render={({ field }) => (
                          <FormItem>
                            <AppFormLabel
                              htmlFor="role"
                              label="ตำแหน่ง"
                              required
                            />
                            <SelectComponent
                              createAble={false}
                              options={ROLE_OPTIONS}
                              placeholder="เลือกตำแหน่ง"
                              // isDisabled={majorOptions.length === 0}
                              {...field}
                            />
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid col-span-2">
                      <InputFormField
                        label="อีเมล"
                        name="email"
                        form={form}
                        placeholder={""}
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-4 w-full gap-2">
                    <div className="col-span-2">
                      <InputFormField
                        label="รหัสผ่าน"
                        name="password"
                        form={form}
                        placeholder={""}
                        type="password"
                        required
                      />
                    </div>
                    <div className="col-span-2">
                      <InputFormField
                        label="ยืนยันรหัสผ่าน"
                        name="confirmPassword"
                        form={form}
                        type="password"
                        placeholder={""}
                        required
                      />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={onClose}>
                    ยกเลิก
                  </Button>
                  <Button type="submit">บันทึก</Button>
                </DialogFooter>
              </form>
            </Form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
