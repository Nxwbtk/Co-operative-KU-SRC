"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { LoaderCircleIcon, TrashIcon } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { deleteUser } from "../_actions/delete-user";

export type TDeleteBtnProps = {
  id: string;
  name: string;
};

export const DeleteUserBtn = ({ id, name }: TDeleteBtnProps) => {
  const [loading, setLoading] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const handleDelete = async () => {
    setLoading(true);
    const res = await deleteUser({ id: id });
    if (res.error) {
      toast.error("ลบไม่สำเร็จ");
    } else {
      toast.success("ลบสำเร็จ");
    }
    setLoading(false);
  };
  return (
    <Popover open={isOpen} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="destructive" size="icon">
          <TrashIcon size={16} />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="flex flex-col gap-2">
          <h1 className="text-lg font-bold">คุณต้องการลบ #{name} ใช่หรือไม่</h1>
          <p className="text-sm font-thin">การลบจะไม่สามารถกู้คืนได้</p>
          <div className="flex flex-row gap-2 justify-end">
            <Button
              variant="outline"
              size="sm"
              type="reset"
              onClick={() => setOpen((prev) => !prev)}
            >
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
