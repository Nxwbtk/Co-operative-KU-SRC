"use client";

import { DataTable, IDataTableProps } from "@/components/shared/datatable";
import { DataTableColumnHeader } from "@/components/shared/datatable/data-table-column-header.component";
import { DropDownAddBtn } from "./create-btn";
import { useFacultyStore } from "@/lib/store/faculty-store";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { EditBtn } from "./edit-btn";
import { DeleteBtn } from "./delete-btn";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Whale from "@/public/Whalel.png";
import Image from "next/image";

export const ManageClubScreen = () => {
  const [allStudentClub, faculty, allMajor] = useFacultyStore((state) => [
    state.allStudentClub,
    state.faculty,
    state.allMajor,
  ]);
  const dataTableProps: IDataTableProps<any, any> = {
    columns: [
      {
        accessorKey: "index",
        header: () => <div>ลำดับที่</div>,
        cell: ({ row }: any) => {
          return (
            <>
              {/* <Avatar>
              <AvatarImage
                src={img}
              />
              <AvatarFallback></AvatarFallback>
            </Avatar> */}
              <div>{row.original.index}</div>
            </>
          );
        },
        meta: {
          cellClassName: "w-auto",
        },
      },
      {
        accessorKey: "img",
        header: () => null,
        cell: ({ row }: any) => {
          const img = row.original.img === "" ? Whale : row.original.img;
          return (
            <>
              {/* <Avatar>
              <AvatarImage
                src={img}
              />
              <AvatarFallback></AvatarFallback>
            </Avatar> */}
              <Image
                src={img}
                width={50}
                height={50}
                alt="profile-img"
                className="rounded border border-[#F5B21F]"
              />
            </>
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
        accessorKey: "major",
        header: ({ column }: any) => (
          <DataTableColumnHeader column={column} title="สาขา" />
        ),
        cell: ({ row }: any) => {
          const majorName = allMajor.find(
            (item) => item._id === row.original.major
          )?.name;
          return (
            <div className="w-[150px] overflow-hidden break-words whitespace-normal">
              {majorName}
            </div>
          );
        },
      },
      {
        accessorKey: "clubPosition",
        header: ({ column }: any) => (
          <DataTableColumnHeader column={column} title="ตำแหน่งในชมรม" />
        ),
        cell: ({ row }: any) => (
          <div className="w-[150px] overflow-hidden break-words whitespace-normal">
            {row.original.clubPosition}
          </div>
        ),
      },
      {
        accessorKey: "academicYear",
        header: ({ column }: any) => (
          <DataTableColumnHeader column={column} title="ปีการศึกษา" />
        ),
        cell: ({ row }: any) => (
          <div>{Number(row.original.academicYear) + 543}</div>
        ),
      },
      {
        accessorKey: "tools",
        header: () => <div>จัดการ</div>,
        cell: ({ row }: any) => {
          return (
            <div className="flex flex-row gap-2">
              <EditBtn data={row.original} />
              <DeleteBtn
                id={row.original._id}
                name={`${row.original.firstName}`}
              />
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
          <CardTitle className="text-xl sm:text-2xl font-semibold">
            สโมสรนิสิต
          </CardTitle>
          <div className="flex flex-col sm:flex-row w-full sm:w-auto space-y-2 sm:space-y-0 sm:space-x-2">
            <DropDownAddBtn />
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
