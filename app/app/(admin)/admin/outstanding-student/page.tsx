import getMyServerSession from "@/lib/my-server-session";
import { redirect } from "next/navigation";
import { OutstandingStudentAdminScreen } from "./_components/outstanding-std-screen";
import { getNisitOutstanding } from "./_actions/get-std-outstanding";
import { getScienceFacultyMajors } from "../club/_actions/get-science-faculty-majors";
import { getTypeOfAward } from "./_actions/get-type-of-award";
import { HandleDataComponent } from "./_components/data.component";

export default async function OutstandingStudentAdmin() {
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
  // console.log(nisitOutstanding.data);
  let data = [];
  data = nisitOutstanding.data.flatMap((item) => {
    return item.data.flatMap((t) => {
      return t.nisitData.map((n) => {
        return {
          ...n,
          majorName:
            scienceMajor.data?.majorsAndId.find((m) => m._id === n.majorId)
              ?.name ?? "",
          typeOfOutstandingId: t.typeOfOutstanding,
          typeOfOutStandingName:
            award.data.find((a) => a._id === t.typeOfOutstanding)?.name ?? "",
          academicYear: item.academicYear,
        };
      });
    });
  });
  return (
    <div>
      <OutstandingStudentAdminScreen />
      <HandleDataComponent
        data={data}
        allMajors={scienceMajor.data.majorsAndId}
        allAwards={award.data}
      />
    </div>
  );
}
