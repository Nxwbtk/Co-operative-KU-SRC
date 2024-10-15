"use client";

import { useState } from "react";
import { TDeleteAwardBtnProps } from "../types";
import { toast } from "sonner";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { LoaderCircleIcon, TrashIcon } from "lucide-react";
import { deleteAward } from "../_actions/delete-award";

export const DeleteAwardBtn = (props: TDeleteAwardBtnProps) => {
  const { isDeleteable = false, awardId } = props;
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const handleDelete = async () => {
    setLoading(true);
    const res = await deleteAward({ id: awardId! });
    if (res.error) {
      toast.error("ลบไม่สำเร็จ");
    } else {
      toast.success("ลบสำเร็จ");
    }
    setLoading(false);
  };
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="destructive" size="icon" disabled={isDeleteable}>
          <TrashIcon size={16} />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="flex flex-col gap-2">
          <h1 className="text-lg font-bold">คุณต้องการลบใช่หรือไม่</h1>
          <p className="text-sm font-thin">การลบจะไม่สามารถกู้คืนได้</p>
          <div className="flex flex-row gap-2 justify-end">
            <Button variant="outline" size="sm" onClick={() => setOpen(false)}>
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