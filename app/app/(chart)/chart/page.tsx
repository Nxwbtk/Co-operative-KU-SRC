"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ClubScreen } from "./_components/club/club-screen";
import { AlumniScreen } from "./_components/out-standing-nisit/alumi-screen";
import { AlumniClub } from "./_components/alumni-club";
// import "./globals.css";
export default function ChartPage () {
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
            <div className="flex flex-col pt-36 sm:flex-row">
        <Tabs defaultValue="club-chart" className="w-full">
          <TabsList className="w-full sm:w-[90vw] border-[#302782] h-auto rounded-full border-2 text-[#302782] bg-[#302782] gap-1">
            <TabsTrigger
              value="alumni-club"
              className="w-full lg:text-lg sm:text-base p-2 sm:p-4 rounded-l-full data-[state=active]:bg-[#F5B21F] bg-white"
            >
              สมาคมศิษย์เก่า
            </TabsTrigger>
            <TabsTrigger
              value="club-chart"
              className="w-full lg:text-lg sm:text-base p-2 sm:p-4 data-[state=active]:bg-[#F5B21F] bg-white"
            >
              ทำเนียบนายกสโมสรนิสิตฯ
            </TabsTrigger>
            <TabsTrigger
              value="outstanding-alumni"
              className="w-full lg:text-lg sm:text-base p-2 sm:p-4 rounded-r-full data-[state=active]:bg-[#F5B21F] bg-white"
            >
              นิสิตดีเด่น
            </TabsTrigger>
          </TabsList>
          <TabsContent value="alumni-club">
            <AlumniClub />
          </TabsContent>
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