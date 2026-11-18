import type { Metadata, Viewport } from "next";
import "@fontsource-variable/vazirmatn";
import "./globals.css";
import { site } from "@/lib/site";
import PixelCursor from "./PixelCursor";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} | طراحی سایت و توسعه وب`, template: `%s | ${site.name}` },
  description: site.description,
  keywords: ["طراحی سایت اختصاصی", "توسعه وب اپلیکیشن", "توسعه React و Next.js", "برنامه نویسی TypeScript", "توسعه API", "سئوی فنی سایت", "آیسا حاجی پور"],
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "fa_IR",
    url: site.url,
    siteName: site.name,
    title: `${site.name} | طراحی سایت و توسعه وب`,
    description: site.description,
  },
  twitter: { card: "summary_large_image", title: site.name, description: site.description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#14213b" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fa" dir="rtl">
      <body>{children}<PixelCursor/></body>
    </html>
  );
}
