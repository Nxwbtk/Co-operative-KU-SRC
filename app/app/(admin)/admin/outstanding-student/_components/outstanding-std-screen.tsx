"use client";
import { useRouter } from "next/navigation";
import { CreateBtn } from "./create-btn";
import { useOStdStore } from "@/lib/store/ostd-store";
import { convertChristYearToBuddhaYear } from "@/lib/convertChristYearToBuddhaYear";
import { DeleteOStdBtn } from "./delete-ostd";
import { EditBtn } from "./edit-btn";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Whale from "@/public/Whalel.png";
import Image from "next/image";
import { DataTable, IDataTableProps } from "@/components/shared/datatable";
import { DataTableColumnHeader } from "@/components/shared/datatable/data-table-column-header.component";
import { ChangeDefaultImageButton } from "../../_components/change-default";
import { useEffect, useMemo, useState } from "react";
import { SelectScrollable } from "@/components/select/select.component";
import { TOptionsGroup } from "@/components/select/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const OutStandingNisitAdminScreen = () => {
  const router = useRouter();
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
  const [majorLoading, setMajorLoading] = useState<boolean>(false);
  const [classYearLoading, setClassYearLoading] = useState<boolean>(false);
  const [academicYearLoading, setAcademicYearLoading] = useState<boolean>(false);
  const [awardLoading, setAwardLoading] = useState<boolean>(false);
  useEffect(() => {
    setClassYearLoading(true);
    const uniqueClassYears = Array.from(
      new Set(allOStdData.map((item) => item.year))
    ).map((year) => ({
      value: year,
      label: year === "-1" ? "สำเร็จการศึกษาแล้ว" : `ชั้นปีที่ ${year}`,
    }));

    setClassYearOptions({
      label: "ชั้นปี",
      options: [{ value: "all", label: "ทั้งหมด" }, ...uniqueClassYears],
    });
    setClassYearLoading(false);
  }, [allOStdData]);
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
    const uniqueAcademicYears = Array.from(
      new Set(allOStdData.map((item) => item.academic_year))
    ).map((year) => ({
      value: year,
      label: convertChristYearToBuddhaYear(year),
    }));

    setAcademicYearOptions({
      label: "ปีการศึกษา",
      options: [{ value: "all", label: "ทั้งหมด" }, ...uniqueAcademicYears],
    });
    setAcademicYearLoading(false);
  }, [allOStdData]);
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
  const dataList = useMemo(() => {
    return allOStdData.map((item, index) => {
      return {
        ...item,
        index: index + 1,
      };
    });
  }, [allOStdData]);
  const dataTableProps: IDataTableProps<any, any> = {
    columns: [
      {
        accessorKey: "index",
        header: ({ column }: any) => (
          <DataTableColumnHeader column={column} title="ลำดับที่" />
        ),
        cell: ({ row }: any) => {
          return (
            <>
              <div className="flex flex-row items-center gap-4">
                {row.original.index}{" "}
                <Avatar>
                  {/* <AvatarImage src={row.original.image} /> */}
                  <AvatarImage
                    src={
                      row.original.img === "" || !row.original.img
                        ? "/Whalel.png"
                        : row.original.img!
                    }
                    alt=""
                    width={40}
                    height={40}
                  />
                  <AvatarFallback></AvatarFallback>
                </Avatar>
              </div>
              {/* <Avatar>
                <AvatarImage
                  src={
                    row.original.image === "" || !row.original.image
                      ? "/Whalel.png"
                      : row.original.image!
                  }
                  alt=""
                  width={40}
                  height={40}
                />
                <AvatarFallback></AvatarFallback>
              </Avatar> */}
            </>
          );
        },
        meta: {
          cellClassName: "w-auto",
        },
      },
      {
        accessorKey: "first_name",
        header: ({ column }: any) => (
          <DataTableColumnHeader column={column} title="ชื่อ" />
        ),
        cell: ({ row }: any) => (
          <div className="w-[175px] overflow-hidden">
            {row.original.honorific}
            {row.original.first_name} {row.original.last_name}
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
          return (
            <div className="w-[150px] overflow-hidden break-words whitespace-normal">
              {row.original.majorName}
            </div>
          );
        },
      },
      {
        accessorKey: "year",
        header: ({ column }: any) => (
          <DataTableColumnHeader column={column} title="ชั้นปี" />
        ),
        cell: ({ row }: any) => (
          <div>{row.original.year === "-1" ? "-" : row.original.year}</div>
        ),
      },
      {
        accessorKey: "academic_year",
        header: ({ column }: any) => (
          <DataTableColumnHeader column={column} title="ปีการศึกษา" />
        ),
        cell: ({ row }: any) => (
          <div className="w-[50px]">
            {convertChristYearToBuddhaYear(row.original.academic_year)}
          </div>
        ),
        meta: {
          headerClassName: "w-[50px]",
        },
      },
      {
        accessorKey: "typeOfOutStandingName",
        header: ({ column }: any) => (
          <DataTableColumnHeader column={column} title="รางวัล" />
        ),
        cell: ({ row }: any) => <div>{row.original.typeOfOutStandingName}</div>,
      },
      {
        accessorKey: "tools",
        header: () => <div>จัดการ</div>,
        cell: ({ row }: any) => {
          return (
            <div className="flex flex-row gap-2">
              <EditBtn data={row.original} />
              <DeleteOStdBtn
                id={row.original._id}
                name={row.original.first_name}
              />
            </div>
          );
        },
      },
    ],
    data: filteredData
      .sort((a, b) => {
        const dateA = a?.updatedAt ? new Date(a.updatedAt).getTime() : 0;
        const dateB = b?.updatedAt ? new Date(b.updatedAt).getTime() : 0;
        return dateB - dateA;
      })
      .map((item, index) => {
        return {
          ...item,
          index: index + 1,
        };
      }),
    name: "data-club-table",
    options: {},
  };
  const handleBack = () => {
    router.push("/admin");
  };
  useEffect(() => {
    setFilteredData(
      allOStdData.filter((student) => {
        return (
          (selectedMajor === "all" ||
            !selectedMajor ||
            student?.major_id === selectedMajor) &&
          (selectedClassYear === "all" ||
            !selectedClassYear ||
            student?.year === selectedClassYear) &&
          (selectedAcademicYear === "all" ||
            !selectedAcademicYear ||
            student?.academic_year === selectedAcademicYear) &&
          (selectedAward === "all" ||
            !selectedAward ||
            student?.type_of_award_id === selectedAward)
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
    // <div className="flex flex-col items-center w-full p-4 sm:p-6">
    <Card>
      <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 p-4 sm:p-6">
        <CardTitle className="text-xl sm:text-2xl font-semibold">
          นิสิตดีเด่น
        </CardTitle>
        <div className="flex flex-row gap-2">
          <ChangeDefaultImageButton />
          <CreateBtn />
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <div className="flex flex-col sm:flex-row gap-4 w-full">
          <div className="flex flex-col items-start justify-start w-full sm:w-auto">
            <span className="px-4 py-1 mb-2 text-base font-semibold text-white bg-[#302782] rounded-lg whitespace-nowrap">
              กรองตามสาขา
            </span>
            {!majorLoading && (
            <div className="w-full">
              <SelectScrollable
                placeholder="สาขา"
                optionsGroup={[majorOptions]}
                onValueChange={(value) => setSelectedMajor(value)}
                defaultValue="all"
              />
            </div>
            )}
          </div>

          <div className="flex flex-col items-start justify-start w-full sm:w-auto">
            <span className="px-4 py-1 mb-2 text-base font-semibold text-white bg-[#302782] rounded-lg whitespace-nowrap">
              กรองตามชั้นปี
            </span>
            {!classYearLoading && (
            <div className="w-full">
              <SelectScrollable
                placeholder="ชั้นปี"
                optionsGroup={[classYearOptions]}
                onValueChange={(value) => setSelectedClassYear(value)}
                defaultValue="all"
              />
            </div>
            )}
          </div>

          <div className="flex flex-col items-start justify-start w-full sm:w-auto">
            <span className="px-4 py-1 mb-2 text-base font-semibold text-white bg-[#302782] rounded-lg whitespace-nowrap">
              กรองตามปีการศึกษา
            </span>
            {!academicYearLoading && (
            <div className="w-full">
              <SelectScrollable
                placeholder="ปีการศึกษา"
                optionsGroup={[academicYearOptions]}
                onValueChange={(value) => setSelectedAcademicYear(value)}
                defaultValue="all"
              />
            </div>
            )}
          </div>

          <div className="flex flex-col items-start justify-start w-full sm:w-auto">
            <span className="px-4 py-1 mb-2 text-base font-semibold text-white bg-[#302782] rounded-lg whitespace-nowrap">
              กรองตามรางวัล
            </span>
            {!awardLoading && (
            <div className="w-full">
              <SelectScrollable
                placeholder="รางวัล"
                optionsGroup={[{ label: "รางวัล", options: awardOptions }]}
                onValueChange={(value) => setSelectedAward(value)}
                defaultValue="all"
              />
            </div>
            )}
          </div>
        </div>
        <div className="overflow-x-auto">
          <DataTable {...dataTableProps} />
        </div>
      </CardContent>
    </Card>
    // </div>
  );
};
