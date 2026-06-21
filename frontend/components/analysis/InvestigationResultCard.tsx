"use client";

import {
  AlertTriangle,
  Shield,
  CheckCircle2,
} from "lucide-react";

interface InvestigationResultCardProps {
  status: string;
  threatScore: number;
  statusColor: string;
  statusBg: string;
  isDanger: boolean;
  isMedium: boolean;
}

export default function InvestigationResultCard({
  status,
  threatScore,
  statusColor,
  statusBg,
  isDanger,
  isMedium,
}: InvestigationResultCardProps) {
  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">

      {/* HEADER */}

      <div className="flex items-center justify-between mb-5">

        <div>
          <p className="text-zinc-400 uppercase tracking-widest text-xs mb-2">
            Investigation Result
          </p>

          <h2
            className={`text-3xl font-black leading-tight ${statusColor}`}
          >
            {status}
          </h2>
        </div>

        <div
          className={`w-14 h-14 rounded-2xl border flex items-center justify-center shrink-0 ${statusBg}`}
        >
          {isDanger ? (
            <AlertTriangle
              className="text-red-400"
              size={30}
            />
          ) : isMedium ? (
            <Shield
              className="text-yellow-400"
              size={30}
            />
          ) : (
            <CheckCircle2
              className="text-green-400"
              size={30}
            />
          )}
        </div>

      </div>

      {/* THREAT SCORE */}

      <div className="bg-black/30 border border-zinc-800 rounded-3xl p-6">

        <p className="text-zinc-400 mb-2 uppercase tracking-widest text-xs">
          Threat Score
        </p>

        <div className="flex items-end gap-1">

          <h1
            className={`text-5xl font-black ${
              threatScore >= 70
                ? "text-red-400"
                : threatScore >= 40
                ? "text-yellow-400"
                : "text-green-400"
            }`}
          >
            {threatScore}
          </h1>

          <span className="text-zinc-500 text-xl mb-1">
            /100
          </span>

        </div>

        {/* PROGRESS BAR */}

        <div className="w-full h-3 bg-zinc-800 rounded-full mt-3 overflow-hidden">

          <div
            className={`h-full rounded-full ${
              threatScore >= 70
                ? "bg-red-500"
                : threatScore >= 40
                ? "bg-yellow-500"
                : "bg-green-500"
            }`}
            style={{
              width: `${Math.min(
                threatScore,
                100
              )}%`,
            }}
          />

        </div>

      </div>

    </div>
  );
}