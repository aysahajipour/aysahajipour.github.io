"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Mail, MessageCircle, Sparkles } from "lucide-react";
import { site } from "@/lib/site";
import { requestedTechOptions } from "@/lib/tech";
import BriefOptionPicker, { type BriefOption } from "./BriefOptionPicker";
import "./project-brief.css";
import "./project-brief-v2.css";
import "./brief-option-picker.css";

const projectOptions: readonly BriefOption[] = [
  { value: "سایت معرفی کسب‌وکار", label: "سایت معرفی", detail: "خدمات و برند", marker: "WWW" },
  { value: "فروشگاه آنلاین", label: "فروشگاه آنلاین", detail: "محصول و پرداخت", marker: "BAG" },
  { value: "سایت مربیگری و ورزشی", label: "ورزش و مربیگری", detail: "برنامه و ثبت‌نام", marker: "FIT" },
  { value: "وب‌اپلیکیشن یا پنل", label: "وب‌اپلیکیشن یا پنل", detail: "ابزار اختصاصی", marker: "APP" },
  { value: "بازطراحی سایت فعلی", label: "بازطراحی سایت", detail: "تجربهٔ تازه", marker: "R2" },
  { value: "هنوز مطمئن نیستم", label: "نیاز به راهنمایی", detail: "با هم مشخص می‌کنیم", marker: "؟" },
];
const pageOptions: readonly BriefOption[] = [
  { value: "هنوز مشخص نیست", label: "هنوز نمی‌دانم", marker: "؟" },
  { value: "۱ تا ۳ صفحه", label: "۱ تا ۳ صفحه", marker: "01" },
  { value: "۴ تا ۸ صفحه", label: "۴ تا ۸ صفحه", marker: "04" },
  { value: "بیش از ۸ صفحه", label: "بیش از ۸ صفحه", marker: "08+" },
];
const timelineOptions: readonly BriefOption[] = [
  { value: "نیاز به بررسی دارد", label: "با هم تعیین کنیم", marker: "؟" },
  { value: "در اولین فرصت", label: "در اولین فرصت", marker: "NOW" },
  { value: "تا یک ماه آینده", label: "تا یک ماه آینده", marker: "1M" },
  { value: "یک تا سه ماه آینده", label: "یک تا سه ماه آینده", marker: "3M" },
  { value: "فعلاً در مرحلهٔ تحقیق هستم", label: "فعلاً در حال بررسی", marker: "..." },
];
const budgetOptions: readonly BriefOption[] = [
  { value: "ترجیح می‌دهم پس از بررسی پروژه مشخص شود", label: "پس از بررسی پروژه", marker: "؟" },
  { value: "کمتر از ۲۰ میلیون تومان", label: "کمتر از ۲۰ میلیون", marker: "20" },
  { value: "۲۰ تا ۵۰ میلیون تومان", label: "۲۰ تا ۵۰ میلیون", marker: "50" },
  { value: "۵۰ تا ۱۰۰ میلیون تومان", label: "۵۰ تا ۱۰۰ میلیون", marker: "100" },
  { value: "بیش از ۱۰۰ میلیون تومان", label: "بیش از ۱۰۰ میلیون", marker: "+" },
];
const contactOptions: readonly BriefOption[] = [
  { value: "واتساپ", label: "واتساپ", marker: "WA" },
  { value: "تماس تلفنی", label: "تماس تلفنی", marker: "TEL" },
  { value: "ایمیل", label: "ایمیل", marker: "@" },
  { value: "تلگرام", label: "تلگرام", marker: "TG" },
];
const features = ["فرم تماس", "رزرو یا نوبت", "فروش و پرداخت", "حساب کاربری", "پنل مدیریت", "وبلاگ", "جست‌وجو", "چندزبانه", "هوش مصنوعی"];
const emptyTech: string[] = [];

