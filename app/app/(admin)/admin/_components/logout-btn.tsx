"use client"
import { Button } from "@/components/ui/button";
import signOutAction from "@/lib/_actions/logout-action";
import { signOut } from "next-auth/react";

export const LogoutBtn = () => {
  const handleLogout = async () => {
    await signOutAction();
    signOut();
  }
  return (
    <Button onClick={() => handleLogout()}>ออกจากระบบ</Button>
  )
};