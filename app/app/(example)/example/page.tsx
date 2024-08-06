'use client'
import { Button } from "@/components/ui/button";
import { registerPost } from "./_actions/register";
import { Toaster, toast } from 'sonner';

export default function Page() {
  const handleClick = async() => {
    const { data, error } = await registerPost({
      firstName: "John",
      lastName: "Doe",
      email: "a@a.com",
      password: "password"
    })
    if (error) {
      console.log(error);
    } else {
      console.log("Success");
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
