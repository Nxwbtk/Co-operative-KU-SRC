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
import {
  ChangeEvent,
  ChangeEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import { postNewSheetClub, postStdClub } from "../_actions/post-std-club";
import { toast } from "sonner";
import {
  CameraIcon,
  FileUpIcon,
  Loader2Icon,
  UserPlusIcon,
} from "lucide-react";
import { convertImgToText } from "@/lib/convert-img-to-text";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import * as XLSX from "xlsx";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable, IDataTableProps } from "@/components/shared/datatable";
import { DataTableColumnHeader } from "@/components/shared/datatable/data-table-column-header.component";
import { cx } from "class-variance-authority";
import { EditBtn } from "./edit-btn";
import { uuid } from "uuidv4";
import { DeleteBtn } from "./delete-btn";
import { TNewDataFromSheet } from "../_actions/types";

export type TCreateClubBtnProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export const CreateBtn = ({ open, setOpen }: TCreateClubBtnProps) => {
  const [faculty, allMajor] = useFacultyStore((state) => [
    state.faculty,
    state.allMajor,
  ]);
  const majorsOptions = allMajor.filter((m) => m.name !== "อื่นๆ").map((m) => ({
    label: m.name,
    value: m._id,
  }));
  // const [open, setOpen] = useState(false);
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
        setOpen(!open);
      }}
    >
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

export type TNewDataTableProps = {
  data: TNewDataFromSheet[];
  setData: (data: TNewDataFromSheet[]) => void;
};

export const NewDataTable = (props: TNewDataTableProps) => {
  const { data, setData } = props;
  const [faculty, allMajor] = useFacultyStore((state) => [
    state.faculty,
    state.allMajor,
  ]);
  const dataTableProps: IDataTableProps<any, any> = {
    columns: [
      {
        accessorKey: "img",
        header: () => null,
        cell: ({ row }: any) => {
          return (
            <Avatar>
              <AvatarImage src={row.original.img} />
              <AvatarFallback></AvatarFallback>
            </Avatar>
          );
        },
        meta: {
          cellClassName: "w-auto",
        },
      },
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
        accessorKey: "stdId",
        header: ({ column }: any) => (
          <DataTableColumnHeader column={column} title="รหัสนิสิต" />
        ),
        cell: ({ row }: any) => <div>{row.original.stdId}</div>,
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
        accessorKey: "clubPosition",
        header: ({ column }: any) => (
          <DataTableColumnHeader column={column} title="ตำแหน่งในชมรม" />
        ),
        cell: ({ row }: any) => <div>{row.original.clubPosition}</div>,
      },
      {
        accessorKey: "tools",
        header: () => <div>จัดการ</div>,
        cell: ({ row }: any) => {
          return (
            <div className="flex flex-row gap-2">
              <EditBtn
                data={row.original}
                isNewData
                newData={data}
                setData={setData}
              />
              <DeleteBtn
                id={row.original._id}
                isNewData
                data={data}
                setData={setData}
              />
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
      <CardContent className="h-[calc(80vh-100px)]"> {/* Set a fixed height */}
        <ScrollArea className="h-full">
          <div className="min-w-full">
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
  const [faculty, allMajor] = useFacultyStore((state) => [
    state.faculty,
    state.allMajor,
  ]);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [jsonData, setJsonData] = useState<TNewDataFromSheet[] | null>(null);
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
          const newData: TNewDataFromSheet[] = datafromsheet.map(
            (item: any) => {
              return {
                _id: uuid(),
                stdId: item["รหัส"] ?? "",
                honorific: item["คำนำหน้า"] ?? "",
                firstName: item["ชื่อ"],
                lastName: item["นามสกุล"],
                major:
                  allMajor.find((m) => m.name === item["สาขา"].trim())?._id ??
                  allMajor.find((m) => m.name === "อื่นๆ")?._id!,
                faculty: faculty[0]._id,
                academicYear: (parseInt(item["ปีการศึกษา"]) - 543).toString(),
                clubPosition: item["ตำแหน่ง"],
                img: item["รูปภาพ"] ?? "",
                year: "1",
              };
            }
          );
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
    setLoading(true);
    if (!jsonData) {
      return;
    }
    const res = await postNewSheetClub({ data: jsonData });
    if (res.error) {
      toast.error("เกิดข้อผิดพลาด");
      setLoading(false);
      return;
    } else {
      toast.success("เพิ่มสมาชิกสำเร็จ");
      clearData();
      setLoading(false);
      setOpen(false);
    }
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
          "max-w-[95vw] sm:max-w-[80vw] overflow-hidden": true,
          "w-full sm:w-[450px]": !jsonData,
          "w-full h-[90vh] sm:h-[80vh]": !!jsonData,
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
        <div className="flex-grow overflow-hidden">
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
                placeholder="อัพโหลดไฟล์"
                ref={fileInputRef}
                type="file"
                id="file-upload"
                className="hidden"
                accept=".xlsx,.xls"
                onChange={handleFileChange}
              />
            </div>
          ) : (
            <div className="h-full overflow-hidden">
              <NewDataTable data={jsonData} setData={setJsonData} />
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export const DropDownAddBtn = () => {
  const [openOne, setOpenOne] = useState(false);
  const [openDialogFile, setOpenDialogFile] = useState(false);
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="bg-[#F5B21F] text-[#302782] hover:bg-[#f5b11f9d]">
            สร้างสมาชิกสโมสรนิสิต
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
            <DropdownMenuItem
              className="flex flex-row justify-between hover:cursor-pointer"
              onClick={() => {
                setOpenDialogFile((prev) => !prev);
              }}
            >
              อัพโหลดไฟล์ <FileUpIcon size={16} />
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <CreateBtn open={openOne} setOpen={setOpenOne} />
      <DialogCreateFromFile open={openDialogFile} setOpen={setOpenDialogFile} />
      {/* <CreateEditOneDialog open={openOne} setOpen={setOpenOne} /> */}
    </>
  );
};
