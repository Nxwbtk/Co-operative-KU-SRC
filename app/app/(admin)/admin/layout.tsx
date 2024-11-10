import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "../sign-in/_components/providers";
import { AdminSidebar } from "./_components/side-bar";
import getMyServerSession from "@/lib/my-server-session";
import { redirect } from "next/navigation";
import { TopbarSMSizeAdmin } from "./_components/top-bar-sm-size";
import { MyUser } from "./_components/my-user";
import { ClearCacheProvider, useClearCacheCtx } from 'react-clear-cache';


export const metadata = {
  title: "จัดการระบบ",
  description: "จัดการระบบ",
};

export default async function SignInLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const session = await getMyServerSession();
  if (!session) {
    redirect("/sign-in");
  }
  const isAdmin = session.user.role.includes("SUPER_ADMIN");
  const myData = await fetch(
    `${process.env.FE_URL}/api/me/${session.user.id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessToken}`,
      },
      next: {
        tags: ["myData"],
      },
      cache: "no-store"
    }
  );
  if (!myData.ok) {
    redirect("/sign-in");
  }
  const myUserData = await myData.json();
  return (
    <>
      <div>
        <AuthProvider>
          <ClearCacheProvider duration={5000}>
          <div className="flex flex-row">
            <TooltipProvider delayDuration={0}>
              <AdminSidebar isadmin={isAdmin} />
              {/* <TopbarSMSizeAdmin /> */}
              <div className="flex-1 w-full px-8 pb-40">{children}</div>
            </TooltipProvider>
            <div className="absolute top-0 right-0 m-4 p-2">
              <MyUser data={myUserData} />
            </div>
          </div>
          </ClearCacheProvider>
        </AuthProvider>
      </div>
    </>
  );
}
