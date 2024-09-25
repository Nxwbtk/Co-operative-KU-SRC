import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeftIcon, MailIcon } from "lucide-react";
import Link from "next/link";

export default function SuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5B21F] p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl sm:text-3xl font-bold text-center text-[#302782] flex items-center justify-center">
            <MailIcon className="mr-2" />
            อีเมลถูกส่งแล้ว
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="mb-6 text-base sm:text-lg">
            เราได้ส่งอีเมลคำแนะนำในการรีเซ็ตรหัสผ่านให้คุณแล้ว
            กรุณาตรวจสอบกล่องจดหมายของคุณและทำตามคำแนะนำเพื่อรีเซ็ตรหัสผ่าน
          </p>
          <p className="mb-8 text-sm text-gray-600">
            หากคุณไม่เห็นอีเมลในกล่องจดหมาย กรุณาตรวจสอบในโฟลเดอร์สแปม
          </p>
          <Link href="/sign-in" passHref>
            <Button className="w-full sm:w-auto bg-[#302782] hover:bg-[#302782]/90 text-white">
              <ArrowLeftIcon className="mr-2 h-4 w-4" /> กลับไปหน้าเข้าสู่ระบบ
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
