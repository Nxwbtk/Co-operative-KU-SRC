import getMyServerSession from "@/lib/my-server-session";
import { redirect } from "next/navigation";
import { OutstandingStudentAdminScreen } from "./_components/outstanding-std-screen";

export default async function OutstandingStudentAdmin() {
  const session = await getMyServerSession();
  if (!session) {
    redirect("/sign-in");
  };
  return (
    <div>
      <OutstandingStudentAdminScreen />
    </div>
  );
}