import { ManageClubScreen } from "./_components/manage-club-screen";
import { redirect } from "next/navigation";
import getMyServerSession from "@/lib/my-server-session";
import { getAllFaculty, getAllMajor } from "./_actions/get-faculty-major";
import { DataClubComponent } from "./_components/data-component";
import { getAllStdClub } from "./_actions/get-club-member";

export default async function ManageClubPage() {
  const session = await getMyServerSession();
  if (!session) {
    redirect("/sign-in");
  }
  const [allFaculty, allStudentClub, allMajor] = await Promise.all([
    getAllFaculty(),
    getAllStdClub(),
    getAllMajor(),
  ]);
  return (
    <>
      <ManageClubScreen />
      <DataClubComponent
        facultyData={allFaculty.data ?? []}
        allStudentClub={allStudentClub.data ?? []}
        allMajor={allMajor.data ?? []}
      />
    </>
  );
}
