import { redirect } from "next/navigation";
import { Topbar } from "./_components/top-bar";
import { FooterCredit } from "./_components/footer";

export const metadata = {
  title: "กิจการนิสิต",
  description: "",
};

export default function ChartLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  /**
   * @description If need to add more locale, delete this condition or modify it
   */
  if (params.locale !== "th") {
    redirect("/");
  }
  return (
    <>
    <div className="w-screen">
      <div className="flex justify-center">
      <Topbar locale={params.locale} />
      </div>
      {children}
      <FooterCredit />
    </div>
    </>
  );
}
