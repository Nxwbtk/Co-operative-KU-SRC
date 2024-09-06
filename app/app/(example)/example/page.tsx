"use client";
import { Button } from "@/components/ui/button";
import { registerPost } from "./_actions/register";
import { toast } from "sonner";
import { createFacultyPost } from "./_actions/create-faculty";
import { generateFaculty, generateMajor } from "@/lib/generate-faculty";
import { postMajor } from "./_actions/create-major";
import { postManyAward } from "./_actions/post-award";
import { byeByeCol } from "./_actions/bye-bye-col";

export default function Page() {
  const handleClick = async () => {
    const { data, error } = await registerPost({
      firstName: "John",
      lastName: "Doe",
      email: "b@a.com",
      password: "Bunthakan095%",
    });
    if (error) {
      toast.error("เกิดข้อผิดพลาด");
    } else {
      toast.success("สร้างสำเร็จ");
    }
    // const f = generateFaculty();
    // const r = await createFacultyPost({ payload: f });
    // const m = await generateMajor();
    // if (!m) {
    //   return;
    // }
    // const majorRes = await postMajor({ majorData: m });
    // const awardInit = await postManyAward();
  };
  const handleInit = async () => {
    const f = generateFaculty();
    const r = await createFacultyPost({ payload: f });
    const m = await generateMajor();
    if (!m) {
      return;
    }
    const majorRes = await postMajor({ majorData: m });
    const awardInit = await postManyAward();
  }
  const handleDrop = async () => {
    const res = await byeByeCol();
    if (!res.data) {
      toast.error("เกิดข้อผิดพลาด");
    } else {
      toast.success("ลบสำเร็จ");
    }
  };
  return (
    <div className="flex justify-center gap-2 items-center self-center">
      <Button onClick={handleClick}>Create</Button>
      <Button onClick={handleInit}>Init</Button>
      <Button onClick={handleDrop}>drop</Button>
    </div>
  );
}
