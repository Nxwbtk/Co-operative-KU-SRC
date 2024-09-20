import getMyServerSession from "@/lib/my-server-session";
import { redirect } from "next/navigation";
import { ProfileSection } from "./profile-section";

export const ProfileScreen = async () => {
  const session = await getMyServerSession();
  if (!session) {
    redirect("/sign-in");
  }
  const myData = await fetch(
    `${process.env.FE_URL}/api/me/${session.user.id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessToken}`,
      },
      next: {
        tags: ["myData"],
      },
    }
  );
  if (!myData.ok) {
    redirect("/sign-in");
  }
  const myUserData = await myData.json();
  return (
  <div className="flex justify-center">
    <ProfileSection data={myUserData} />
  </div>
);
};
