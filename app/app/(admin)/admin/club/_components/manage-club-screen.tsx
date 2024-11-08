"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/shared/datatable";
import { DataTableColumnHeader } from "@/components/shared/datatable/data-table-column-header.component";
import { DropDownAddBtn } from "./create-btn";
import { useFacultyStore } from "@/lib/store/faculty-store";
import { EditBtn } from "./edit-btn";
import { DeleteBtn } from "./delete-btn";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Whale from "@/public/Whalel.png";
import Image from "next/image";
import { ChangeDefaultImageButton } from "../../_components/change-default";
import { useMemo, useState, useCallback, useEffect } from "react";
import { TableFilters } from "./filter";
import { SelectScrollable } from "@/components/select/select.component";
import { TOptionsGroup } from "@/components/select/types";

export const ManageClubScreen: React.FC = () => {
  const [allStudentClub, faculty, allMajor] = useFacultyStore((state) => [
    state.allStudentClub ?? [], // Provide default empty array
    state.faculty,
    state.allMajor ?? [], // Provide default empty array
  ]);

  const [filteredData, setFilteredData] = useState<any>([]);
  const [majorOptions, setMajorOptions] = useState<TOptionsGroup>({
    label: "สาขา",
    options: [],
  });
  const [positionOptions, setPositionOptions] = useState<TOptionsGroup>({
    label: "ตำแหน่งในชมรม",
    options: [],
  });
  const [yearOptions, setYearOptions] = useState<TOptionsGroup>({
    label: "ปีการศึกษา",
    options: [],
  });
  const [selectedMajor, setSelectedMajor] = useState<string | null>(null);
  const [selectedPosition, setSelectedPosition] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<string | null>(null);

  useEffect(() => {
    if (allMajor.length > 0) {
      const sortedMajors = allMajor
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
  }, [allMajor]);

  useEffect(() => {
    const positions = allStudentClub
      .map((student) => student.clubPosition)
      .filter((position, index, self) => self.indexOf(position) === index)
      .sort((a, b) => a.localeCompare(b, "th"));

    setPositionOptions({
      label: "ตำแหน่งในชมรม",
      options: [
        { value: "all", label: "ทั้งหมด" },
        ...positions.map((position) => ({
          value: position,
          label: position,
        })),
      ],
    });
  }, [allStudentClub]);

  useEffect(() => {
    const years = allStudentClub
      .map((student) => student.academicYear)
      .filter((year, index, self) => self.indexOf(year) === index)
      .sort((a, b) => Number(a) - Number(b));
    setYearOptions({
      label: "ปีการศึกษา",
      options: [
        { value: "all", label: "ทั้งหมด" },
        ...years.map((year) => ({
          value: year,
          label: (Number(year) + 543).toString(),
        })),
      ],
    });
  }, [allStudentClub]);
  // Initialize filteredData when allStudentClub changes
  useEffect(() => {
    setFilteredData(allStudentClub);
  }, [allStudentClub]);

  const columns = useMemo<ColumnDef<any, any>[]>(
    () => [
      {
        accessorKey: "index",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="ลำดับที่" />
        ),
        cell: ({ row }) => {
          const img = row.original?.img === "" ? Whale : row.original?.img;
          return (
            <div className="flex flex-row items-center gap-4">
              {row.original?.index}{" "}
              <Image
                src={img}
                width={64}
                height={50}
                alt="profile-img"
                className="rounded border border-[#F5B21F]"
              />
            </div>
          );
        },
        meta: {
          cellClassName: "w-auto",
        },
      },
      {
        accessorKey: "firstName",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="ชื่อ" />
        ),
        cell: ({ row }) => (
          <div>
            {row.original?.firstName} {row.original?.lastName}
          </div>
        ),
        meta: {
          cellClassName: "text-start",
          headerClassName: "text-start",
        },
      },
      {
        accessorKey: "major",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="สาขา" />
        ),
        cell: ({ row }) => {
          const majorName = allMajor.find(
            (item) => item._id === row.original?.major
          )?.name;
          return (
            <div className="w-[150px] overflow-hidden break-words whitespace-normal">
              {majorName}
            </div>
          );
        },
      },
      {
        accessorKey: "clubPosition",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="ตำแหน่งในชมรม" />
        ),
        cell: ({ row }) => (
          <div className="w-[150px] overflow-hidden break-words whitespace-normal">
            {row.original?.clubPosition}
          </div>
        ),
      },
      {
        accessorKey: "academicYear",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="ปีการศึกษา" />
        ),
        cell: ({ row }) => (
          <div>
            {row.original?.academicYear
              ? Number(row.original.academicYear) + 543
              : ""}
          </div>
        ),
      },
      {
        accessorKey: "tools",
        header: () => <div>จัดการ</div>,
        cell: ({ row }) => {
          return (
            <div className="flex flex-row gap-2">
              <EditBtn data={row.original} />
              <DeleteBtn
                id={row.original?._id ?? ""}
                name={row.original?.firstName ?? ""}
              />
            </div>
          );
        },
      },
    ],
    [allMajor]
  );

  const handleFiltersChange = useCallback(
    ({
      major,
      position,
      year,
    }: {
      major: string | null;
      position: string | null;
      year: string | null;
    }) => {
      let filtered = [...allStudentClub]; // Create a copy of the array

      if (major) {
        filtered = filtered.filter((student) => student?.major === major);
      }
      if (position) {
        filtered = filtered.filter(
          (student) => student?.clubPosition === position
        );
      }
      if (year) {
        filtered = filtered.filter((student) => student?.academicYear === year);
      }

      setFilteredData(filtered);
    },
    [allStudentClub]
  );

  const sortedAndIndexedData = useMemo(() => {
    if (!Array.isArray(filteredData)) return [];

    return filteredData
      .sort((a, b) => {
        const dateA = a?.updatedAt ? new Date(a.updatedAt).getTime() : 0;
        const dateB = b?.updatedAt ? new Date(b.updatedAt).getTime() : 0;
        return dateB - dateA;
      })
      .map((item, index) => ({ ...item, index: index + 1 }));
  }, [filteredData]);

  const dataTableProps = {
    columns,
    data: sortedAndIndexedData,
    name: "data-club-table",
    options: {},
  };

  useEffect(() => {
    setFilteredData(
      allStudentClub.filter((student) => {
        return (
          (selectedMajor === "all" ||
            !selectedMajor ||
            student?.major === selectedMajor) &&
          (selectedPosition === "all" ||
            !selectedPosition ||
            student?.clubPosition === selectedPosition) &&
          (selectedYear === "all" ||
            !selectedYear ||
            student?.academicYear === selectedYear)
        );
      })
    );
  }, [selectedMajor, selectedPosition, selectedYear]);
  return (
    <div className="flex flex-col items-center w-full p-4 sm:p-6">
      <Card className="w-full">
        <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 p-4 sm:p-6">
          <CardTitle className="text-xl sm:text-2xl font-semibold">
            สโมสรนิสิต
          </CardTitle>
          <div className="flex flex-col sm:flex-row w-full sm:w-auto space-y-2 sm:space-y-0 sm:space-x-2">
            <ChangeDefaultImageButton />
            <DropDownAddBtn />
          </div>
        </CardHeader>
        <CardContent className="p-2 sm:p-6 flex flex-col gap-2">
          <div className="flex flex-row gap-2">
            <div className="flex flex-col items-start justify-start">
              <span className="px-4 py-1 mb-2 text-base font-semibold text-white bg-[#302782] rounded-lg">
                กรองตามสาขา
              </span>
              <SelectScrollable
                placeholder={"กรองตามสาขา"}
                optionsGroup={[majorOptions]}
                onValueChange={(value) => setSelectedMajor(value)}
                // defaultValue={}
              />
            </div>
            <div className="flex flex-col items-start justify-start">
              <span className="px-4 py-1 mb-2 text-base font-semibold text-white bg-[#302782] rounded-lg">
                กรองตามตำแหน่งในชมรม
              </span>
              <SelectScrollable
                placeholder={"กรองตามตำแหน่งในชมรม"}
                optionsGroup={[positionOptions]}
                onValueChange={(value) => setSelectedPosition(value)}
                // defaultValue={}
              />
            </div>
            <div className="flex flex-col items-start justify-start">
              <span className="px-4 py-1 mb-2 text-base font-semibold text-white bg-[#302782] rounded-lg">
                กรองตามปีการศึกษา
              </span>
              <SelectScrollable
                placeholder={"กรองตามปีการศึกษา"}
                optionsGroup={[yearOptions]}
                onValueChange={(value) => setSelectedYear(value)}
                // defaultValue={}
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            <DataTable {...dataTableProps} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
