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
import { LoaderCircleIcon, PencilIcon } from "lucide-react";
import { TScienceFacultyAndMajors } from "../club/_actions/types";
import { updateMajor } from "../_actions/update-major";
import { TGetAward } from "../outstanding-student/types";
import { updateAward } from "../_actions/update-award";

export type TCreateMajorDialogProps = {
  editData: TGetAward;
};

export const EditAwardDialog = (props: TCreateMajorDialogProps) => {
  const { editData } = props;
  const [isOpen, setOpen] = useState(false);
  const [loading, setIsloading] = useState<boolean>(false);
  const form: UseFormReturn<MajorCreateInput> = useForm<MajorCreateInput>({
    resolver: zodResolver(majorCreateSchema),
    defaultValues: {
      name: editData.name,
      description: editData.description,
    },
  });
  const onSubmit = async (data: MajorCreateInput) => {
    setIsloading(true);
    const res = await updateAward(
      {
        name: data.name,
        description: data.description,
      },
      { id: editData._id }
    );
    if (res.error) {
      toast.error("เกิดข้อผิดพลาด");
    } else {
      toast.success("เปลี่ยนแปลงรายละเอียดรางวัลสำเร็จ");
      setOpen(!isOpen);
      setIsloading(false);
    }
  };

  useEffect(() => {
    form.reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);
  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" onClick={() => setOpen(!isOpen)}>
          <PencilIcon size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>แก้ไขรางวัล</DialogTitle>
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
                onClick={() => setOpen(!isOpen)}
              >
                ยกเลิก
              </Button>
              <Button
                type="submit"
                className="w-full bg-[#F5B21F] text-[#302782] hover:bg-[#f5b11f9d]"
                disabled={loading}
              >
                {loading ? (
                  <LoaderCircleIcon className="animate-spin" size={16} />
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
