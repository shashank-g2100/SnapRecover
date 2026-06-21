"use client";

import {
  FileText,
  ScanLine,
  Type,
  AlignLeft,
  List,
  CheckCircle2,
  CircleOff,
} from "lucide-react";

interface OCRAnalysisCardProps {
  ocr: {
    text?: string;
    text_length?: number;
  };
}

function MetricCard({
  title,
  value,
  icon,
  tone = "cyan",
}: {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  tone?: "cyan" | "green" | "yellow";
}) {
  const toneClasses = {
    cyan: "text-[#19e6d2] border-[#19e6d2]/20 bg-[#19e6d2]/10",
    green: "text-emerald-400 border-emerald-400/20 bg-emerald-400/10",
    yellow: "text-yellow-400 border-yellow-400/20 bg-yellow-400/10",
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
        min-h-[100px]
      "
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p
            className="
              text-[12px]
              uppercase
              tracking-[0.22em]
              text-[#7e91b8]
            "
          >
            {title}
          </p>

          <h3 className="text-4xl font-bold text-white mt-2">
            {value}
          </h3>
        </div>

        <div
          className={`
            w-12
            h-12
            rounded-xl
            border
            flex
            items-center
            justify-center
            ${toneClasses[tone]}
          `}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}

export default function OCRAnalysisCard({
  ocr,
}: OCRAnalysisCardProps) {
  const text = ocr?.text || "";

  const characters = ocr?.text_length || text.length;

  const words =
    text.trim().length > 0
      ? text.trim().split(/\s+/).length
      : 0;

  const lines =
    text.trim().length > 0
      ? text.split("\n").filter((line) => line.trim().length > 0).length
      : 0;

  const hasText = text.trim().length > 0;

  return (
    <div className="space-y-6">
      {/* HEADER */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 border-b border-[#1b2a41] pb-4">
        <div className="flex items-center gap-4">
          <div
            className="
              w-12
              h-12
              rounded-2xl
              bg-[#19e6d2]/10
              border
              border-[#19e6d2]/20
              flex
              items-center
              justify-center
            "
          >
            <ScanLine
              className="text-[#19e6d2]"
              size={22}
            />
          </div>

          <div>
            <p
              className="
                text-[12px]
                uppercase
                tracking-[0.25em]
                text-[#7e91b8]
              "
            >
              Text Intelligence
            </p>

            <h2 className="text-2xl md:text-3xl font-bold mt-1">
              OCR Text Extraction
            </h2>
            <p className="text-sm text-[#7e91b8]">
              Extracted text content detected from the uploaded evidence.
            </p>
          </div>
        </div>

        <div
          className={`
            px-4
            py-3
            rounded-xl
            border
            flex
            items-center
            gap-3
            ${
              hasText
                ? "bg-emerald-400/10 border-emerald-400/20"
                : "bg-yellow-400/10 border-yellow-400/20"
            }
          `}
        >
          {hasText ? (
            <CheckCircle2
              size={19}
              className="text-emerald-400"
            />
          ) : (
            <CircleOff
              size={19}
              className="text-yellow-400"
            />
          )}

          <div>
            <p
              className="
                text-[12px]
                uppercase
                tracking-[0.18em]
                text-[#7e91b8]
              "
            >
              OCR Status
            </p>

            <p
              className={`
                text-sm
                font-bold
                ${
                  hasText
                    ? "text-emerald-400"
                    : "text-yellow-400"
                }
              `}
            >
              {hasText ? "Text Detected" : "No Text Found"}
            </p>
          </div>
        </div>
      </div>

      {/* TOP METRICS */}
      <div className="grid md:grid-cols-3 gap-4">
        <MetricCard
          title="Characters"
          value={characters}
          icon={<Type size={19} />}
          tone="cyan"
        />
        <MetricCard
          title="Words"
          value={words}
          icon={<AlignLeft size={19} />}
          tone="green"
        />
        <MetricCard
          title="Lines"
          value={lines}
          icon={<List size={19} />}
          tone="yellow"
        />
      </div>

      {/* OCR CONTENT PANEL */}
      <div
        className="
          bg-[#060b16]
          border
          border-[#1b2a41]
          rounded-2xl
          overflow-hidden
        "
      >
        <div
          className="
            flex
            items-center
            justify-between
            px-5
            py-4
            border-b
            border-[#1b2a41]
          "
        >
          <div className="flex items-center gap-3">
            <FileText
              size={19}
              className="text-[#19e6d2]"
            />
            <div>
              <p
                className="
                  text-[12px]
                  uppercase
                  tracking-[0.2em]
                  text-[#7e91b8]
                "
              >
                OCR Extracted Content
              </p>

              <p className="text-sm text-slate-300 mt-1">
                Text recovered from visual evidence
              </p>
            </div>
          </div>

          <div
            className="
              font-mono
              text-xs
              text-[#7e91b8]
              bg-[#0a1323]
              border
              border-[#1b2a41]
              rounded-lg
              px-3
              py-2
            "
          >
            UTF-8 TEXT
          </div>
        </div>

        <div
          className="
            p-4
            max-h-[420px]
            overflow-y-auto
          "
        >
          {hasText ? (
            <pre
              className="
                whitespace-pre-wrap
                break-words
                text-sm
                leading-5
                text-slate-300
                rounded-xl
                p-4
              "
            >
              {text}
            </pre>
          ) : (
            <div
              className="
                min-h-[180px]
                flex
                flex-col
                items-center
                justify-center
                text-center
                bg-[#0a1323]
                border
                border-dashed
                border-[#2a4b67]
                rounded-xl
                p-4
              "
            >
              <CircleOff
                className="text-[#7e91b8]"
                size={34}
              />

              <p className="text-slate-300 font-medium mt-4">
                No readable text detected
              </p>

              <p className="text-sm text-[#7e91b8] mt-2">
                The uploaded image does not contain OCR-readable content.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* OCR SUMMARY */}

      <div
        className="
          bg-[#060b16]
          border
          border-[#1b2a41]
          rounded-2xl
          overflow-hidden
        "
      >
        <div className="px-5 py-4 border-b border-[#1b2a41]">
          <p
            className="
              text-[12px]
              uppercase
              tracking-[0.2em]
              text-[#7e91b8]
            "
          >
            OCR Summary
          </p>

          <p className="text-sm text-slate-300 mt-1">
            Text extraction statistics and evidence findings
          </p>
        </div>

        <div className="p-5 grid md:grid-cols-3 gap-4">
          <div className="bg-[#0a1323] border border-[#1b2a41] rounded-xl p-4">
            <p className="text-[12px] uppercase tracking-[0.18em] text-[#7e91b8]">
              Extraction Result
            </p>

            <p
              className={`
                mt-2
                font-semibold
                ${
                  hasText
                    ? "text-emerald-400"
                    : "text-yellow-400"
                }
              `}
            >
              {hasText
                ? "Readable text recovered"
                : "No readable text"}
            </p>
          </div>

          <div className="bg-[#0a1323] border border-[#1b2a41] rounded-xl p-4">
            <p className="text-[12px] uppercase tracking-[0.18em] text-[#7e91b8]">
              Text Density
            </p>

            <p className="mt-2 font-semibold text-[#19e6d2]">
              {characters > 500
                ? "High"
                : characters > 100
                ? "Medium"
                : characters > 0
                ? "Low"
                : "None"}
            </p>
          </div>

          <div className="bg-[#0a1323] border border-[#1b2a41] rounded-xl p-4">
            <p className="text-[12px] uppercase tracking-[0.18em] text-[#7e91b8]">
              Evidence Relevance
            </p>

            <p className="mt-2 font-semibold text-white">
              {hasText
                ? "Review extracted content"
                : "No text-based indicators"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}