import Link from "next/link";
import { ArrowDownLeft, ArrowUpLeft, Check, ExternalLink, Github, Menu, MessageCircle, Zap } from "lucide-react";
import { site } from "@/lib/site";
import HomeShowcase from "./HomeShowcase";
import PixelLab from "./PixelLab";
import ProjectBrief from "./ProjectBrief";
import HeroCodeWindow from "./HeroCodeWindow";
import InfiniteMarquee from "./InfiniteMarquee";
import Capabilities from "./Capabilities";
import IntroStory from "./IntroStory";
import PixelEffectToggle from "./PixelEffectToggle";
import ServicesShowcase from "./ServicesShowcase";
import "./home-v2.css";
import "./hero-code.css";
import "./brand-theme.css";
import "./neon-theme.css";
import "./typography-polish.css";
import "./homepage-polish.css";

const steps = [
  { n: "01", title: "شناخت مسئله", body: "می‌فهمم مشتری تو دنبال چیست و سایت باید چه کاری را آسان کند." },
  { n: "02", title: "طرح اولیه", body: "چیدمان، لحن و ظاهر را قبل از شروع توسعه با هم می‌بینیم." },
  { n: "03", title: "ساخت و بازبینی", body: "رابط، منطق و اتصال‌ها را مرحله‌به‌مرحله می‌سازم و نشان می‌دهم." },
  { n: "04", title: "انتشار و همراهی", body: "سایت را در موبایل و دسکتاپ بررسی می‌کنم، منتشر می‌کنم و مشکل‌ها را پی می‌گیرم." },
];

