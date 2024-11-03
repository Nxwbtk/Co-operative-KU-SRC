import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "../sign-in/_components/providers";
import getMyServerSession from "@/lib/my-server-session";
import { redirect } from "next/navigation";
export const metadata = {
  title: "จัดการระบบ",
  description: "จัดการระบบ",
};

export default async function UploadLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const session = await getMyServerSession();
  if (!session) {
    redirect("/sign-in");
  }
  return (
    <>
      <div>
        <AuthProvider>
          <div className="flex flex-row">
            <TooltipProvider delayDuration={0}>
              {/* <TopbarSMSizeAdmin /> */}
              <div className="flex-1 w-full px-8 pb-40">{children}</div>
            </TooltipProvider>
            <div className="absolute top-0 right-0 m-4 p-2"></div>
          </div>
        </AuthProvider>
      </div>
    </>
  );
}
