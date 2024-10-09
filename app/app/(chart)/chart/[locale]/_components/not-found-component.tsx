import { InfoIcon } from "lucide-react";

export const NotFoundComponent = () => {
  return (
    <div className="border border-[#F5B21F] bg-white rounded-md p-8 flex flex-col items-center justify-center shadow-lg gap-2">
      <InfoIcon size={48} className="text-[#F5B21F]" />
      <h1 className="text-xl font-bold text-gray-800">ไม่พบข้อมูล</h1>
      <p className="text-gray-600">กรุณาลองใหม่อีกครั้ง</p>
    </div>
  );
};
