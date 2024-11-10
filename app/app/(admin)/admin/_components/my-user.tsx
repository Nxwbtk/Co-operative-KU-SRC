"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  CameraIcon,
  Loader2Icon,
  LogOutIcon,
  PencilLineIcon,
  UserPenIcon,
} from "lucide-react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { TMyProfileProps } from "../change-password/_components/types";
import { ChangeEvent, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TEditProfileDialogProps } from "../types";
import * as z from "zod";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputFormField } from "@/components/input-form-field/input-field";
import { Form } from "@/components/ui/form";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { convertImgToText } from "@/lib/convert-img-to-text";
import { updateUserProfile } from "../_actions/update-user";
import { editProfileSchema, TEditProfileForm } from "./schemas";
import { handleLogout } from "@/lib/logout-fn";

export const EditProfileDialog = (props: TEditProfileDialogProps) => {
  const { open, setOpen, editData } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const form: UseFormReturn<TEditProfileForm> = useForm<TEditProfileForm>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      honorific: editData.honorific,
      firstName: editData.firstName,
      lastName: editData.lastName,
      email: editData.email,
    },
  });
  const handleSubmit = async (data: TEditProfileForm) => {
    setIsLoading(true);
    let imgstr = editData.image;
    if (file) {
      const newImage = await convertImgToText(file);
      imgstr = newImage !== editData.image ? newImage : editData.image;
    }
    const payload = {
      ...data,
      image: imgstr,
    };
    const res = await updateUserProfile({ payload: payload });
    if (res.error) {
      toast.error("เกิดข้อผิดพลาด");
      setIsLoading(false);
      return;
    }
    toast.success("แก้ไขโปรไฟล์สำเร็จ");
    setIsLoading(false);
    setOpen(!open);
  };
  const fallbackProfile =
    editData.firstName.charAt(0).toUpperCase() +
    editData.lastName.charAt(0).toUpperCase();

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
  useEffect(() => {
    if (open) {
      form.reset();
      setImage(editData.image);
      setFile(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>แก้ไขโปรไฟล์</DialogTitle>
        </DialogHeader>
        <div className="w-full flex flex-col items-center">
          <Avatar className="w-40 h-40 border-4 border-white">
            {/* <AvatarImage src={image ?? ""} alt="avatar" /> */}
            <AvatarImage src={image === '' || !image ? '/Whalel.png': image!} alt="" width={40} height={40} />
            <AvatarFallback>{fallbackProfile}</AvatarFallback>
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
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex flex-col gap-2"
          >
            <InputFormField
              form={form}
              name="honorific"
              label="คำนำหน้า"
              placeholder=""
              required
            />
            <InputFormField
              form={form}
              name="firstName"
              label="ชื่อจริง"
              placeholder=""
              required
            />
            <InputFormField
              form={form}
              name="lastName"
              label="นามสกุล"
              placeholder=""
              required
            />
            <InputFormField
              form={form}
              name="email"
              label="อีเมล"
              placeholder=""
              required
            />
            <div className="flex flex-row gap-2 items-center justify-center mt-4">
              <Button
                className="w-full"
                variant="outline"
                type="reset"
                onClick={() => setOpen(!open)}
              >
                ยกเลิก
              </Button>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <Loader2Icon size={16} className="animate-spin" />
                ) : (
                  "บันทึก"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export const MyUser = (props: TMyProfileProps) => {
  const { data } = props;
  const router = useRouter();
  const [openEditProfile, setOpenEditProfile] = useState(false);
  const handleSignOut = async () => {
    signOut();
  };
  const handleChangePassword = () => {
    router.push("/admin/change-password");
  };
  const fallbackProfile =
    data.firstName.charAt(0).toUpperCase() +
    data.lastName.charAt(0).toUpperCase();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="hover:cursor-pointer">
        {/* <Button variant="outline"> */}
        <Avatar>
          <AvatarImage src={data.image} alt="avatar" />
          <AvatarFallback>{fallbackProfile}</AvatarFallback>
        </Avatar>
        {/* </Button> */}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 mr-10 ">
        <div className="w-full flex flex-col items-center">
          <Avatar className="w-40 h-40 border-4 border-white">
            <AvatarImage src={data.image} alt="avatar" />
            <AvatarFallback>{fallbackProfile}</AvatarFallback>
          </Avatar>
        </div>
        <div className="flex flex-col items-center mb-2">
          <h2 className="text-2xl font-bold mb-2">{`${data.honorific} ${data.firstName} ${data.lastName}`}</h2>
          <p className="text-gray-600 mb-2">{data.email}</p>
          <span className="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded">
            {data.role.includes("SUPER_ADMIN")
              ? "Super Admin"
              : "Admin"}
          </span>
        </div>
        <DropdownMenuGroup>
          <DropdownMenuItem
            className="gap-2 hover:cursor-pointer"
            onClick={() => setOpenEditProfile(true)}
          >
            <UserPenIcon size={16} />
            แก้ไขโปรไฟล์
          </DropdownMenuItem>
          <DropdownMenuItem
            className="gap-2 hover:cursor-pointer"
            onClick={handleChangePassword}
          >
            <PencilLineIcon size={16} />
            เปลี่ยนรหัสผ่าน
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={handleLogout}
            className="gap-2 hover:cursor-pointer text-red-500 hover:text-red-500"
          >
            <LogOutIcon size={16} />
            ออกจากระบบ
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
      <EditProfileDialog
        open={openEditProfile}
        setOpen={setOpenEditProfile}
        editData={data}
      />
    </DropdownMenu>
  );
};
