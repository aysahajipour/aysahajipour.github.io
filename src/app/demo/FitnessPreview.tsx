import Image from "next/image";
import { ArrowUpLeft, Check, MoveUpRight } from "lucide-react";
import "./fitness-preview.css";

type Props = { brand: string; headline: string; city: string; imageUrl?: string | null; featureText?: string; ctaText?: string };

export default function FitnessPreview({ brand, headline, city, imageUrl, featureText, ctaText }: Props) {
  return <div className="concept concept-fitness">
    <div className="fit-topline"><span>COACHING / PERFORMANCE / WELLBEING</span><span>ONLINE + {city || "TEHRAN"}</span></div>
    <header className="fit-header"><strong className="fit-logo"><span>✳</span>{brand}</strong><nav aria-label="بخش‌های نمونهٔ سایت ورزشی"><span>روش تمرین</span><span>برنامه‌ها</span><span>درباره مربی</span></nav><span className="fit-header-cta">شروع مسیر <ArrowUpLeft size={15}/></span></header>
    <div className="fit-hero"><div className="fit-content"><div className="fit-kicker"><span/> تمرین شخصی، مسیر روشن</div><h2>{headline}</h2><p>برنامه‌ای که با هدف، زمان و توان تو هماهنگ می‌شود. قدم‌به‌قدم پیش برو و پیشرفتت را ببین.</p><span className="fit-cta">{ctaText || "دیدن مسیر تمرین"}<MoveUpRight size={17}/></span><div className="fit-proof"><Check size={16}/><span>برنامهٔ منعطف، پیگیری منظم، حرکت درست</span></div></div><div className="fit-photo">{imageUrl ? <img src={imageUrl} alt="تصویر انتخابی برای سایت مربیگری" className="uploaded-image"/> : <Image src="/demos/fitness-portrait.webp" alt="ورزشکار در حال دویدن با نورهای آبی و صورتی" fill sizes="(max-width: 800px) 100vw, 600px" loading="eager" className="fit-photo-image"/>}<div className="fit-photo-stamp"><span>MOVE WITH</span><strong>INTENT.</strong></div></div></div>
    <div className="fit-bottom"><div><span>01 / برنامه</span><strong>{featureText || "تمرین متناسب با هدف و زندگی تو"}</strong></div><div><span>02 / پیگیری</span><strong>همراهی در مسیر پیشرفت</strong></div><div><span>03 / انعطاف</span><strong>هماهنگ با ریتم روزهای تو</strong></div></div>
  </div>;
}
