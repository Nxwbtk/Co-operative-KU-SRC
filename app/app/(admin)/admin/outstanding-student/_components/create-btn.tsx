"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ArrowLeftIcon,
  FileUpIcon,
  Loader2Icon,
  UserPlusIcon,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { outstandingCreateSchema, TOutstandingCreateForm } from "./schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { InputFormField } from "@/components/input-form-field/input-field";
import { TOption } from "../../types";
import { getScienceFacultyMajors } from "../../club/_actions/get-science-faculty-majors";
import { SelectComponent } from "@/components/select";
import { AppFormLabel } from "@/components/shared/label";
import { getTypeOfAward } from "../_actions/get-type-of-award";
import {
  createStdOutstanding,
  TCreateOutStanding,
} from "../_actions/create-std-outstanding";
import { postTypeOfAward } from "../_actions/create-type-of-award";
import { toast } from "sonner";

export type CreateDialogBtnProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export const CreateOneDialog = (props: CreateDialogBtnProps) => {
  const { open, setOpen } = props;
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
        honorific: "",
        firstName: "",
        lastName: "",
        major: null,
        year: "1",
        academicYear: (new Date().getFullYear() + 543).toString(),
        typeOfOutstanding: null,
        newTypeOfOutstanding: "",
      },
    });
  useEffect(() => {
    const fetchMajor = async () => {
      if (majorOptions.length !== 0 && typeOfAwardOptions.length !== 0) {
        return;
      }
      const res = await getScienceFacultyMajors();
      if (!res.data) {
        return;
      }
      setMajorOptions(
        res.data.majorsAndId.map((m) => ({
          label: m.name,
          value: m._id,
        }))
      );
      if (typeOfAwardOptions.length !== 0) {
        return;
      }
      const typeOfAwardRes = await getTypeOfAward();
      if (!typeOfAwardRes.data) {
        return;
      }
      const option = [
        ...typeOfAwardRes.data.map((t: any) => ({
          label: t.name,
          value: t._id,
        })),
        {
          label: "อื่นๆ",
          value: "other",
        },
      ];
      setTypeOfAwardOptions(option);
    };
    fetchMajor();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const handleSubmit = async (data: TOutstandingCreateForm) => {
    setLoading(true);
    if (!validateForm(form, typeOfOutstandingMode)) {
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
        return;
      }
      body = {
        honorific: data.honorific ?? "",
        firstName: data.firstName,
        lastName: data.lastName,
        majorId: data.major!.value,
        year: data.year,
        academicYear: (parseInt(data.academicYear) - 543).toString(),
        typeOfOutstanding: newTypeOfAward.data._id,
      };
    } else {
      body = {
        honorific: data.honorific ?? "",
        firstName: data.firstName,
        lastName: data.lastName,
        majorId: data.major!.value,
        year: data.year,
        academicYear: (parseInt(data.academicYear) - 543).toString(),
        typeOfOutstanding: data.typeOfOutstanding!.value,
      };
    }
    const res = await createStdOutstanding({ payload: body });
    if (!res.data) {
      toast.error("เกิดข้อผิดพลาด");
      setLoading(false);
      return;
    }
    toast.success("สร้างสำเร็จ");
    handleCancle();
  };

  const handleCancle = () => {
    form.reset();
    setOpen(!open);
    setLoading(false);
  };
  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        form.reset();
        setOpen(!open);
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <div className="text-lg font-semibold">สร้างรายการ</div>
            <div className="text-sm text-gray-500">
              กรุณากรอกข้อมูลให้ครบถ้วน
            </div>
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            className="flex flex-col gap-2"
            onSubmit={form.handleSubmit(handleSubmit)}
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
                      // isDisabled={majorOptions.length === 0}
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
                        // isDisabled={majorOptions.length === 0}
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
                    label="กรอกด้านอื่นๆ"
                    name="newTypeOfOutstanding"
                    form={form}
                    placeholder={""}
                    required
                  />
                </div>
              </div>
            )}
            <DialogFooter className="flex flex-row gap-2 justify-center">
              <Button
                type="reset"
                onClick={handleCancle}
                className="w-full"
                variant="outline"
              >
                ยกเลิก
              </Button>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <Loader2Icon size={16} className="animate-spin" />
                ) : (
                  "สร้าง"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export const CreateBtn = () => {
  const [openOne, setOpenOne] = React.useState(false);
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button>สร้าง</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuItem
              className="flex flex-row justify-between hover:cursor-pointer"
              onClick={() => {
                setOpenOne(true);
              }}
            >
              สร้างรายการ <UserPlusIcon size={16} />
            </DropdownMenuItem>
            <DropdownMenuItem className="flex flex-row justify-between hover:cursor-pointer">
              อัพโหลดไฟล์ <FileUpIcon size={16} />
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <CreateOneDialog open={openOne} setOpen={setOpenOne} />
    </>
  );
};
