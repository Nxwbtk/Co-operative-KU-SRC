import Image from "next/image";
import sciLogo from "../../public/layout/image 2.png";
import sciWord from "../../public/layout/Science-faculty.svg";
import { Button } from "@/components/ui/button";
import { TLayoutConfig } from "./types";
import { TOPICSCONFIG } from "./layout-config";
import { SearchIcon } from "lucide-react";

export type TopicMenuProps = {
  menus: TLayoutConfig[];
};

export const TopicMenu = (props: TopicMenuProps) => {
  const { menus } = props;
  return (
    <>
      {menus.map((menu: TLayoutConfig, index: number) => (
        <Button
          key={index}
          variant="outline"
          size="sm"
          className={`border-2 border-[#302782] rounded-3xl ${
            menu.isFixColor
              ? "text-white bg-[#302782]"
              : "hover:border-[#F5B21F] hover:bg-[#F5B21F] text-[#302782]"
          }`}
        >
          {menu.title}
        </Button>
      ))}
    </>
  );
};

export const Topbar = () => {
  return (
    <div className="h-26 w-screen fixed top-0 bg-white flex flex-col justify-center items-center">
      <div className="flex flex-row gap-4 pt-8 items-center">
        <Image src={sciLogo} alt="logo" width={50} height={50} />
        <Image src={sciWord} alt="logo" width={125} height={75} />
        <TopicMenu menus={TOPICSCONFIG} />
        <SearchIcon />
        <Button size="sm" className="border border-[#302782] rounded-3xl" disabled>
          Live
        </Button>
      </div>
    </div>
  );
};
