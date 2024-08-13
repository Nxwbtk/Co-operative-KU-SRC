import Link from "next/link";
import { Edit } from "lucide-react";

import { Button } from "@/components/ui/button";

export type IEditDataTableBtnProps = {
  nameIndex: string;
  href: string;
};

export function EditDataTableBtn({ nameIndex, href }: IEditDataTableBtnProps) {
  return (
    <Button
      size="sm"
      className="hidden h-8 m-auto lg:flex"
      id={`edit-${nameIndex}-btn`}
    >
      <Link href={href} prefetch={false}>
        <div className="flex space-x-1">
          <Edit size="15px" />
          <span>Edit</span>
        </div>
      </Link>
    </Button>
  );
}
