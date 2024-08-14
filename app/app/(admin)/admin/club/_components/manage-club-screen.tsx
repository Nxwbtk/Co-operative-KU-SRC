"use client"

import { DataTable, IDataTableProps } from "@/components/shared/datatable";
import { DataTableColumnHeader } from "@/components/shared/datatable/data-table-column-header.component";
import { Button } from "@/components/ui/button";
import { CircleChevronLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { CreateBtn } from "./create-btn";

export const ManageClubScreen = () => {
  const router = useRouter();
  const dataTableProps: IDataTableProps<any, any> = {
    columns: [
      {
        accessorKey: "index",
        header: ({ column }: any) => (
          <DataTableColumnHeader column={column} title="ลำดับที่" />
        ),
        cell: ({ row }: any) => (
          <div className="text-center">{row.original.index}</div>
        ),
        meta: {
          cellClassName: "w-[20rem]",
        },
      },
    ],
    data: [],
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
          <Button variant="outline" className="flex flex-row gap-2 items-center" onClick={handleBack}>
            <CircleChevronLeftIcon size={16} />
            กลับ
          </Button>
          <CreateBtn />
        </div>
        <div className="w-full">
          <DataTable {...dataTableProps} />
        </div>
      </div>
    </div>
  );
};