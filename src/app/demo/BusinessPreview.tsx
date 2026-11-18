import Image from "next/image";
import { ArrowDownLeft, ArrowLeft, ArrowUpLeft, CalendarDays, ChevronDown, Heart, MapPin, Menu, Search, ShoppingBag, Star, Users } from "lucide-react";
import "./previews.css";
import "./previews-v3.css";
import ConceptDetails from "./ConceptDetails";
import FitnessPreview from "./FitnessPreview";
import "./customizer-visuals.css";

export type Business = "restaurant" | "clinic" | "shop" | "realestate" | "hotel" | "fitness";
export type VisualStyle = "elegant" | "modern" | "bold";

type Props = { business: Business; style: VisualStyle; brand: string; headline: string; city: string; imageUrl?: string | null; featureText?: string; ctaText?: string; accent?: string | null; layout?: "immersive" | "framed" };
type PreviewProps = Omit<Props, "business" | "style" | "accent" | "layout">;

function PreviewPhoto({ src, custom, alt, sizes }: { src: string; custom?: string | null; alt: string; sizes: string }) {
  if (custom) return <img src={custom} alt={alt} className="concept-image uploaded-image" />;
  return <Image src={src} alt={alt} fill sizes={sizes} loading="eager" className="concept-image" />;
}

function Restaurant({ brand, headline, city, imageUrl, featureText, ctaText }: PreviewProps) {
  return <div className="concept concept-restaurant">
    <div className="r-hero"><PreviewPhoto src="/demos/restaurant-graphic.webp" custom={imageUrl} alt="تصویر گرافیکی غذا و فضای رستوران با رنگ‌های گرم" sizes="(max-width: 800px) 100vw, 900px"/><div className="r-shade"/>
      <header className="r-nav"><span className="r-nav-side">MENÚ <Menu size={15}/></span><strong className="r-logo">{brand}</strong><span className="r-book">رزرو میز <ArrowUpLeft size={15}/></span></header>
      <div className="r-hero-content"><span className="r-eyebrow">تجربه‌ای برای تمام حواس • {city || "تهران"}</span><h2>{headline}</h2><p>دور یک میز جمع می‌شویم؛ برای طعمی که در خاطر می‌ماند.</p><span className="r-primary">{ctaText || "کاوش منو"} <ArrowDownLeft size={18}/></span></div><div className="r-hero-bottom"><span>01 / 03 — THE EXPERIENCE</span><span>طعم • فضا • خاطره</span></div>
    </div><div className="r-below"><span>از آشپزخانه تا میز شما</span><div><strong>{featureText || "مواد تازه. روایت تازه."}</strong><p>هر بشقاب، داستانی از دقت، فصل و سلیقه است.</p></div><span className="r-circle">↙</span></div>
  </div>;
}

function Clinic({ brand, headline, city, imageUrl, featureText, ctaText }: PreviewProps) {
  return <div className="concept concept-clinic"><header className="c-nav"><strong><span className="c-mark">✳</span>{brand}</strong><nav><span>خدمات</span><span>پزشکان</span><span>درباره ما</span></nav><span className="c-nav-cta">دریافت نوبت <ArrowUpLeft size={14}/></span></header>
    <div className="c-hero"><div className="c-copy"><span className="c-tag"><span/> همراه سلامتی شما در {city || "شهر شما"}</span><h2>{headline}</h2><p>مراقبتی دقیق، انسانی و در دسترس. مسیر دریافت خدمات درمانی را روشن و ساده طراحی کرده‌ایم.</p><span className="c-primary">{ctaText || "دریافت نوبت آنلاین"} <ArrowLeft size={16}/></span><div className="c-trust"><span className="c-trust-star"><Star size={12} fill="currentColor"/> خدمات درمانی</span><span>راهی ساده برای شروع مراقبت</span></div></div><div className="c-photo"><PreviewPhoto src="/demos/clinic-graphic.webp" custom={imageUrl} alt="پزشک در حال گفت‌وگو با مراجعه‌کننده در کلینیکی روشن" sizes="(max-width: 800px) 100vw, 500px"/><div className="c-photo-label"><span>CARE IS PERSONAL</span><strong>{featureText || "سلامتی، نزدیک‌تر از همیشه."}</strong></div></div></div>
    <div className="c-shortcuts"><div><span>01</span><strong>جست‌وجوی پزشک</strong><Search size={16}/></div><div><span>02</span><strong>خدمات تخصصی</strong><ArrowUpLeft size={16}/></div><div><span>03</span><strong>راهنمای مراجعه</strong><ArrowUpLeft size={16}/></div></div>
  </div>;
}

