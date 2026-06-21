"use client";

interface MetadataItemProps {
  label: string;
  value: any;
  tone?: "default" | "cyan" | "green" | "yellow" | "red";
  mono?: boolean;
}

export default function MetadataItem({
  label,
  value,
  tone = "default",
  mono = false,
}: MetadataItemProps) {
  const toneClasses = {
    default: "text-white",
    cyan: "text-[#19e6d2]",
    green: "text-emerald-400",
    yellow: "text-yellow-400",
    red: "text-red-400",
  };

  return (
    <div
      className="
        bg-[#0a1323]
        border
        border-[#1b2a41]
        hover:border-[#2a4b67]
        rounded-2xl
        p-5
        transition
        min-h-[80px]
      "
    >
      <p
        className="
          text-[12px]
          uppercase
          tracking-[2px]
          text-[#7e91b8]
        "
      >
        {label}
      </p>

      <p
        className={`
          mt-2
          text-[15px]
          font-medium
          break-words
          ${toneClasses[tone]}
          ${mono ? "font-mono text-sm" : ""}
        `}
      >
        {value !== undefined && value !== null && value !== ""
          ? value
          : "—"}
      </p>
    </div>
  );
}