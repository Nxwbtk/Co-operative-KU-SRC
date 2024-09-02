import { Suspense } from "react";
import { Topbar } from "../_components/topbar";

export default async function Page() {
  return (
    <>
    <Suspense fallback={<Topbar.Skeleton />}>
      <Topbar labels={["หน้าหลัก", "จัดการผู้ดูแล"]} />
    </Suspense>
    </>
  )
}