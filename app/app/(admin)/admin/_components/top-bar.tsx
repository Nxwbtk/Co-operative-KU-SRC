'use client'
import { Button } from "@/components/ui/button";
import { MenuIcon } from "lucide-react";
import { Session } from "next-auth";
import { signOut, useSession } from "next-auth/react";

type TAdminTopbarProps = {
  session: Session;
};

export const AdminTopbar = () => {
  const session= useSession();
  return (
    <div className="absolute top-0 flex w-full border">
      <div className="flex flex-row justify-between w-full">
      <div className="ml-auto p-4 hidden md:block">
        <Button onClick={() => signOut()} variant="destructive">ออกจากระบบ</Button>
      </div>
      <div className="ml-auto p-4 block md:hidden">
        <Button><MenuIcon /></Button>
      </div>
      </div>
    </div>
  );
}