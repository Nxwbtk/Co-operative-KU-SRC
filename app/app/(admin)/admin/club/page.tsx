import { ManageClubScreen } from "./_components/manage-club-screen";
import { redirect } from "next/navigation";
import getMyServerSession from "@/lib/my-server-session";
import { getAllFaculty } from "./_actions/get-faculty-major";
import { DataClubComponent } from "./_components/data-component";

export default async function ManageClubPage () {
  const session = await getMyServerSession();
  if (!session) {
    redirect("/sign-in");
  }
  const allFaculty = await getAllFaculty();
  return (
    <>
    <ManageClubScreen />
    <DataClubComponent facultyData={allFaculty.data ?? []} />
    </>
  );
}