"use client";

import { DataTable, IDataTableProps } from "@/components/shared/datatable";
import { DataTableColumnHeader } from "@/components/shared/datatable/data-table-column-header.component";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TUserScreenProps } from "../types";
import { CreateUserBtn } from "./create-user-btn";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DeleteUserBtn } from "./delete-user";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { EditUserBtn } from "./edit-user-btn";

export const UserScreen = (props: TUserScreenProps) => {
  const { data } = props;
  const [isOpen, setOpen] = useState(false);
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
            {row.original.honorific}{row.original.firstName} {row.original.lastName}
          </div>
        ),
        meta: {
          cellClassName: "text-center",
          headerClassName: "text-center",
        },
      },
      {
        accessorKey: "email",
        header: ({ column }: any) => "อีเมล",
        cell: ({ row }: any) => <div>{row.original.email}</div>,
        meta: {
          cellClassName: "text-center",
          headerClassName: "text-center",
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
        meta: {
          cellClassName: "text-center",
          headerClassName: "text-center",
        },
      },
      {
        accessorKey: "tools",
        header: () => <div>จัดการ</div>,
        cell: ({ row }: any) => {
          return (
            <div className="flex flex-row gap-2 justify-center">
              <EditUserBtn data={row.original} />
              <DeleteUserBtn id={row.original._id} />
            </div>
          );
        },
        meta: {
          headerClassName: "text-center",
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
        <Button
          className="bg-[#F5B21F] text-[#302782] hover:bg-[#f5b11f9d]"
          onClick={() => setOpen((prev) => !prev)}
        >
          เพิ่มสมาชิก
        </Button>
        <CreateUserBtn isOpen={isOpen} setOpen={setOpen} />
      </CardHeader>
      <CardContent>
        <DataTable {...columns} />
      </CardContent>
    </Card>
  );
};
