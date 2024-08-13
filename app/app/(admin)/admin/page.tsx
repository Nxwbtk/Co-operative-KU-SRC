import { redirect } from "next/navigation";
import { PortalScreen } from "./_components/portal-screen";
import getMyServerSession from "@/lib/my-server-session";

export default async function Page() {
  const session = await getMyServerSession();
  if (!session) {
    redirect("/sign-in");
  }
  return (
    <PortalScreen />
  );
}
