import { ManageClubScreen } from "./_components/manage-club-screen";
import { redirect } from "next/navigation";
import getMyServerSession from "@/lib/my-server-session";
import { DataClubComponent } from "./_components/data-component";
import { getAllStdClub } from "./_actions/get-club-member";
import { getScienceFacultyMajors } from "./_actions/get-science-faculty-majors";
import { Suspense } from "react";
import { Topbar } from "../_components/topbar";

export default async function ManageClubPage() {
  const session = await getMyServerSession();
  if (!session) {
    redirect("/sign-in");
  }
  const [allStudentClub, scienceFacultyAndMajors] = await Promise.all([
    getAllStdClub(),
    getScienceFacultyMajors(),
  ]);
  return (
    <>
      <Suspense fallback={<Topbar.Skeleton />}>
        <Topbar labels={["หน้าหลัก", "จัดการนิสิตดีเด่น"]} />
      </Suspense>
      <ManageClubScreen />
      <Suspense fallback={<div></div>}>
        <DataClubComponent
          allStudentClub={allStudentClub.data ?? []}
          scienceFacultyAndMajors={
            scienceFacultyAndMajors.data ?? {
              _id: "",
              name: "",
              majors: [],
              __v: 0,
              createdAt: "",
              updatedAt: "",
              majorsAndId: [],
            }
          }
        />
      </Suspense>
    </>
  );
}
