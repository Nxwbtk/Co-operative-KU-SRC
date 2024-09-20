"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { LogOutIcon, PencilLineIcon, UserPenIcon } from "lucide-react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { TMyProfileProps } from "../change-password/_components/types";

export const MyUser = (props: TMyProfileProps) => {
  const { data } = props;
  const router = useRouter();
  const handleSignOut = async () => {
    signOut();
  };
  const handleChangePassword = () => {
    router.push("/admin/change-password");
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="hover:cursor-pointer">
        {/* <Button variant="outline"> */}
        <Avatar>
          <AvatarImage src="" alt="avatar" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
        {/* </Button> */}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-auto mr-10">
        <Avatar className="w-40 h-40 border-4 border-white">
          <AvatarImage src="" alt="avatar" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
        <div className="flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-2">{`${data.honorific} ${data.firstName} ${data.lastName}`}</h2>
        <p className="text-gray-600 mb-2">{data.email}</p>
        <span className="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded">
          {data.role.includes("SUPER_ADMIN") ? "ผู้ดูแลระบบ" : "ผูั้จัดการระบบ"}
        </span>

        </div>
        <DropdownMenuGroup>
          <DropdownMenuItem
            className="gap-2 hover:cursor-pointer"
            // onClick={handleChangePassword}
          >
            <UserPenIcon size={16} />
            โปรไฟล์
          </DropdownMenuItem>
          <DropdownMenuItem className="gap-2 hover:cursor-pointer" onClick={handleChangePassword}>
            <PencilLineIcon size={16} />
            เปลี่ยนรหัสผ่าน
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={handleSignOut}
            className="gap-2 hover:cursor-pointer text-red-500 hover:text-red-500"
          >
            <LogOutIcon size={16} />
            ออกจากระบบ
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
