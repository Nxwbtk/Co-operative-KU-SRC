"use client";
import Image from "next/image";

import { CalendarDays } from "lucide-react";
import { ChevronDown } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { TInformationChildConfig, TInformationParentConfig } from "./types";
import { useRouter } from "next/navigation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export type TInformationMenuprops = {
  title: string;
  parentConfig: TInformationParentConfig[];
};

export type TInformationChildrenMenuProps = {
  title: string;
  childrenMenu: TInformationChildConfig[];
};

export const InformationChildrenMenu = (
  props: TInformationChildrenMenuProps
) => {
  const { title, childrenMenu } = props;
  const router = useRouter();
  const hanldeClick = (url: string) => {
    router.push(url);
  };
  return (
    <HoverCard openDelay={0} closeDelay={50}>
      <HoverCardTrigger asChild>
        <Button variant="link" className="text-[#302782] flex justify-between">
          {title} &nbsp;
          <ChevronDown className="-rotate-90" size={16} />
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-fit" side="right">
        <div className="flex flex-col gap-2">
          {childrenMenu.map((child, index) => {
            return (
              <div key={index} className="flex flex-col gap-2">
                <Button
                  variant="link"
                  className="text-[#302782] flex justify-start hover:bg-[#F5B21F]"
                  onClick={() => hanldeClick(child.url)}
                >
                  {child.icon && (
                    <Image
                      src={child.icon}
                      alt="Icon"
                      width={16}
                      height={16}
                      className="mr-2"
                    />
                  )}
                  &nbsp; {child.title}
                </Button>
                {/* {parent.children.map((child, index) => {
                  return (
                    <Button key={index} variant="link" className="text-[#302782]">{child.title}</Button>
                  )
                })} */}
              </div>
            );
          })}
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export const InformationMenu = (props: TInformationMenuprops) => {
  const { title, parentConfig } = props;
  const router = useRouter();
  const handleClick = (url: string) => {
    router.push(url);
  };
  return (
    <HoverCard openDelay={0} closeDelay={50}>
      <HoverCardTrigger asChild>
        <Button variant="link" className="text-[#302782]">
          {title} &nbsp;
          <ChevronDown size={16} />
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-fit" side="bottom">
        <div className="flex flex-col gap-2">
          {parentConfig.map((parent, index) => {
            return (
              <div key={index} className="flex flex-col gap-2">
                {!parent.isParent ? (
                  <Button
                    variant="link"
                    className="text-[#302782] flex justify-start hover:bg-[#F5B21F]"
                    onClick={() => handleClick(parent.url)}
                  >
                    {parent.title} &nbsp;
                  </Button>
                ) : (
                  <InformationChildrenMenu
                    title={parent.title}
                    childrenMenu={parent.children}
                  />
                )}
              </div>
            );
          })}
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export const InformationMenuSM = (props: TInformationMenuprops) => {
  const { title, parentConfig } = props;
  const router = useRouter();
  const handleClick = (url: string) => {
    router.push(url);
  };
  return (
    <AccordionItem value={title}>
      <AccordionTrigger className="text-[#302782] font-bold">{title}</AccordionTrigger>
      <AccordionContent>
        <Accordion type="single" collapsible className="w-full">
          {parentConfig.map((parent, index) => {
            return parent.isParent ? (
              <AccordionItem key={index} value={parent.title}>
                <AccordionTrigger className="text-[#302782] font-medium">{parent.title}</AccordionTrigger>
                <AccordionContent>
                  {parent.children.map((child, childIndex) => {
                    return (
                      <div className="flex border-b" key={childIndex}>
                        <div
                          className="flex flex-1 items-center justify-between py-4 transition-all hover:underline [&[data-state=open]>svg]:rotate-180 text-[#302782] font-thin"
                          onClick={() => handleClick(child.url!)}
                        >
                          {child.title}
                        </div>
                      </div>
                    );
                  })}
                </AccordionContent>
              </AccordionItem>
            ) : (
              <div className="flex border-b" key={index}>
                <div
                  className="flex flex-1 items-center justify-between py-4 transition-all hover:underline [&[data-state=open]>svg]:rotate-180 text-[#302782] font-medium"
                  onClick={() => handleClick(parent.url!)}
                >
                  {parent.title}
                </div>
              </div>
            );
          })}
        </Accordion>
      </AccordionContent>
    </AccordionItem>
    // <Accordion type="single" collapsible className="w-full">
    //   <AccordionItem value="item-1">
    //     <AccordionTrigger asChild>
    //       <div className="flex items-center">
    //         <Button variant="link" className="text-[#302782]">
    //           {title}
    //         </Button>
    //         <ChevronDown size={16} />
    //       </div>
    //     </AccordionTrigger>
    //     <AccordionContent>
    //       <div className="flex flex-col gap-2">
    //         {parentConfig.map((parent, index) => {
    //           return (
    //             <div key={index} className="flex flex-col gap-2">
    //               {!parent.isParent ? (
    //                 <Button
    //                   variant="link"
    //                   className="text-[#302782] flex justify-start hover:bg-[#F5B21F]"
    //                   onClick={() => handleClick(parent.url!)}
    //                 >
    //                   {parent.title} &nbsp;
    //                 </Button>
    //               ) : (
    //                 <InformationChildrenMenu
    //                   title={parent.title}
    //                   childrenMenu={parent.children!}
    //                 />
    //               )}
    //             </div>
    //           );
    //         })}
    //       </div>
    //     </AccordionContent>
    //   </AccordionItem>
    // </Accordion>
  );
};
