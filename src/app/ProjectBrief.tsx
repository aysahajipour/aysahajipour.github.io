"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Mail, MessageCircle, Sparkles } from "lucide-react";
import { site } from "@/lib/site";
import { requestedTechOptions } from "@/lib/tech";
import "./project-brief.css";
import "./project-brief-v2.css";

const projectTypes = ["سایت معرفی کسب‌وکار", "فروشگاه آنلاین", "سایت مربیگری و ورزشی", "وب‌اپلیکیشن یا پنل", "بازطراحی سایت فعلی", "هنوز مطمئن نیستم"];
const priorities = ["جذب مشتری", "فروش آنلاین", "معرفی حرفه‌ای برند", "سرعت و سئو", "سادگی استفاده", "امکانات اختصاصی"];
const features = ["فرم تماس", "رزرو یا نوبت", "فروش و پرداخت", "حساب کاربری", "پنل مدیریت", "وبلاگ", "جست‌وجو", "چندزبانه", "هوش مصنوعی"];
const emptyTech: string[] = [];

export default function ProjectBrief({ demoSummary, initialSelectedTech = emptyTech }: { demoSummary?: string; initialSelectedTech?: string[] }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [projectType, setProjectType] = useState(projectTypes[0]);
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
        <fieldset className="brief-group"><legend><span>01</span> دربارهٔ کسب‌وکار</legend><div className="brief-fields-two"><div><label htmlFor="brief-type">چه چیزی می‌خواهی بسازی؟ *</label><select id="brief-type" value={projectType} onChange={e => setProjectType(e.target.value)}>{projectTypes.map(type => <option key={type}>{type}</option>)}</select></div><div><label htmlFor="brief-business">نام کسب‌وکار <small>اختیاری</small></label><input id="brief-business" value={business} onChange={e => setBusiness(e.target.value)} maxLength={70} placeholder="مثلاً فروشگاه آوا"/></div><div><label htmlFor="brief-industry">حوزهٔ فعالیت <small>اختیاری</small></label><input id="brief-industry" value={industry} onChange={e => setIndustry(e.target.value)} maxLength={70} placeholder="مثلاً آموزش، پزشکی یا فروش"/></div><div><label htmlFor="brief-url">آدرس سایت فعلی <small>اگر داری</small></label><input id="brief-url" type="url" value={existingUrl} onChange={e => setExistingUrl(e.target.value)} maxLength={180} dir="ltr" placeholder="https://example.com"/></div></div></fieldset>
        <fieldset className="brief-group"><legend><span>02</span> هدف و امکانات</legend><label htmlFor="brief-goal">مهم‌ترین نتیجه‌ای که از سایت می‌خواهی چیست؟ *</label><textarea id="brief-goal" required minLength={10} maxLength={500} rows={3} value={goal} onChange={e => setGoal(e.target.value)} placeholder="مثلاً مشتری بتواند خدمات را مقایسه کند و برای مشاوره درخواست بفرستد."/><label htmlFor="brief-audience">مخاطب اصلی تو کیست؟ <small>اختیاری</small></label><input id="brief-audience" value={audience} onChange={e => setAudience(e.target.value)} maxLength={180} placeholder="مثلاً خانواده‌ها در تهران یا فروشگاه‌های کوچک"/><div className="brief-choice-group"><strong>اولویت‌های اصلی</strong><div className="project-priorities">{priorities.map(item => <button type="button" key={item} aria-pressed={selectedPriorities.includes(item)} className={selectedPriorities.includes(item) ? "selected" : ""} onClick={() => toggle(item, selectedPriorities, setSelectedPriorities)}>{selectedPriorities.includes(item) && <Check size={13}/>} {item}</button>)}</div></div><div className="brief-choice-group"><strong>چه امکاناتی لازم داری؟ <small>چند مورد را می‌توانی انتخاب کنی</small></strong><div className="project-priorities">{features.map(item => <button type="button" key={item} aria-pressed={selectedFeatures.includes(item)} className={selectedFeatures.includes(item) ? "selected" : ""} onClick={() => toggle(item, selectedFeatures, setSelectedFeatures)}>{selectedFeatures.includes(item) && <Check size={13}/>} {item}</button>)}</div></div></fieldset>
        <fieldset className="brief-group"><legend><span>03</span> محدوده، سلیقه و زمان</legend><div className="brief-fields-two"><div><label htmlFor="brief-pages">حدود تعداد صفحه‌ها</label><select id="brief-pages" value={pages} onChange={e => setPages(e.target.value)}><option>هنوز مشخص نیست</option><option>۱ تا ۳ صفحه</option><option>۴ تا ۸ صفحه</option><option>بیش از ۸ صفحه</option></select></div><div><label htmlFor="brief-content">وضعیت متن و تصویر</label><select id="brief-content" value={content} onChange={e => setContent(e.target.value)}><option>بخشی از محتوا آماده است</option><option>همهٔ محتوا آماده است</option><option>برای تولید محتوا کمک می‌خواهم</option><option>هنوز بررسی نکرده‌ام</option></select></div><div><label htmlFor="brief-timeline">زمان شروع دلخواه</label><select id="brief-timeline" value={timeline} onChange={e => setTimeline(e.target.value)}><option>نیاز به بررسی دارد</option><option>در اولین فرصت</option><option>تا یک ماه آینده</option><option>یک تا سه ماه آینده</option><option>فعلاً در مرحلهٔ تحقیق هستم</option></select></div><div><label htmlFor="brief-budget">بازهٔ بودجه</label><select id="brief-budget" value={budget} onChange={e => setBudget(e.target.value)}><option>ترجیح می‌دهم پس از بررسی پروژه مشخص شود</option><option>کمتر از ۲۰ میلیون تومان</option><option>۲۰ تا ۵۰ میلیون تومان</option><option>۵۰ تا ۱۰۰ میلیون تومان</option><option>بیش از ۱۰۰ میلیون تومان</option></select></div></div><label htmlFor="brief-references">نمونه‌سایت یا سبک مورد علاقه <small>اختیاری</small></label><textarea id="brief-references" maxLength={350} rows={2} value={references} onChange={e => setReferences(e.target.value)} placeholder="لینک نمونه‌ها یا توضیحی از رنگ و سبک دلخواهت"/><div className="brief-choice-group"><strong>فناوری مورد علاقه <small>اختیاری؛ انتخاب فنی نهایی بعد از شناخت پروژه است</small></strong><div className="project-priorities brief-tech-options">{requestedTechOptions.map(item => <button type="button" key={item} aria-pressed={selectedTech.includes(item)} className={selectedTech.includes(item) ? "selected" : ""} onClick={() => toggle(item, selectedTech, setSelectedTech)}>{item}</button>)}</div></div><label htmlFor="brief-notes">توضیحات یا محدودیت‌های دیگر <small>اختیاری</small></label><textarea id="brief-notes" maxLength={500} rows={3} value={notes} onChange={e => setNotes(e.target.value)} placeholder="مثلاً اتصال به نرم‌افزار فعلی، تاریخ رویداد، یا نیاز خاصی که بالا نبود"/></fieldset>
        <fieldset className="brief-group"><legend><span>04</span> راه ارتباط</legend><div className="brief-fields-two"><div><label htmlFor="brief-name">نام شما *</label><input id="brief-name" required minLength={2} maxLength={70} value={name} onChange={e => setName(e.target.value)} placeholder="نام و نام خانوادگی"/></div><div><label htmlFor="brief-contact">شماره یا ایمیل *</label><input id="brief-contact" required minLength={5} maxLength={100} value={contact} onChange={e => setContact(e.target.value)} placeholder="راه ارتباطی دلخواه"/></div></div><label htmlFor="brief-method">ترجیح می‌دهی چطور با تو تماس بگیرم؟</label><select id="brief-method" value={contactMethod} onChange={e => setContactMethod(e.target.value)}><option>واتساپ</option><option>تماس تلفنی</option><option>ایمیل</option><option>تلگرام</option></select></fieldset>
        <div className="project-brief-actions"><button type="submit">ارسال جزئیات در واتساپ <MessageCircle size={18}/></button><button type="button" className="brief-email-action" onClick={sendEmail}>ارسال با ایمیل <Mail size={16}/></button></div>
        {opened && <p className="project-brief-notice">پیام آماده باز شد؛ لطفاً ارسال آن را در واتساپ یا ایمیل کامل کن.</p>}
        <p className="project-brief-privacy">اطلاعات فرم در این سایت ذخیره نمی‌شود.</p>
      </form></div>
  </div></section>;
}
