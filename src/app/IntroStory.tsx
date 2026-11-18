import { ArrowUpLeft, MousePointerClick, Search, Waypoints } from "lucide-react";
import "./intro-story.css";

const outcomes = [
  { n: "01", icon: Search, title: "پیدا شود", text: "ساختار روشن برای محتوا و جست‌وجو" },
  { n: "02", icon: Waypoints, title: "فهمیده شود", text: "مسیر ساده از اولین نگاه تا انتخاب" },
  { n: "03", icon: MousePointerClick, title: "به اقدام برسد", text: "دکمه و فرم در جای درستِ تجربه" },
];

export default function IntroStory() {
  return <section className="intro-story" aria-labelledby="intro-story-title"><div className="v2-wrap">
    <div className="v2-section-label"><span>01 / THE POINT OF IT ALL</span><span>— فلسفهٔ کار</span></div>
    <div className="intro-story-main"><div className="intro-story-title"><span>یک نگاه دقیق‌تر به وب‌سایت</span><h2 id="intro-story-title">ظاهر خوب،<br/><em>شروعِ کار است.</em></h2></div><div className="intro-story-copy"><p>یک وب‌سایت باید برای مخاطب روشن باشد و برای کسب‌وکار کار کند. طراحی، محتوا و کد را کنار هم می‌چینم تا بازدیدکننده راحت‌تر مسیرش را پیدا کند.</p><a href="#services">ببین چه می‌سازم <ArrowUpLeft size={17}/></a></div></div>
    <div className="intro-story-outcomes">{outcomes.map(({ n, icon: Icon, title, text }) => <div key={n}><div className="intro-story-outcome-top"><span>{n} /</span><Icon size={20} strokeWidth={1.6}/></div><h3>{title}</h3><p>{text}</p></div>)}</div>
  </div></section>;
}
