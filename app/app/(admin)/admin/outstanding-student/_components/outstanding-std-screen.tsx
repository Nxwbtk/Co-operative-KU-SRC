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

export const OutstandingStudentAdminScreen = () => {
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
          return <div>{row.original.majorName}</div>;
        },
      },
      {
        accessorKey: "year",
        header: ({ column }: any) => (
          <DataTableColumnHeader column={column} title="ชั้นปี" />
        ),
        cell: ({ row }: any) => <div>{row.original.year}</div>,
      },
      {
        accessorKey: "academicYear",
        header: ({ column }: any) => (
          <DataTableColumnHeader column={column} title="ปีการศึกษา" />
        ),
        cell: ({ row }: any) => (
          <div>{convertChristYearToBuddhaYear(row.original.academicYear)}</div>
        ),
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
              {/* <EditBtn data={row.original} />
              <DeleteBtn id={row.original._id} /> */}
              <EditBtn data={row.original} />
              <DeleteOStdBtn id={row.original._id} year={row.original.academicYear} awardId={row.original.typeOfOutstandingId} />
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
    <div className="flex flex-col items-center flex-grow h-[80vh]">
      <div className="flex flex-col gap-2 w-3/4">
        <div className="flex flex-row justify-between">
          <Button
            variant="outline"
            className="flex flex-row gap-2 items-center"
            onClick={handleBack}
          >
            <CircleChevronLeftIcon size={16} />
            กลับ
          </Button>
          {/* <CreateBtn /> */}
          <CreateBtn />
        </div>
        <div className="w-full">
          <DataTable {...dataTableProps} />
        </div>
      </div>
    </div>
  );
};
