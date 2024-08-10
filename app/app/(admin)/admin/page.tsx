import { getServerSession } from "next-auth";
import { LogoutBtn } from "./_components/logout-btn";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth-options";
import { PortalScreen } from "./_components/portal-screen";

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/sign-in");
  }
  return (
    <PortalScreen />
  );
}
