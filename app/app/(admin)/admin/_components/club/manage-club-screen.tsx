"use client"

import { DataTable, IDataTableProps } from "@/components/shared/datatable";
import { DataTableColumnHeader } from "@/components/shared/datatable/data-table-column-header.component";

export const ManageClubScreen = () => {
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
  return (
    <div className="flex flex-col items-center min-h-screen flex-grow">
      <DataTable {...dataTableProps} />
    </div>
  );
};