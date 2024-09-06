"use client";

import { Button } from "@/components/ui/button";
import { AlignJustifyIcon } from "lucide-react";
import { useState } from "react";
import { MENU_CONFIG } from "./side-bar";
import Link from "next/link";
import { cx } from "class-variance-authority";
import Image from "next/image";
import sciLogo from "@/public/layout/image 2.png";


export const TopbarSMSizeAdmin = ({ isAdmin }: { isAdmin: boolean }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="sm:hidden fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
      <div className="h-16 flex items-center justify-between px-4">
        <div className="flex-1">
          <Image src={sciLogo} alt="logo" width={40} height={40} />
        </div>
        <Button
          onClick={() => setMenuOpen(!menuOpen)}
          variant="ghost"
          size="icon"
          className="text-gray-600"
        >
          <AlignJustifyIcon className="w-6 h-6" />
        </Button>
      </div>
      {menuOpen && (
        <div className="border-t border-gray-200">
          <nav className="py-2">
            {MENU_CONFIG.map((item) =>
              item.isAdmin && !isAdmin ? null : (
                <Link
                  key={item.id}
                  href={item.href}
                  className={cx(
                    "flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100",
                    { "text-gray-300 pointer-events-none": !item.isEnable }
                  )}
                  onClick={() => setMenuOpen(false)}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.title}
                </Link>
              )
            )}
          </nav>
        </div>
      )}
    </div>
  );
};
