"use client";
import Image from "next/image";
import sciLogo from "../../public/layout/image 2.png";
import sciWord from "../../public/layout/Science-faculty.svg";
import { Button } from "@/components/ui/button";
import { TOPICSCONFIG } from "./layout-config";
import { SearchIcon } from "lucide-react";
import homeIcon from "../../public/layout/home.svg";
import recordIcon from "../../public/layout/record-circle-fill.svg";
import { TopicMenu } from "./topic-menu";
import { InformationMenu } from "./information-menu";
import { InformationConfig } from "./information-config";
import { useRouter } from "next/navigation";

export const Topbar = () => {
  const router = useRouter();
  const handleClick = (url: string) => {
    router.push(url);
  };
  return (
    <div className="h-auto border border-1 border-black w-screen fixed top-0 bg-white flex flex-col justify-center items-center">
      <div className="flex flex-row justify-evenly pt-3 items-center w-full">
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
      <div className="flex flex-row pt-4 items-center w-[90vw] self-center">
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
