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
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
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
import { TOutStandingData } from "../types";
import { updateOStd } from "../_actions/update-std-outstanding";
import { ScrollArea } from "@/components/ui/scroll-area";
import * as XLSX from "xlsx";
import { uuid } from "uuidv4";
import { TNewDataFromSheet } from "../../club/_actions/types";
import { TCreateClubBtnProps } from "../../club/_components/create-btn";
import { useFacultyStore } from "@/lib/store/faculty-store";
import { cx } from "class-variance-authority";
import { DataTable, IDataTableProps } from "@/components/shared/datatable";
import { DataTableColumnHeader } from "@/components/shared/datatable/data-table-column-header.component";
import { Card, CardContent } from "@/components/ui/card";


export type CreateDialogBtnProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  isEdit?: boolean;
  editData?: TOutStandingData;
};

export const CreateEditOneDialog = (props: CreateDialogBtnProps) => {
  const { open, setOpen, isEdit, editData } = props;
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
          ? { label: editData?.majorName, value: editData?.major_id }
          : null,
        year: isEdit ? editData?.year : "1",
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
        allMajors.map((m) => ({
          label: m.name,
          value: m._id,
        }))
      );
      const option = [
        ...allAward.map((t: any) => ({
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
  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        form.reset();
        setOpen(!open);
      }}
    >
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
              onSubmit={form.handleSubmit(handleSave)}
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
                      label="กรอกด้านอื่นๆ"
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
              onClick={form.handleSubmit(handleSave)}
            >
              {loading ? (
                <Loader2Icon size={16} className="animate-spin mr-2" />
              ) : null}
              {loading ? "กำลังบันทึก..." : isEdit ? "บันทึก" : "สร้าง"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export type TStudentFromSheet = {
  _id: string;
  honorific: string;
  firstName: string;
  lastName: string;
  major: string;
  academicYear: string;
  typeOfOutstanding: string;
  year: string;
};

export type TNewDataTableProps = {
  data: TStudentFromSheet[];
  setData: (data: TStudentFromSheet[]) => void;
};

export const NewDataOStdTable = (props: TNewDataTableProps) => {
  const { data, setData } = props;
  const [allAward, allMajor] = useOStdStore((state) => [
    state.allAwards,
    state.allMajors,
  ]);
  const dataTableProps: IDataTableProps<any, any> = {
    columns: [
      {
        accessorKey: "name",
        header: ({ column }: any) => (
          <DataTableColumnHeader column={column} title="ชื่อ" />
        ),
        cell: ({ row }: any) => (
          <div>
            {row.original.honorific}
            {row.original.firstName} {row.original.lastName}
          </div>
        ),
        meta: {
          cellClassName: "text-start",
          headerClassName: "text-start",
        },
      },
      {
        accessorKey: "major",
        header: ({ column }: any) => (
          <DataTableColumnHeader column={column} title="สาขา" />
        ),
        cell: ({ row }: any) => {
          const majorName = allMajor.find(
            (item) => item._id === row.original.major
          )?.name;
          return <div>{majorName}</div>;
        },
      },
      {
        accessorKey: "typeOfOutstanding",
        header: ({ column }: any) => (
          <DataTableColumnHeader column={column} title="ประเภทรางวัล" />
        ),
        cell: ({ row }: any) => {
          const awardName = allAward.find(
            (item) => item._id === row.original.typeOfOutstanding
          )?.name;
          return <div>{awardName}</div>;
        },
      },
      {
        accessorKey: "academicYear",
        header: ({ column }: any) => (
          <DataTableColumnHeader column={column} title="ปีการศึกษา" />
        ),
        cell: ({ row }: any) => <div>{row.original.academicYear}</div>,
      },
      {
        accessorKey: "tools",
        header: () => <div>จัดการ</div>,
        cell: ({ row }: any) => {
          return (
            <div className="flex flex-row gap-2">
              
            </div>
          );
        },
      },
    ],
    data: !!data ? data : [],
    name: "new-data-club-table",
    options: {},
  };
  return (
    <Card className="sm:w-auto">
      <CardContent className="max-h">
        <ScrollArea className="h-full">
          <div className="overflow-x-auto">
            <DataTable {...dataTableProps} />
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};


export const DialogCreateFromFile = ({
  open,
  setOpen,
}: TCreateClubBtnProps) => {
  const [allAward, allMajor] = useOStdStore((state) => [
    state.allAwards,
    state.allMajors,
  ]);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [jsonData, setJsonData] = useState<TStudentFromSheet[] | null>(null);
  const handleDivClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      return;
    }
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target?.result;
        if (data) {
          const workbook = XLSX.read(data, { type: "binary" });
          // SheetName
          const sheetName = workbook.SheetNames[0];
          // Worksheet
          const workSheet = workbook.Sheets[sheetName];
          // Json
          const datafromsheet = XLSX.utils.sheet_to_json(workSheet);
          const newData: TStudentFromSheet[] = datafromsheet.map(
            (item: any) => {
              return {
                _id: uuid(),
                honorific: item["คำนำหน้า"],
                firstName: item["ชื่อ"],
                lastName: item["นามสกุล"],
                major:
                  allMajor.find((m) => m.name === item["สาขา"])?._id ??
                  allMajor.find((m) => m.name === "อื่นๆ")?._id!,
                academicYear: (parseInt(item["ปีการศึกษา"]) - 543).toString(),
                typeOfOutstanding:
                  allAward.find((a) => a.name === item["ประเภทรางวัล"])?._id ??
                  allAward.find((a) => a.name === "ด้านอื่นๆ")?._id!,
                year: item["ชั้นปี"],
              };
            }
          );
          console.log(newData);
          setJsonData(newData);
        }
      };
      reader.readAsBinaryString(file);
    }
  };
  const clearData = () => {
    setJsonData(null);
  };

  const handleSaveData = async () => {
    // setLoading(true);
    // if (!jsonData) {
    //   return;
    // }
    // const res = await postNewSheetClub({ data: jsonData });
    // if (res.error) {
    //   toast.error("เกิดข้อผิดพลาด");
    //   setLoading(false);
    //   return;
    // } else {
    //   toast.success("เพิ่มสมาชิกสำเร็จ");
    //   clearData();
    //   setLoading(false);
    //   setOpen(false);
    // }
  };
  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        setJsonData(null);
        setOpen(!open);
      }}
    >
      <DialogContent
        className={cx({
          "max-w-[95vw] sm:max-w-[80vw] max-h-[90vh] sm:max-h-[80vh] overflow-hidden":
            true,
          "w-full sm:w-[450px]": !jsonData,
          "w-full": !!jsonData,
        })}
      >
        <DialogHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-2 sm:p-4">
          <DialogTitle className="mb-2 sm:mb-0">อัพโหลดไฟล์</DialogTitle>
          {jsonData && (
            <div className="flex flex-row gap-2 mt-2 sm:mt-0">
              <Button
                onClick={clearData}
                variant="destructive"
                className="text-xs sm:text-sm"
              >
                ล้างข้อมูล
              </Button>
              <Button
                onClick={handleSaveData}
                disabled={loading}
                className="text-xs sm:text-sm"
              >
                {loading ? (
                  <Loader2Icon className="animate-spin" size={16} />
                ) : (
                  "บันทึกข้อมูล"
                )}
              </Button>
            </div>
          )}
        </DialogHeader>
        {!jsonData ? (
          <div className="relative p-2 sm:p-4">
            <div
              className="w-full h-[100px] sm:h-[150px] text-center border border-dashed border-[#302782] rounded-md flex flex-col sm:flex-row justify-center items-center cursor-pointer gap-2 hover:bg-gray-50"
              onClick={handleDivClick}
            >
              <FileUpIcon size={16} />
              <p className="text-sm sm:text-base">คลิกเพื่ออัพโหลดไฟล์</p>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              id="file-upload"
              className="hidden"
              accept=".xlsx,.xls"
              onChange={handleFileChange}
            />
          </div>
        ) : (
          // <NewDataTable data={jsonData} setData={setJsonData} />
          <NewDataOStdTable data={jsonData} setData={setJsonData} />
        )}
      </DialogContent>
    </Dialog>
  );
};

export const CreateBtn = () => {
  const [openOne, setOpenOne] = React.useState(false);
  const [openMulti, setOpenMulti] = React.useState(false);
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="bg-[#F5B21F] text-[#302782] hover:bg-[#f5b11f9d]">
            สร้างสมาชิกนิสิตดีเด่น
          </Button>
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
            <DropdownMenuItem className="flex flex-row justify-between hover:cursor-pointer" onClick={() => setOpenMulti(prev => !prev)}>
              อัพโหลดไฟล์ <FileUpIcon size={16} />
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <CreateEditOneDialog open={openOne} setOpen={setOpenOne} />
      <DialogCreateFromFile open={openMulti} setOpen={setOpenMulti} />
    </>
  );
};
