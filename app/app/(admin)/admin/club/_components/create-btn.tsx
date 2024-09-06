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
import { createClubSchema, TCreateStdClubForm } from "./schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { AppFormLabel } from "@/components/shared/label";
import { SelectComponent } from "@/components/select";
import { useFacultyStore } from "@/lib/store/faculty-store";
import { ChangeEvent, useEffect, useState } from "react";
import { postStdClub } from "../_actions/post-std-club";
import { toast } from "sonner";
import { CameraIcon } from "lucide-react";
import { convertImgToText } from "@/lib/convert-img-to-text";
import { ScrollArea } from "@/components/ui/scroll-area";

export const CreateBtn = () => {
  const [faculty, allMajor] = useFacultyStore((state) => [
    state.faculty,
    state.allMajor,
  ]);
  const majorsOptions = allMajor.map((m) => ({
    label: m.name,
    value: m._id,
  }));
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const form: UseFormReturn<TCreateStdClubForm> = useForm<TCreateStdClubForm>({
    resolver: zodResolver(createClubSchema),
    defaultValues: {
      honorific: "",
      stdId: "",
      firstName: "",
      lastName: "",
      major: { label: "", value: "" },
      academicYear: (new Date().getFullYear() + 543).toString(),
      clubPosition: "",
      year: "1",
    },
  });

  const onSubmit = async (data: TCreateStdClubForm) => {
    let imgstr = "";
    if (file) {
      imgstr = await convertImgToText(file);
    }
    const payload = {
      firstName: data.firstName,
      lastName: data.lastName,
      faculty: faculty[0]._id,
      major: data.major.value,
      academicYear: (parseInt(data.academicYear) - 543).toString(),
      clubPosition: data.clubPosition,
      year: "1",
      img: imgstr,
      stdId: data.stdId ?? "",
      honorific: data.honorific ?? "",
    };
    const res = await postStdClub({ payload: payload });
    if (res.error) {
      toast.error("เกิดข้อผิดพลาด");
      return;
    } else {
      toast.success("เพิ่มสมาชิกสำเร็จ");
      onClose();
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
        <Button className="bg-[#F5B21F] text-[#302782] hover:bg-[#f5b11f9d]">
          เพิ่มสมาชิก
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] w-[95vw] max-w-[95vw] sm:w-full h-auto max-h-[90vh] flex flex-col p-0 overflow-hidden">
        <DialogHeader className="p-6">
          <DialogTitle>เพิ่มสมาชิกสโมสรนิสิต</DialogTitle>
        </DialogHeader>
        <div className="flex-grow overflow-y-auto px-6">
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 pb-6">
            <div className="flex flex-col items-center gap-4">
              <Avatar className="h-24 w-24 sm:h-28 sm:w-28">
                <AvatarImage src={image ?? ""} alt="" width={40} height={40} />
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
            </div>
            <div className="flex-1">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-4 gap-2">
                    <div className="col-span-1">
                      <InputFormField
                        label="คำนำหน้า"
                        name="honorific"
                        form={form}
                        placeholder={""}
                      />
                    </div>
                    <div className="col-span-3 sm:col-span-1.5">
                      <InputFormField
                        label="ชื่อ"
                        name="firstName"
                        form={form}
                        placeholder={""}
                        required
                      />
                    </div>
                    <div className="col-span-4 sm:col-span-1.5">
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
                      name="major"
                      render={({ field }) => (
                        <FormItem>
                          <AppFormLabel htmlFor="major" label="สาขา" required />
                          <SelectComponent
                            createAble={false}
                            options={majorsOptions}
                            placeholder="เลือกสาขา"
                            {...field}
                          />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <InputFormField
                      label="ปีการศึกษา"
                      name="academicYear"
                      form={form}
                      type="number"
                      placeholder={""}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    <div className="col-span-2">
                      <InputFormField
                        label="รหัสนิสิต"
                        name="stdId"
                        form={form}
                        type="number"
                        min={1}
                        placeholder={""}
                        required
                      />
                    </div>
                    <div className="col-span-4 sm:col-span-2">
                      <InputFormField
                        label="ตำแหน่งในสโมสรนิสิต"
                        name="clubPosition"
                        form={form}
                        placeholder={""}
                        required
                      />
                    </div>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </div>
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
