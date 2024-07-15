import { CalendarDays } from "lucide-react"
import { ChevronDown } from 'lucide-react';
 
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
export const InformationMenu = () => {
  return (
    <HoverCard openDelay={0} closeDelay={0}>
      <HoverCardTrigger asChild>
        <Button variant="link" className="text-[#302782]">เกี่ยวกับคณะ &nbsp;<ChevronDown size={16} /></Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-fit" side="bottom">
        <div className="flex flex-col">
          Hello
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}