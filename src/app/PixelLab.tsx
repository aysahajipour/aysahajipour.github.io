"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpLeft, RotateCcw, Sparkles } from "lucide-react";
import "./pixel-lab.css";

const size = 20;
const patterns = {
  yeksel: ["110000000011", "011000000110", "001100001100", "000110011000", "000011110000", "000001100000", "000001100000", "000001100000", "000001100000", "000001100000", "000001100000", "000001100000"],
  spark: ["000001100000", "000001100000", "000001100000", "000101101000", "000011110000", "111111111111", "111111111111", "000011110000", "000101101000", "000001100000", "000001100000", "000001100000"],
  heart: ["000000000000", "001100011000", "011110111100", "111111111110", "111111111110", "111111111110", "011111111100", "001111111000", "000111110000", "000011100000", "000001000000", "000000000000"],
} as const;
type Pattern = keyof typeof patterns;
const colors = [
  { name: "بنفش الکتریکی", value: "#AD5CFF" },
  { name: "آبی پیکسلی", value: "#4587FF" },
  { name: "فیروزه‌ای نورانی", value: "#27E6F5" },
  { name: "صورتی پیکسلی", value: "#FF66AC" },
  { name: "سبز نئونی", value: "#62F5A5" },
];
function pixels(pattern: Pattern, color: string) {
  const source = patterns[pattern];
  return Array.from({ length: size * size }, (_, index) => {
    const row = Math.floor(index / size);
    const column = index % size;
    return source[Math.floor(row * source.length / size)][Math.floor(column * source[0].length / size)] === "1" ? color : "";
  });
}

export default function PixelLab() {
  const [cells, setCells] = useState<string[]>(() => pixels("yeksel", colors[0].value));
  const [color, setColor] = useState(colors[0].value);
  const [pattern, setPattern] = useState<Pattern>("yeksel");
  const drawing = useRef(false);

  useEffect(() => {
    const saved = window.localStorage.getItem("yeksel-pixel-color");
    if (saved && colors.some(item => item.value === saved)) {
      setColor(saved);
      setCells(pixels("yeksel", saved));
    }
  }, []);

  function paint(index: number) { setCells(current => { const next = [...current]; next[index] = color; return next; }); }
  function choosePattern(next: Pattern) { setPattern(next); setCells(pixels(next, color)); }
  function chooseColor(next: string) {
    setColor(next);
    setCells(current => current.map(cell => cell ? next : ""));
    window.localStorage.setItem("yeksel-pixel-color", next);
    window.dispatchEvent(new CustomEvent("yeksel-pixel-color", { detail: next }));
  }

  return <section className="pixel-lab" id="pixel-lab" aria-labelledby="pixel-lab-title">
    <div className="v2-wrap"><div className="v2-section-label"><span>02 / PIXEL LAB</span><span>— یکسل، از نزدیک</span></div>
      <div className="pixel-lab-grid"><div className="pixel-lab-copy"><span className="pixel-lab-kicker"><Sparkles size={15}/> یک تجربهٔ کوچک تعاملی</span><h2 id="pixel-lab-title">از یک پیکسل<br/><em>شروع کن.</em></h2><p>روی خانه‌ها بکش و نقش خودت را بساز. ایدهٔ «یکسل» از همین‌جا می‌آید: انتخاب‌های کوچک که کنار هم یک تجربهٔ کامل می‌سازند.</p><div className="pixel-lab-controls"><span>یک نقش انتخاب کن</span><div>{(["yeksel", "spark", "heart"] as Pattern[]).map((item) => <button type="button" key={item} aria-pressed={pattern === item} className={pattern === item ? "active" : ""} onClick={() => choosePattern(item)}>{item === "yeksel" ? "یکسل" : item === "spark" ? "جرقه" : "قلب"}</button>)}</div></div><div className="pixel-color-controls"><span>رنگ پیکسل؛ با انتخاب رنگ، نقش موجود هم تغییر می‌کند</span><div>{colors.map(({ name, value }) => <button type="button" key={value} aria-label={name} title={name} aria-pressed={color === value} className={color === value ? "active" : ""} style={{ backgroundColor: value }} onClick={() => chooseColor(value)}/>)}</div></div><Link href="/demo" className="pixel-lab-link">حالا دموی کسب‌وکارت را بساز <ArrowUpLeft size={18}/></Link></div>
      <div className="pixel-lab-stage"><div className="pixel-lab-top"><span>◈ &nbsp; YEKSEL.PIXEL / PLAYGROUND</span><span>20 × 20</span></div><div className="pixel-canvas" aria-label="بوم پیکسلی تعاملی؛ با موس یا لمس روی خانه‌ها نقاشی کن" onPointerUp={() => { drawing.current = false; }} onPointerLeave={() => { drawing.current = false; }} onPointerCancel={() => { drawing.current = false; }}>{cells.map((value, index) => <span key={index} className={value ? "filled" : ""} style={value ? { backgroundColor: value, boxShadow: `0 0 10px ${value}55` } : undefined} onPointerDown={event => { event.preventDefault(); drawing.current = true; paint(index); }} onPointerEnter={() => { if (drawing.current) paint(index); }}/>)}</div><div className="pixel-lab-bottom"><span>◉ &nbsp; HOVER / DRAW / EXPLORE</span><button type="button" onClick={() => setCells(Array(size * size).fill(""))}><RotateCcw size={15}/> پاک کردن</button></div></div></div>
    </div>
  </section>;
}
