"use client";

import { DataTable, IDataTableProps } from "@/components/shared/datatable";
import { DataTableColumnHeader } from "@/components/shared/datatable/data-table-column-header.component";
import { Button } from "@/components/ui/button";
import { CircleChevronLeftIcon, PencilIcon, TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { CreateBtn } from "./create-btn";
import { useFacultyStore } from "@/lib/store/faculty-store";
import { deleteStdClub } from "../_actions/delete-std-club";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const ManageClubScreen = () => {
  const [allStudentClub, faculty, allMajor] = useFacultyStore((state) => [
    state.allStudentClub,
    state.faculty,
    state.allMajor,
  ]);
  const router = useRouter();
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
          const handleDelete = async () => {
            const res = await deleteStdClub({ id: row.original._id });
            if (res.error) {
              toast.error("ลบไม่สำเร็จ");
            } else {
              toast.success("ลบสำเร็จ");
            }
          };
          return (
            <div className="flex flex-row gap-2">
              <Button variant="outline" size="icon" disabled>
                <PencilIcon size={16} />
              </Button>
              <Button variant="destructive" size="icon" onClick={handleDelete}>
                <TrashIcon size={16} />
              </Button>
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
          <CreateBtn />
        </div>
        <div className="w-full">
          <DataTable {...dataTableProps} />
        </div>
      </div>
    </div>
  );
};
