"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export const MyUser = () => {
  return (
    <Popover>
      <PopoverTrigger asChild className="hover:cursor-pointer">
        {/* <Button variant="outline"> */}
        <Avatar>
          <AvatarImage src="" alt="avatar" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
        {/* </Button> */}
      </PopoverTrigger>
      <PopoverContent className="w-80"></PopoverContent>
    </Popover>
  );
};
