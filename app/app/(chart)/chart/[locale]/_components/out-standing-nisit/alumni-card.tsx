import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { TAlumniData } from "./types";
import { User } from "lucide-react";
import Whale from "@/public/Whalel.png";

export type TNisitCardProps = TAlumniData;

export const NisitCard = (props: TNisitCardProps) => {
  const { honorific, first_name, last_name, year, majorName, image } = props;
  return (
    <Card className="w-[320px] flex flex-col items-center justify-center border-2 border-[#302782]">
      <CardHeader>
        <CardTitle>
          <Image
            src={image === '' ? Whale: image}
            width={173}
            height={174}
            alt="profile-img"
            className="rounded border border-[#F5B21F]"
          />
        </CardTitle>
      </CardHeader>
      <CardContent className="text-[#302782]">
        <div className="p-4">
          <h3 className="font-bold text-center text-lg text-[#302782] mb-2">
            {`${honorific} ${first_name} ${last_name}`}
          </h3>
          <div className="space-y-1">
            <p className="text-center text-sm bg-[#F5B21F] text-[#302782] py-1 px-2 rounded-full font-medium">
              สาขา{majorName}
            </p>
            {year !== "-1" && (
              <p className="text-center text-sm bg-[#302782] text-[#F5B21F] py-1 px-2 rounded-full font-medium">
                ชั้นปีที่ {year}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export type TAlumniProps = {
  award: string;
  nisitData: TNisitCardProps[];
};

export const OutStandingNisitSection = (props: TAlumniProps) => {
  // const { name, type, major, img } = props;
  const { award, nisitData } = props;
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-8 sm:py-12 flex flex-col items-center justify-center">
        <div className="w-full sm:max-w-md md:max-w-full">
          <h1 className="text-[#302782] text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-center sm:text-left">
            รางวัล {award}
          </h1>
          <Separator className="bg-[#F5B21F] lg:w-1/2 mb-6 sm:mb-8" />
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {nisitData.map((nisit) => (
              <NisitCard key={nisit._id} {...nisit} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const SkeletonCard = () => (
  <div className="bg-gray-200 animate-pulse shadow-md rounded-lg p-4 m-2">
    <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
    <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
    <div className="h-4 bg-gray-300 rounded w-1/3"></div>
  </div>
);

export const OutStandingNisitSectionSkeleton = () => (
  <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="py-8 sm:py-12 flex flex-col items-center justify-center">
      <div className="w-full sm:max-w-md md:max-w-full">
        <div className="h-8 bg-gray-300 rounded w-1/2 mb-4 mx-auto sm:mx-0"></div>
        <div className="bg-[#F5B21F] lg:w-1/2 mb-6 sm:mb-8 h-1"></div>
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      </div>
    </div>
  </div>
);
