"use client";

import { InputFormField } from "@/components/input-form-field/input-field";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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
import { TEditUserData } from "./edit-user-btn";
import { putUser } from "../_actions/put-user";
import { ScrollArea } from "@/components/ui/scroll-area";
import { honorificOptions } from "../../club/_components/create-btn";

export const ROLE_OPTIONS = [
  { value: "default", label: "เลือกตำแหน่ง" },
  { value: "SUPER_ADMIN", label: "Super Admin" },
  { value: "ADMIN", label: "Admin" },
];

export type TCreateUserBtnProps = {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
  data?: TEditUserData;
  isEdit?: boolean;
};

export const CreateUserBtn = (props: TCreateUserBtnProps) => {
  const { isOpen, setOpen, data, isEdit } = props;
  const [image, setImage] = useState<string | null>(data?.image ?? null);
  const [file, setFile] = useState<File | null>(null);

  // ... (keep the rest of the state and functions as they are)
  useEffect(() => {
    if (data?.image) {
      setImage(data?.image);
    }
  }, [data?.image]);

  const form: UseFormReturn<TCreateUserForm> = useForm<TCreateUserForm>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      honorific: data?.honorific ? honorificOptions.find((h) => h.value === data.honorific) : honorificOptions[0],
      firstName: data?.firstName ?? "",
      lastName: data?.lastName ?? "",
      email: data?.email ?? "",
      role: isEdit
        ? data?.role.includes("SUPER_ADMIN")
          ? ROLE_OPTIONS[1]
          : ROLE_OPTIONS[2]
        : ROLE_OPTIONS[0],
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (body: TCreateUserForm) => {
    if (!isEdit) {
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!body.password) {
        form.setError("password", {
          type: "manual",
          message: "กรุณากรอกรหัสผ่าน",
        });
        return;
      }
      if (!passwordRegex.test(body.password)) {
        form.setError("password", {
          type: "manual",
          message:
            "รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัวอักษร และประกอบด้วยตัวอักษรพิมพ์เล็ก, ตัวอักษรพิมพ์ใหญ่, ตัวเลข และอักขระพิเศษ",
        });
        return;
      }
      if (!body.confirmPassword) {
        form.setError("confirmPassword", {
          type: "manual",
          message: "กรุณายืนยันรหัสผ่าน",
        });
        return;
      }
      if (!passwordRegex.test(body.confirmPassword)) {
        form.setError("confirmPassword", {
          type: "manual",
          message:
            "รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัวอักษร และประกอบด้วยตัวอักษรพิม์เล็ก, ตัวอักษรพิมพ์ใหญ่, ตัวเลข และอักขระพิเศษ",
        });
        return;
      }
      if (body.password !== body.confirmPassword) {
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
        honorific: body.honorific.value ?? "",
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        role:
          body.role.value === "SUPER_ADMIN"
            ? ["SUPER_ADMIN", "ADMIN"]
            : ["ADMIN"],
        password: body.password!,
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
    } else {
      if (form.getValues("role").value === "default") {
        form.setError("role", {
          type: "manual",
          message: "กรุณาเลือกตำแหน่ง",
        });
        return;
      }
      let imgstr = data?.image || "";
      if (file) {
        const newImage = await convertImgToText(file);
        imgstr = newImage !== imgstr ? newImage : imgstr;
      }
      const payload = {
        honorific: body.honorific.value ?? "",
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        role:
          body.role.value === "SUPER_ADMIN"
            ? ["SUPER_ADMIN", "ADMIN"]
            : ["ADMIN"],
        image: imgstr,
      };
      const res = await putUser({ payload: payload, id: data?._id! });
      if (res.error) {
        toast.error("เกิดข้อผิดพลาด");
        return;
      }
      toast.success("แก้ไขสมาชิกสำเร็จ");
      form.reset();
      setOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      form.reset();
      setImage(null);
      setFile(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

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
  console.log(data?.image)
  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => {
        form.reset();
        setOpen(!isOpen);
      }}
    >
      <DialogContent className="sm:max-w-[600px] w-[95vw] max-w-[95vw] sm:w-full h-[90vh] sm:h-auto max-h-[90vh] flex flex-col p-0 overflow-hidden">
        <DialogHeader className="p-6">
          <DialogTitle>{isEdit ? "แก้ไขสมาชิก" : "เพิ่มสมาชิก"}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="flex-grow px-6 overflow-y-auto">
          <div className="flex flex-col gap-6 pb-6">
            <div className="flex flex-col sm:flex-col gap-6 sm:gap-8">
              <div className="flex flex-col items-center gap-4">
                <Avatar className="h-24 w-24 sm:h-28 sm:w-28">
                  {/* <AvatarImage
                    src={image ?? data?.image ?? ""}
                    alt=""
                    width={40}
                    height={40}
                  /> */}
                  <AvatarImage src={data?.image === '' || !data?.image ? '/Whalel.png': data?.image} alt="" width={40} height={40} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
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
                <p className="text-sm text-gray-500">
                  รองรับเฉพาะไฟล์ .jpg และ .png เท่านั้น
                </p>
              </div>
              <div className="flex-1">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-6 gap-2">
                      <div className="col-span-2 sm:col-span-2 w-full">
                        <FormField
                          control={form.control}
                          name="honorific"
                          render={({ field }) => (
                            <FormItem>
                              <AppFormLabel
                                htmlFor="honorific"
                                label="คำนำหน้า"
                              />
                              <SelectComponent
                                createAble={false}
                                options={honorificOptions}
                                placeholder="เลือกคำนำหน้า"
                                {...field}
                              />
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="col-span-2 sm:col-span-1.5">
                        <InputFormField
                          label="ชื่อ"
                          name="firstName"
                          form={form}
                          placeholder={""}
                          required
                        />
                      </div>
                      <div className="col-span-2 sm:col-span-1.5">
                        <InputFormField
                          label="นามสกุล"
                          name="lastName"
                          form={form}
                          placeholder={""}
                          required
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
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
                              {...field}
                            />
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <InputFormField
                        label="อีเมล"
                        name="email"
                        form={form}
                        placeholder={""}
                        required
                      />
                    </div>
                    {!isEdit && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <InputFormField
                          label="รหัสผ่าน"
                          name="password"
                          form={form}
                          placeholder={""}
                          type="password"
                          required
                        />
                        <InputFormField
                          label="ยืนยันรหัสผ่าน"
                          name="confirmPassword"
                          form={form}
                          type="password"
                          placeholder={""}
                          required
                        />
                      </div>
                    )}
                  </form>
                </Form>
              </div>
            </div>
          </div>
        </ScrollArea>
        <DialogFooter className="p-6 mt-auto">
          <Button
            variant="outline"
            onClick={onClose}
            className="w-full sm:w-auto"
          >
            ยกเลิก
          </Button>
          <Button
            type="submit"
            className="w-full sm:w-auto bg-[#F5B21F] text-[#302782] hover:bg-[#f5b11f9d]"
            onClick={form.handleSubmit(onSubmit)}
          >
            บันทึก
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
