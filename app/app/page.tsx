import Image from "next/image";
"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Home() {
  return (
    <main className="flex flex-col items-center min-h-screen justify-center flex-grow bg-gray-100">
      <Tabs defaultValue="account" className="w-full">
        <TabsList className="w-[750px] border border-black ">
          <TabsTrigger value="alumni" className="w-full" disabled>สมาคมศิษย์เก่า</TabsTrigger>
          <TabsTrigger value="club-chart" className="w-full">ทำเนียบนายกสโม</TabsTrigger>
          <TabsTrigger value="outstanding-alumni" className="w-full">ทำเนียบศิษย์เก่าดีเด่น</TabsTrigger>
        </TabsList>
        <TabsContent value="club-chart">
          Make changes to your account here.
        </TabsContent>
        <TabsContent value="outstanding-alumni">Change your password here.</TabsContent>
      </Tabs>
    </main>
  );
}
