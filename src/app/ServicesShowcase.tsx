"use client";

import { useState } from "react";
import { ArrowUpLeft, Code2, Gauge, Layers3, ServerCog } from "lucide-react";
import "./services-showcase.css";

const services = [
  { n: "01", icon: Layers3, title: "سایت اختصاصی", subtitle: "وقتی اولین نگاه باید اعتماد بسازد", headline: "سایتی که برندت را روشن معرفی کند.", body: "صفحه‌ها را بر اساس مخاطب و هدف کسب‌وکار می‌چینم؛ از معرفی ارزش و نمونه‌کار تا یک مسیر واضح برای تماس یا خرید.", outputs: ["طراحی واکنش‌گرا", "صفحه‌های هدفمند", "فرم و مسیر تماس"], kind: "site" },
  { n: "02", icon: Code2, title: "فروشگاه و وب‌اپ", subtitle: "وقتی تجربه باید کار را جلو ببرد", headline: "از بازدید تا انجام کار، بدون سردرگمی.", body: "برای فروش، رزرو، داشبورد یا ابزار داخلی، جریان کار را از نیاز واقعی کاربر می‌سازم و بعد رابط و منطق آن را پیاده می‌کنم.", outputs: ["جریان خرید یا رزرو", "پنل مدیریت", "تعاملات کاربردی"], kind: "product" },
  { n: "03", icon: ServerCog, title: "بک‌اند و اتصال‌ها", subtitle: "وقتی بخش‌های پشت صحنه باید مطمئن باشند", headline: "اطلاعات و سرویس‌ها هماهنگ کار کنند.", body: "API، حساب کاربری، پایگاه داده و اتصال سرویس‌ها را طوری کنار هم می‌گذارم که محصول قابل استفاده و قابل نگهداری باشد.", outputs: ["API و داده", "احراز هویت", "اتصال پرداخت و ابزارها"], kind: "system" },
  { n: "04", icon: Gauge, title: "سرعت و سئوی فنی", subtitle: "وقتی سایت باید پیدا و راحت استفاده شود", headline: "پایهٔ فنی برای رشد در جست‌وجو.", body: "ساختار محتوا، متادیتا، عملکرد موبایل و دسترسی را بررسی و اصلاح می‌کنم تا سایت برای کاربر و موتور جست‌وجو آماده باشد.", outputs: ["ساختار و متادیتا", "عملکرد موبایل", "ابزارهای سنجش"], kind: "growth" },
] as const;

function ServiceVisual({ kind }: { kind: typeof services[number]["kind"] }) {
  return <div className={`service-visual service-visual-${kind}`} aria-hidden="true">
    {kind === "site" && <div className="service-mini-browser"><div className="service-mini-bar"><i/><i/><i/><span>YOUR BRAND</span></div><div className="service-mini-hero"><div><b/><b/><small/></div><span>✳</span></div><div className="service-mini-tiles"><i/><i/><i/></div></div>}
    {kind === "product" && <div className="service-mini-product"><div><span>سفارش‌های امروز</span><strong>۲۴</strong><small>↗ در حال رشد</small></div><div className="service-mini-chart"><i/><i/><i/><i/><i/><i/></div></div>}
    {kind === "system" && <div className="service-mini-system"><span>فرم سایت</span><b>↔</b><strong>API</strong><b>↔</b><span>داده</span><small>CONNECTED • SECURE • READY</small></div>}
    {kind === "growth" && <div className="service-mini-growth"><div className="service-mini-score">۹۸<small>سرعت</small></div><div><strong>آماده برای جست‌وجو</strong><span/><span/><span/></div></div>}
  </div>;
}

export default function ServicesShowcase() {
  const [selected, setSelected] = useState(0);
  const current = services[selected];
  return <section className="v2-services services-showcase" id="services" aria-labelledby="services-title"><div className="v2-wrap">
    <div className="v2-section-label"><span>04 / WHAT I CAN BUILD</span><span>— خدمات</span></div>
    <div className="v2-services-heading"><h2 id="services-title">چه چیزی برایت<br/>می‌توانم <em>بسازم؟</em></h2><p>یک خدمت را انتخاب کن تا ببینی چه مسئله‌ای را حل می‌کند و چه چیزی تحویل می‌گیری.</p></div>
    <div className="services-interactive"><div className="services-options" role="group" aria-label="انتخاب خدمت">{services.map((service, index) => { const Icon = service.icon; return <button type="button" aria-pressed={selected === index} className={selected === index ? "active" : ""} key={service.n} onClick={() => setSelected(index)}><span className="service-option-number">{service.n}</span><Icon size={19} strokeWidth={1.7}/><span className="service-option-copy"><strong>{service.title}</strong><small>{service.subtitle}</small></span><ArrowUpLeft size={17}/></button>; })}</div>
      <div className="service-feature" aria-live="polite" key={current.n}><div className="service-feature-copy"><span>خدمت {current.n} / {current.title}</span><h3>{current.headline}</h3><p>{current.body}</p><div className="service-deliverables"><strong>چیزی که می‌گیری</strong>{current.outputs.map(item => <span key={item}>✳ {item}</span>)}</div><a href="#project-brief">درخواست این خدمت <ArrowUpLeft size={16}/></a></div><ServiceVisual kind={current.kind}/></div>
    </div>
  </div></section>;
}
