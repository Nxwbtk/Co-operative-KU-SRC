import { InfoIcon } from "lucide-react";

export const NotFoundComponent = ({ locale }: { locale: string }) => {
  return (
    <div className="border border-[#F5B21F] bg-white rounded-md p-8 flex flex-col items-center justify-center shadow-lg gap-2">
      <InfoIcon size={48} className="text-[#F5B21F]" />
      <h1 className="text-xl font-bold text-gray-800">
        {locale === "th" ? "ไม่พบข้อมูล" : "Not Found"}
      </h1>
      <p className="text-gray-600">
        {locale === "th" ? "กรุณาลองใหม่อีกครั้ง" : "Please try again"}
      </p>
    </div>
  );
};
