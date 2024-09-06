"use client";
import { Button } from "@/components/ui/button";
import { PencilIcon } from "lucide-react";
import { useState } from "react";
import { CreateUserBtn } from "./create-user-btn";

export type TEditUserData = {
  honorific: string;
  image: string;
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string[];
};

export type TEditUserBtnProps = {
  data: TEditUserData;
}

export const EditUserBtn = (props: TEditUserBtnProps) => {
  const { data } = props;
  const [isOpen, setOpen] = useState(false);
  return (
    <>
      <Button size="icon" variant="outline" onClick={() => setOpen(prev => !prev)}>
        <PencilIcon size={16} />
      </Button>
      <CreateUserBtn isOpen={isOpen} setOpen={setOpen} data={data} isEdit />
    </>
  );
};
