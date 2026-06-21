"use client";

import { AlertTriangle } from "lucide-react";

interface ThreatIndicatorsCardProps {
  reasons: string[];
}

export default function ThreatIndicatorsCard({
  reasons,
}: ThreatIndicatorsCardProps) {
  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">

      <div className="mb-4">
        <p className="text-zinc-400 uppercase tracking-widest text-xs mb-2">
          Security Findings
        </p>

        <h2 className="text-3xl font-black">
          Threat Indicators
        </h2>
      </div>

      <div className="space-y-4">

        {reasons?.length > 0 ? (
          reasons.map(
            (
              reason,
              index
            ) => (
              <div
                key={index}
                className="
                  bg-red-500/10
                  border
                  border-red-500/20
                  rounded-2xl
                  p-2.5
                  text-red-300
                "
              >
                <div className="flex items-center gap-4">

                  <div
                    className="
                      w-10
                      h-10
                      rounded-xl
                      bg-red-500/10
                      flex
                      items-center
                      justify-center
                      shrink-0
                    "
                  >
                    <AlertTriangle
                      size={20}
                    />
                  </div>

                  <p className="leading-relaxed">
                    {reason}
                  </p>

                </div>
              </div>
            )
          )
        ) : (
          <div
            className="
              bg-green-500/10
              border
              border-green-500/20
              rounded-2xl
              p-5
              text-green-400
            "
          >
            No threat indicators detected.
          </div>
        )}

      </div>

    </div>
  );
}