"use client";

import { DataTable, IDataTableProps } from "@/components/shared/datatable";
import { DataTableColumnHeader } from "@/components/shared/datatable/data-table-column-header.component";
import { CreateBtn } from "./create-btn";
import { useFacultyStore } from "@/lib/store/faculty-store";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { EditBtn } from "./edit-btn";
import { DeleteBtn } from "./delete-btn";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const ManageClubScreen = () => {
  const [allStudentClub, faculty, allMajor] = useFacultyStore((state) => [
    state.allStudentClub,
    state.faculty,
    state.allMajor,
  ]);
  const dataTableProps: IDataTableProps<any, any> = {
    columns: [
      {
        accessorKey: "img",
        header: () => null,
        cell: ({ row }: any) => {
          return (
            <Avatar>
              <AvatarImage src={row.original.img} />
              <AvatarFallback></AvatarFallback>
            </Avatar>
          );
        },
        meta: {
          cellClassName: "w-auto",
        },
      },
      {
        accessorKey: "name",
        header: ({ column }: any) => (
          <DataTableColumnHeader column={column} title="ชื่อ" />
        ),
        cell: ({ row }: any) => (
          <div>
            {row.original.firstName} {row.original.lastName}
          </div>
        ),
        meta: {
          cellClassName: "text-start",
          headerClassName: "text-start",
        },
      },
      {
        accessorKey: "faculty",
        header: ({ column }: any) => (
          <DataTableColumnHeader column={column} title="คณะ" />
        ),
        cell: ({ row }: any) => {
          const facultyName = faculty.find(
            (item) => item._id === row.original.faculty
          )?.name;
          return <div>{facultyName}</div>;
        },
      },
      {
        accessorKey: "major",
        header: ({ column }: any) => (
          <DataTableColumnHeader column={column} title="สาขา" />
        ),
        cell: ({ row }: any) => {
          const majorName = allMajor.find(
            (item) => item._id === row.original.major
          )?.name;
          return <div>{majorName}</div>;
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
        accessorKey: "clubPosition",
        header: ({ column }: any) => (
          <DataTableColumnHeader column={column} title="ตำแหน่งในชมรม" />
        ),
        cell: ({ row }: any) => <div>{row.original.clubPosition}</div>,
      },
      {
        accessorKey: "tools",
        header: () => <div>จัดการ</div>,
        cell: ({ row }: any) => {
          return (
            <div className="flex flex-row gap-2">
              <EditBtn data={row.original} />
              <DeleteBtn id={row.original._id} />
            </div>
          );
        },
      },
    ],
    data:
      !!allStudentClub && Array.isArray(allStudentClub)
        ? allStudentClub.map((item, index) => ({ ...item, index: index + 1 }))
        : [],
    name: "data-club-table",
    options: {},
  };
  return (
    <div className="flex flex-col items-center w-full p-4 sm:p-6">
      <Card className="w-full">
        <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 p-4 sm:p-6">
          <CardTitle className="text-xl sm:text-2xl font-semibold">สโมสรนิสิต</CardTitle>
          <div className="flex flex-col sm:flex-row w-full sm:w-auto space-y-2 sm:space-y-0 sm:space-x-2">
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
