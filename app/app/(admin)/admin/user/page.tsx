import { Suspense } from "react";
import { Topbar } from "../_components/topbar";
import { getUsers } from "./_actions/get-user";
import getMyServerSession from "@/lib/my-server-session";
import { redirect } from "next/navigation";
import { UserScreen } from "./_components/user-screen";

export default async function Page() {
  const session = await getMyServerSession();
  if (!session) {
    redirect("/sign-in");
  }
  if (!session.user.role.includes("SUPER_ADMIN")) {
    redirect("/admin");
  }
  const getUser = await getUsers();
  if (!getUser.data) {
    return <div>Failed to fetch</div>;
  }
  return (
    <>
      <Suspense fallback={<Topbar.Skeleton />}>
        <Topbar labels={["หน้าหลัก", "จัดการผู้ดูแล"]} />
      </Suspense>
      <UserScreen data={getUser.data} />
    </>
  );
}
