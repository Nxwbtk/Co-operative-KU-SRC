"use client";

import { DataTable, IDataTableProps } from "@/components/shared/datatable";
import { TScienceFacultyAndMajors } from "../club/_actions/types";
import { DataTableColumnHeader } from "@/components/shared/datatable/data-table-column-header.component";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreateMajorDialog } from "./create-major";
import { EditMajorDialog } from "./edit-major";

type TTableDetailDashboardProps = {
  data: TScienceFacultyAndMajors["majorsAndId"];
};

export const TableMajorDetailDashboard = (
  props: TTableDetailDashboardProps
) => {
  const { data } = props;
  const columns: IDataTableProps<any, any> = {
    columns: [
      {
        accessorKey: "name",
        header: ({ column }: any) => (
          <DataTableColumnHeader column={column} title="ชื่อ" />
        ),
        cell: ({ row }: any) => <div>{row.original.name}</div>,
        meta: {
          cellClassName: "text-start",
          headerClassName: "text-start",
        },
      },
      {
        accessorKey: "description",
        header: ({ column }: any) => (
          <DataTableColumnHeader column={column} title="คำอธิบาย" />
        ),
        cell: ({ row }: any) => (
          <div>
            {!row.original.description ? "-" : row.original.description}
          </div>
        ),
        meta: {
          cellClassName: "text-start",
          headerClassName: "text-start",
        },
      },
      {
        accessorKey: "tools",
        header: () => <div>จัดการ</div>,
        cell: ({ row }: any) => {
          return (
            <div className="flex flex-row gap-2">
              <EditMajorDialog editData={row.original} />
            </div>
          );
        },
      },
    ],
    data: data,
    name: "data-admin-major-table",
    options: {},
  };
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle className="text-2xl font-semibold">สาขาวิชา</CardTitle>
        <CreateMajorDialog />
      </CardHeader>
      <CardContent>
        <DataTable {...columns} />
      </CardContent>
    </Card>
  );
};
