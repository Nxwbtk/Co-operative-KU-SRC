import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { postVerifyOTP } from "./_actions/verify-otp";
import { AlertCircleIcon, ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChangePasswordScreen } from "./_components/change-password-screen";

export default async function Page({ params }: { params: { otp: string } }) {
  const res = await postVerifyOTP({ otp: params.otp });
  if (!res.data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5B21F] p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl sm:text-3xl font-bold text-center text-[#302782] flex items-center justify-center">
              <AlertCircleIcon className="mr-2" />
              เกิดข้อผิดพลาด
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="mb-6 text-base sm:text-lg">
              ขออภัย รหัส OTP ของคุณหมดอายุหรือไม่พบในระบบ
            </p>
            <p className="mb-8 text-sm text-gray-600">
              กรุณาลองขอรีเซ็ตรหัสผ่านอีกครั้ง
              หรือติดต่อฝ่ายสนับสนุนหากคุณยังคงพบปัญหา
            </p>
            <div className="w-full flex flex-row gap-2 items-center justify-center">
              <Link href="/sign-in" passHref className="w-full">
                <Button
                  variant="outline"
                  className="w-full border-[#302782] text-[#302782] hover:bg-[#302782] hover:text-white"
                >
                  <ArrowLeftIcon className="mr-2 h-4 w-4" />{" "}
                  กลับไปหน้าเข้าสู่ระบบ
                </Button>
              </Link>
              <Link href="/sign-in/forgot-password" passHref className="w-full">
                <Button className="w-full bg-[#302782] hover:bg-[#302782]/90 text-white">
                  ขอรหัส OTP ใหม่
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  return (
    <>
      <ChangePasswordScreen email={res.data.email} />
    </>
  );
}
