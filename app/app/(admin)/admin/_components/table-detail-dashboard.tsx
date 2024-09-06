"use client";

import { DataTable, IDataTableProps } from "@/components/shared/datatable";
import { TScienceFacultyAndMajors } from "../club/_actions/types";
import { TGetAward } from "../outstanding-student/types";
import { DataTableColumnHeader } from "@/components/shared/datatable/data-table-column-header.component";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreateMajorDialog } from "./create-major";
import { CreateAwardDialog } from "./create-award";
import { EditMajorDialog } from "./edit-major";
import { PencilIcon } from "lucide-react";
import { useState } from "react";
import { EditAwardDialog } from "./edit-award";

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
                    <pre>{JSON.stringify(row.original, null, 2)}</pre>
                    <EditMajorDialog editData={row.original} />
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
              cell: ({ row }: any) => (
                <div>
                  {row.original.description === ""
                    ? "-"
                    : row.original.description}
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
                    <EditAwardDialog editData={row.original} />
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
      <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <CardTitle className="text-xl sm:text-2xl font-semibold">
          {mode === "major" ? "สาขาวิชา" : "ประเภทรางวัล"}
        </CardTitle>
        <div className="w-full sm:w-auto">
          {mode === "major" ? <CreateMajorDialog /> : <CreateAwardDialog />}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:px-6">
        <div className="overflow-x-auto">
          <DataTable {...columns} />
        </div>
      </CardContent>
    </Card>
  );
};