export default function ProjectBrief({ demoSummary, initialSelectedTech = emptyTech }: { demoSummary?: string; initialSelectedTech?: string[] }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [projectType, setProjectType] = useState(projectOptions[0].value);
  const [business, setBusiness] = useState("");
  const [industry, setIndustry] = useState("");
  const [existingUrl, setExistingUrl] = useState("");
  const [goal, setGoal] = useState("");
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [pages, setPages] = useState("هنوز مشخص نیست");
  const [selectedTech, setSelectedTech] = useState<string[]>(initialSelectedTech);
  const [timeline, setTimeline] = useState("نیاز به بررسی دارد");
  const [budget, setBudget] = useState("ترجیح می‌دهم پس از بررسی پروژه مشخص شود");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [contactMethod, setContactMethod] = useState("واتساپ");
  const [notes, setNotes] = useState("");
  const [opened, setOpened] = useState(false);
  const isDemo = Boolean(demoSummary);

  useEffect(() => { if (isDemo) setSelectedTech(initialSelectedTech); }, [isDemo, initialSelectedTech]);

  const message = [
    "سلام، برای پروژهٔ جدید درخواست دارم.",
    "\n— کسب‌وکار —",
    `نوع پروژه: ${projectType}`,
    ...(business.trim() ? [`نام کسب‌وکار: ${business.trim()}`] : []),
    ...(industry.trim() ? [`حوزهٔ فعالیت: ${industry.trim()}`] : []),
    ...(existingUrl.trim() ? [`سایت فعلی: ${existingUrl.trim()}`] : []),
    "\n— هدف و امکانات —",
    `هدف اصلی: ${goal.trim()}`,
    ...(selectedFeatures.length ? [`امکانات لازم: ${selectedFeatures.join("، ")}`] : []),
    "\n— محدوده و زمان —",
    `تعداد صفحه: ${pages}`,
    `زمان شروع: ${timeline}`,
    `بودجهٔ تقریبی: ${budget}`,
    ...(selectedTech.length ? [`فناوری‌های ترجیحی: ${selectedTech.join("، ")}`] : []),
    ...(notes.trim() ? [`توضیحات بیشتر یا نمونه‌ها: ${notes.trim()}`] : []),
    "\n— راه ارتباط —",
    `نام: ${name.trim()}`,
    `شماره یا ایمیل: ${contact.trim()}`,
    `راه ترجیحی تماس: ${contactMethod}`,
    ...(demoSummary ? ["\n— انتخاب‌های دموی ساخته‌شده —", demoSummary] : []),
  ].join("\n");

  function toggle(value: string, current: string[], setter: (next: string[]) => void) {
    setter(current.includes(value) ? current.filter(item => item !== value) : [...current, value]);
  }
  function send(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!formRef.current?.reportValidity()) return;
    const whatsappLink = new URL(site.whatsapp);
    whatsappLink.searchParams.set("text", message);
    window.open(whatsappLink.toString(), "_blank", "noopener,noreferrer");
    setOpened(true);
  }
  function sendEmail() {
    if (!formRef.current?.reportValidity()) return;
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent("درخواست طراحی و توسعهٔ سایت")}&body=${encodeURIComponent(message)}`;
    setOpened(true);
  }

  return <section className={demoSummary ? "project-brief demo-project-brief" : "project-brief"} id={demoSummary ? "request" : "project-brief"} aria-labelledby="brief-title"><div className="v2-wrap project-brief-wrap">
    <div className="v2-section-label"><span>09 / START A PROJECT</span><span>— فرم سفارش پروژه</span></div>
    <div className="project-brief-grid"><div className="project-brief-copy"><div className="project-brief-icon"><Sparkles size={22}/></div><h2 id="brief-title">{demoSummary ? <>دموت را <em>به پروژه تبدیل کن.</em></> : <>ایده‌ات را <em>روی میز بگذار.</em></>}</h2><p>چند نکته دربارهٔ پروژه‌ات بگو تا دقیق‌تر دربارهٔ اجرای آن صحبت کنیم.</p><div className="project-brief-steps"><span><b>01</b> کسب‌وکار</span><span><b>02</b> هدف و امکانات</span><span><b>03</b> محدودهٔ کار</span><span><b>04</b> ارتباط</span></div><p className="brief-side-note">{demoSummary ? "تنظیمات دموی تو هم در پیام واتساپ می‌آید." : "متن کامل فرم در واتساپ باز می‌شود؛ برای رسیدن پیام به من، ارسال را بزن."}</p></div>
      <form ref={formRef} className="project-brief-form" onSubmit={send}>
        <fieldset className="brief-group"><legend><span>01</span> دربارهٔ کسب‌وکار</legend>
          <BriefOptionPicker name="project-type" title="چه چیزی می‌خواهی بسازی؟ *" value={projectType} options={projectOptions} onChange={setProjectType} variant="project"/>
          <div className="brief-fields-two brief-business-fields">
            <div><label htmlFor="brief-business">نام کسب‌وکار <small>اختیاری</small></label><input id="brief-business" value={business} onChange={e => setBusiness(e.target.value)} maxLength={70} placeholder="مثلاً فروشگاه آوا"/></div>
            <div><label htmlFor="brief-industry">حوزهٔ فعالیت <small>اختیاری</small></label><input id="brief-industry" value={industry} onChange={e => setIndustry(e.target.value)} maxLength={70} placeholder="مثلاً آموزش، پزشکی یا فروش"/></div>
            <div><label htmlFor="brief-url">آدرس سایت فعلی <small>اگر داری</small></label><input id="brief-url" type="url" value={existingUrl} onChange={e => setExistingUrl(e.target.value)} maxLength={180} dir="ltr" placeholder="https://example.com"/></div>
          </div>
        </fieldset>
        <fieldset className="brief-group brief-goals"><legend><span>02</span> هدف و امکانات</legend><label htmlFor="brief-goal">سایت قرار است چه کاری برایت انجام دهد؟ *</label><textarea id="brief-goal" required minLength={10} maxLength={500} rows={3} value={goal} onChange={e => setGoal(e.target.value)} placeholder="مثلاً مشتری بتواند محصول را انتخاب و خرید کند."/><div className="brief-choice-group"><strong>امکانات مورد نیاز <small>اختیاری</small></strong><div className="project-priorities">{features.map(item => <button type="button" key={item} aria-pressed={selectedFeatures.includes(item)} className={selectedFeatures.includes(item) ? "selected" : ""} onClick={() => toggle(item, selectedFeatures, setSelectedFeatures)}>{selectedFeatures.includes(item) && <Check size={13}/>} {item}</button>)}</div></div></fieldset>
        <fieldset className="brief-group brief-scope"><legend><span>03</span> محدوده و زمان</legend>
          <div className="brief-picker-grid">
            <BriefOptionPicker name="pages" title="حدود تعداد صفحه‌ها" value={pages} options={pageOptions} onChange={setPages}/>
            <BriefOptionPicker name="timeline" title="زمان شروع دلخواه" value={timeline} options={timelineOptions} onChange={setTimeline}/>
            <BriefOptionPicker name="budget" title="بازهٔ بودجه" value={budget} options={budgetOptions} onChange={setBudget}/>
          </div>
        </fieldset>
        <details className="brief-extras"><summary>جزئیات بیشتر <small>اختیاری؛ نمونه، سلیقه یا فناوری دلخواه</small></summary><div className="brief-extras-content"><div className="brief-extra-field"><label htmlFor="brief-notes">نمونه‌سایت یا توضیح بیشتر</label><textarea id="brief-notes" maxLength={700} rows={3} value={notes} onChange={e => setNotes(e.target.value)} placeholder="اگر نمونه، رنگ، محدودیت یا نیاز خاصی داری، اینجا بنویس."/></div><div className="brief-extra-field brief-extra-tech"><strong>فناوری دلخواه</strong><div className="project-priorities brief-tech-options">{requestedTechOptions.map(item => <button type="button" key={item} aria-pressed={selectedTech.includes(item)} className={selectedTech.includes(item) ? "selected" : ""} onClick={() => toggle(item, selectedTech, setSelectedTech)}>{item}</button>)}</div></div></div></details>
        <fieldset className="brief-group"><legend><span>04</span> راه ارتباط</legend>
          <div className="brief-fields-two"><div><label htmlFor="brief-name">نام شما *</label><input id="brief-name" required minLength={2} maxLength={70} value={name} onChange={e => setName(e.target.value)} placeholder="نام و نام خانوادگی"/></div><div><label htmlFor="brief-contact">شماره یا ایمیل *</label><input id="brief-contact" required minLength={5} maxLength={100} value={contact} onChange={e => setContact(e.target.value)} placeholder="راه ارتباطی دلخواه"/></div></div>
          <BriefOptionPicker name="contact-method" title="ترجیح می‌دهی چطور با تو تماس بگیرم؟" value={contactMethod} options={contactOptions} onChange={setContactMethod} variant="contact"/>
        </fieldset>
        <div className="project-brief-actions"><button type="submit">ارسال جزئیات در واتساپ <MessageCircle size={18}/></button><button type="button" className="brief-email-action" onClick={sendEmail}>ارسال با ایمیل <Mail size={16}/></button></div>
        {opened && <p className="project-brief-notice">پیام آماده باز شد؛ لطفاً ارسال آن را در واتساپ یا ایمیل کامل کن.</p>}
        <p className="project-brief-privacy">اطلاعات فرم در این سایت ذخیره نمی‌شود.</p>
      </form></div>
  </div></section>;
}
