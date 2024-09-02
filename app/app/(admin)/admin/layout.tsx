import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "../sign-in/_components/providers";
import { AdminSidebar } from "./_components/side-bar";
import getMyServerSession from "@/lib/my-server-session";
import { redirect } from "next/navigation";

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
  return (
    <>
      <div>
        <AuthProvider>
          <div className="flex flex-row h-[80vh]">
            <TooltipProvider delayDuration={0}>
              <AdminSidebar isadmin={isAdmin} />
              <div className="flex-1 w-full px-8 pb-40">{children}</div>
            </TooltipProvider>
            <div className="absolute top-0 right-0 m-4 p-2 bg-white border border-gray-300 shadow-lg">
              Top Right Content
            </div>
          </div>
        </AuthProvider>
      </div>
    </>
  );
}
