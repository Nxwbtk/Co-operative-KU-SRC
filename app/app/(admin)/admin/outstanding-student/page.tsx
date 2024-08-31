import getMyServerSession from "@/lib/my-server-session";
import { redirect } from "next/navigation";
import { OutStandingNisitAdminScreen } from "./_components/outstanding-std-screen";
import { getNisitOutstanding } from "./_actions/get-std-outstanding";
import { getScienceFacultyMajors } from "../club/_actions/get-science-faculty-majors";
import { getTypeOfAward } from "./_actions/get-type-of-award";
import { HandleDataComponent } from "./_components/data.component";
import { TOutStandingData } from "./types";

export default async function OutStandingNisitAdmin() {
  const session = await getMyServerSession();
  if (!session) {
    redirect("/sign-in");
  }
  const [nisitOutstanding, scienceMajor, award] = await Promise.all([
    getNisitOutstanding(),
    getScienceFacultyMajors(),
    getTypeOfAward(),
  ]);
    const error = award.error || scienceMajor.error || nisitOutstanding.error;
  
  if (!award.data || !scienceMajor.data || !nisitOutstanding.data) {
    return <div>{error}</div>;
  }

  const dataMod: TOutStandingData[] = nisitOutstanding.data.map((item) => {
    return {
      ...item,
      majorName:
        scienceMajor.data?.majorsAndId.find((m) => m._id === item.major_id)
          ?.name ?? "",
      typeOfOutStandingName:
        award.data.find((a) => a._id === item.type_of_award_id)?.name ?? "",
    };
  })
  return (
    <div>
      <OutStandingNisitAdminScreen />
      <HandleDataComponent
        data={dataMod}
        allMajors={scienceMajor.data.majorsAndId}
        allAwards={award.data}
      />
    </div>
  );
}
