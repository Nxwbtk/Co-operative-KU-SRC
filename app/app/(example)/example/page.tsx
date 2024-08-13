'use client'
import { Button } from "@/components/ui/button";
import { registerPost } from "./_actions/register";
import { toast } from 'sonner';

export default function Page() {
  const handleClick = async() => {
    const { data, error } = await registerPost({
      firstName: "John",
      lastName: "Doe",
      email: "b@a.com",
      password: "Bunthakan095%",
    })
    if (error) {
      toast.error("เกิดข้อผิดพลาด");
    } else {
      toast.success("สร้างสำเร็จ");
    }
  }
  return (
    <>
      <Button onClick={handleClick}>
        Create
      </Button>
    </>
  );
}
