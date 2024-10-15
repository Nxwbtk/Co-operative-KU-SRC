import Image from "next/image";
import { Button } from "@/components/ui/button";
import { TLayoutConfig, TopicMenuProps } from "./types";
import Link from "next/link";
export const TopicMenu = (props: TopicMenuProps) => {
  const { menus } = props;
  return (
    <>
      {menus.map((menu: TLayoutConfig, index: number) => (
        <Link prefetch={false} href={menu.url} key={index}>
          <Button
            key={index}
            variant="outline"
            size="sm"
            className={`border-2px border-[#302782] rounded-3xl gap-4 ${
              menu.isFixColor
                ? "text-white bg-[#302782] hover:border-[#F5B21F] hover:bg-[#F5B21F]"
                : "hover:border-[#F5B21F] hover:bg-[#F5B21F] text-[#302782]"
            }`}
          >
            <Image
              src={menu.icon}
              alt="logo"
              width={15}
              height={15}
              className={`${menu.isFixColor ? "hover:invert" : null}`}
            />
            {menu.title}
          </Button>
        </Link>
      ))}
    </>
  );
};