export default function Home() {
  const structuredData = { "@context": "https://schema.org", "@graph": [
    { "@type": "Person", "@id": `${site.url}/#person`, name: site.name, url: site.url, email: site.email, sameAs: [site.github], jobTitle: "توسعه‌دهنده نرم‌افزار و وب", knowsAbout: ["React", "Next.js", "TypeScript", "ASP.NET Core", "Python", "API development", "AI integration", "Technical SEO"] },
    { "@type": "WebSite", "@id": `${site.url}/#website`, name: site.name, url: site.url, inLanguage: "fa-IR", about: { "@id": `${site.url}/#person` } },
  ] };
  return <main className="studio-home" id="top">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    <a className="skip-link" href="#main-content">رفتن به محتوا</a>
    <div className="v2-dark-top">
      <header className="v2-header v2-wrap"><Link href="/" className="v2-logo" aria-label="صفحه اصلی آیسا حاجی‌پور"><span className="v2-logo-mark">A<span>✳</span></span><span>AYSA<br/>HAJIPOUR</span></Link><nav className="v2-nav" aria-label="ناوبری اصلی"><a href="#work">دموها</a><a href="#pixel-lab">آزمایشگاه پیکسل</a><a href="#services">خدمات</a><a href="#capabilities">مهارت‌ها</a><a href="#about">درباره من</a></nav><div className="v2-header-actions"><PixelEffectToggle/><a href="#project-brief" className="v2-header-contact">شروع همکاری <ArrowUpLeft size={17}/></a><details className="v2-mobile-nav"><summary aria-label="بازکردن فهرست"><Menu size={22}/></summary><nav aria-label="ناوبری موبایل"><a href="#work">دموها</a><a href="#pixel-lab">آزمایشگاه پیکسل</a><a href="#services">خدمات</a><a href="#capabilities">مهارت‌ها</a><a href="#approach">روش کار</a><a href="#about">درباره من</a><a href="#contact">تماس</a></nav></details></div></header>
      <section className="v2-hero v2-wrap" id="main-content"><div className="v2-hero-copy"><div className="v2-kicker"><span className="v2-live-dot"/> FULL-STACK DEVELOPER / WEB + AI <span>— 2026</span></div><h1>از اولین پیکسل <em>تا روز انتشار.</em></h1><p>طراحی و توسعهٔ وب را از تجربهٔ کاربر تا API و استقرار، یکپارچه پیش می‌برم؛ برای سایت‌هایی که روان کار می‌کنند و به هدف کسب‌وکار می‌رسند.</p><div className="v2-hero-buttons"><Link href="/demo" className="v2-primary">دموی کسب‌وکارت را بساز <ArrowUpLeft size={18}/></Link><a href="#work" className="v2-ghost">دیدن نمونه‌ها <ArrowDownLeft size={17}/></a></div><div className="v2-hero-availability"><span className="v2-availability-icon"><Check size={14}/></span><span>برای همکاری روی پروژه‌های جدید آماده‌ام</span></div></div><div className="v2-hero-art"><HeroCodeWindow/></div><div className="v2-hero-side">SCROLL TO EXPLORE <ArrowDownLeft size={15}/></div></section>
    </div>
    <InfiniteMarquee/>
    <IntroStory/>
    <PixelLab/>
    <section className="v2-work" id="work"><div className="v2-wrap"><div className="v2-section-label"><span>03 / INTERACTIVE CONCEPTS</span><span>— شش دنیای متفاوت</span></div><div className="v2-work-heading"><h2>ایده‌ات را <em>اینجا ببین.</em></h2><div className="v2-work-guide"><p>یکی از شش حوزه را انتخاب کن؛ سایت کاملش را ببین یا همان سبک را در دموساز شخصی‌سازی کن.</p><Link href="/demo" className="v2-all-demos">دیدن همهٔ دموها <ArrowUpLeft size={17}/></Link></div></div><HomeShowcase/></div></section>
    <ServicesShowcase/>
    <Capabilities/>
    <section className="v2-tech"><div className="v2-wrap v2-tech-grid"><div className="v2-tech-copy"><div className="v2-section-label"><span>06 / THE CRAFT</span><span>— پشت صحنه</span></div><h2>پشت هر پیکسل، <em>یک تصمیم فنی.</em></h2><p>از React و TypeScript برای رابط تا API و پایگاه داده برای پشت صحنه؛ فناوری را بر اساس کاری که محصول باید انجام دهد انتخاب می‌کنم.</p><div className="v2-tech-tags"><span>Next.js</span><span>React</span><span>TypeScript</span><span>Node.js</span><span>API</span><span>SEO</span></div></div><div className="v2-tech-visual"><div className="v2-code-window"><div><span/><span/><span/><small>experience.tsx</small></div><pre><code><span className="tok-purple">const</span> <span className="tok-yellow">website</span> = {`{`}{'\n'}  <span className="tok-green">strategy</span>: <span className="tok-orange">"clear"</span>,{'\n'}  <span className="tok-green">design</span>: <span className="tok-orange">"distinctive"</span>,{'\n'}  <span className="tok-green">code</span>: <span className="tok-orange">"built to last"</span>{'\n'}{`}`};{'\n\n'}<span className="tok-purple">return</span> website.<span className="tok-yellow">makeAnImpact</span>();</code></pre><div className="v2-code-status"><span/> ALL SYSTEMS READY</div></div><div className="v2-tech-float"><Zap size={20}/><span>PERFORMANCE<br/>MATTERS</span></div></div></div></section>
    <section className="v2-approach v2-wrap" id="approach"><div className="v2-section-label"><span>07 / THE PROCESS</span><span>— مسیر همکاری</span></div><h2>از گفت‌وگوی اول <em>تا انتشار.</em></h2><div className="v2-steps">{steps.map(step => <article key={step.n}><span>{step.n}</span><div className="v2-step-rule"/><h3>{step.title}</h3><p>{step.body}</p></article>)}</div></section>
    <section className="v2-about" id="about"><div className="v2-wrap v2-about-grid"><div className="v2-about-graphic about-code-card" aria-hidden="true"><div className="about-code-top"><span><i/><i/><i/></span><small>about.aisa.ts</small><b>↗</b></div><div className="about-code-body"><span className="about-code-line"><small>01</small><code><em>const</em> developer = &#123;</code></span><span className="about-code-line"><small>02</small><code>&nbsp;&nbsp;role: <strong>"Full-Stack Developer"</strong>,</code></span><span className="about-code-line"><small>03</small><code>&nbsp;&nbsp;focus: <strong>"Backend + AI"</strong>,</code></span><span className="about-code-line"><small>04</small><code>&nbsp;&nbsp;work: [<strong>"VitMeet"</strong>, <strong>"AsllMarket"</strong>],</code></span><span className="about-code-line"><small>05</small><code>&nbsp;&nbsp;approach: <strong>"build → ship → improve"</strong></code></span><span className="about-code-line"><small>06</small><code>&#125;;</code></span></div><div className="about-code-foot"><span><i/> AVAILABLE FOR NEW PROJECTS</span><span>FA / EN</span></div></div><div className="v2-about-copy"><div className="v2-section-label"><span>08 / THE PERSON BEHIND IT</span><span>— دربارهٔ من</span></div><h2>از رابط تا <em>زیرساخت.</em></h2><p>توسعه‌دهندهٔ فول‌استک با تمرکز بر بک‌اند و زیرساخت هوش مصنوعی هستم. VitMeet را از ساخت اپلیکیشن تا پنل مدیریت و پایش پیش برده‌ام و در توسعه و نگهداری AsllMarket کار می‌کنم.</p><p>در پروژه‌های واقعی، رابط React، API، پایگاه داده، پرداخت و سرویس‌های هوش مصنوعی را به هم وصل کرده‌ام و کار را تا استقرار و رفع مشکل دنبال می‌کنم. کد و پروژه‌هایم را در گیت‌هاب ببین.</p><a href={site.github} target="_blank" rel="noopener noreferrer" className="v2-inline-link">دیدن گیت‌هاب من <Github size={18}/></a></div></div></section>
    <ProjectBrief/>
    <section className="v2-faq v2-wrap" id="faq"><div className="v2-section-label"><span>10 / BEFORE WE BEGIN</span><span>— پرسش‌های رایج</span></div><div className="v2-faq-grid"><div><h2>قبل از شروع، <em>چند جواب روشن.</em></h2><p>این‌ها سؤال‌هایی‌اند که معمولاً پیش از سفارش پیش می‌آیند. اگر جواب تو اینجا نیست، مستقیم پیام بده.</p></div><div className="v2-faq-list"><details><summary>برای شروع پروژه چه اطلاعاتی لازم است؟</summary><p>نوع کسب‌وکار، هدف سایت، مخاطبان، امکانات ضروری و اگر دارید چند نمونهٔ بصری دلخواه. فرم خلاصهٔ پروژه برای جمع‌کردن همین اطلاعات ساخته شده است.</p></details><details><summary>آیا سایت برای موبایل و سئو آماده می‌شود؟</summary><p>چیدمان پاسخ‌گو، ساختار معنایی صفحه، متادیتا و سرعت بارگذاری از آغاز طراحی بررسی می‌شوند. نتیجهٔ سئو به محتوا، رقابت و ادامهٔ فعالیت سایت هم وابسته است.</p></details><details><summary>آیا می‌توانم قبل از سفارش، سبک سایت را ببینم؟</summary><p>بله. در دموساز، نوع کسب‌وکار و سبک بصری را انتخاب می‌کنی و نام برند، تیتر و شهر را همان لحظه در پیش‌نمایش می‌بینی.</p></details><details><summary>زمان و هزینهٔ کار چطور مشخص می‌شود؟</summary><p>پس از روشن‌شدن صفحات، امکانات و محتوای موردنیاز، محدودهٔ کار و برآورد زمان و هزینه به‌صورت شفاف مشخص می‌شود.</p></details></div></div></section>
    <section className="v2-contact" id="contact"><div className="v2-wrap"><div className="v2-section-label"><span>11 / LET'S MAKE IT REAL</span><span>— شروع گفتگو</span></div><h2>ایده‌ات را بگو؛ <em>مسیرش را بسازیم.</em></h2><p>از یک صفحهٔ ساده تا محصولی با پنل و API؛ نیازت را بگو تا دربارهٔ قدم اول صحبت کنیم.</p><div className="v2-contact-actions"><Link href="/demo" className="v2-primary">اول دمو را ببین <ArrowUpLeft size={18}/></Link><a href={site.whatsapp} target="_blank" rel="noopener noreferrer" className="v2-contact-whatsapp">مستقیم در واتساپ پیام بده <MessageCircle size={19}/></a></div><div className="v2-contact-info"><a href={`mailto:${site.email}`}>{site.email} <ArrowUpLeft size={17}/></a><a href="tel:+989352505353">{site.phone}</a><a href={site.github} target="_blank" rel="noopener noreferrer">GITHUB <ExternalLink size={16}/></a></div></div></section>
    <footer className="v2-footer"><div className="v2-wrap"><Link href="/" className="v2-logo"><span className="v2-logo-mark">A<span>✳</span></span><span>AYSA<br/>HAJIPOUR</span></Link><span>© {new Date().getFullYear()} طراحی و توسعه با دقت.</span><a href="#top">بازگشت به بالا ↑</a></div></footer>
  </main>;
}
