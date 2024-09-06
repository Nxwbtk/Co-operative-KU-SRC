import Image from "next/image";

import { AuthForm } from "./_components/auth-form";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
export default async function SignInPage() {
  const session = await getServerSession();
  // if (session.status === "authenticated") {
  //   router.push("/admin");
  // }
  if (session) {
    redirect("/admin");
  }
  const backgroundImageStyle = {
    backgroundImage:
      "linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url(/sign-in/src-1.jpg)",
    backgroundSize: "contain",
    backgroundPosition: "right",
    backgroundAttachment: "fixed",
    width: "100%",
    height: "100%",
    position: undefined, // Change the type of position to 'Position | undefined'
    top: 0,
    left: 0,
    zIndex: -1,
  };
  return (
    <>
      <div className="container relative min-h-screen flex-col items-center justify-center grid md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight self-start">
                เข้าสู่ระบบ
              </h1>
              <p className="text-sm text-muted-foreground self-start">
                โปรดเข้าสู่ระบบเพื่อดำเนินการต่อ
              </p>
            </div>
            <AuthForm />
          </div>
        </div>
        <div
          className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex items-center justify-center"
          style={backgroundImageStyle}
        >
          {/* <div className="absolute inset-0 bg-zinc-900" /> */}
          {/* <div className="relative z-20">
          </div> */}
          <div className="flex justify-center items-center">
            <Image
              src={"/sign-in/KUSRC.png"}
              alt={""}
              width={400}
              height={400}
            />
          </div>
        </div>
      </div>
    </>
  );
}
