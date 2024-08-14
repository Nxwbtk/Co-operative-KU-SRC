import { ManageClubScreen } from "./_components/manage-club-screen";
import { redirect } from "next/navigation";
import getMyServerSession from "@/lib/my-server-session";

export default async function ManageClubPage () {
  const session = await getMyServerSession();
  if (!session) {
    redirect("/sign-in");
  }
  return (
    <ManageClubScreen />
  );
}