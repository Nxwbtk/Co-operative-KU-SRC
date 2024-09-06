"use client";

import Link from "next/link";
import React from "react";
import { cx } from "class-variance-authority";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { usePathname } from "next/navigation";
import { LucideIcon } from "lucide-react";

export type ISidebarContent = {
    icon: LucideIcon;
    title: string;
    href: string;
    id: string;
    action?: () => void;
    isAdmin: boolean;
    isEnable: boolean;
  };

export type ISidebarItem = {
    data: ISidebarContent;
    collapse: boolean;
    isadmin: boolean;
  };
  

export function SidebarItem(props: ISidebarItem) {
  const { collapse, data, isadmin } = props;
  const pathname = usePathname();
  const { id, title, icon: Icon, href, isAdmin, isEnable, action } = data;
  async function redirectAction() {
    if (action) {
      await action();
    }
  }
  const Comp = action ? "div" : Link;

  if (isAdmin && !isadmin) return null;
  return (
    <Comp
      id={id}
      className="cursor-pointer"
      href={isEnable ? href ?? "#" : "#"}
      prefetch={false}
      onClick={async () => await redirectAction()}
    >
      <div
        className={cx({
          "flex flex-row text-center space-x-4  rounded-lg px-3 py-2.5": true,
          "w-11": collapse,
          "bg-primary/10 text-primary font-medium": pathname === href,
          "hover:bg-gray-100": pathname !== href,
        })}
      >
        {collapse ? (
          <Tooltip>
            <TooltipTrigger asChild hidden={!collapse}>
              {<Icon className="w-5 h-5" />}
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={10}>
              <p className="text-sm">{title}</p>
            </TooltipContent>
          </Tooltip>
        ) : (
          <Icon className="w-5 h-5" />
        )}
        {!collapse && <p className="text-sm">{title}</p>}
      </div>
    </Comp>
  );
}
