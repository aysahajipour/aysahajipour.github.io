"use client";

import { useState } from "react";
import { ArrowUpLeft, Blocks, Bot, Gauge, Layers3, ServerCog } from "lucide-react";
import { techDescriptions } from "@/lib/tech";
import "./capabilities.css";
import "./capabilities-visual.css";

const capabilities = [
  { n: "01", icon: Layers3, eyebrow: "FRONTEND & UI", title: "رابط کاربری و سایت اختصاصی", detail: "از سایت معرفی تا فروشگاه و پنل؛ تجربه‌ای که در موبایل هم راحت و دقیق کار کند.", stack: ["React", "Next.js", "TypeScript", "JavaScript", "HTML", "CSS"] },
  { n: "02", icon: Blocks, eyebrow: "BACKEND & API", title: "منطق محصول و اتصال سرویس‌ها", detail: "فرم، حساب کاربری، پرداخت و داده را پشت یک جریان قابل اتکا به هم وصل می‌کنم.", stack: ["ASP.NET Core", "Python", "FastAPI", "Flask", "Go", "Node.js"] },
  { n: "03", icon: Bot, eyebrow: "AI INTEGRATION", title: "امکانات هوشمندِ کاربردی", detail: "دستیار یا جست‌وجویی که به دادهٔ واقعی کسب‌وکار تکیه کند و کار مشخصی انجام دهد.", stack: ["LLM", "vLLM", "RAG", "Embeddings", "AI APIs"] },
  { n: "04", icon: ServerCog, eyebrow: "DATA & OPERATIONS", title: "داده، استقرار و نگهداری", detail: "محصول را با پایگاه داده، استقرار و پایش به مرحلهٔ استفادهٔ واقعی می‌رسانم.", stack: ["PostgreSQL", "SQL Server", "Redis", "Docker", "Linux / VPS"] },
  { n: "05", icon: Gauge, eyebrow: "GROWTH & TECHNICAL SEO", title: "سرعت، دسترسی و سئوی فنی", detail: "پایهٔ فنی دیده‌شدن را با ساختار درست، سرعت، دسترسی و ابزار سنجش می‌سازم.", stack: ["Technical SEO", "Accessibility", "Performance", "Search Console", "Analytics"] },
];

function CapabilityVisual({ n }: { n: string }) {
  if (n === "01") return <div className="cap-visual cap-visual-ui" aria-hidden="true"><div className="cap-browser"><span className="cap-dots">● ● ●</span><div className="cap-browser-body"><i/><div><b/><b/><small/></div></div></div><span className="cap-visual-note">RESPONSIVE / READY</span></div>;
  if (n === "02") return <div className="cap-visual cap-visual-api" aria-hidden="true"><div className="cap-flow"><span>کاربر</span><i>↔</i><strong>API</strong><i>↔</i><span>داده</span></div><div className="cap-api-line"><span>POST /request</span><b>200 OK</b></div></div>;
  if (n === "03") return <div className="cap-visual cap-visual-ai" aria-hidden="true"><div className="cap-chat-question">از فایل‌های من پاسخ بده ✦</div><div className="cap-chat-answer"><span>✳</span><i/><i/><i/></div><small>DATA → CONTEXT → ANSWER</small></div>;
  if (n === "04") return <div className="cap-visual cap-visual-ops" aria-hidden="true"><div className="cap-ops-bars"><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/></div><div className="cap-ops-status"><span>● LIVE</span><span>DB / CACHE / DEPLOY</span></div></div>;
  return <div className="cap-visual cap-visual-seo" aria-hidden="true"><div className="cap-search-result"><span>یکسل / نتیجهٔ جست‌وجو</span><strong>صفحه‌ای که پیدا می‌شود</strong><i/><i/></div><div className="cap-score">۹۸<span>PERFORMANCE</span></div></div>;
}

export default function Capabilities() {
  const [openTech, setOpenTech] = useState<string | null>(null);
  return <section className="capabilities" id="capabilities" aria-labelledby="capabilities-title">
    <div className="v2-wrap">
      <div className="v2-section-label"><span>05 / WHAT I CAN DO</span><span>— توانایی‌ها</span></div>
      <div className="capabilities-heading"><div><span className="capabilities-kicker">از رابط کاربری تا زیرساخت</span><h2 id="capabilities-title">از رابط تا سرور، <em>دست‌به‌کد.</em></h2></div><p>در پروژه‌های واقعی با این ابزارها کار کرده‌ام. روی هر نام بزن تا کاربردش را در محصول ببینی.</p></div>
      <div className="capabilities-grid">{capabilities.map(({ n, icon: Icon, eyebrow, title, detail, stack }) => <article className={`capability-card capability-card-${n}`} key={n}><div className="capability-card-top"><span>{n} / {eyebrow}</span><Icon size={22} strokeWidth={1.6}/></div><CapabilityVisual n={n}/><h3>{title}</h3><p>{detail}</p><div className="capability-tags">{stack.map(item => <button type="button" key={item} aria-expanded={openTech === item} onClick={() => setOpenTech(current => current === item ? null : item)}>{item}</button>)}</div>{openTech && stack.includes(openTech) && <div className="capability-tech-info" role="status"><strong>{openTech}</strong><span>{techDescriptions[openTech]}</span></div>}</article>)}</div>
      <a className="capabilities-cta" href="#project-brief">دربارهٔ پروژه‌ات صحبت کنیم <ArrowUpLeft size={17}/></a>
    </div>
  </section>;
}
