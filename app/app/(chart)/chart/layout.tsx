import { Topbar } from "./_components/top-bar";

export default function ChartLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Topbar />
      {children}
    </>
  );
}
