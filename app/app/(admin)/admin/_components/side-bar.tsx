"use client";
import { Button } from "@/components/ui/button";
import { cx } from "class-variance-authority";
import {
  AlignJustifyIcon,
  BellIcon,
  GraduationCapIcon,
  HouseIcon,
  LandmarkIcon,
  LogOutIcon,
  PanelRightClose,
  PanelRightOpen,
  UserPenIcon,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import sciLogo from "@/public/layout/image 2.png";
import sciWord from "@/public/layout/Science-faculty.svg";
import { signOut } from "next-auth/react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ISidebarContent, SidebarItem } from "./side-bar-item";

export const TOP_CONFIG = [
  {
    id: "T1",
    title: "การแจ้งเตือน",
    icon: BellIcon,
    href: "/notification",
    isAdmin: false,
    isEnable: true,
  },
];

export const MENU_CONFIG = [
  {
    id: "M1",
    title: "หน้าหลัก",
    icon: HouseIcon,
    href: "/admin",
    isAdmin: false,
    isEnable: true,
  },
  {
    id: "M2",
    title: "สโมสรนิสิต",
    icon: LandmarkIcon,
    href: "/admin/club",
    isAdmin: false,
    isEnable: true,
  },
  {
    id: "M3",
    title: "นิสิตดีเด่น",
    icon: GraduationCapIcon,
    href: "/admin/outstanding-student",
    isAdmin: false,
    isEnable: true,
  },
  {
    id: "M4",
    title: "จัดการบุคลากร",
    icon: UserPenIcon,
    href: "/admin/user",
    isAdmin: true,
    isEnable: true,
  },
];

type TAdminSidebar = {
  isadmin: boolean;
};

export const AdminSidebar = (props: TAdminSidebar) => {
  const { isadmin } = props;
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [collapse, setCollapse] = useState<boolean>(false);
  return (
    <div className="flex">
      {/* Sidebar for medium and larger screens */}
      <div
        className={cx({
          "hidden md:flex flex-col h-screen items-center border-r-2 border-gray-100 fixed left-0 top-0":
            true,
          "transition-width duration-300 ease-in-out": true,
          "w-72": !collapse,
          "w-16 !m-0": collapse,
        })}
      >
        <Button
          onClick={() => setCollapse((prev) => !prev)}
          variant={"ghost"}
          size={"icon"}
          className={cx({
            "absolute top-6 -right-5 rounded-full border bg-white w-8 h-8":
              true,
            "transition-transform duration-300 ease-in-out": true,
          })}
        >
          {collapse ? (
            <PanelRightClose className="w-4 h-4" />
          ) : (
            <PanelRightOpen className="w-4 h-4" />
          )}
        </Button>

        {/* LOGO */}
        <div className="py-5">
          <Link href={""} prefetch={false}>
            {!collapse ? (
              <div className="flex flex-row gap-2">
                <Image
                  src={sciLogo}
                  width={240}
                  height={44}
                  className="object-contain w-auto h-11"
                  alt="data-gov-logo"
                />
                <Image
                  src={sciWord}
                  width={240}
                  height={44}
                  className="object-contain w-auto h-11"
                  alt="data-gov-logo"
                />
              </div>
            ) : (
              <Image
                src={sciLogo}
                width={36}
                height={36}
                className="object-contain w-9 h-9"
                alt="data-gov-logo"
              />
            )}
          </Link>
        </div>
        {/* Sidebar Content */}
        <nav
          className={cx({
            "container flex flex-col h-full gap-y-4 flex-nowrap overflow-y-auto overflow-x-clip pb-4":
              true,
            "px-6": !collapse,
            "!px-0 items-center text-center": collapse,
          })}
        >
          {/* Middle Section */}
          <div className="gap-8">
            <p
              className={cx({
                "w-60 px-3 mb-3 font-medium": !collapse,
                hidden: collapse,
              })}
            >
              {!collapse ? "เมนู" : ""}
            </p>
            <div className="flex flex-col gap-1">
              {MENU_CONFIG?.map((item: any) => {
                return (
                  <SidebarItem
                    key={item.id}
                    data={item}
                    collapse={collapse}
                    isadmin={isadmin}
                  />
                );
              })}
            </div>
          </div>
          {/* Bottom Section */}
          <div className="mt-auto">
            <div
              id="layout-signout-btn"
              className={cx({
                "flex flex-row text-center text-red-600 space-x-4 hover:bg-gray-100 hover:cursor-pointer rounded-lg px-3 py-2.5":
                  true,
                "w-11": collapse,
              })}
              onClick={() => signOut()}
            >
              {collapse ? (
                <Tooltip>
                  <TooltipTrigger asChild hidden={!collapse}>
                    {<LogOutIcon className="w-5 h-5" />}
                  </TooltipTrigger>
                  <TooltipContent side="right" sideOffset={10}>
                    <p className="text-sm">ออกจากระบบ</p>
                  </TooltipContent>
                </Tooltip>
              ) : (
                <LogOutIcon className="w-5 h-5" />
              )}
              {!collapse && <p className="text-sm">ออกจากระบบ</p>}
            </div>
          </div>
        </nav>
      </div>

      {/* Main content */}
      <div
        className={cx({
          "flex-1 md:ml-72": !collapse,
          "flex-1 md:ml-16": collapse,
        })}
      >
        {/* Your main content goes here */}
      </div>
    </div>
  );
};
