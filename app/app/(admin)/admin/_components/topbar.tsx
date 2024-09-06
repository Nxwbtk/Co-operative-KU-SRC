import getMyServerSession from "@/lib/my-server-session";
import { cn } from "@/lib/utils";
import { Breadcrumb } from "./bread-crumb";
import { Skeleton } from "@/components/ui/skeleton";

export type ITopbar = {
  className?: string;
  labels?: (string | null)[];
  session?: any;
};

export async function Topbar(props: ITopbar) {
  const { className, labels } = props;
  const session = await getMyServerSession();

  return (
    <div className={cn("flex justify-end items-center h-14 mb-6", className)}>
      <Breadcrumb labels={labels} />
      {session && (
        <div className="flex flex-row items-center gap-4">
          {/* TODO: fix later */}
          {/* <Notification /> */}
          {/* TODO: No profile */}
          {/* <UserNav profile={session?.user} /> */}
        </div>
      )}
    </div>
  );
}

Topbar.Skeleton = function TopbarSkeleton() {
  return (
    <div className="flex items-center justify-between mb-6 h-14">
      <Skeleton className="h-10 w-48 !bg-black/5" />
      <div className="flex flex-row items-center gap-4">
        <Skeleton className="h-10 w-10 !bg-black/5" />
        <Skeleton className="h-10 w-10 !bg-black/5" />
      </div>
    </div>
  );
};
