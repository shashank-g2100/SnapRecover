"use client";

import React from "react";

interface ForensicMetricProps {
  label: string;
  value?: string | number | null;
  icon?: React.ReactNode;
  tone?: "cyan" | "green" | "yellow" | "red" | "purple" | "blue";
  small?: boolean;
}

const toneStyles = {
  cyan: {
    icon: "text-[#19e6d2]",
    value: "text-[#19e6d2]",
    border: "border-[#19e6d2]/15",
  },
  green: {
    icon: "text-emerald-400",
    value: "text-emerald-400",
    border: "border-emerald-400/15",
  },
  yellow: {
    icon: "text-yellow-400",
    value: "text-yellow-400",
    border: "border-yellow-400/15",
  },
  red: {
    icon: "text-red-400",
    value: "text-red-400",
    border: "border-red-400/15",
  },
  purple: {
    icon: "text-violet-400",
    value: "text-violet-400",
    border: "border-violet-400/15",
  },
  blue: {
    icon: "text-sky-400",
    value: "text-sky-400",
    border: "border-sky-400/15",
  },
};

export default function ForensicMetric({
  label,
  value,
  icon,
  tone = "cyan",
  small = false,
}: ForensicMetricProps) {
  const style = toneStyles[tone];

  return (
    <div
      className={`
        group
        bg-[#08111f]
        border
        ${style.border}
        rounded-xl
        p-4
        transition-all
        duration-200
        hover:-translate-y-0.5
        hover:bg-[#0b1628]
        hover:border-[#19e6d2]/30
      `}
    >
      <div className="flex items-center gap-3">
        {icon && (
          <span className={`${style.icon} opacity-90`}>
            {icon}
          </span>
        )}
        <p className="text-[12px] uppercase tracking-[0.18em] text-[#8191b1]">
          {label}
        </p>
      </div>

      <p
        className={`
          mt-2
          font-semibold
          break-words
          ${small ? "text-sm" : "text-xl"}
          ${style.value}
        `}
      >
        {value !== undefined && value !== null && value !== ""
          ? value
          : "—"}
      </p>
    </div>
  );
}