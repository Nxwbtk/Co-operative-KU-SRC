"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { LoaderCircleIcon, TrashIcon } from "lucide-react";
// import { deleteStdClub } from "../_actions/delete-std-club";
import { toast } from "sonner";
import { useState } from "react";
import { deleteOStd } from "../_actions/delete-ostd";

export type TDeleteOStdBtnProps = {
  id: string;
  year: string;
  awardId: string;
};

export const DeleteOStdBtn = ({ id, year, awardId }: TDeleteOStdBtnProps) => {
  const [loading, setLoading] = useState(false);
  const handleDelete = async () => {
    setLoading(true);
    const res = await deleteOStd({ year: year, id: id, award: awardId });
    if (res.error) {
      toast.error("ลบไม่สำเร็จ");
    } else {
      toast.success("ลบสำเร็จ");
    }
    setLoading(false);
  };
  return (
    <Popover>
      <PopoverTrigger>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="destructive" size="icon">
                <TrashIcon size={16} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>ลบ</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </PopoverTrigger>
      <PopoverContent>
        <div className="flex flex-col gap-2">
          <h1 className="text-lg font-bold">คุณต้องการลบใช่หรือไม่</h1>
          <p className="text-sm font-thin">การลบจะไม่สามารถกู้คืนได้</p>
          <div className="flex flex-row gap-2 justify-end">
            <Button variant="outline" size="sm">
              ยกเลิก
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={handleDelete}
              disabled={loading}
            >
              {loading ? (
                <LoaderCircleIcon className="animate-spin" size={16} />
              ) : (
                "ลบ"
              )}
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
