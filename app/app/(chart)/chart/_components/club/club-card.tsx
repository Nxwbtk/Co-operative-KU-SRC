import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

export const ClubCard = () => {
  return (
    <Card className="w-[320px] flex flex-col items-center justify-center border-2 border-[#302782]">
      <CardHeader>
        <CardTitle>
          <Image
            src="https://avatars.githubusercontent.com/u/124599?v=4"
            width={173}
            height={174}
            alt="profile-img"
            className="rounded border border-[#F5B21F]"
          />
        </CardTitle>
      </CardHeader>
      <CardContent className="text-[#302782]">
        <div className="border border-[#F5B21F] flex flex-col justify-center items-center rounded-md px-2 w-[230px]">
          <h1>บุญทกานต์ ศิริกมลทิพย์</h1>
          <h2>ประธานสโมสร</h2>
          <p className="text-sm">ชั้นปีที่ 4 </p>
          <p className="text-sm">คณะวิทยาศาสตร์ ศรีราชา </p>
          <p className="text-sm">สาขาวิทยาการคอมพิวเตอร์</p>
        </div>
      </CardContent>
    </Card>
  );
};
