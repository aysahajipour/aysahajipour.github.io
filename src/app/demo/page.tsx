import type { Metadata } from "next";
import { Suspense } from "react";
import DemoBuilder from "./DemoBuilder";

export const metadata: Metadata = {
  title: "ساخت دموی سایت",
  description: "پیش‌نمایش سایت رستوران، کلینیک، فروشگاه، املاک، هتل یا مربیگری ورزشی را بسازید و عکس، رنگ و متن دلخواهتان را همان لحظه ببینید.",
  robots: { index: false, follow: true },
};

export default function DemoPage() {
  return <Suspense fallback={<main className="builder-page" aria-busy="true" />}><DemoBuilder /></Suspense>;
}
