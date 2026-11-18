"use client";

import { requestedTechOptions, techDescriptions } from "@/lib/tech";
import "./tech-preferences.css";

export default function TechPreferencePicker({ selected, onChange }: { selected: string[]; onChange: (next: string[]) => void }) {
  function toggle(value: string) { onChange(selected.includes(value) ? selected.filter(item => item !== value) : [...selected, value]); }
  const latest = selected[selected.length - 1];
  return <fieldset className="tech-preferences"><legend>فناوری‌های مد نظر <span>اختیاری</span></legend><p>اگر ترجیح فنی داری، انتخاب کن. این موارد همراه درخواستت ارسال می‌شوند.</p><div className="tech-preference-options">{requestedTechOptions.map(item => <button type="button" key={item} aria-pressed={selected.includes(item)} onClick={() => toggle(item)}>{item}</button>)}</div>{latest && <p className="tech-preference-explain"><strong>{latest}:</strong> {techDescriptions[latest]}</p>}</fieldset>;
}
