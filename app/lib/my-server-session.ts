'use server'

import { authOptions } from "@/app/api/auth/[...nextauth]/auth-options";
import { getServerSession, Session } from "next-auth";

export default async function getMyServerSession(): Promise<Session | null> {
  const session = await getServerSession(authOptions);
  if (!session) {
    return null;
  }
  return session;
}