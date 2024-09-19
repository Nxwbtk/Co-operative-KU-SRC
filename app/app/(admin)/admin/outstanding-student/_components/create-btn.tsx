"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
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
import { FileUpIcon, Loader2Icon, UserPlusIcon } from "lucide-react";
import React, { ChangeEvent, useRef, useState } from "react";
import { toast } from "sonner";
import { useOStdStore } from "@/lib/store/ostd-store";
import { TNewDataTableProps, TStudentFromSheet } from "../types";
import { ScrollArea } from "@/components/ui/scroll-area";
import * as XLSX from "xlsx";
import { uuid } from "uuidv4";
import { TCreateClubBtnProps } from "../../club/_components/create-btn";
import { cx } from "class-variance-authority";
import { DataTable, IDataTableProps } from "@/components/shared/datatable";
import { DataTableColumnHeader } from "@/components/shared/datatable/data-table-column-header.component";
import { Card, CardContent } from "@/components/ui/card";
import {
  postNewSheetOStd,
  TPostNewSheetOStdPayload,
} from "../_actions/post-newsheet-ostd";
import { DeleteOStdBtn } from "./delete-ostd";
import { CreateEditOneDialog } from "./create-edit-dialog";

export const NewDataOStdTable = (props: TNewDataTableProps) => {
  const { data, setData } = props;
  const [allAward, allMajor] = useOStdStore((state) => [
    state.allAwards,
    state.allMajors,
  ]);
  const [openEdit, setOpenEdit] = useState(false);
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
        accessorKey: "year",
        header: ({ column }: any) => (
          <DataTableColumnHeader column={column} title="ชั้นปีที่" />
        ),
        cell: ({ row }: any) => <div>{row.original.year}</div>,
      },
      {
        accessorKey: "academicYear",
        header: ({ column }: any) => (
          <DataTableColumnHeader column={column} title="ปีการศึกษา" />
        ),
        cell: ({ row }: any) => (
          <div>{parseInt(row.original.academic_year) + 543}</div>
        ),
      },
      {
        accessorKey: "tools",
        header: () => <div>จัดการ</div>,
        cell: ({ row }: any) => {
          const editData = {
            _id: row.original._id,
            honorific: row.original.honorific,
            first_name: row.original.firstName,
            last_name: row.original.lastName,
            major_id: row.original.major,
            academic_year: row.original.academicYear,
            type_of_award_id: row.original.typeOfOutstanding,
            majorName:
              allMajor.find((m) => m._id === row.original.major)?.name || "",
            year: row.original.year,
            typeOfOutStandingName:
              allAward.find((a) => a._id === row.original.typeOfOutstanding)
                ?.name || "",
          };
          return (
            <div className="flex flex-row gap-2">
              <DeleteOStdBtn
                id={row.original._id}
                isNewData
                newData={data}
                setNewData={setData}
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
      <CardContent className="h-[calc(80vh-100px)]">
        {" "}
        {/* Set a fixed height */}
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
          console.log(datafromsheet);
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
                academic_year: (parseInt(item["ปีการศึกษา"]) - 543).toString(),
                typeOfOutstanding:
                  allAward.find((a) => a.name === item["ประเภทรางวัล"].trim())
                    ?._id ?? allAward.find((a) => a.name === "ด้านอื่นๆ")?._id!,
                year: item["ชั้นปี"],
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
    const newPayload: TPostNewSheetOStdPayload["data"] = jsonData.map(
      (item) => {
        return {
          honorific: item.honorific,
          first_name: item.firstName,
          last_name: item.lastName,
          major_id: item.major,
          year: item.year,
          academic_year: item.academic_year,
          type_of_award_id: item.typeOfOutstanding,
        };
      }
    );
    const res = await postNewSheetOStd({ data: newPayload });
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
            <DropdownMenuItem
              className="flex flex-row justify-between hover:cursor-pointer"
              onClick={() => setOpenMulti((prev) => !prev)}
            >
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