function Shop({ brand, headline, city, imageUrl, featureText, ctaText }: PreviewProps) {
  return <div className="concept concept-shop"><div className="s-ribbon">ارسال به سراسر ایران • انتخابی برای لحظه‌های خوب</div><header className="s-nav"><span className="s-search"><Search size={15}/> جست‌وجو</span><strong>{brand}<span>✳</span></strong><span className="s-nav-end"><Heart size={16}/><ShoppingBag size={16}/></span></header><div className="s-categories"><span>جدیدترین‌ها</span><span>مراقبت پوست</span><span>اکسسوری</span><span>داستان ما</span></div>
    <div className="s-hero"><div className="s-copy"><span className="s-kicker">THE NEW EDIT / {city || "ONLINE"}</span><h2>{headline}</h2><p>برای روزهای معمولی که می‌توانند خاص باشند. چیزهایی که دوست‌داشتنشان آسان است.</p><span className="s-primary">{ctaText || "کشف محصولات"} <ArrowLeft size={16}/></span><div className="s-count">01 <span>/ 03</span></div></div><div className="s-photo"><PreviewPhoto src="/demos/shop-graphic.webp" custom={imageUrl} alt="محصولات مراقبت پوست با بسته‌بندی ساده روی سنگ طبیعی" sizes="(max-width: 800px) 100vw, 500px"/><span className="s-photo-sticker">NEW<br/>DROP</span></div></div>
    <div className="s-bottom"><div><span>01</span><strong>{featureText || "محصولات تازه"}</strong></div><div><span>02</span><strong>انتخاب‌های محبوب</strong></div><div><span>03</span><strong>راهنمای خرید</strong></div></div>
  </div>;
}

function Estate({ brand, headline, city, imageUrl, featureText, ctaText }: PreviewProps) {
  return <div className="concept concept-estate"><div className="e-hero"><PreviewPhoto src="/demos/realestate-graphic.webp" custom={imageUrl} alt="خانهٔ معماری معاصر با منظرهٔ تهران در غروب" sizes="(max-width: 800px) 100vw, 900px"/><div className="e-shade"/><header className="e-nav"><strong>{brand}<span>.</span></strong><nav><span>خرید ملک</span><span>اجاره</span><span>درباره ما</span></nav><span className="e-contact">{ctaText || "ثبت درخواست"} <ArrowUpLeft size={14}/></span></header><div className="e-copy"><span><MapPin size={14}/> املاک منتخب {city || "تهران"}</span><h2>{headline}</h2><p>فاصلهٔ شما تا فضای زندگی بعدی، یک جست‌وجوی دقیق است.</p></div><div className="e-search"><div><small>نوع معامله</small><strong>خرید ملک <ChevronDown size={14}/></strong></div><div><small>موقعیت</small><strong>{city || "همه محله‌ها"} <ChevronDown size={14}/></strong></div><div><small>نوع ملک</small><strong>آپارتمان و ویلا <ChevronDown size={14}/></strong></div><span className="e-search-button"><Search size={17}/> جست‌وجو</span></div></div><div className="e-below"><div><span>CURATED SPACES</span><strong>{featureText || "فضاهایی برای زندگی بهتر"}</strong></div><span>مشاهده فایل‌ها <ArrowLeft size={16}/></span></div></div>;
}

function Hotel({ brand, headline, city, imageUrl, featureText, ctaText }: PreviewProps) {
  return <div className="concept concept-hotel"><div className="h-hero"><PreviewPhoto src="/demos/hotel-graphic.webp" custom={imageUrl} alt="اقامتگاه کویری با معماری خشتی و نور گرم در غروب" sizes="(max-width: 800px) 100vw, 900px"/><div className="h-shade"/><header className="h-nav"><span><Menu size={17}/> فهرست</span><strong>{brand}</strong><span>رزرو اقامت <ArrowUpLeft size={15}/></span></header><div className="h-copy"><span>AN ESCAPE TO REMEMBER • {city || "کویر ایران"}</span><h2>{headline}</h2><p>چند روز دور از شتاب، نزدیک به آنچه واقعاً مهم است.</p><span className="h-discover">{ctaText || "کشف اقامتگاه"} <ArrowDownLeft size={18}/></span></div><div className="h-index">01 <span>—</span> 04</div></div><div className="h-booking"><div><small>ورود</small><strong><CalendarDays size={16}/> انتخاب تاریخ</strong></div><div><small>خروج</small><strong><CalendarDays size={16}/> انتخاب تاریخ</strong></div><div><small>مهمان‌ها</small><strong><Users size={16}/> ۲ نفر</strong></div><span>بررسی ظرفیت <ArrowLeft size={17}/></span></div><div className="h-below"><span>THE EXPERIENCE</span><strong>{featureText || "جایی برای مکث، نفس و کشف."}</strong></div></div>;
}

export default function BusinessPreview({ business, style, brand, headline, city, imageUrl, featureText, ctaText, accent, layout = "immersive" }: Props) {
  const props = { brand, headline, city, imageUrl, featureText, ctaText };
  return <div className={`business-preview theme-${style} layout-${layout}${accent ? " has-custom-accent" : ""}`} style={accent ? { "--custom-accent": accent } as React.CSSProperties : undefined}>
    {business === "restaurant" && <Restaurant {...props} />}
    {business === "clinic" && <Clinic {...props} />}
    {business === "shop" && <Shop {...props} />}
    {business === "realestate" && <Estate {...props} />}
    {business === "hotel" && <Hotel {...props} />}
    {business === "fitness" && <FitnessPreview {...props} />}
    <ConceptDetails business={business} city={city}/>
  </div>;
}
