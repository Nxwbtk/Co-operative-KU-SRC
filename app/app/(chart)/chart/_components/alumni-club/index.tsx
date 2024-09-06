import { AlertTriangle } from "lucide-react";

export const AlumniClub = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] bg-gradient-to-b p-4 sm:p-8">
      <div className="text-center max-w-md mx-auto bg-white rounded-lg shadow-lg p-8 transform hover:scale-105 transition-transform duration-300">
        <AlertTriangle className="w-16 h-16 text-yellow-500 mx-auto mb-6 animate-pulse" />
        <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-800">
          อยู่ระหว่างการจัดตั้ง
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          ขออภัยในความไม่สะดวก เรากำลังปรับปรุงเพื่อประสบการณ์ที่ดียิ่งขึ้น
        </p>
      </div>
    </div>
  );
};