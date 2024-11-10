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
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
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
import Whale from "@/public/Whalel.png";
import Image from "next/image";
import { SelectScrollable } from "@/components/select/select.component";
import { convertChristYearToBuddhaYear } from "@/lib/convertChristYearToBuddhaYear";
import { TOptionsGroup } from "@/components/select/types";

export const NewDataOStdTable = (props: TNewDataTableProps) => {
  const { data, setData } = props;
  console.log(data);
  const [allOStdData, allMajors, allAward] = useOStdStore((state) => [
    state.allOStdData,
    state.allMajors,
    state.allAwards,
  ]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [selectedMajor, setSelectedMajor] = useState<string | null>(null);
  const [selectedClassYear, setSelectedClassYear] = useState<string | null>(
    null
  );
  const [selectedAcademicYear, setSelectedAcademicYear] = useState<
    string | null
  >(null);
  const [selectedAward, setSelectedAward] = useState<string | null>(null);
  const [majorOptions, setMajorOptions] = useState<TOptionsGroup>({
    label: "สาขา",
    options: [],
  });
  const [classYearOptions, setClassYearOptions] = useState<TOptionsGroup>({
    label: "ชั้นปี",
    options: [],
  });
  const [academicYearOptions, setAcademicYearOptions] = useState<TOptionsGroup>(
    {
      label: "ปีการศึกษา",
      options: [],
    }
  );
  const [awardOptions, setAwardOptions] = useState<any[]>([]);
  const [majorLoading, setMajorLoading] = useState(false);
  const [classYearLoading, setClassYearLoading] = useState(false);
  const [academicYearLoading, setAcademicYearLoading] = useState(false);
  const [awardLoading, setAwardLoading] = useState(false);
  // useEffect(() => {
  //   const uniqueClassYears = Array.from(
  //     new Set(data.map((item) => item.year))
  //   ).map((year) => ({
  //     value: year,
  //     label: year === "-1" ? "สำเร็จการศึกษาแล้ว" : `ชั้นปีที่ ${year}`,
  //   }));

  //   setClassYearOptions({
  //     label: "ชั้นปี",
  //     options: [{ value: "all", label: "ทั้งหมด" }, ...uniqueClassYears],
  //   });
  // }, [allOStdData]);
  useEffect(() => {
    setMajorLoading(true);
    if (allMajors.length > 0) {
      const sortedMajors = allMajors
        .filter((i) => !i.name.includes("อื่นๆ"))
        .map((major) => ({
          value: major._id,
          label: major.name,
        }))
        .sort((a, b) => a.label.localeCompare(b.label, "th"));

      setMajorOptions({
        label: "สาขา",
        options: [{ value: "all", label: "ทั้งหมด" }, ...sortedMajors],
      });
    }
    setMajorLoading(false);
  }, [allMajors]);
  useEffect(() => {
    setAcademicYearLoading(true);
    setClassYearLoading(true);
    const uniqueAcademicYears = Array.from(
      new Set(data.map((item) => item.academic_year))
    ).map((year) => ({
      value: year,
      label: convertChristYearToBuddhaYear(year),
    }));

    setAcademicYearOptions({
      label: "ปีการศึกษา",
      options: [{ value: "all", label: "ทั้งหมด" }, ...uniqueAcademicYears],
    });
    const uniqueClassYears = Array.from(
      new Set(data.map((item) => item.year))
    ).map((year) => ({
      value: year,
      label: year === "-1" ? "สำเร็จการศึกษาแล้ว" : `ชั้นปีที่ ${year}`,
    }));

    setClassYearOptions({
      label: "ชั้นปี",
      options: [{ value: "all", label: "ทั้งหมด" }, ...uniqueClassYears],
    });
    setAcademicYearLoading(false);
    setClassYearLoading(false);
  }, [data]);
  useEffect(() => {
    setAwardLoading(true);
    const awardOptions = allAward.map((item) => {
      return {
        value: item._id,
        label: item.name,
      };
    });

    setAwardOptions([{ value: "all", label: "ทั้งหมด" }, ...awardOptions]);
    setAwardLoading(false);
  }, [allAward]);
  const dataTableProps: IDataTableProps<any, any> = {
    columns: [
      {
        accessorKey: "index",
        header: ({ column }: any) => (
          <DataTableColumnHeader column={column} title="ลำดับที่" />
        ),
        cell: ({ row }: any) => <div>{row.index + 1}</div>,
        meta: {
          cellClassName: "w-auto",
        },
      },
      {
        accessorKey: "image",
        header: () => <div>รูปภาพ</div>,
        cell: ({ row }: any) => {
          const img = row.original.image === "" ? Whale : row.original.image;
          return (
            <div className="flex flex-row items-center gap-2">
              <Image
                src={img === "" ? Whale : img}
                width={50}
                height={50}
                alt="profile-img"
                className="rounded border border-[#F5B21F] object-cover w-full h-auto max-w-[50px] max-h-[50px]"
              />
            </div>
          );
        },
        meta: {
          cellClassName: "text-center",
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
        accessorKey: "major",
        header: ({ column }: any) => (
          <DataTableColumnHeader column={column} title="สาขา" />
        ),
        cell: ({ row }: any) => {
          const majorName = allMajors.find(
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
    data: !!filteredData
      ? filteredData.map((item, index) => {
          return {
            ...item,
            index: index + 1,
          };
        })
      : [],
    name: "new-data-club-table",
    options: {},
  };
  useEffect(() => {
    setFilteredData(
      data.filter((student) => {
        return (
          (selectedMajor === "all" ||
            !selectedMajor ||
            student?.major === selectedMajor) &&
          (selectedClassYear === "all" ||
            !selectedClassYear ||
            student?.year === selectedClassYear) &&
          (selectedAcademicYear === "all" ||
            !selectedAcademicYear ||
            student?.academic_year === selectedAcademicYear) &&
          (selectedAward === "all" ||
            !selectedAward ||
            student?.typeOfOutstanding === selectedAward)
        );
      })
    );
  }, [
    selectedMajor,
    selectedClassYear,
    selectedAcademicYear,
    selectedAward,
    allOStdData,
  ]);
  return (
    <Card className="sm:w-auto">
      <CardContent className="h-[calc(80vh-100px)]">
        {" "}
        {/* Set a fixed height */}
        <div className="flex flex-row gap-2">
          <div className="flex flex-col items-start justify-start">
            <span className="px-4 py-1 mb-2 text-base font-semibold text-white bg-[#302782] rounded-lg">
              กรองตามสาขา
            </span>
            {!majorLoading && (
            <SelectScrollable
              placeholder={"สาขา"}
              optionsGroup={[majorOptions]}
              onValueChange={(value) => setSelectedMajor(value)}
              defaultValue="all"
            />
            )}
          </div>
          <div className="flex flex-col items-start justify-start">
            <span className="px-4 py-1 mb-2 text-base font-semibold text-white bg-[#302782] rounded-lg">
              กรองตามชั้นปี
            </span>
            {!classYearLoading && (
            <SelectScrollable
              placeholder={"ชั้นปี"}
              optionsGroup={[classYearOptions]}
              onValueChange={(value) => setSelectedClassYear(value)}
              defaultValue="all"
            />
            )}
          </div>
          <div className="flex flex-col items-start justify-start">
            <span className="px-4 py-1 mb-2 text-base font-semibold text-white bg-[#302782] rounded-lg">
              กรองตามปีการศึกษา
            </span>
            {!academicYearLoading && (
            <SelectScrollable
              placeholder={"ปีการศึกษา"}
              optionsGroup={[academicYearOptions]}
              onValueChange={(value) => setSelectedAcademicYear(value)}
              defaultValue="all"
            />
            )}
          </div>
          <div className="flex flex-col items-start justify-start">
            <span className="px-4 py-1 mb-2 text-base font-semibold text-white bg-[#302782] rounded-lg">
              กรองตามรางวัล
            </span>
            {!awardLoading && (
            <SelectScrollable
              placeholder={"รางวัล"}
              optionsGroup={[{ label: "รางวัล", options: awardOptions }]}
              onValueChange={(value) => setSelectedAward(value)}
              defaultValue="all"
            />
            )}
          </div>
        </div>
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
          const newData: TStudentFromSheet[] = datafromsheet.map(
            (item: any) => {
              return {
                _id: uuid(),
                honorific: item["คำนำหน้า"] ?? "",
                firstName: item["ชื่อ"],
                lastName: item["นามสกุล"],
                major:
                  allMajor.find((m) => m.name === item["สาขา"].trim())?._id ??
                  allMajor.find((m) => m.name === "อื่นๆ")?._id!,
                academic_year: (parseInt(item["ปีการศึกษา"]) - 543).toString(),
                typeOfOutstanding:
                  allAward.find((a) => a.name === item["ประเภทรางวัล"].trim())
                    ?._id ?? allAward.find((a) => a.name === "ด้านอื่นๆ")?._id!,
                year: item["ชั้นปี"],
                image: item["รูปภาพ"] ?? "",
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
          image: item.image,
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
              placeholder="อัพโหลดไฟล์"
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
