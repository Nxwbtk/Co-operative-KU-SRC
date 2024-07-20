"use client";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import background from "@/public/background.png";
import { ClubScreen } from "./_components/club-screen";

export default function Home() {
  return (
    <main className="flex flex-col items-center min-h-screen flex-grow bg-gray-100">
      <div className="absolute -z-10">
        <Image
          src={background}
          layout="fill"
          objectFit="cover"
          quality={100}
          alt="background"
        />
      </div>
      <div className="flex flex-row pt-36">
        <Tabs defaultValue="club-chart" className="w-full">
          <TabsList className="w-[90vw] border-[#302782] h-auto rounded-full border-2 text-[#302782] bg-[#302782] gap-1">
            <TabsTrigger
              value="alumni"
              className="w-full text-2xl p-4 rounded-l-full bg-white"
              disabled
            >
              สมาคมศิษย์เก่า
            </TabsTrigger>
            <TabsTrigger
              value="club-chart"
              className="w-full text-2xl p-4 data-[state=active]:bg-[#F5B21F] bg-white"
            >
              ทำเนียบนายกสโม
            </TabsTrigger>
            <TabsTrigger
              value="outstanding-alumni"
              className="w-full text-2xl p-4 rounded-r-full  data-[state=active]:bg-[#F5B21F] bg-white"
            >
              ทำเนียบศิษย์เก่าดีเด่น
            </TabsTrigger>
          </TabsList>
          <TabsContent value="club-chart">
            <ClubScreen />
          </TabsContent>
          <TabsContent value="outstanding-alumni">
            Change your password here.
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
