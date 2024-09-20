"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { TMyProfileProps } from "./types";
import { useState } from "react";

export const ProfileSection = (props: TMyProfileProps) => {
  const { data } = props;
  const [isEdit, setIsEdit] = useState(false);
  return (
    <div className="flex flex-col items-center relative w-full max-w-sm">
      <div className="z-10 mb-[-2.5rem]">
        <Avatar className="w-48 h-48 border-4 border-white">
          <AvatarImage src="" alt="avatar" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      </div>
      <Card className="w-full border border-black pt-12">
        <CardContent className="flex flex-col items-center">
          {/* <h1 className="text-2xl font-bold mt-4">โปรไฟล์ของฉัน</h1> */}
          <h2 className="text-2xl font-bold mb-2">{`${data.honorific} ${data.firstName} ${data.lastName}`}</h2>
        <p className="text-gray-600 mb-2">{data.email}</p>
        <span className="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded">
          {data.role.includes("SUPER_ADMIN") ? "ผู้ดูแลระบบ" : "ผูั้จัดการระบบ"}
        </span>
        </CardContent>
      </Card>
    </div>
  );
};
