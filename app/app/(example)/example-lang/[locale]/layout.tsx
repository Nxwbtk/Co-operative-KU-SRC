import { languages } from "@/app/i18n/settings";
import { dir } from "i18next";

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

export default function LangLayout({
  children, // will be a page or nested layout
  params,
}: {
  children: React.ReactNode;
  params: { lng: string };
}) {
  return (
    <html lang={params.lng} dir={dir(params.lng)}>
      <head />
      <body>{children}</body>
    </html>
  );
}
