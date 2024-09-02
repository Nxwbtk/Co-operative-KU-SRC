"use client";

import { DataTable, IDataTableProps } from "@/components/shared/datatable";
import { DataTableColumnHeader } from "@/components/shared/datatable/data-table-column-header.component";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TUserScreenProps } from "../types";
import { CreateUserBtn } from "./create-user-btn";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DeleteUserBtn } from "./delete-user";

export const UserScreen = (props: TUserScreenProps) => {
  const { data } = props;
  const columns: IDataTableProps<any, any> = {
    columns: [
      {
        accessorKey: "img",
        header: () => null,
        cell: ({ row }: any) => {
          return (
            <Avatar>
              <AvatarImage src={row.original.image} />
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
        header: ({ column }: any) => "ชื่อ",
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
        accessorKey: "email",
        header: ({ column }: any) => "อีเมล",
        cell: ({ row }: any) => <div>{row.original.email}</div>,
        meta: {
          cellClassName: "text-start",
          headerClassName: "text-start",
        },
      },
      {
        accessorKey: "role",
        header: ({ column }: any) => "ตำแหน่ง",
        cell: ({ row }: any) => (
          <div>
            {row.original.role.includes("SUPER_ADMIN")
              ? "ผู้จัดการระบบ"
              : "ผู้ดูแลระบบ"}
          </div>
        ),
      },
      {
        accessorKey: "tools",
        header: () => <div>จัดการ</div>,
        cell: ({ row }: any) => {
          return (
            <div className="flex flex-row gap-2">
              {/* <EditBtn data={row.original} /> */}
              <DeleteUserBtn id={row.original._id} />
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
    <Card>
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle>ข้อมูลผู้ดูแลและผู้จัดการระบบ</CardTitle>
        <CreateUserBtn />
      </CardHeader>
      <CardContent>
        <DataTable {...columns} />
      </CardContent>
    </Card>
  );
};
