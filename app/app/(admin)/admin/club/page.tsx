import { ManageClubScreen } from "./_components/manage-club-screen";
import { redirect } from "next/navigation";
import getMyServerSession from "@/lib/my-server-session";
import { DataClubComponent } from "./_components/data-component";
import { getAllStdClub } from "./_actions/get-club-member";
import { getScienceFacultyMajors } from "./_actions/get-science-faculty-majors";
import { Suspense } from "react";

export default async function ManageClubPage() {
  const session = await getMyServerSession();
  if (!session) {
    redirect("/sign-in");
  }
  const [allStudentClub, scienceFacultyAndMajors] = await Promise.all([
    getAllStdClub(),
    getScienceFacultyMajors(),
  ]);
  if (!scienceFacultyAndMajors.data) {
    return <div>Failed to fetch</div>;
  }
  if (!allStudentClub.data) {
    return <div>Failed to fetch</div>;
  }
  return (
    <>
      <ManageClubScreen />
      <Suspense fallback={<div>Loading...</div>}>
        <DataClubComponent
          allStudentClub={allStudentClub.data}
          scienceFacultyAndMajors={scienceFacultyAndMajors.data}
        />
      </Suspense>
    </>
  );
}
