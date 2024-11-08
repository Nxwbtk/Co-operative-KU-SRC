import {
  SelectScrollable,
  SelectScrollableSkeleton,
} from "@/components/select/select.component";
import { useEffect, useState } from "react";
import { YEAROPTIONS } from "./alumni-config";
import {
  OutStandingNisitSection,
  OutStandingNisitSectionSkeleton,
} from "./alumni-card";
import { TAlumniData } from "./types";
import { getOstd, getOstdByYear } from "./_actions/get-ostd-by-year";
import { getTypeOfAward } from "@/app/(admin)/admin/outstanding-student/_actions/get-type-of-award";
import { TOption } from "@/app/(admin)/admin/types";
import { TOptionsGroup } from "@/components/select/types";
import { getAllMajor } from "@/app/(admin)/admin/club/_actions/get-faculty-major";
import { NotFoundComponent } from "../not-found-component";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export type TOutStandingData = {
  _id: string;
  academic_year: string;
  honorific: string;
  first_name: string;
  last_name: string;
  year: string;
  major_id: string;
  type_of_award_id: string;
  image: string;
};

export const AlumniScreen = ({ locale }: { locale: string }) => {
  const [year, setYear] = useState<string>(
    (new Date().getFullYear() + 543).toString()
  );
  const [alumniData, setAlumniData] = useState<TAlumniData[]>([]);
  const [disPlayData, setDisplayData] = useState<TAlumniData[]>([]);
  const [typeOfAwardOptions, setTypeOfAward] = useState<TOptionsGroup[]>([]);
  const [selectedTypeOfAward, setSelectedTypeOfAward] = useState<string>("");
  const [loading, setIsloading] = useState<boolean>(true);
  const [major, setMajor] = useState<TOption[]>([]);
  const [yearOptions, setYearOptions] = useState<TOptionsGroup>({
    label: locale === "th" ? "ปีการศึกษา" : "Academic Year",
    options: [],
  });

  useEffect(() => {
    const fetchTypeOfAward = async () => {
      setIsloading(true);
      const [awardRes, majorRes, ostd] = await Promise.all([
        getTypeOfAward(),
        getAllMajor(),
        getOstd(),
      ]);
      if (!awardRes.data) {
        setIsloading(false);
        return;
      }
      if (!awardRes.error) {
        const sortedAwards = awardRes.data
          .sort((a, b) => a.name.localeCompare(b.name, "th"))
          .filter((award) => award.name !== "ศิษย์เก่าดีเด่น" && award.name !== "ด้านอื่นๆ" && award.name !== "ด้านใหม่");

        const finalAwards = [
          ...sortedAwards,
          ...awardRes.data.filter((award) => award.name === "ศิษย์เก่าดีเด่น"),
        ];
        const body = [
          {
            label: locale === "th" ? "ประเภทรางวัล" : "Type of Award",
            options: [
              { value: "all", label: locale === "th" ? "ทั้งหมด" : "All" },
              ...finalAwards.map((award: { _id: string; name: string }) => ({
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
      if (!ostd.data) {
        return;
      }
      setYearOptions({
        label: locale === "th" ? "ปีการศึกษา" : "Academic Year",
        options: ostd.data.map((data: string) => ({
          value: (parseInt(data) + 543).toString(),
          label: `${locale === "th" ? "ปีการศึกษา" : ""} ${
            locale === "th" ? (parseInt(data) + 543).toString() : data
          }`,
        })),
      });
      setYear((parseInt(ostd.data[0]) + 543).toString());
    };
    fetchTypeOfAward();
  }, [locale]);

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
      const newObj = res.data.map((data: TOutStandingData) => {
        return {
          awardName: typeOfAwardOptions[0]
            ? typeOfAwardOptions[0].options.find(
                (option) => option.value === data.type_of_award_id
              )!.label
            : "",
          majorName: major.find((m) => m.value === data.major_id)
            ? major.find((m) => m.value === data.major_id)!.label
            : "",
          ...data,
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
      (data) => data.type_of_award_id === selectedTypeOfAward
    );
    setDisplayData(filterData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTypeOfAward]);

  if (locale !== "th") {
    return (
      <Card className="w-full max-w-sm mx-auto border-2 border-[#F5B21F]">
        <CardHeader className="bg-[#302782] text-white">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Outstanding Data</h3>
            <Badge variant="secondary" className="bg-[#F5B21F] text-[#302782]">
              N/A
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex flex-col items-center justify-center h-24">
            <p className="text-2xl font-bold text-[#302782]">
              Data Unavailable
            </p>
            <p className="mt-2 text-sm text-gray-500 text-center">
              Not available in {locale === "th" ? "ไทย" : "English"}
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }
  if (loading) {
    return (
      <>
        <div className="pt-4 gap-4">
          <div className="flex flex-col lg:self-start sm:flex-row gap-2">
            <div className="flex flex-col items-start justify-start">
              <span className="px-4 py-1 mb-2 text-base font-semibold text-white bg-[#302782] rounded-lg">
                ปีการศึกษา
              </span>
              <SelectScrollableSkeleton />
            </div>
            <div className="flex flex-col items-start justify-start">
              <span className="px-4 py-1 mb-2 text-base font-semibold text-white bg-[#302782] rounded-lg">
                ประเภทรางวัล
              </span>
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
        <div className="flex flex-col items-start justify-start">
          <span className="px-4 py-1 mb-2 text-base font-semibold text-white bg-[#302782] rounded-lg">
            ปีการศึกษา
          </span>
          {!loading ? (
            <SelectScrollable
              placeholder={
                locale === "th" ? "เลือกปีการศึกษา" : "Academic Year"
              }
              optionsGroup={[yearOptions]}
              onValueChange={(value) => {
                setYear(value);
              }}
              defaultValue={year}
            />
          ) : (
            <SelectScrollableSkeleton />
          )}
        </div>
        <div className="flex flex-col items-start justify-start">
          <span className="px-4 py-1 mb-2 text-base font-semibold text-white bg-[#302782] rounded-lg">
            ประเภทรางวัล
          </span>
          <SelectScrollable
            placeholder={
              locale === "th" ? "เลือกประเภทรางวัล" : "Select Type of Award"
            }
            optionsGroup={typeOfAwardOptions}
            onValueChange={(value) => {
              setSelectedTypeOfAward(value);
            }}
            defaultValue={selectedTypeOfAward}
          />
        </div>
      </div>
      {year === "" ? (
        <div className="border border-[#F5B21F] bg-white rounded-md p-4">
          <h1>
            {locale === "th"
              ? "กรุณาเลือกปีการศึกษาเพื่อดูข้อมูล"
              : "Please select academic year to view data"}
          </h1>
        </div>
      ) : (
        <div className="flex flex-col gap-2 self-center">
          {disPlayData.length === 0 ? (
            <NotFoundComponent locale={locale} />
          ) : disPlayData.length > 0 ? (
            typeOfAwardOptions[0].options.map((award, i) => {
              const showData = disPlayData.filter(
                (i) => i.type_of_award_id === award.value
              );
              if (award.value === "all" || showData.length === 0) {
                return null;
              }
              return (
                <OutStandingNisitSection
                  key={i}
                  award={award.label}
                  nisitData={showData}
                />
              );
            })
          ) : (
            <NotFoundComponent locale={locale} />
          )}
        </div>
      )}
    </div>
  );
};
