"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowLeft, ArrowUpLeft, BedDouble, Check, Copy, Dumbbell, HeartPulse, Home, ImagePlus, Monitor, Palette, RotateCcw, ShoppingBag, Smartphone, Sparkles, UtensilsCrossed } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import BusinessPreview, { type Business, type VisualStyle } from "./BusinessPreview";
import PixelEffectToggle from "../PixelEffectToggle";
import TechPreferencePicker from "./TechPreferencePicker";
import { requestedTechOptions } from "@/lib/tech";
import ProjectBrief from "../ProjectBrief";
import "./demo.css";
import "./preview-overrides.css";
import "./customizer.css";
import "./builder-brand.css";
import "./builder-neon.css";
import "./builder-layout-v2.css";
import "./demo-project-brief.css";

type Style = VisualStyle;

const businessData: Record<Business, { label: string; icon: typeof Home; defaultName: string; defaultHeadline: string; featureLabel: string; defaultFeature: string; defaultCta: string }> = {
  restaurant: { label: "رستوران و کافه", icon: UtensilsCrossed, defaultName: "کافه ماه", defaultHeadline: "طعم لحظه‌های خوب", featureLabel: "پیام منو", defaultFeature: "مواد تازه. روایت تازه.", defaultCta: "کاوش منو" },
  clinic: { label: "کلینیک و خدمات سلامت", icon: HeartPulse, defaultName: "کلینیک آرام", defaultHeadline: "مراقب حال خوب شما", featureLabel: "پیام اعتماد", defaultFeature: "سلامتی، نزدیک‌تر از همیشه.", defaultCta: "دریافت نوبت آنلاین" },
  shop: { label: "فروشگاه آنلاین", icon: ShoppingBag, defaultName: "نُوا استور", defaultHeadline: "چیزهای خوب، نزدیک‌تر", featureLabel: "عنوان مجموعه", defaultFeature: "محصولات تازه", defaultCta: "کشف محصولات" },
  realestate: { label: "املاک و مشاوران", icon: Home, defaultName: "خانه‌نو", defaultHeadline: "خانهٔ بعدی همین‌جاست", featureLabel: "پیام فایل‌های منتخب", defaultFeature: "فضاهایی برای زندگی بهتر", defaultCta: "ثبت درخواست" },
  hotel: { label: "هتل و اقامتگاه", icon: BedDouble, defaultName: "خانهٔ آفتاب", defaultHeadline: "جایی برای مکث", featureLabel: "پیام تجربهٔ اقامت", defaultFeature: "جایی برای مکث، نفس و کشف.", defaultCta: "کشف اقامتگاه" },
  fitness: { label: "مربیگری و ورزش", icon: Dumbbell, defaultName: "اوج استودیو", defaultHeadline: "قوی‌تر از دیروز، با برنامهٔ خودت", featureLabel: "پیام برنامهٔ تمرینی", defaultFeature: "تمرین متناسب با هدف و زندگی تو", defaultCta: "دیدن مسیر تمرین" },
};

const accentOptions = [
  { name: "بنفش الکتریکی", value: "#ad5cff" }, { name: "آبی پیکسلی", value: "#4587ff" },
  { name: "فیروزه‌ای نورانی", value: "#27e6f5" }, { name: "سبز نئونی", value: "#62f5a5" },
  { name: "صورتی پیکسلی", value: "#ff66ac" },
  { name: "کهربایی", value: "#ffbf66" },
] as const;

const styleData: Record<Style, { label: string; description: string }> = {
  elegant: { label: "لوکس و مینیمال", description: "رنگ‌های آرام و فضای باز" },
  modern: { label: "مدرن و روشن", description: "تمیز، کاربردی و صمیمی" },
  bold: { label: "جسور و پرانرژی", description: "کنتراست بالا و تیتر برجسته" },
};

const validBusiness = (value: string | null): Business => value && value in businessData ? value as Business : "shop";

