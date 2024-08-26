import {
  SelectScrollable,
  SelectScrollableSkeleton,
} from "@/components/select/select.component";
import { useEffect, useState } from "react";
import { ALUMNI, YEAROPTIONS } from "./alumni-config";
import {
  OutStandingNisitSection,
  OutStandingNisitSectionSkeleton,
} from "./alumni-card";
import { TAlumniData } from "./types";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getOstdByYear } from "./_actions/get-ostd-by-year";
import { getTypeOfAward } from "@/app/(admin)/admin/outstanding-student/_actions/get-type-of-award";
import { TOption } from "@/app/(admin)/admin/types";
import { TOptionsGroup } from "@/components/select/types";
import { getAllMajor } from "@/app/(admin)/admin/club/_actions/get-faculty-major";

type TNisitData = {
  honorific: string;
  firstName: string;
  lastName: string;
  majorId: string;
  year: string;
  _id: string;
};

type TTypeOfOutstanding = {
  typeOfOutstanding: string;
  nisitData: TNisitData[];
  _id: string;
};

export type TOutStandingData = {
  _id: string;
  academicYear: string;
  data: TTypeOfOutstanding[];
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export const AlumniScreen = () => {
  const [year, setYear] = useState<string>(
    (new Date().getFullYear() + 543).toString()
  );
  const [alumniData, setAlumniData] = useState<TAlumniData[]>([]);
  const [disPlayData, setDisplayData] = useState<TAlumniData[]>([]);
  const [typeOfAwardOptions, setTypeOfAward] = useState<TOptionsGroup[]>([]);
  const [selectedTypeOfAward, setSelectedTypeOfAward] = useState<string>("");
  const [loading, setIsloading] = useState<boolean>(true);
  const [major, setMajor] = useState<TOption[]>([]);

  useEffect(() => {
    const fetchTypeOfAward = async () => {
      setIsloading(true);
      const [awardRes, majorRes] = await Promise.all([
        getTypeOfAward(),
        getAllMajor(),
      ]);
      if (!awardRes.error) {
        const body = [
          {
            label: "ประเภทรางวัล",
            options: [
              { value: "all", label: "ทั้งหมด" },
              ...awardRes.data.map((award: { _id: string; name: string }) => ({
                value: award._id,
                label: award.name,
              })),
            ],
          },
        ];
        setTypeOfAward(body);
      }

      if (majorRes.data) {
        setMajor(
          majorRes.data.map((major: { _id: string; name: string }) => ({
            value: major._id,
            label: major.name,
          }))
        );
      } else {
        setMajor([]);
      }
      setIsloading(false);
    };
    fetchTypeOfAward();
  }, []);

  useEffect(() => {
    const fetchDataByYear = async () => {
      if (!typeOfAwardOptions.length || !major.length) {
        return;
      }

      setIsloading(true);
      const res = await getOstdByYear((parseInt(year) - 543).toString());
      if (!res.data) {
        setIsloading(false);
        return;
      }

      const newObj = res.data.data.map((data) => {
        return {
          awardId: data.typeOfOutstanding,
          award: typeOfAwardOptions[0]
            ? typeOfAwardOptions[0].options.find(
                (option) => option.value === data.typeOfOutstanding
              )!.label
            : "",
          nisitData: data.nisitData.map((nisit) => {
            return {
              major: major.find((m) => m.value === nisit.majorId)
                ? major.find((m) => m.value === nisit.majorId)!.label
                : "",
              ...nisit,
            };
          }),
        };
      });

      setDisplayData(newObj);
      setAlumniData(newObj);
      setIsloading(false);
    };

    fetchDataByYear();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [year, typeOfAwardOptions, major]);

  useEffect(() => {
    if (selectedTypeOfAward === "all") {
      setDisplayData(alumniData);
      return;
    }
    const filterData = alumniData.filter(
      (data) => data.awardId === selectedTypeOfAward
    );
    setDisplayData(filterData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTypeOfAward]);

  if (loading) {
    return (
      <>
        <div className="pt-4 gap-4">
          <div className="flex flex-col lg:self-start sm:flex-row gap-2">
            <div className="self-start">
              <SelectScrollableSkeleton />
            </div>
            <div className="self-start">
              <SelectScrollableSkeleton />
            </div>
          </div>
          <div className="flex flex-col gap-2 justify-start self-start">
            <OutStandingNisitSectionSkeleton />
          </div>
        </div>
      </>
    );
  }
  return (
    <div className="flex flex-col items-center pt-4 gap-4 pb-4">
      <div className="flex flex-col lg:self-start sm:flex-row gap-2">
        <div className="self-start">
          <SelectScrollable
            placeholder={"เลือกปีการศึกษา"}
            optionsGroup={YEAROPTIONS}
            onValueChange={(value) => {
              setYear(value);
            }}
            defaultValue={year}
          />
        </div>
        <div className="self-start">
          <SelectScrollable
            placeholder={"เลือกด้าน"}
            optionsGroup={typeOfAwardOptions}
            onValueChange={(value) => {
              setSelectedTypeOfAward(value);
            }}
            defaultValue={selectedTypeOfAward}
          />
        </div>
      </div>
      {year == "" ? (
        <div className="border border-[#F5B21F] bg-white rounded-md p-4">
          <h1>กรุณาเลือกปีการศึกษาเพื่อดูข้อมูล</h1>
        </div>
      ) : (
        <div className="flex flex-col gap-2 self-start">
          {disPlayData.length === 0
            ? "ไม่พบข้อมูล"
            : disPlayData.map((alumni, index) => (
                <OutStandingNisitSection
                  key={index}
                  award={alumni.award}
                  nisitData={alumni.nisitData}
                />
              ))}
        </div>
      )}
    </div>
  );
};
