import { Topbar } from "./_components/top-bar";

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
  return (
    <>
      <Topbar locale={params.locale} />
      {children}
    </>
  );
}
