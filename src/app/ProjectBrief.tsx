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
const contentOptions: readonly BriefOption[] = [
  { value: "بخشی از محتوا آماده است", label: "بخشی آماده است", marker: "50%" },
  { value: "همهٔ محتوا آماده است", label: "همه آماده است", marker: "100" },
  { value: "برای تولید محتوا کمک می‌خواهم", label: "برای محتوا کمک می‌خواهم", marker: "+" },
  { value: "هنوز بررسی نکرده‌ام", label: "هنوز بررسی نکرده‌ام", marker: "؟" },
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
const priorities = ["جذب مشتری", "فروش آنلاین", "معرفی حرفه‌ای برند", "سرعت و سئو", "سادگی استفاده", "امکانات اختصاصی"];
const features = ["فرم تماس", "رزرو یا نوبت", "فروش و پرداخت", "حساب کاربری", "پنل مدیریت", "وبلاگ", "جست‌وجو", "چندزبانه", "هوش مصنوعی"];
const emptyTech: string[] = [];

export default function ProjectBrief({ demoSummary, initialSelectedTech = emptyTech }: { demoSummary?: string; initialSelectedTech?: string[] }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [projectType, setProjectType] = useState(projectOptions[0].value);
  const [business, setBusiness] = useState("");
  const [industry, setIndustry] = useState("");
  const [existingUrl, setExistingUrl] = useState("");
  const [goal, setGoal] = useState("");
  const [audience, setAudience] = useState("");
  const [selectedPriorities, setSelectedPriorities] = useState<string[]>([]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [pages, setPages] = useState("هنوز مشخص نیست");
  const [content, setContent] = useState("بخشی از محتوا آماده است");
  const [references, setReferences] = useState("");
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
    "سلام آیسا، برای پروژهٔ جدید درخواست دارم.",
    "\n— کسب‌وکار —",
    `نوع پروژه: ${projectType}`,
    `نام کسب‌وکار: ${business.trim() || "هنوز مشخص نیست"}`,
    `حوزهٔ فعالیت: ${industry.trim() || "مشخص نشده"}`,
    `سایت فعلی: ${existingUrl.trim() || "ندارد / وارد نشده"}`,
    "\n— هدف و امکانات —",
    `هدف اصلی: ${goal.trim()}`,
    `مخاطب: ${audience.trim() || "مشخص نشده"}`,
    `اولویت‌ها: ${selectedPriorities.join("، ") || "انتخاب نشده"}`,
    `امکانات لازم: ${selectedFeatures.join("، ") || "نیاز به بررسی دارد"}`,
    "\n— محدوده و زمان —",
    `تعداد صفحه: ${pages}`,
    `آمادگی محتوا: ${content}`,
    `نمونه یا سلیقهٔ بصری: ${references.trim() || "ارسال نشده"}`,
    `فناوری‌های ترجیحی: ${selectedTech.join("، ") || "انتخاب نشده"}`,
    `زمان شروع: ${timeline}`,
    `بودجهٔ تقریبی: ${budget}`,
    `توضیحات بیشتر: ${notes.trim() || "—"}`,
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
    window.open(`https://wa.me/989352505353?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
    setOpened(true);
  }
  function sendEmail() {
    if (!formRef.current?.reportValidity()) return;
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent("درخواست طراحی و توسعهٔ سایت")}&body=${encodeURIComponent(message)}`;
    setOpened(true);
  }

  return <section className={demoSummary ? "project-brief demo-project-brief" : "project-brief"} id={demoSummary ? "request" : "project-brief"} aria-labelledby="brief-title"><div className="v2-wrap project-brief-wrap">
    <div className="v2-section-label"><span>09 / START A PROJECT</span><span>— فرم سفارش پروژه</span></div>
    <div className="project-brief-grid"><div className="project-brief-copy"><div className="project-brief-icon"><Sparkles size={22}/></div><h2 id="brief-title">{demoSummary ? <>دموت را <em>به پروژه تبدیل کن.</em></> : <>ایده‌ات را <em>روی میز بگذار.</em></>}</h2><p>از هدف سایت تا امکانات و زمان دلخواهت را بنویس. هر چیزی که هنوز مشخص نیست را می‌توانیم با هم بررسی کنیم.</p><div className="project-brief-steps"><span><b>01</b> کسب‌وکار</span><span><b>02</b> هدف و امکانات</span><span><b>03</b> محدودهٔ کار</span><span><b>04</b> ارتباط</span></div><p className="brief-side-note">{demoSummary ? "تنظیمات دمویی که ساختی هم به پیام سفارش اضافه می‌شود." : "پاسخ‌ها به‌شکل پیام آماده در واتساپ یا ایمیل باز می‌شوند. ارسال نهایی را خودت انجام می‌دهی."}</p></div>
      <form ref={formRef} className="project-brief-form" onSubmit={send}>
        <fieldset className="brief-group"><legend><span>01</span> دربارهٔ کسب‌وکار</legend>
          <BriefOptionPicker name="project-type" title="چه چیزی می‌خواهی بسازی؟ *" value={projectType} options={projectOptions} onChange={setProjectType} variant="project"/>
          <div className="brief-fields-two brief-business-fields">
            <div><label htmlFor="brief-business">نام کسب‌وکار <small>اختیاری</small></label><input id="brief-business" value={business} onChange={e => setBusiness(e.target.value)} maxLength={70} placeholder="مثلاً فروشگاه آوا"/></div>
            <div><label htmlFor="brief-industry">حوزهٔ فعالیت <small>اختیاری</small></label><input id="brief-industry" value={industry} onChange={e => setIndustry(e.target.value)} maxLength={70} placeholder="مثلاً آموزش، پزشکی یا فروش"/></div>
            <div><label htmlFor="brief-url">آدرس سایت فعلی <small>اگر داری</small></label><input id="brief-url" type="url" value={existingUrl} onChange={e => setExistingUrl(e.target.value)} maxLength={180} dir="ltr" placeholder="https://example.com"/></div>
          </div>
        </fieldset>
        <fieldset className="brief-group"><legend><span>02</span> هدف و امکانات</legend><label htmlFor="brief-goal">مهم‌ترین نتیجه‌ای که از سایت می‌خواهی چیست؟ *</label><textarea id="brief-goal" required minLength={10} maxLength={500} rows={3} value={goal} onChange={e => setGoal(e.target.value)} placeholder="مثلاً مشتری بتواند خدمات را مقایسه کند و برای مشاوره درخواست بفرستد."/><label htmlFor="brief-audience">مخاطب اصلی تو کیست؟ <small>اختیاری</small></label><input id="brief-audience" value={audience} onChange={e => setAudience(e.target.value)} maxLength={180} placeholder="مثلاً خانواده‌ها در تهران یا فروشگاه‌های کوچک"/><div className="brief-choice-group"><strong>اولویت‌های اصلی</strong><div className="project-priorities">{priorities.map(item => <button type="button" key={item} aria-pressed={selectedPriorities.includes(item)} className={selectedPriorities.includes(item) ? "selected" : ""} onClick={() => toggle(item, selectedPriorities, setSelectedPriorities)}>{selectedPriorities.includes(item) && <Check size={13}/>} {item}</button>)}</div></div><div className="brief-choice-group"><strong>چه امکاناتی لازم داری؟ <small>چند مورد را می‌توانی انتخاب کنی</small></strong><div className="project-priorities">{features.map(item => <button type="button" key={item} aria-pressed={selectedFeatures.includes(item)} className={selectedFeatures.includes(item) ? "selected" : ""} onClick={() => toggle(item, selectedFeatures, setSelectedFeatures)}>{selectedFeatures.includes(item) && <Check size={13}/>} {item}</button>)}</div></div></fieldset>
        <fieldset className="brief-group"><legend><span>03</span> محدوده، سلیقه و زمان</legend>
          <div className="brief-picker-grid">
            <BriefOptionPicker name="pages" title="حدود تعداد صفحه‌ها" value={pages} options={pageOptions} onChange={setPages}/>
            <BriefOptionPicker name="content" title="وضعیت متن و تصویر" value={content} options={contentOptions} onChange={setContent}/>
            <BriefOptionPicker name="timeline" title="زمان شروع دلخواه" value={timeline} options={timelineOptions} onChange={setTimeline}/>
            <BriefOptionPicker name="budget" title="بازهٔ بودجه" value={budget} options={budgetOptions} onChange={setBudget}/>
          </div>
          <div className="brief-live-summary" aria-live="polite"><span>انتخاب‌های فعلی</span><strong>{pages} / {timeline}</strong><small>{budget}</small></div>
          <label htmlFor="brief-references">نمونه‌سایت یا سبک مورد علاقه <small>اختیاری</small></label><textarea id="brief-references" maxLength={350} rows={2} value={references} onChange={e => setReferences(e.target.value)} placeholder="لینک نمونه‌ها یا توضیحی از رنگ و سبک دلخواهت"/>
          <div className="brief-choice-group"><strong>فناوری مورد علاقه <small>اختیاری؛ انتخاب فنی نهایی بعد از شناخت پروژه است</small></strong><div className="project-priorities brief-tech-options">{requestedTechOptions.map(item => <button type="button" key={item} aria-pressed={selectedTech.includes(item)} className={selectedTech.includes(item) ? "selected" : ""} onClick={() => toggle(item, selectedTech, setSelectedTech)}>{item}</button>)}</div></div>
          <label htmlFor="brief-notes">توضیحات یا محدودیت‌های دیگر <small>اختیاری</small></label><textarea id="brief-notes" maxLength={500} rows={3} value={notes} onChange={e => setNotes(e.target.value)} placeholder="مثلاً اتصال به نرم‌افزار فعلی، تاریخ رویداد، یا نیاز خاصی که بالا نبود"/>
        </fieldset>
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
