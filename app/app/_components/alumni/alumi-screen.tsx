import { SelectScrollable } from "@/components/select/select.component";
import { useEffect, useState } from "react";
import { ALUMNI, YEAROPTIONS } from "./alumni-config";
import { AlumniCard } from "./alumni-card";
import { TAlumniData } from "./types";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export const AlumniScreen = () => {
  const [year, setYear] = useState<string>((new Date().getFullYear() + 543).toString());
  const [alumniData, setAlumniData] = useState<TAlumniData[]>([]);
  useEffect(() => {
    const data = ALUMNI.find((alumni) => alumni.year === year);
    if (data) {
      setAlumniData(data.data);
    } else {
      setAlumniData([]);
    }
  }, [year]);
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
      {year == "" ? (
        <div className="border border-[#F5B21F] bg-white rounded-md p-4">
          <h1>
            กรุณาเลือกปีการศึกษาเพื่อดูข้อมูล
          </h1>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {alumniData.length === 0
            ? "ไม่พบข้อมูล"
            : alumniData.map((alumni, index) => (
                <AlumniCard
                  key={index}
                  name={alumni.name}
                  type={alumni.type}
                  major={alumni.major}
                  img={alumni.img}
                />
              ))}
        </div>
      )}
    </div>
  );
};
