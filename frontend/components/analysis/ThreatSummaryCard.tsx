"use client";

interface ThreatSummaryCardProps {
  threatEngine: any;
  mediaLabel?: string;
}

export default function ThreatSummaryCard({
  threatEngine,
  mediaLabel,
}: ThreatSummaryCardProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4 mb-8 mt-8">

      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
        <p className="text-zinc-500 text-sm uppercase">
          Threat Score
        </p>

        <h2 className="text-3xl font-black text-red-400 mt-1">
          {threatEngine?.final_threat_score ?? 0}
        </h2>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
        <p className="text-zinc-500 text-sm uppercase">
          Risk Level
        </p>

        <h2 className="text-3xl font-black text-yellow-400 mt-1">
          {threatEngine?.risk_level ?? "Unknown"}
        </h2>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
        <p className="text-zinc-500 text-sm uppercase">
          Confidence
        </p>

        <h2 className="text-3xl font-black text-cyan-400 mt-1">
          {threatEngine?.confidence ?? 0}%
        </h2>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
        <p className="text-zinc-500 text-sm uppercase">
          Media Category
        </p>

        <h2 className="text-lg font-bold text-cyan-400 mt-1">
          {mediaLabel || "Unknown"}
        </h2>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
        <p className="text-zinc-500 text-sm uppercase">
          Verdict
        </p>

        <h2 className="text-lg font-bold text-green-400 mt-1">
          {threatEngine?.verdict ?? "Unknown"}
        </h2>
      </div>

    </div>
  );
}