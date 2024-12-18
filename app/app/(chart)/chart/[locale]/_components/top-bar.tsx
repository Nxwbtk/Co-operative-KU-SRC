"use client";
import Image from "next/image";
import sciLogo from "@/public/layout/image 2.png";
import sciWord from "@/public/layout/Science-faculty.svg";
import { Button } from "@/components/ui/button";
import { TOPICSCONFIG, TOPICSCONFIG_ENG } from "./layout-config";
import { AlignJustifyIcon, SearchIcon } from "lucide-react";
import homeIcon from "@/public/layout/home.svg";
import recordIcon from "@/public/layout/record-circle-fill.svg";
import { TopicMenu } from "./topic-menu";
import { InformationMenu, InformationMenuSM } from "./information-menu";
import { InformationConfig, InformationConfig_ENG } from "./information-config";
import { useRouter } from "next/navigation";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Accordion } from "@/components/ui/accordion";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";

export const Topbar = ({ locale }: { locale: string }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = (url: string) => {
    router.push(url);
  };
  const topConfigVar = locale === "th" ? TOPICSCONFIG : TOPICSCONFIG_ENG;
  const informationConfigVar =
    locale === "th" ? InformationConfig : InformationConfig_ENG;
  const configSM = topConfigVar.slice(0, 2);
  return (
    <div className="rounded-3xl m-2 shadow-white shadow-sm absolute top-0 bg-white flex flex-col justify-center items-center">
      {/* Hamburger icon for small screens */}
      {/* <div className="flex flex-row justify-between items-center w-full p-4 sm:hidden">
        <div className="flex flex-col w-full gap-2">
          <div className="flex flex-row gap-2">
            <TopicMenu menus={configSM} />
          </div>
          <div
            className="flex w-full gap-2 h-[59px] items-center"
            onClick={() => handleClick("/")}
          >
            <Image
              src={sciLogo}
              alt="logo"
              width={56}
              height={59}
              className="h-[59px]"
            />

            <div className="ml-auto flex items-center">
              <Drawer>
                <DrawerTrigger asChild>
                  <Button variant="outline">
                    <AlignJustifyIcon />
                  </Button>
                </DrawerTrigger>
                <DrawerContent>
                  <DrawerHeader className="text-left">
                    <DrawerTitle>เมนู</DrawerTitle>
                  </DrawerHeader>
                  <div className="p-4">
                    <ScrollArea className="h-[calc(100vh-8rem)] px-4">
                      <div className="flex flex-col">
                        <Accordion type="single" collapsible className="w-full">
                          {informationConfigVar.map((info, index) => {
                            return !info.isButtonOnly ? (
                              <InformationMenuSM
                                key={index}
                                title={info.title}
                                parentConfig={info.parentConfig}
                              />
                            ) : (
                              <div className="flex border-b" key={index}>
                                <div
                                  className="flex flex-1 items-center justify-between py-4 transition-all hover:underline [&[data-state=open]>svg]:rotate-180 text-[#302782] font-bold"
                                  onClick={() => handleClick(info.url!)}
                                >
                                  {info.title}
                                </div>
                              </div>
                            );
                          })}
                        </Accordion>
                      </div>
                    </ScrollArea>
                  </div>
                  <DrawerFooter className="pt-2">
                    <DrawerClose asChild>
                      <Button variant="outline">ปิด</Button>
                    </DrawerClose>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
            </div>
          </div>
        </div>
      </div> */}

      {/* Content for medium and larger screens */}
      <div className="flex justify-between w-full items-center pl-4 pt-4 pr-4">
        <div
          className="flex w-fit gap-2 h-[59px] items-center hover:cursor-pointer"
          onClick={() => handleClick("/")}
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
        <div
          className="flex flex-row items-center gap-2 hover:cursor-pointer"
          onClick={() => router.push("https://sci.src.ku.ac.th/")}
        >
          <Image src={homeIcon} alt="logo" width={25} height={25} />
          <span>หน้าหลัก</span>
        </div>
      </div>
      {/* <div className="flex gap-2 items-center">
          <TopicMenu menus={topConfigVar} />
          <SearchIcon />
        </div> */}
      {/* <div className="w-fit">
          <Button
            size="sm"
            className="border border-[#302782] rounded-3xl gap-2 h-6 p-2 w-20"
            disabled
          >
            <Image
              src={recordIcon}
              alt="logo"
              width={15}
              height={15}
              className="bg-white rounded-full invert"
            />
            LIVE
          </Button>
        </div> */}
      <div className="hidden sm:flex flex-row pt-4 justify-center items-center w-[90vw] self-center">
        {/* <Image src={homeIcon} alt="logo" width={25} height={25} />
        {informationConfigVar.map((info, index) => {
          return !info.isButtonOnly ? (
            <InformationMenu
              key={index}
              title={info.title}
              parentConfig={info.parentConfig}
            />
          ) : (
            <Button
              key={index}
              variant="link"
              onClick={() => handleClick(info.url!)}
              className="text-[#302782]"
            >
              {info.title}
            </Button>
          );
        })} */}
      </div>
    </div>
  );
};
