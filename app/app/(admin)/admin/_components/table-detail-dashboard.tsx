"use client";

import { DataTable, IDataTableProps } from "@/components/shared/datatable";
import { TScienceFacultyAndMajors } from "../club/_actions/types";
import { TGetAward } from "../outstanding-student/types";
import { DataTableColumnHeader } from "@/components/shared/datatable/data-table-column-header.component";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type TTableDetailDashboardProps = {
  mode: "major" | "award";
  data: TScienceFacultyAndMajors["majorsAndId"] | TGetAward[];
};

export const TableDetailDashboard = (props: TTableDetailDashboardProps) => {
  const { mode, data } = props;
  const columns: IDataTableProps<any, any> =
    mode === "major"
      ? {
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
              accessorKey: "tools",
              header: () => <div>จัดการ</div>,
              cell: ({ row }: any) => {
                return (
                  <div className="flex flex-row gap-2">
                    {/* <EditBtn data={row.original} />
              <DeleteOStdBtn id={row.original._id} /> */}
                  </div>
                );
              },
            },
          ],
          data: data,
          name: "data-club-table",
          options: {},
        }
      : {
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
              cell: ({ row }: any) => <div>{row.original.description === "" ? "-": row.original.description}</div>,
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
                    {/* <EditBtn data={row.original} />
              <DeleteOStdBtn id={row.original._id} /> */}
                  </div>
                );
              },
            },
          ],
          data: data,
          name: "data-club-table",
          options: {},
        };
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">
          {mode === "major" ? (
            "สาขาวิชา"
          ) : (
            "ประเภทรางวัล"
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable {...columns} />
      </CardContent>
    </Card>
  );
};
