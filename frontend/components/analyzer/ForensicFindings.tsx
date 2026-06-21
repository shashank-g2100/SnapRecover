"use client";

import { FileSearch } from "lucide-react";

interface ForensicFindingsProps {
  title?: string;
  findings?: string[];
  severity?: "low" | "medium" | "high";
  emptyText?: string;
}

export default function ForensicFindings({
  title = "Forensic Findings",
  findings = [],
  severity = "low",
  emptyText = "No forensic indicators were detected.",
}: ForensicFindingsProps) {
  const dotColor =
    severity === "high"
      ? "bg-red-400"
      : severity === "medium"
      ? "bg-yellow-400"
      : "bg-[#19e6d2]";

  return (
    <div className="mt-4 bg-[#08111f] border border-[#1b2a41] rounded-xl overflow-hidden">
      <div className="px-4 py-3 border-b border-[#1b2a41] flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-[#19e6d2]/10 flex items-center justify-center">
          <FileSearch size={20} className="text-[#19e6d2]" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-white">
            {title}
          </h3>
        </div>
      </div>

      <div className="p-4 space-y-2">
        {findings.length > 0 ? (
          findings.map((item, index) => (
            <div
              key={index}
              className="flex items-start gap-4 text-sm text-slate-300"
            >
              <span className="leading-5">{item}</span>
            </div>
          ))
        ) : (
          <p className="text-sm text-[#8191b1]">{emptyText}</p>
        )}
      </div>
    </div>
  );
}