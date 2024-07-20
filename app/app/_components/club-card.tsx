import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import profileImge from "@/public/profile.png";

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
      <CardContent>
        <div className="border border-[#F5B21F] flex flex-col justify-center items-center rounded-sm p-2">
          <h1>บุญทกานต์ ศิริกมลทิพย์</h1>
          <h2>ประธานสโมสร</h2>
          <p>ชั้นปีที่ 4 </p>
          <p>คณะวิทยาศาสตร์ ศรีราชา </p>
          <p>สาขาวิทยาการคอมพิวเตอร์</p>
        </div>
      </CardContent>
    </Card>
  );
};
