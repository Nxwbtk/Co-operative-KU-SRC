import { getServerSession } from "next-auth";
import { LogoutBtn } from "./_components/logout-btn";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth-options";

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/sign-in");
  }
  return (
    <div>
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <h1>Admin Page</h1>
      <LogoutBtn />
    </div>
  );
}
