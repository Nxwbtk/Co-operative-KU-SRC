"use client";
import { Button } from "@/components/ui/button";
import { registerPost } from "./_actions/register";
import { toast } from "sonner";
import { createFacultyPost } from "./_actions/create-faculty";
import { generateFaculty, generateMajor } from "@/lib/generate-faculty";
import { postMajor } from "./_actions/create-major";

export default function Page() {
  const handleClick = async () => {
    // const { data, error } = await registerPost({
    //   firstName: "John",
    //   lastName: "Doe",
    //   email: "b@a.com",
    //   password: "Bunthakan095%",
    // });
    // if (error) {
    //   toast.error("เกิดข้อผิดพลาด");
    // } else {
    //   toast.success("สร้างสำเร็จ");
    // }
    const f = generateFaculty();
    const r = await createFacultyPost({ payload: f });
    const m = await generateMajor();
    if (!m) {
      return;
    }
    const majorRes = await postMajor({ majorData: m });
  };
  return (
    <>
      <Button onClick={handleClick}>Create</Button>
    </>
  );
}
