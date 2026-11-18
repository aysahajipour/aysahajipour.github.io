"use client";

import { useState, type CSSProperties } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpLeft, Check, ChevronLeft } from "lucide-react";
import "./showcase-redesign.css";

const items = [
  { slug: "restaurant", n: "01", label: "رستوران", brand: "کافه ماه", eyebrow: "FOOD / RESERVATION", title: "از دیدن منو تا رزرو میز.", text: "فضای رستوران را نشان بده، منو را خوانا بچین و رزرو را یک قدم نزدیک‌تر کن.", mockTitle: "هر طعم، یک خاطره", mockText: "منو، فضا و میز دلخواهت همین‌جاست.", action: "دیدن منو", accent: "#ff9f8a", tags: ["منو", "رزرو", "لوکیشن"] },
  { slug: "clinic", n: "02", label: "کلینیک", brand: "کلینیک آرام", eyebrow: "HEALTH / TRUST", title: "اطمینان، پیش از اولین مراجعه.", text: "خدمات، پزشکان و مسیر گرفتن نوبت را روشن و آرام کنار هم بگذار.", mockTitle: "مراقبت از همین‌جا", mockText: "خدمت مناسب را پیدا کن و نوبت بگیر.", action: "دریافت نوبت", accent: "#8ae4cf", tags: ["خدمات", "پزشکان", "نوبت"] },
  { slug: "shop", n: "03", label: "فروشگاه", brand: "استودیو آوا", eyebrow: "COMMERCE / PRODUCT", title: "ویترینی که انتخاب را آسان می‌کند.", text: "محصول را در مرکز توجه بگذار و مسیر دیدن، مقایسه و خرید را کوتاه کن.", mockTitle: "چیزهای خوب، همین‌جا", mockText: "مجموعهٔ تازه را با سلیقهٔ خودت کشف کن.", action: "دیدن محصولات", accent: "#ff82ca", tags: ["محصول", "دسته‌بندی", "خرید"] },
  { slug: "realestate", n: "04", label: "املاک", brand: "آیندهٔ خانه", eyebrow: "PROPERTY / DISCOVERY", title: "خانهٔ مناسب، پیدا کردن ساده‌تر.", text: "فایل‌ها را با جزئیات ضروری و جست‌وجویی کاربردی به مشتری نشان بده.", mockTitle: "جای بعدی زندگی‌ات", mockText: "محله، بودجه و سبک خانه را انتخاب کن.", action: "جست‌وجوی ملک", accent: "#9bb8ff", tags: ["جست‌وجو", "فایل ملک", "مشاوره"] },
  { slug: "hotel", n: "05", label: "هتل", brand: "هتل آسمان", eyebrow: "TRAVEL / BOOKING", title: "از تصویر مقصد تا رزرو اقامت.", text: "حس مکان را منتقل کن و اتاق، امکانات و تاریخ رزرو را شفاف نشان بده.", mockTitle: "برای چند روز، دورتر برو", mockText: "اتاقی برای مکث و تجربه‌ای تازه.", action: "دیدن اتاق‌ها", accent: "#ffd09b", tags: ["اتاق‌ها", "امکانات", "رزرو"] },
  { slug: "fitness", n: "06", label: "ورزش و مربیگری", brand: "مبینا کوچ", eyebrow: "FITNESS / COACHING", title: "برنامه‌ای که به حرکت تبدیل می‌شود.", text: "مربی را معرفی کن، برنامه‌ها را مقایسه‌پذیر بساز و شروع را ساده کن.", mockTitle: "قوی‌تر، با برنامهٔ خودت", mockText: "هدف را مشخص کن؛ قدم بعدی روشن است.", action: "شروع مسیر", accent: "#bb94ff", tags: ["مربی", "برنامه", "شروع"] },
] as const;

export default function HomeShowcase() {
  const [index, setIndex] = useState(2);
  const reduceMotion = useReducedMotion();
  const active = items[index];
  return <div className="v2-showcase showcase-redesign">
    <div className="v2-showcase-tabs" role="tablist" aria-label="انتخاب نوع کسب‌وکار">
      {items.map((item, i) => <button key={item.slug} type="button" role="tab" aria-selected={i === index} aria-controls="showcase-panel" className={i === index ? "active" : ""} onClick={() => setIndex(i)}><span>{item.n}</span><strong>{item.label}</strong><ChevronLeft size={17}/></button>)}
    </div>
    <div className="v2-showcase-panel" id="showcase-panel" role="tabpanel" style={{ "--concept-accent": active.accent } as CSSProperties}>
      <AnimatePresence mode="wait">
        <motion.div key={active.slug} className="v2-showcase-inner" initial={reduceMotion ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={reduceMotion ? undefined : { opacity: 0, y: -8 }} transition={{ duration: 0.28, ease: "easeOut" }}>
          <div className="concept-header"><span><i/> PIXEL / {active.eyebrow}</span><span>CONCEPT {active.n} / 06</span></div>
          <div className="concept-layout">
            <div className="concept-copy">
              <span className="concept-eyebrow">دموی تعاملی / {active.label}</span>
              <h3>{active.title}</h3>
              <p>{active.text}</p>
              <div className="concept-tags">{active.tags.map(tag => <span key={tag}><Check size={12}/>{tag}</span>)}</div>
              <Link href={`/demo?business=${active.slug}`} className="concept-cta">باز کردن دموی {active.label} و شخصی‌سازی <ArrowUpLeft size={18}/></Link>
            </div>
            <div className={`concept-browser concept-${active.slug}`} aria-label={`نمای گرافیکی سایت ${active.label}`}>
              <div className="concept-browser-bar"><span><i/><i/><i/></span><small>{active.brand}</small><b>↗</b></div>
              <div className="concept-browser-body">
                <div className="concept-browser-copy"><span>{active.eyebrow}</span><strong>{active.mockTitle}</strong><p>{active.mockText}</p><small>{active.action} <ArrowUpLeft size={12}/></small></div>
                <div className="concept-art" aria-hidden="true"><span className="concept-art-main"/><span className="concept-art-detail"/><span className="concept-art-spark"/></div>
              </div>
              <div className="concept-browser-footer"><span>{active.tags[0]}</span><span>{active.tags[1]}</span><span>{active.tags[2]}</span></div>
            </div>
          </div>
          <div className="concept-bottom"><span>DESIGNED FOR THE BUSINESS, BUILT FOR THE PERSON.</span><span>↗ {active.n} / 06</span></div>
        </motion.div>
      </AnimatePresence>
    </div>
  </div>;
}
