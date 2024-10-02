"use client";
import Image from "next/image";
import sciLogo from "@/public/layout/image 2.png";
import sciWord from "@/public/layout/Science-faculty.svg";
import { Button } from "@/components/ui/button";
import { TOPICSCONFIG } from "./layout-config";
import { AlignJustifyIcon, SearchIcon } from "lucide-react";
import homeIcon from "@/public/layout/home.svg";
import recordIcon from "@/public/layout/record-circle-fill.svg";
import { TopicMenu } from "./topic-menu";
import { InformationMenu, InformationMenuSM } from "./information-menu";
import { InformationConfig } from "./information-config";
import { useRouter } from "next/navigation";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Accordion,
  AccordionContent,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AccordionItem } from "@radix-ui/react-accordion";

export const Topbar = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = (url: string) => {
    router.push(url);
  };
  const configSM = TOPICSCONFIG.slice(0, 2);
  return (
    <div className="h-auto border border-1 border-black w-screen fixed top-0 bg-white flex flex-col justify-center items-center">
      {/* Hamburger icon for small screens */}
      <div className="flex flex-row justify-between items-center w-full p-4 sm:hidden">
        <div className="flex flex-col w-full gap-2">
          <div className="flex flex-row gap-2">
            <TopicMenu menus={configSM} />
          </div>
          <div className="flex w-full gap-2 h-[59px] items-center">
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
                    <DrawerTitle>
                      เมนู
                    </DrawerTitle>
                  </DrawerHeader>
                  <div className="p-4">
                    <ScrollArea className="h-[calc(100vh-8rem)] px-4">
                      <div className="flex flex-col">
                        <Accordion type="single" collapsible className="w-full">
                          {InformationConfig.map((info, index) => {
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
      </div>

      {/* Content for medium and larger screens */}
      <div className="hidden sm:flex flex-col sm:flex-row justify-evenly pt-3 items-center w-full">
        <div className="flex w-fit gap-2 h-[59px] items-center">
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
        <div className="flex gap-2 items-center">
          <TopicMenu menus={TOPICSCONFIG} />
          <SearchIcon />
        </div>
        <div className="w-fit">
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
        </div>
      </div>
      <div className="hidden sm:flex flex-row pt-4 justify-center items-center w-[90vw] self-center">
        <Image src={homeIcon} alt="logo" width={25} height={25} />
        {InformationConfig.map((info, index) => {
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
        })}
      </div>
    </div>
  );
};
