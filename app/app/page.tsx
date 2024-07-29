"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ClubScreen } from "./_components/club/club-screen";
import { AlumniScreen } from "./_components/alumni/alumi-screen";
import "./globals.css";

export default function Home() {
  const backgroundImageStyle = {
    backgroundImage:
      "linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url(/background.png)",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundAttachment: "fixed",
    width: "100%",
    height: "100%",
    position: undefined, // Change the type of position to 'Position | undefined'
    top: 0,
    left: 0,
    zIndex: -1,
  };
  return (
    <main
      className="flex flex-col items-center min-h-screen flex-grow"
      style={backgroundImageStyle}
    >
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
            <AlumniScreen />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
