import { redirect } from "next/navigation";
import { PortalScreen } from "./_components/portal-screen";
import getMyServerSession from "@/lib/my-server-session";
import { Suspense } from "react";
import { Topbar } from "./_components/topbar";
import {
  getAmountSmo,
  getNisitOutstandingAmount,
} from "./_actions/get-amount";
import { getScienceFacultyMajors } from "./club/_actions/get-science-faculty-majors";
import { getTypeOfAward } from "./outstanding-student/_actions/get-type-of-award";
import { TPayloadDashboard } from "./types";

export default async function Page() {
  const session = await getMyServerSession();
  if (!session) {
    redirect("/sign-in");
  }
  const [getStdClub, getOStd, getMajor, getTypeOfAwards] = await Promise.all([
    getAmountSmo(),
    getNisitOutstandingAmount(),
    getScienceFacultyMajors(),
    getTypeOfAward(),
  ]);

  if (
    !getStdClub.data ||
    !getOStd.data ||
    !getMajor.data ||
    !getTypeOfAwards.data
  ) {
    return <div>Failed to fetch</div>;
  }
  const payload: TPayloadDashboard = {
    majorsData: getMajor.data.majorsAndId,
    awardsData: getTypeOfAwards.data,
    amountData: [
      {
        title: "จำนวนสมาชิกสโมสรนิสิต",
        amount: getStdClub.data,
      },
      {
        title: "จำนวนนิสิตดีเด่น",
        amount: getOStd.data,
      },
      {
        title: "จำนวนสาขาวิชา",
        amount: getMajor.data.majorsAndId.length,
      },
      {
        title: "จำนวนประเภทรางวัล",
        amount: getTypeOfAwards.data.length,
      },
    ],
  };
  return (
    <>
      <Suspense fallback={<Topbar.Skeleton />}>
        <Topbar labels={["หน้าหลัก"]} />
      </Suspense>
      <PortalScreen {...payload} />
    </>
  );
}
