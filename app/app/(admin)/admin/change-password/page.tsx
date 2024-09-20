import { Suspense } from "react";
import { Topbar } from "../_components/topbar";
import { ProfileScreen } from "./_components/profile-screen";
import { ChangePassWordScreen } from "./_components/change-password-screen";

export default async function ChangePasswordPage() {
  return (
    <>
      <Suspense fallback={<Topbar.Skeleton />}>
        <Topbar labels={["หน้าหลัก", "แก้ไขรหัสผ่าน"]} />
      </Suspense>
      <div className="flex items-center justify-center">
        <ChangePassWordScreen />
      </div>
    </>
  );
}
