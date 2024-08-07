'use client'
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const session = useSession();
  if (!session.data) {
    router.push("/sign-in");
    return null;
  }
  return (
    <div>
      <pre>
        {JSON.stringify(session, null, 2)}
      </pre>
      <h1>Admin Page</h1>
      <Button onClick={() => signOut()}>Logout</Button>
    </div>
  );
}
