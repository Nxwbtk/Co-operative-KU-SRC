import { useEffect, useState } from "react";
import { ClubCard, ClubCardSkeleton } from "./club-card";
import { getAllStdClub } from "@/app/(admin)/admin/club/_actions/get-club-member";
import { TGetClubMember } from "@/app/(admin)/admin/club/_actions/types";
import {
  getAllFaculty,
  getAllMajor,
} from "@/app/(admin)/admin/club/_actions/get-faculty-major";
import { SelectScrollable, SelectScrollableSkeleton } from "@/components/select/select.component";
import {
  generateYearOptions,
  YEAROPTIONS,
} from "../out-standing-nisit/alumni-config";
import { InfoIcon } from "lucide-react";
import { getScienceFacultyMajors } from "@/app/(admin)/admin/club/_actions/get-science-faculty-majors";
import { NotFoundComponent } from "../not-found-component";
import { TOptionsGroup } from "@/components/select/types";

export const ClubScreen = () => {
  const [stdClubData, setStdClubData] = useState<TGetClubMember[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [president, setPresident] = useState<TGetClubMember | null>(null);
  const [year, setYear] = useState<string>(
    (new Date().getFullYear() + 543).toString()
  );
  const [displayData, setDisplayData] = useState<TGetClubMember[]>([]);
  const [yearOptions, setYearOptions] = useState<TOptionsGroup>({
    label: "ปีการศึกษา",
    options: [],
  });
  useEffect(() => {
    const fetchStdClub = async () => {
      const [stdClub, facultyAndMajors] = await Promise.all([
        getAllStdClub(),
        getScienceFacultyMajors(),
      ]);
      if (!stdClub.data || !facultyAndMajors.data) {
        setStdClubData([]);
        setLoading(false);
        return;
      }
      const data: TGetClubMember[] = stdClub.data.map((std) => {
        const majorData = facultyAndMajors.data.majorsAndId.find(
          (m) => m._id === std.major
        );
        return {
          ...std,
          faculty: facultyAndMajors.data.name,
          major: majorData!.name,
        };
      });
      let yearFromStudent = data.map((std) => std.academicYear);
      const uniqueYears = yearFromStudent.filter(
        (year, index, self) => self.indexOf(year) === index
      );
      const yearOptionBody = {
        label: "ปีการศึกษา",
        options: generateYearOptions(
          Math.min(...uniqueYears.map((year) => parseInt(year) + 543))
        ),
      };
      setYearOptions(yearOptionBody);
      setStdClubData(data);
      setLoading(false);
    };
    fetchStdClub();
  }, []);
  useEffect(() => {
    const presidentWord = "นายก"; // The word you want to start with

    setPresident(
      stdClubData.find(
        (std) =>
          std.clubPosition.startsWith(presidentWord) &&
          (parseInt(std.academicYear) + 543).toString() === year
      ) || null
    );

    setDisplayData(
      stdClubData.filter(
        (std) =>
          (parseInt(std.academicYear) + 543).toString() === year &&
          !std.clubPosition.startsWith(presidentWord)
      )
    );
  }, [stdClubData, year]);

  return (
    <div className="flex flex-col items-center pt-4 gap-4 pb-4">
      <div className="self-start">
        {!loading ? (
          <SelectScrollable
            placeholder={"เลือกปีการศึกษา"}
            optionsGroup={[yearOptions]}
            onValueChange={(value) => setYear(value)}
            defaultValue={year}
          />
        ) : <SelectScrollableSkeleton />}
      </div>
      <div className="flex flex-row flex-wrap gap-4">
        {year == "" ? (
          <div className="border border-[#F5B21F] bg-white rounded-md p-4">
            <h1>กรุณาเลือกปีการศึกษาเพื่อดูข้อมูล</h1>
          </div>
        ) : loading ? (
          <ClubCardSkeleton />
        ) : displayData.length === 0 && !!!president ? (
          <NotFoundComponent />
        ) : (
          <div className="flex flex-col gap-2">
            {president && (
              <div className="flex justify-center">
                <ClubCard
                  data={{
                    honorific: president.honorific,
                    name: president.firstName + " " + president.lastName,
                    clubPosition: president.clubPosition,
                    year: president.year,
                    faculty: president.faculty,
                    major: president.major,
                    imgUrl:
                      president.imgUrl === ""
                        ? "https://avatars.githubusercontent.com/u/124599?v=4"
                        : president.imgUrl,
                    academicYear: president.academicYear,
                    img: president.img,
                  }}
                />
              </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {displayData.map((std, index) => {
                const body = {
                  honorific: std.honorific,
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
                  img: std.img,
                };
                return <ClubCard key={index} data={body} />;
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
