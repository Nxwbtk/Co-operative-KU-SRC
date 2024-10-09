import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";

type TClubCardProps = {
  data: {
    honorific: string;
    name: string;
    clubPosition: string;
    year: string;
    faculty: string;
    major: string;
    imgUrl: string;
    academicYear: string;
    img: string;
  };
};

export const ClubCard = (props: TClubCardProps) => {
  const { data } = props;
  return (
    <Card className="w-[320px] flex flex-col items-center justify-center border-2 border-[#302782]">
      <CardHeader>
        <CardTitle>
          <Image
            src={data.img}
            width={173}
            height={174}
            alt="profile-img"
            className="rounded border border-[#F5B21F]"
          />
        </CardTitle>
      </CardHeader>
      <CardContent className="text-[#302782]">
        <div className="border border-[#F5B21F] flex flex-col justify-center items-center rounded-md px-2 w-[230px]">
          <h1 className="font-bold text-md text-center">{data.honorific}{data.name}</h1>
          <h2 className="text-center">ตำแหน่ง {data.clubPosition}</h2>
          {/* <p className="text-sm">ชั้นปีที่ {data.year} </p> */}
          {/* <p className="text-sm">{data.faculty}</p> */}
          <p className="text-sm text-center">สาขาวิชา{data.major}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export const ClubCardSkeleton = () => {
  return (
    <div className="flex justify-center items-center h-[60vh]">
      <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
    </div>
  );
};
