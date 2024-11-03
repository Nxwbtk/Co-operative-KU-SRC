"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ArrowLeftIcon, Loader2Icon, PencilIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { outstandingCreateSchema, TOutstandingCreateForm } from "./schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { InputFormField } from "@/components/input-form-field/input-field";
import { TOption } from "../../types";
import { SelectComponent } from "@/components/select";
import { AppFormLabel } from "@/components/shared/label";
import {
  createStdOutstanding,
  TCreateOutStanding,
} from "../_actions/create-std-outstanding";
import { postTypeOfAward } from "../_actions/create-type-of-award";
import { toast } from "sonner";
import { useOStdStore } from "@/lib/store/ostd-store";
import { CreateDialogBtnProps, TStudentFromSheet } from "../types";
import { updateOStd } from "../_actions/update-std-outstanding";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DialogTrigger } from "@radix-ui/react-dialog";

export const CreateEditOneDialog = (props: CreateDialogBtnProps) => {
  const {
    open,
    setOpen,
    isEdit,
    editData,
    isNewData = false,
    setNewData,
    newData,
    newDataList,
  } = props;
  const [allAward, allMajors] = useOStdStore((state) => [
    state.allAwards,
    state.allMajors,
  ]);
  const [typeOfOutstandingMode, setTypeOfOutstandingMode] = useState<
    "old" | "new"
  >("old");
  const [majorOptions, setMajorOptions] = useState<TOption[]>([]);
  const [typeOfAwardOptions, setTypeOfAwardOptions] = useState<TOption[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const form: UseFormReturn<TOutstandingCreateForm> =
    useForm<TOutstandingCreateForm>({
      resolver: zodResolver(outstandingCreateSchema),
      defaultValues: {
        honorific: isEdit ? editData?.honorific : "",
        firstName: isEdit ? editData?.first_name : "",
        lastName: isEdit ? editData?.last_name : "",
        major: isEdit
          ? {
              label: editData?.majorName,
              value: editData?.major_id,
            }
          : null,
        year: isEdit ? editData?.year : "",
        academicYear: isEdit
          ? (parseInt(editData!.academic_year) + 543).toString()
          : (new Date().getFullYear() + 543).toString(),
        typeOfOutstanding: isEdit
          ? {
              label: editData?.typeOfOutStandingName,
              value: editData?.type_of_award_id,
            }
          : null,
        newTypeOfOutstanding: "",
      },
    });
  useEffect(() => {
    const fetchMajor = () => {
      setMajorOptions(
        allMajors
          .filter((m) => m.name !== "อื่นๆ")
          .map((m) => ({
            label: m.name,
            value: m._id,
          }))
      );
      const option = [
        ...allAward
          .filter(
            (award) =>
              award.name !== "ศิษย์เก่าดีเด่น" &&
              award.name !== "ด้านอื่นๆ" &&
              award.name !== "ด้านใหม่"
          )
          .map((t: any) => ({
            label: t.name,
            value: t._id,
          })),
        {
          label: "ด้านใหม่",
          value: "other",
        },
      ];
      setTypeOfAwardOptions(option);
    };
    fetchMajor();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allAward, allMajors]);

  useEffect(() => {
    if (form.getValues("typeOfOutstanding") === null) {
      setTypeOfOutstandingMode("old");
      return;
    }
    if (
      form.getValues("typeOfOutstanding") &&
      form.getValues("typeOfOutstanding")!.value === "other"
    ) {
      setTypeOfOutstandingMode("new");
    } else {
      setTypeOfOutstandingMode("old");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.watch("typeOfOutstanding")]);

  const validateForm = (form: any, typeOfOutstandingMode: "old" | "new") => {
    const errors = [];

    if (form.getValues("major") === null) {
      errors.push({ field: "major", message: "กรุณาเลือกสาขา" });
    }
    if (
      typeOfOutstandingMode === "new" &&
      form.getValues("newTypeOfOutstanding") === ""
    ) {
      errors.push({ field: "newTypeOfOutstanding", message: "กรุณากรอกด้าน" });
    }
    if (
      typeOfOutstandingMode === "old" &&
      form.getValues("typeOfOutstanding") === null
    ) {
      errors.push({ field: "typeOfOutstanding", message: "กรุณาเลือกด้าน" });
    }

    errors.forEach((error) => {
      form.setError(error.field, { message: error.message });
    });

    return errors.length === 0;
  };

  const handleSave = async (data: TOutstandingCreateForm) => {
    setLoading(true);
    if (!validateForm(form, typeOfOutstandingMode)) {
      setLoading(false);
      return;
    }

    let body: TCreateOutStanding["payload"];
    if (typeOfOutstandingMode === "new") {
      const newTypeOfAward = await postTypeOfAward({
        name: data.newTypeOfOutstanding!,
        description: "",
      });
      if (!newTypeOfAward.data) {
        toast.error("เกิดข้อผิดพลาด");
        setLoading(false);
        return;
      }
      body = {
        honorific: data.honorific ?? "",
        first_name: data.firstName,
        last_name: data.lastName,
        major_id: data.major!.value,
        year: data.year,
        academic_year: (parseInt(data.academicYear) - 543).toString(),
        type_of_award_id: newTypeOfAward.data._id,
      };
    } else {
      body = {
        honorific: data.honorific ?? "",
        first_name: data.firstName,
        last_name: data.lastName,
        major_id: data.major!.value,
        year: data.year,
        academic_year: (parseInt(data.academicYear) - 543).toString(),
        type_of_award_id: data.typeOfOutstanding!.value,
      };
    }

    let res;
    if (isEdit) {
      res = await updateOStd({
        payload: body,
        id: editData!._id,
      });
    } else {
      res = await createStdOutstanding({ payload: body });
    }

    if (!res.data) {
      toast.error("เกิดข้อผิดพลาด");
      setLoading(false);
      return;
    }

    toast.success(isEdit ? "อัปเดตสำเร็จ" : "สร้างสำเร็จ");
    handleCancle();
  };

  const handleCancle = () => {
    form.reset();
    setOpen(!open);
    setLoading(false);
  };

  const handleEditNewData = (data: TOutstandingCreateForm) => {
    setLoading(true);
    if (!setNewData || !newData || !newDataList) {
      setLoading(false);
      return;
    }
    const updatedData: TStudentFromSheet = {
      _id: newData._id,
      honorific: data.honorific ?? "",
      firstName: data.firstName,
      lastName: data.lastName,
      major: data.major!.value,
      academic_year: (parseInt(data.academicYear) - 543).toString(),
      typeOfOutstanding: data.typeOfOutstanding!.value,
      year: data.year,
    };
    const updateList = newDataList.map((item) => {
      if (item._id === updatedData!._id) {
        return updatedData;
      }
      return item;
    });
    setNewData(updateList);
    handleCancle();
  };
  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        form.reset();
        setOpen(!open);
      }}
    >
      {isNewData && (
        <DialogTrigger asChild>
          <Button size="icon" variant="outline">
            <PencilIcon size={16} />
          </Button>
        </DialogTrigger>
      )}
      <DialogContent className="sm:max-w-[600px] w-[95vw] max-w-[95vw] sm:w-full h-auto max-h-[90vh] flex flex-col p-0 overflow-hidden">
        <DialogHeader className="p-6">
          <DialogTitle>
            <div className="text-lg font-semibold">
              {isEdit ? "แก้ไขรายการ" : "สร้างรายการ"}{" "}
            </div>
            <div className="text-sm text-gray-500">
              กรุณากรอกข้อมูลให้ครบถ้วน
            </div>
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="flex-grow px-6">
          <Form {...form}>
            <form
              className="flex flex-col gap-4"
              onSubmit={
                !isNewData
                  ? form.handleSubmit(handleSave)
                  : form.handleSubmit(handleEditNewData)
              }
            >
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
              <div className="grid grid-cols-2 gap-2 w-full">
                <div className="col-span-1">
                  <InputFormField
                    label="ชั้นปีที่"
                    name="year"
                    form={form}
                    min={1}
                    max={8}
                    type="number"
                    placeholder={""}
                    required
                  />
                </div>
                <div className="col-span-1">
                  <InputFormField
                    label="ปีการศึกษา"
                    name="academicYear"
                    type="number"
                    form={form}
                    placeholder={""}
                    required
                  />
                </div>
              </div>
              <div className="w-full">
                <FormField
                  control={form.control}
                  name="major"
                  render={({ field }) => (
                    <FormItem>
                      <AppFormLabel htmlFor="major" label="สาขา" required />
                      <SelectComponent
                        createAble={false}
                        options={majorOptions}
                        placeholder="เลือกสาขา"
                        {...field}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {typeOfOutstandingMode === "old" ? (
                <div className="w-full">
                  <FormField
                    control={form.control}
                    name="typeOfOutstanding"
                    render={({ field }) => (
                      <FormItem>
                        <AppFormLabel
                          htmlFor="typeOfOutstanding"
                          label="ด้าน"
                          required
                        />
                        <SelectComponent
                          createAble={false}
                          options={typeOfAwardOptions}
                          placeholder="เลือกด้าน"
                          {...field}
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              ) : (
                <div className="grid grid-cols-6 gap-2 items-end">
                  <div className="col-span-1">
                    <Button
                      size="icon"
                      type="button"
                      onClick={() => {
                        setTypeOfOutstandingMode("old");
                      }}
                    >
                      <ArrowLeftIcon size={16} />
                    </Button>
                  </div>
                  <div className="col-span-5 w-full">
                    <InputFormField
                      label="กรอกด้านใหม่"
                      name="newTypeOfOutstanding"
                      form={form}
                      placeholder={""}
                      required
                    />
                  </div>
                </div>
              )}
            </form>
          </Form>
        </ScrollArea>
        <DialogFooter className="p-6 mt-auto">
          <div className="flex flex-row sm:flex-row gap-2 w-full">
            <Button
              type="button"
              onClick={handleCancle}
              className="w-full sm:w-1/2"
              variant="outline"
            >
              ยกเลิก
            </Button>
            <Button
              type="submit"
              className="w-full sm:w-1/2"
              disabled={loading}
              onClick={
                !isNewData
                  ? form.handleSubmit(handleSave)
                  : form.handleSubmit(handleEditNewData)
              }
            >
              {/* {loading ? (
                  <Loader2Icon size={16} className="animate-spin mr-2" />
                ) : null} */}
              {loading ? (
                <Loader2Icon size={16} className="animate-spin mr-2" />
              ) : isEdit ? (
                "บันทึก"
              ) : (
                "สร้าง"
              )}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
