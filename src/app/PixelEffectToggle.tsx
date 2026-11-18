"use client";

import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";
import "./pixel-effect-toggle.css";

export default function PixelEffectToggle() {
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    setEnabled(window.localStorage.getItem("yeksel-pixel-enabled") !== "off");
  }, []);

  function toggle() {
    const next = !enabled;
    setEnabled(next);
    window.localStorage.setItem("yeksel-pixel-enabled", next ? "on" : "off");
    window.dispatchEvent(new CustomEvent("yeksel-pixel-enabled", { detail: next }));
  }

  return <button type="button" className="pixel-effect-toggle" onClick={toggle} aria-pressed={enabled} aria-label={enabled ? "خاموش کردن افکت پیکسلی موس" : "روشن کردن افکت پیکسلی موس"} title={enabled ? "خاموش کردن افکت پیکسلی موس" : "روشن کردن افکت پیکسلی موس"}>
    <Sparkles size={16} strokeWidth={1.8} aria-hidden="true" />
    <span>افکت پیکسلی</span>
    <span className="pixel-effect-status">{enabled ? "روشن" : "خاموش"}</span>
  </button>;
}
