"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpLeft } from "lucide-react";

const items = [
  { slug: "restaurant", n: "01", label: "رستوران", title: "طعم را قبل از اولین لقمه نشان بده.", text: "روایت غذا با تصویر سینمایی، منوی واضح و مسیری کوتاه برای رزرو.", image: "/demos/restaurant-graphic.webp", color: "#54221d", tags: ["تصویرمحور", "رزرو میز", "منو"] },
  { slug: "clinic", n: "02", label: "کلینیک", title: "اعتماد از همان نگاه اول شکل می‌گیرد.", text: "معرفی خدمات و پزشک، همراه با مسیری روشن برای دریافت نوبت.", image: "/demos/clinic-graphic.webp", color: "#386e6c", tags: ["اعتماد", "خدمات", "نوبت"] },
  { slug: "shop", n: "03", label: "فروشگاه", title: "محصول باید خودش حرف بزند.", text: "ویترینی پرشخصیت با کشف آسان محصول و دعوت روشن به خرید.", image: "/demos/shop-graphic.webp", color: "#9b4e75", tags: ["محصول", "دسته‌بندی", "خرید"] },
  { slug: "realestate", n: "04", label: "املاک", title: "فضای بعدی زندگی را پیدا کن.", text: "تصویر معماری، جست‌وجوی هدفمند و اطلاعاتی که تصمیم را آسان می‌کند.", image: "/demos/realestate-graphic.webp", color: "#345346", tags: ["جست‌وجو", "فایل ملک", "مشاوره"] },
  { slug: "hotel", n: "05", label: "هتل", title: "سفر از همین صفحه آغاز می‌شود.", text: "فضاسازی احساسی مقصد، معرفی اقامت و دسترسی سریع به رزرو.", image: "/demos/hotel-graphic.webp", color: "#815746", tags: ["مقصد", "اقامت", "رزرو"] },
  { slug: "fitness", n: "06", label: "ورزش و مربیگری", title: "تمرینِ خوب، از یک مسیر روشن شروع می‌شود.", text: "هویت تازه برای مربی، معرفی برنامه‌ها و دعوت ساده به شروع تمرین.", image: "/demos/fitness-graphic.webp", color: "#e56d8b", tags: ["مربیگری", "برنامهٔ تمرین", "پیگیری"] },
] as const;

export default function HomeShowcase() {
  const [index, setIndex] = useState(2);
  const reduceMotion = useReducedMotion();
  const active = items[index];
  return <div className="v2-showcase"><div className="v2-showcase-tabs" role="tablist" aria-label="انتخاب نوع کسب‌وکار">{items.map((item, i) => <button key={item.slug} type="button" role="tab" aria-selected={i === index} aria-controls="showcase-panel" className={i === index ? "active" : ""} onClick={() => setIndex(i)}><span>{item.n}</span><strong>{item.label}</strong><ArrowUpLeft size={17}/></button>)}</div><div className="v2-showcase-panel" id="showcase-panel" role="tabpanel" style={{ backgroundColor: active.color }}><AnimatePresence mode="wait"><motion.div key={active.slug} className="v2-showcase-inner" initial={reduceMotion ? false : { opacity: 0, scale: 1.035 }} animate={{ opacity: 1, scale: 1 }} exit={reduceMotion ? undefined : { opacity: 0, scale: 0.985 }} transition={{ duration: 0.35, ease: "easeOut" }}><Image src={active.image} alt={`تصویر مفهومی دمو برای ${active.label}`} fill sizes="(max-width: 800px) 100vw, 900px" loading="eager" className="v2-showcase-image"/><div className="v2-showcase-overlay"/><div className="v2-showcase-top"><span>CONCEPT / {active.n}</span><span>AYSA STUDIO — 2026</span></div><div className="v2-showcase-bottom"><div><span className="v2-showcase-type">{active.label} / تجربهٔ اختصاصی</span><h3>{active.title}</h3><p>{active.text}</p><div className="v2-showcase-tags">{active.tags.map(tag => <span key={tag}>{tag}</span>)}</div><Link href={`/demo?business=${active.slug}`} className="v2-showcase-link">ورود به دموی {active.label} و شخصی‌سازی <ArrowUpLeft size={18}/></Link></div></div></motion.div></AnimatePresence></div></div>;
}
