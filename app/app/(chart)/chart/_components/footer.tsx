import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import {
  FacebookIcon,
  InstagramIcon,
  MailIcon,
  PhoneCallIcon,
  TwitterIcon,
  YoutubeIcon,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

export const FooterChart = () => {
  return (
    <footer className="bg-[#302782] text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            <Link href="https://sci.src.ku.ac.th/" className="inline-block">
              <Image
                src="https://sci.src.ku.ac.th/wp-content/uploads/2024/02/logo_sci.svg"
                alt="Logo"
                width={300}
                height={100}
                className="bg-white p-2"
              />
            </Link>
            <div>
              <h2 className="text-2xl font-bold mb-2">
                คณะวิทยาศาสตร์ ศรีราชา มหาวิทยาลัย
                <br />
                เกษตรศาสตร์ วิทยาเขตศรีราชา
              </h2>
              <p className="text-sm">
                ชั้น 2 อาคารคณะวิทยาศาสตร์ ศรีราชา (อาคาร 26)
                <br />
                199 หมู่ที่ 6 ถนนสุขุมวิท ตำบลทุ่งสุขลา อำเภอศรีราชา ชลบุรี
                20230
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center">
                <PhoneCallIcon className="w-5 h-5 mr-2" />
                <span>038-354580-4 ต่อ 663013 ,663014</span>
              </div>
              <div className="flex items-center">
                <MailIcon className="w-5 h-5 mr-2" />
                <span>sci-src@ku.th</span>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">ลิงก์สำคัญ</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="https://www.ku.ac.th/th">
                  มหาวิทยาลัยเกษตรศาสตร์ เขตบางเขน
                </Link>
              </li>
              <li>
                <Link href="https://www.src.ku.ac.th/th/">
                  มหาวิทยาลัยเกษตรศาสตร์ วิทยาเขตศรีราชา
                </Link>
              </li>
              <li>
                <Link href="https://kps.ku.ac.th/">
                  มหาวิทยาลัยเกษตรศาสตร์ วิทยาเขตกำแพงแสน
                </Link>
              </li>
              <li>
                <Link href="https://www.csc.ku.ac.th/">
                  มหาวิทยาลัยเกษตรศาสตร์ วิทยาเขตเฉลิมพระเกียรติ จังหวัดสกลนคร
                </Link>
              </li>
              <li>
                <Link href="https://ms.src.ku.ac.th/">คณะวิทยาการจัดการ</Link>
              </li>
              <li>
                <Link href="https://www.eng.src.ku.ac.th/">
                  คณะวิศวกรรมศาสตร์ศรีราชา
                </Link>
              </li>
              <li>
                <Link href="https://econ.src.ku.ac.th/">
                  คณะเศรษฐศาสตร์ ศรีราชา
                </Link>
              </li>
              <li>
                <Link href="https://ims.src.ku.ac.th/">
                  คณะพาณิชยนาวีนานาชาติ
                </Link>
              </li>
            </ul>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/sci.kusrc"
                aria-label="Facebook"
              >
                <FacebookIcon size={24} />
              </a>
              <a href="https://x.com/sciencesrc" aria-label="Twitter">
                <TwitterIcon size={24} />
              </a>
              <a
                href="https://www.instagram.com/sci.kusrc/"
                aria-label="Instagram"
              >
                <InstagramIcon size={24} />
              </a>
              <a
                href="https://www.youtube.com/@scienceatsriracha7981"
                aria-label="YouTube"
              >
                <YoutubeIcon size={24} />
              </a>
            </div>
            <div className="text-sm">
              <p>ผู้เข้าชม : 201,839 คน</p>
              <p>ผู้เข้าชมเว็บไซต์ทั้งหมด : 25170 คน</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
