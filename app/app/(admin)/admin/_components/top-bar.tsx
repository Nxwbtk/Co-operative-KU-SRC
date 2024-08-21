"use client";
import { Button } from "@/components/ui/button";
import { MenuIcon } from "lucide-react";
import { Session } from "next-auth";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import sciLogo from "@/public/layout/image 2.png";
import sciWord from "@/public/layout/Science-faculty.svg";
import { useRouter } from "next/navigation";

type TAdminTopbarProps = {
  session: Session;
};

export const AdminTopbar = () => {
  const session = useSession();
  const router = useRouter();
  const handleClick = () => {
    router.push("/chart");
  };
  return (
    <div className="h-auto border border-1 border-black w-screen fixed top-0 bg-white flex flex-col justify-center items-center">
      <div className="flex flex-row justify-between w-full items-center p-4">
      <div
            className="flex w-fit gap-2 h-[59px] items-center hover:cursor-pointer"
            onClick={handleClick}
          >
            <Image
              src={sciLogo}
              alt="logo"
              width={56}
              height={59}
              className="h-[59px]"
            />
            <Image
              src={sciWord}
              alt="logo"
              width={165}
              height={42}
              className="h-[42px]"
            />
          </div>
        <div className="ml-auto p-4 hidden md:block">
          <Button onClick={() => signOut()} variant="destructive">
            ออกจากระบบ
          </Button>
        </div>
        <div className="ml-auto p-4 block md:hidden">
          <Button>
            <MenuIcon />
          </Button>
        </div>
      </div>
    </div>
  );
};
