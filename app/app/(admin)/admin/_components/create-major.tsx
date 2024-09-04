"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { MajorCreateInput, majorCreateSchema } from "./schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { InputFormField } from "@/components/input-form-field/input-field";
import { postMajor } from "../_actions/create-major";
import { toast } from "sonner";

export type TCreateMajorDialogProps = {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
};

export const CreateMajorDialog = () => {
  const [isOpen, setOpen] = useState(false);
  const form: UseFormReturn<MajorCreateInput> = useForm<MajorCreateInput>({
    resolver: zodResolver(majorCreateSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });
  const onSubmit = async (data: MajorCreateInput) => {
    const res = await postMajor({ name: data.name, description: data.description });
    if (res.error) {
      toast.error("เกิดข้อผิดพลาด");
    } else {
      toast.success("สร้างสาขาวิชาสำเร็จ");
      setOpen((prev) => !prev);
    }
  };

  useEffect(() => {
    form.reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);
  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[#F5B21F] text-[#302782] hover:bg-[#f5b11f9d]">
          สร้างสาขาวิชา
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>สร้างสาขาวิชา</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            className="flex flex-col gap-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <InputFormField
              label="ชื่อสาขาวิชา"
              name="name"
              form={form}
              placeholder={""}
              required
            />
            <InputFormField
              label="คำอธิบาย"
              name="description"
              form={form}
              placeholder={""}
              isDescription
            />
            <div className="flex flex-row gap-2">
              <Button
                type="reset"
                className="w-full"
                variant="outline"
                onClick={() => setOpen((prev) => !prev)}
              >
                ยกเลิก
              </Button>
              <Button
                type="submit"
                className="w-full bg-[#F5B21F] text-[#302782] hover:bg-[#f5b11f9d]"
              >
                สร้าง
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
