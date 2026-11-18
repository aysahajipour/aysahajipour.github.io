"use client";

import { Check } from "lucide-react";

export type BriefOption = {
  value: string;
  label: string;
  detail?: string;
  marker?: string;
};

type BriefOptionPickerProps = {
  name: string;
  title: string;
  value: string;
  options: readonly BriefOption[];
  onChange: (value: string) => void;
  variant?: "project" | "scope" | "contact";
};

export default function BriefOptionPicker({
  name,
  title,
  value,
  options,
  onChange,
  variant = "scope",
}: BriefOptionPickerProps) {
  const titleId = `brief-${name}-title`;

  return <div className={`brief-option-group brief-option-group-${variant}`}>
    <div className="brief-option-heading"><span id={titleId}>{title}</span><small>یک گزینه را انتخاب کن</small></div>
    <div className="brief-option-grid" role="radiogroup" aria-labelledby={titleId}>
      {options.map((option, index) => {
        const selected = option.value === value;
        return <label className={selected ? "brief-option-card selected" : "brief-option-card"} key={option.value}>
          <input type="radio" name={name} value={option.value} checked={selected} onChange={() => onChange(option.value)}/>
          <span className="brief-option-marker" aria-hidden="true">{option.marker ?? String(index + 1).padStart(2, "0")}</span>
          <span className="brief-option-text"><strong>{option.label}</strong>{option.detail && <small>{option.detail}</small>}</span>
          <Check className="brief-option-check" size={15} aria-hidden="true"/>
        </label>;
      })}
    </div>
  </div>;
}
