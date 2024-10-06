import { redirect } from "next/navigation";
import { PortalScreen } from "./_components/portal-screen";
import getMyServerSession from "@/lib/my-server-session";
import { Suspense } from "react";
import { Topbar } from "./_components/topbar";
import { getAmountSmo, getNisitOutstandingAmount } from "./_actions/get-amount";
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

  const payload: TPayloadDashboard = {
    majorsData: getMajor.data ? getMajor.data.majorsAndId.map((item) => {
      const stdclublen = getStdClub.data?.filter((stdclub) => stdclub.major === item._id).length ?? 0;
      const ostdlen = getOStd.data?.filter((ostd) => ostd.major_id === item._id).length ?? 0;
      const total = stdclublen + ostdlen;
      return {
        ...item,
        studentAmount: total,
      }
    }) : [],
    awardsData: getTypeOfAwards.data?.map((item) => {
      const ostdlen = getOStd.data?.filter((ostd) => ostd.type_of_award_id === item._id).length ?? 0;
      return {
        ...item,
        studentAmount: ostdlen,
      }
    }) ?? [],
    amountData: [
      {
        title: "จำนวนสมาชิกสโมสรนิสิต",
        amount: getStdClub.data?.length ?? 0,
      },
      {
        title: "จำนวนนิสิตดีเด่น",
        amount: getOStd.data?.length ?? 0,
      },
      {
        title: "จำนวนสาขาวิชา",
        amount: getMajor.data ? getMajor.data.majorsAndId.length : 0,
      },
      {
        title: "จำนวนประเภทรางวัล",
        amount: getTypeOfAwards.data ? getTypeOfAwards.data.length : 0,
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
