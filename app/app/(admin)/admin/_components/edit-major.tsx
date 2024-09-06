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
import { toast } from "sonner";
import { LoaderCircleIcon, PencilIcon } from "lucide-react";
import { TScienceFacultyAndMajors } from "../club/_actions/types";
import { updateMajor } from "../_actions/update-major";

export type TEditMajorDialogProps = {
  editData: TScienceFacultyAndMajors["majorsAndId"][0];
};

export const EditMajorDialog = (props: TEditMajorDialogProps) => {
  const { editData } = props;
  const [isOpen, setOpen] = useState(false);
  const [loading, setIsLoading] = useState<boolean>(false);
  const form: UseFormReturn<MajorCreateInput> = useForm<MajorCreateInput>({
    resolver: zodResolver(majorCreateSchema),
    defaultValues: {
      name: editData.name,
      description: editData.description,
    },
  });

  const onSubmit = async (data: MajorCreateInput) => {
    setIsLoading(true);
    const res = await updateMajor(
      {
        name: data.name,
        description: data.description,
      },
      { id: editData._id }
    );
    if (res.error) {
      toast.error("เกิดข้อผิดพลาด");
    } else {
      toast.success("เปลี่ยนแปลงรายละเอียดสาขาวิชาสำเร็จ");
      setOpen(false);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (!isOpen) {
      form.reset({
        name: editData.name,
        description: editData.description,
      });
    }
  }, [isOpen, form, editData]);

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="icon" 
          className="w-8 h-8 p-1.5 sm:w-9 sm:h-9 sm:p-2"
          onClick={() => setOpen(true)}
        >
          <PencilIcon className="w-full h-full" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] w-[95vw] max-w-[95vw] sm:w-full">
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl font-semibold">แก้ไขสาขาวิชา</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            className="flex flex-col gap-4 mt-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <InputFormField
              label="ชื่อสาขาวิชา"
              name="name"
              form={form}
              placeholder={"กรอกชื่อสาขาวิชา"}
              required
              className="w-full"
            />
            <InputFormField
              label="คำอธิบาย"
              name="description"
              form={form}
              placeholder={"กรอกคำอธิบาย (ถ้ามี)"}
              isDescription
              className="w-full"
            />
            <div className="flex flex-col sm:flex-row gap-2 mt-4">
              <Button
                type="button"
                className="w-full sm:w-1/2"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                ยกเลิก
              </Button>
              <Button
                type="submit"
                className="w-full sm:w-1/2 bg-[#F5B21F] text-[#302782] hover:bg-[#f5b11f9d]"
                disabled={loading}
              >
                {loading ? (
                  <LoaderCircleIcon className="animate-spin mr-2" size={16} />
                ) : null}
                {loading ? "กำลังบันทึก..." : "บันทึก"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};