export default function DemoBuilder() {
  const params = useSearchParams();
  const [business, setBusiness] = useState<Business>(() => validBusiness(params.get("business")));
  const [style, setStyle] = useState<Style>(() => { const value = params.get("style"); return value && value in styleData ? value as Style : "elegant"; });
  const [name, setName] = useState(() => params.get("name")?.slice(0, 35) || "");
  const [headline, setHeadline] = useState(() => params.get("headline")?.slice(0, 55) || "");
  const [city, setCity] = useState(() => params.get("city")?.slice(0, 35) || "");
  const [featureText, setFeatureText] = useState(() => params.get("feature")?.slice(0, 65) || "");
  const [ctaText, setCtaText] = useState(() => params.get("cta")?.slice(0, 35) || "");
  const [layout, setLayout] = useState<"immersive" | "framed">(() => params.get("layout") === "framed" ? "framed" : "immersive");
  const [accent, setAccent] = useState<string | null>(() => { const value = params.get("accent"); return accentOptions.some(option => option.value === value) ? value : null; });
  const [selectedTech, setSelectedTech] = useState<string[]>(() => (params.get("tech") || "").split(",").filter(item => requestedTechOptions.some(option => option === item)));
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageName, setImageName] = useState("");
  const [imageError, setImageError] = useState("");
  const [device, setDevice] = useState<"desktop" | "mobile">("desktop");
  const [copied, setCopied] = useState(false);
  const reduceMotion = useReducedMotion();
  useEffect(() => { if (window.matchMedia("(max-width: 600px)").matches) setDevice("mobile"); }, []);
  useEffect(() => () => { if (imageUrl) URL.revokeObjectURL(imageUrl); }, [imageUrl]);
  const current = businessData[business];
  const brand = name.trim() || current.defaultName;
  const heroTitle = headline.trim() || current.defaultHeadline;
  const demoSummary = useMemo(() => `نوع کسب‌وکار: ${current.label}\nنام برند: ${brand}\nسبک: ${styleData[style].label}\nچیدمان: ${layout === "framed" ? "قاب‌دار" : "تمام‌صفحه"}\nرنگ: ${accentOptions.find(option => option.value === accent)?.name || "پیش‌فرض"}\nفناوری‌های ترجیحی: ${selectedTech.length ? selectedTech.join("، ") : "انتخاب نشده"}\nتیتر دمو: ${heroTitle}\nمتن بخش بعدی: ${featureText.trim() || current.defaultFeature}\nدکمهٔ اصلی: ${ctaText.trim() || current.defaultCta}\nشهر: ${city || "—"}\nتصویر شخصی: ${imageName || "پیش‌فرض؛ تصویر آپلودشده در لینک ذخیره نمی‌شود"}`, [current, brand, style, layout, accent, selectedTech, heroTitle, featureText, ctaText, city, imageName]);

  function changeBusiness(next: Business) { setBusiness(next); setHeadline(""); setName(""); setFeatureText(""); setCtaText(""); setImageUrl(null); setImageName(""); setImageError(""); }
  function onImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) { setImageError("فرمت عکس باید JPG، PNG یا WebP باشد."); return; }
    if (file.size > 8 * 1024 * 1024) { setImageError("حجم عکس باید کمتر از ۸ مگابایت باشد."); return; }
    setImageUrl(URL.createObjectURL(file));
    setImageName(file.name);
    setImageError("");
    event.target.value = "";
  }
  function resetCustomizations() { setName(""); setHeadline(""); setCity(""); setFeatureText(""); setCtaText(""); setStyle("elegant"); setLayout("immersive"); setAccent(null); setSelectedTech([]); setImageUrl(null); setImageName(""); setImageError(""); }
  async function copyLink() {
    const url = new URL(window.location.href);
    url.searchParams.set("business", business);
    url.searchParams.set("style", style);
    url.searchParams.set("layout", layout);
    if (accent) url.searchParams.set("accent", accent); else url.searchParams.delete("accent");
    if (selectedTech.length) url.searchParams.set("tech", selectedTech.join(",")); else url.searchParams.delete("tech");
    for (const [key, value] of [["name", name], ["headline", headline], ["city", city], ["feature", featureText], ["cta", ctaText]]) {
      if (value.trim()) url.searchParams.set(key, value.trim());
      else url.searchParams.delete(key);
    }
    await navigator.clipboard.writeText(url.toString());
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2500);
  }

  return <main className="builder-page">
    <header className="builder-header"><div className="builder-header-inner"><Link href="/" className="builder-back"><ArrowLeft size={18}/> بازگشت به سایت</Link><span className="builder-header-label">AYSA / INTERACTIVE DEMO</span><PixelEffectToggle/><a href="#request" className="builder-header-cta">درخواست این طرح <ArrowUpLeft size={17}/></a></div></header>
    <div className="builder-intro"><div className="builder-kicker"><Sparkles size={16}/> تجربه قبل از تصمیم</div><h1>سایت کسب‌وکارت رو <em>همین حالا ببین.</em></h1><p>یکی از شش کسب‌وکار را انتخاب کن؛ صفحهٔ اول دموی آن همین‌جا باز می‌شود. نام، عکس، رنگ و متن‌ها را تغییر بده تا نتیجه را زنده ببینی.</p><a className="builder-preview-jump" href="#preview">رفتن به پیش‌نمایش دمو <ArrowLeft size={17}/></a></div>
    <div className="builder-layout">
      <aside className="builder-panel builder-identity-panel" aria-label="اطلاعات کسب‌وکار"><div className="panel-head"><span>01 / اطلاعات کسب‌وکار</span><h2>دموی خودت را بساز</h2><p>از اینجا شروع کن و هر گزینه را تغییر بده.</p></div>
        <fieldset className="business-fieldset"><legend>نوع کسب‌وکار</legend><div className="business-options">{(Object.entries(businessData) as [Business, typeof businessData[Business]][]).map(([key, value]) => { const Icon = value.icon; return <button type="button" key={key} className={business === key ? "business-option active" : "business-option"} onClick={() => changeBusiness(key)} aria-pressed={business === key}><Icon size={19}/><span>{value.label}</span>{business === key && <Check size={16}/>}</button>; })}</div></fieldset>
        <div className="panel-fields"><label htmlFor="brand">نام کسب‌وکار <span>اختیاری</span></label><input id="brand" value={name} onChange={e => setName(e.target.value)} maxLength={35} placeholder={current.defaultName}/><label htmlFor="headline">تیتر اصلی <span>اختیاری</span></label><input id="headline" value={headline} onChange={e => setHeadline(e.target.value)} maxLength={55} placeholder={current.defaultHeadline}/><label htmlFor="city">شهر فعالیت <span>اختیاری</span></label><input id="city" value={city} onChange={e => setCity(e.target.value)} maxLength={35} placeholder="مثلاً تهران"/></div>
        <div className="panel-fields extra-fields"><label htmlFor="feature-text">{current.featureLabel} <span>اختیاری</span></label><input id="feature-text" value={featureText} onChange={event => setFeatureText(event.target.value)} maxLength={65} placeholder={current.defaultFeature}/><label htmlFor="cta-text">متن دکمهٔ اصلی <span>اختیاری</span></label><input id="cta-text" value={ctaText} onChange={event => setCtaText(event.target.value)} maxLength={35} placeholder={current.defaultCta}/></div>
        <a className="builder-panel-jump" href="#preview">دیدن نتیجهٔ تغییرات <ArrowLeft size={15}/></a></aside><aside className="builder-panel builder-visual-panel" aria-label="تنظیمات ظاهر دمو"><div className="panel-head"><span>02 / ظاهر دمو</span><h2>طرح را به سلیقه‌ات تغییر بده</h2><p>عکس، رنگ و سبک نمایش را انتخاب کن.</p></div><fieldset className="upload-fieldset"><legend>عکس دلخواه برای صفحهٔ اول</legend><label className="upload-zone" htmlFor="hero-upload"><ImagePlus size={24}/><strong>{imageName || "عکس خودت را انتخاب کن"}</strong><span>JPG، PNG یا WebP • حداکثر ۸ مگابایت</span></label><input id="hero-upload" className="upload-input" type="file" accept="image/jpeg,image/png,image/webp" onChange={onImageChange}/>{imageUrl && <button type="button" className="remove-image" onClick={() => { setImageUrl(null); setImageName(""); }}>بازگشت به عکس نمونه</button>}{imageError && <p className="image-error" role="alert">{imageError}</p>}<p className="upload-hint">عکس فقط در همین مرورگر نمایش داده می‌شود و در سرور ذخیره نمی‌شود.</p></fieldset>
        <fieldset className="layout-fieldset"><legend>چیدمان تصویر</legend><div className="layout-options"><button type="button" className={layout === "immersive" ? "active" : ""} aria-pressed={layout === "immersive"} onClick={() => setLayout("immersive")}>لبه‌به‌لبه</button><button type="button" className={layout === "framed" ? "active" : ""} aria-pressed={layout === "framed"} onClick={() => setLayout("framed")}>قاب‌دار</button></div></fieldset>
        <fieldset className="accent-fieldset"><legend>رنگ شاخص</legend><div className="accent-options"><button type="button" className={accent === null ? "accent-default active" : "accent-default"} onClick={() => setAccent(null)} aria-label="رنگ پیش‌فرض" aria-pressed={accent === null}>پیش‌فرض</button>{accentOptions.map(option => <button type="button" key={option.value} className={accent === option.value ? "accent-swatch active" : "accent-swatch"} style={{ backgroundColor: option.value }} onClick={() => setAccent(option.value)} aria-label={option.name} aria-pressed={accent === option.value}/>)}</div></fieldset>
        <fieldset className="style-fieldset"><legend>سبک بصری</legend><div className="style-options">{(Object.entries(styleData) as [Style, typeof styleData[Style]][]).map(([key, value]) => <button type="button" key={key} className={style === key ? `style-option active ${key}` : `style-option ${key}`} onClick={() => setStyle(key)} aria-pressed={style === key}><span className="style-swatch"/><strong>{value.label}</strong><small>{value.description}</small></button>)}</div></fieldset><TechPreferencePicker selected={selectedTech} onChange={setSelectedTech}/><button type="button" className="reset-demo" onClick={resetCustomizations}><RotateCcw size={15}/> بازنشانی تغییرات</button><a className="builder-panel-jump" href="#preview">دیدن نتیجهٔ تغییرات <ArrowLeft size={15}/></a>
      </aside>
      <div className="preview-column"><div className="preview-shell" id="preview"><div className="preview-toolbar"><div><span className="live-dot"/> صفحهٔ اول دمو <span className="preview-note">تغییرات دو کادر کنار صفحه را اینجا ببینید</span></div><div className="preview-tools"><button type="button" className={device === "desktop" ? "tool active" : "tool"} onClick={() => setDevice("desktop")} aria-label="نمایش دسکتاپ" aria-pressed={device === "desktop"}><Monitor size={18}/></button><button type="button" className={device === "mobile" ? "tool active" : "tool"} onClick={() => setDevice("mobile")} aria-label="نمایش موبایل" aria-pressed={device === "mobile"}><Smartphone size={18}/></button><button type="button" className="tool copy-tool" onClick={copyLink} aria-label="کپی لینک دمو"><Copy size={17}/><span>{copied ? "کپی شد" : "کپی لینک"}</span></button></div></div>
        <div className={`preview-stage ${device}`} onContextMenu={event => event.preventDefault()}><AnimatePresence mode="wait"><motion.div key={business} className="preview-motion" initial={reduceMotion ? false : { opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={reduceMotion ? undefined : { opacity: 0, y: -10 }} transition={{ duration: 0.32, ease: "easeOut" }}><BusinessPreview business={business} style={style} brand={brand} headline={heroTitle} city={city} imageUrl={imageUrl} featureText={featureText.trim() || current.defaultFeature} ctaText={ctaText.trim() || current.defaultCta} accent={accent} layout={layout}/><div className="preview-watermark" aria-hidden="true"><span>YEKSEL / DEMO • {brand}</span></div></motion.div></AnimatePresence></div>
        <div className="preview-disclaimer"><Palette size={17}/><span>این‌ها دموهای صفحهٔ اول هستند. عکس انتخابی فقط روی دستگاه شما دیده می‌شود؛ در لینک اشتراک ذخیره نمی‌شود. نشان پیش‌نمایش روی طرح قرار دارد، اما هیچ وب‌سایتی نمی‌تواند اسکرین‌شاتِ سیستم‌عامل را قطعی مسدود کند. امکاناتی مثل پرداخت و رزرو در پروژهٔ نهایی ساخته می‌شوند.</span></div></div></div>
        <ProjectBrief demoSummary={demoSummary} initialSelectedTech={selectedTech}/>
    </div>
    <footer className="builder-footer"><Link href="/">AYSA / DEV</Link><span>دموی تعاملی طراحی سایت</span></footer>
  </main>;
}
