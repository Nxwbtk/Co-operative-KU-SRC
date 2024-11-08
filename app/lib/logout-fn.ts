import { signOut } from "next-auth/react";
import signOutAction from "./_actions/logout-action";

export const handleLogout = async () => {
  await signOutAction();
  signOut();
};
