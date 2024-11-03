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
import { Loader2 } from "lucide-react";

export type TCreateMajorDialogProps = {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
};

export const CreateMajorDialog = () => {
  const [isOpen, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const form: UseFormReturn<MajorCreateInput> = useForm<MajorCreateInput>({
    resolver: zodResolver(majorCreateSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });
  const onSubmit = async (data: MajorCreateInput) => {
    setLoading(true);
    const res = await postMajor({ name: data.name, description: data.description });
    if (res.error) {
      toast.error("เกิดข้อผิดพลาด");
      setLoading(false);
      return;
    } else {
      toast.success("สร้างสาขาวิชาสำเร็จ");
      setOpen((prev) => !prev);
      setLoading(false);
    }
  };

  useEffect(() => {
    form.reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);
  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[#F5B21F] text-[#302782] hover:bg-[#f5b11f9d] px-3 py-2 text-sm sm:px-4 sm:py-2 sm:text-base w-full sm:w-auto">
          สร้างสาขาวิชา
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] w-[95vw] max-w-[95vw] sm:w-full">
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl font-semibold">สร้างสาขาวิชา</DialogTitle>
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
            <div className="flex lg:flex-row md:flex-row sm:flex-row gap-2 mt-4">
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
                {loading ? <Loader2 size={16} className="animate-spin" /> : "สร้าง"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
