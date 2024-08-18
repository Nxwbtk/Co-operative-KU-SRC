import { useEffect, useState } from "react";
import { ClubCard, ClubCardSkeleton } from "./club-card";
import { getAllStdClub } from "@/app/(admin)/admin/club/_actions/get-club-member";
import { TGetClubMember } from "@/app/(admin)/admin/club/_actions/types";
import {
  getAllFaculty,
  getAllMajor,
} from "@/app/(admin)/admin/club/_actions/get-faculty-major";
import { SelectScrollable } from "@/components/select/select.component";
import { YEAROPTIONS } from "../alumni/alumni-config";
import { InfoIcon } from "lucide-react";

export const ClubScreen = () => {
  const [stdClubData, setStdClubData] = useState<TGetClubMember[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [year, setYear] = useState<string>(
    (new Date().getFullYear() + 543).toString()
  );
  const [displayData, setDisplayData] = useState<TGetClubMember[]>([]);
  useEffect(() => {
    const fetchStdClub = async () => {
      const [stdClub, faculty, major] = await Promise.all([
        getAllStdClub(),
        getAllFaculty(),
        getAllMajor(),
      ]);
      if (!stdClub.data || !faculty.data || !major.data) {
        return;
      }
      const data: TGetClubMember[] = stdClub.data.map((std) => {
        const facultyData = faculty.data.find((f) => f._id === std.faculty);
        const majorData = major.data.find((m) => m._id === std.major);
        return {
          ...std,
          faculty: facultyData!.name,
          major: majorData!.name,
        };
      });
      setStdClubData(data);
      setLoading(false);
    };
    fetchStdClub();
  }, []);
  useEffect(() => {
    setDisplayData(
      stdClubData.filter(
        (std) => (parseInt(std.academicYear) + 543).toString() === year
      )
    );
  }, [stdClubData, year]);
  return (
    <div className="flex flex-col items-center pt-4 gap-4 pb-4">
      <div className="self-start">
        <SelectScrollable
          placeholder={"เลือกปีการศึกษา"}
          optionsGroup={YEAROPTIONS}
          onValueChange={(value) => setYear(value)}
          defaultValue={year}
        />
      </div>
      <div className="flex flex-row flex-wrap gap-4">
        {year == "" ? (
          <div className="border border-[#F5B21F] bg-white rounded-md p-4">
            <h1>กรุณาเลือกปีการศึกษาเพื่อดูข้อมูล</h1>
          </div>
        ) : loading ? (
          <ClubCardSkeleton />
        ) : displayData.length === 0 ? (
          <div className="border border-[#F5B21F] bg-white rounded-md p-8 flex flex-col items-center justify-center shadow-lg gap-2">
            <InfoIcon size={48} className="text-[#F5B21F]" />
            <h1 className="text-xl font-bold text-gray-800">ไม่พบข้อมูล</h1>
            <p className="text-gray-600">กรุณาลองใหม่อีกครั้ง</p>
          </div>
        ) : (
          displayData.map((std, index) => {
            const body = {
              name: std.firstName + " " + std.lastName,
              clubPosition: std.clubPosition,
              year: std.year,
              faculty: std.faculty,
              major: std.major,
              imgUrl:
                std.imgUrl === ""
                  ? "https://avatars.githubusercontent.com/u/124599?v=4"
                  : std.imgUrl,
              academicYear: std.academicYear,
            };
            return <ClubCard key={index} data={body} />;
          })
        )}
      </div>
    </div>
  );
};
