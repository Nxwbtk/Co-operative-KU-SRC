"use client";

import { DataTable, IDataTableProps } from "@/components/shared/datatable";
import { DataTableColumnHeader } from "@/components/shared/datatable/data-table-column-header.component";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CircleChevronLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { CreateBtn } from "./create-btn";
import { useOStdStore } from "@/lib/store/ostd-store";
import { convertChristYearToBuddhaYear } from "@/lib/convertChristYearToBuddhaYear";
import { DeleteOStdBtn } from "./delete-ostd";
import { EditBtn } from "./edit-btn";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const OutStandingNisitAdminScreen = () => {
  const router = useRouter();
  const [allOStdData] = useOStdStore((state) => [state.allOStdData]);
  const dataTableProps: IDataTableProps<any, any> = {
    columns: [
      {
        accessorKey: "name",
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
        accessorKey: "award",
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
    data: allOStdData,
    name: "data-club-table",
    options: {},
  };
  const handleBack = () => {
    router.push("/admin");
  };
  return (
    <div className="flex flex-col items-center w-full p-4 sm:p-6">
      <Card className="w-full">
        <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 p-4 sm:p-6">
          <CardTitle className="text-xl sm:text-2xl font-semibold">
            นิสิตดีเด่น
          </CardTitle>
          <div className="w-full sm:w-auto">
            <CreateBtn />
          </div>
        </CardHeader>
        <CardContent className="p-2 sm:p-6">
          <div className="overflow-x-auto">
            <DataTable {...dataTableProps} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
