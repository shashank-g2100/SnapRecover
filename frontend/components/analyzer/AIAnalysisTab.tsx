// "use client";

// interface Props {
//   ai: any;
// }

// function MetricCard({
//   title,
//   value,
//   color = "text-white",
// }: {
//   title: string;
//   value: any;
//   color?: string;
// }) {
//   return (
//     <div
//       className="
//       bg-[#182544]
//       border
//       border-[#243554]
//       rounded-xl
//       p-5
//       "
//     >
//       <p
//         className="
//         text-[10px]
//         uppercase
//         tracking-[4px]
//         text-zinc-500
//         mb-2
//         "
//       >
//         {title}
//       </p>
//       <h3
//         className={`text-xl font-semibold ${color}`}
//       >
//         {value ?? "—"}
//       </h3>
//     </div>
//   );
// }

// export default function AIAnalysisTab({
//   ai,
// }: Props) {
//   return (
//     <div className="space-y-4">
//       <div className="grid md:grid-cols-2 gap-4">
//         <MetricCard
//           title="Verdict"
//           value={ai?.verdict}
//         />
//         <MetricCard
//           title="Risk Level"
//           value={ai?.risk_level || ai?.verdict}
//           color={
//             ai?.risk_level === "HIGH"
//               ? "text-red-400"
//               : ai?.risk_level === "MEDIUM"
//               ? "text-orange-400"
//               : "text-green-400"
//           }
//         />
//         <MetricCard
//           title="Confidence"
//           value={`${ai?.confidence || 0}%`}
//         />
//         <MetricCard
//           title="Media Type"
//           value={ai?.media_type_label}
//         />
//         <MetricCard
//           title="Authenticity"
//           value={ai?.authenticity}
//         />
//         <MetricCard
//           title="Face Detected"
//           value={
//             ai?.face_detected
//               ? "⚠ Yes"
//               : "✓ No"
//           }
//           color={
//             ai?.face_detected
//               ? "text-yellow-400"
//               : "text-emerald-400"
//           }
//         />
//         <MetricCard
//           title="AI Generated"
//           value={
//             ai?.ai_generated_detection?.detected
//               ? "⚠ Yes"
//               : "✓ No"
//           }
//           color={
//             ai?.ai_generated_detection?.detected
//               ? "text-red-400"
//               : "text-emerald-400"
//           }
//         />
//         <MetricCard
//           title="Sensor Noise"
//           value={
//             ai?.ai_forensics?.sensor_noise_score?.toFixed?.(2)
//           }
//         />
//         <MetricCard
//           title="Freq. Score"
//           value={
//             ai?.ai_forensics?.frequency_score?.toFixed?.(2)
//           }
//         />
//         <MetricCard
//           title="Texture Score"
//           value={
//             ai?.ai_forensics?.texture_score?.toFixed?.(2)
//           }
//         />
//         <MetricCard
//           title="Source"
//           value={ai?.ai_source || "Unknown"}
//         />
//       </div>

//       {/* ANALYSIS NOTES */}
//       <div
//         className="
//         bg-[#182544]
//         border
//         border-[#243554]
//         rounded-xl
//         p-5
//         "
//       >
//         <p
//           className="
//           text-[10px]
//           uppercase
//           tracking-[3px]
//           text-zinc-500
//           mb-5
//           "
//         >
//           Analysis Notes
//         </p>

//         <div className="space-y-3">
//           {ai?.reasons?.length > 0 ? (
//             ai.reasons.map(
//               (
//                 reason: string,
//                 index: number
//               ) => (
//                 <div
//                   key={index}
//                   className="
//                   flex
//                   items-start
//                   gap-3
//                   text-zinc-300
//                   "
//                 >
//                   <span className="text-cyan-400">
//                     •
//                   </span>

//                   <span>{reason}</span>
//                 </div>
//               )
//             )
//           ) : (
//             <p className="text-zinc-500">
//               No AI indicators detected.
//             </p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";

import {
  Bot,
  BrainCircuit,
  CheckCircle2,
  AlertTriangle,
  ScanFace,
  Activity,
  Radio,
  Fingerprint,
  ShieldCheck,
  FileSearch,
} from "lucide-react";

interface Props {
  ai: any;
}

type Tone = "cyan" | "green" | "yellow" | "red" | "purple" | "blue";

function MetricCard({
  title,
  value,
  icon,
  tone = "cyan",
}: {
  title: string;
  value: any;
  icon: React.ReactNode;
  tone?: Tone;
}) {
  const toneStyles: Record<Tone, string> = {
    cyan: "text-[#19e6d2] bg-[#19e6d2]/10 border-[#19e6d2]/20",
    green: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
    yellow: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
    red: "text-red-400 bg-red-400/10 border-red-400/20",
    purple: "text-violet-400 bg-violet-400/10 border-violet-400/20",
    blue: "text-sky-400 bg-sky-400/10 border-sky-400/20",
  };

  return (
    <div
      className="
        bg-[#08111f]
        border border-[#1b2a41]
        rounded-2xl
        p-5
        min-h-[50px]
        transition-all duration-200
        hover:border-[#315070]
        hover:-translate-y-[2px]
      "
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p
            className="
              text-[12px]
              uppercase
              tracking-[0.18em]
              text-[#8395b8]
            "
          >
            {title}
          </p>

          <h3 className="text-lg md:text-xl font-semibold text-white mt-2 break-words">
            {value ?? "—"}
          </h3>
        </div>

        <div
          className={`
            w-10 h-10 shrink-0
            rounded-xl border
            flex items-center justify-center
            ${toneStyles[tone]}
          `}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}

function getRiskTone(risk: string): Tone {
  if (risk === "HIGH") return "red";
  if (risk === "MEDIUM") return "yellow";
  if (risk === "LOW") return "green";
  return "cyan";
}

export default function AIAnalysisTab({
  ai,
}: Props) {
  const risk = String(
    ai?.risk_level || ai?.verdict || "UNKNOWN"
  ).toUpperCase();

  const riskTone = getRiskTone(risk);

  const aiGenerated = Boolean(
    ai?.ai_generated_detection?.detected
  );

  const faceDetected = Boolean(ai?.face_detected);

  const confidence =
    ai?.confidence !== undefined && ai?.confidence !== null
      ? `${ai.confidence}%`
      : "—";

  const sensorNoise =
    ai?.ai_forensics?.sensor_noise_score !== undefined
      ? Number(ai.ai_forensics.sensor_noise_score).toFixed(2)
      : "—";

  const frequencyScore =
    ai?.ai_forensics?.frequency_score !== undefined
      ? Number(ai.ai_forensics.frequency_score).toFixed(2)
      : "—";

  const textureScore =
    ai?.ai_forensics?.texture_score !== undefined
      ? Number(ai.ai_forensics.texture_score).toFixed(2)
      : "—";

  return (
    <div className="space-y-6">
      {/* AI SUMMARY HEADER */}

      <div
        className="
          bg-[#050816]
          border border-[#1b2a41]
          rounded-2xl
          p-5 md:p-6
        "
      >
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
          <div className="flex items-start gap-4">
            <div
              className="
                w-18 h-18 rounded-2xl
                bg-[#19e6d2]/10
                border border-[#19e6d2]/20
                text-[#19e6d2]
                flex items-center justify-center
                shrink-0
              "
            >
              <BrainCircuit size={38} />
            </div>

            <div>
              <p
                className="
                  text-[12px]
                  uppercase
                  tracking-[0.18em]
                  text-[#8395b8]
                "
              >
                Synthetic Media Intelligence
              </p>

              <h2 className="text-2xl md:text-3xl font-bold  text-white">
                AI Detection Analysis
              </h2>

              <p className="text-sm text-[#8395b8]">
                Machine-learning based authenticity and manipulation assessment.
              </p>
            </div>
          </div>

          <div
            className={`
              px-4 py-3 rounded-xl border
              flex items-center gap-3 self-start lg:self-auto
              ${
                riskTone === "red"
                  ? "bg-red-400/10 border-red-400/20"
                  : riskTone === "yellow"
                  ? "bg-yellow-400/10 border-yellow-400/20"
                  : riskTone === "green"
                  ? "bg-emerald-400/10 border-emerald-400/20"
                  : "bg-[#19e6d2]/10 border-[#19e6d2]/20"
              }
            `}
          >
            {riskTone === "red" ? (
              <AlertTriangle className="text-red-400" size={20} />
            ) : (
              <ShieldCheck
                className={
                  riskTone === "green"
                    ? "text-emerald-400"
                    : "text-[#19e6d2]"
                }
                size={20}
              />
            )}

            <div>
              <p
                className="
                  text-[10px]
                  uppercase
                  tracking-[0.18em]
                  text-[#8395b8]
                "
              >
                Risk Classification
              </p>

              <p
                className={`
                  text-sm font-bold mt-1
                  ${
                    riskTone === "red"
                      ? "text-red-400"
                      : riskTone === "yellow"
                      ? "text-yellow-400"
                      : riskTone === "green"
                      ? "text-emerald-400"
                      : "text-[#19e6d2]"
                  }
                `}
              >
                {risk}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* METRIC GRID */}

      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
        <MetricCard
          title="Verdict"
          value={ai?.verdict}
          icon={<Bot size={19} />}
          tone="cyan"
        />
        <MetricCard
          title="Risk Level"
          value={risk}
          icon={<AlertTriangle size={19} />}
          tone={riskTone}
        />
        <MetricCard
          title="Confidence"
          value={confidence}
          icon={<Activity size={19} />}
          tone="blue"
        />
        <MetricCard
          title="Media Type"
          value={ai?.media_type_label}
          icon={<FileSearch size={19} />}
          tone="purple"
        />
        <MetricCard
          title="Authenticity"
          value={ai?.authenticity}
          icon={<ShieldCheck size={19} />}
          tone="green"
        />
        <MetricCard
          title="Face Detected"
          value={faceDetected ? "Detected" : "Not Detected"}
          icon={
            faceDetected ? (
              <ScanFace size={19} />
            ) : (
              <CheckCircle2 size={19} />
            )
          }
          tone={faceDetected ? "yellow" : "green"}
        />
        <MetricCard
          title="AI Generated"
          value={aiGenerated ? "Detected" : "Not Detected"}
          icon={
            aiGenerated ? (
              <AlertTriangle size={19} />
            ) : (
              <CheckCircle2 size={19} />
            )
          }
          tone={aiGenerated ? "red" : "green"}
        />
        <MetricCard
          title="Sensor Noise"
          value={sensorNoise}
          icon={<Radio size={19} />}
          tone="blue"
        />
        <MetricCard
          title="Frequency Score"
          value={frequencyScore}
          icon={<Activity size={19} />}
          tone="cyan"
        />
        <MetricCard
          title="Texture Score"
          value={textureScore}
          icon={<Fingerprint size={19} />}
          tone="purple"
        />
        <MetricCard
          title="AI Source"
          value={ai?.ai_source || "Unknown"}
          icon={<BrainCircuit size={19} />}
          tone="cyan"
        />
      </div>

      {/* FINDINGS PANEL */}
      <section
        className="
          bg-[#050816]
          border border-[#1b2a41]
          rounded-2xl
          overflow-hidden
        "
      >
        <div
          className="
            px-5 py-4
            border-b border-[#1b2a41]
            flex items-center gap-3
          "
        >
          <div
            className="
              w-10 h-10 rounded-xl
              bg-[#19e6d2]/10
              border border-[#19e6d2]/20
              text-[#19e6d2]
              flex items-center justify-center
            "
          >
            <FileSearch size={19} />
          </div>

          <div>
            <p
              className="
                text-[12px]
                uppercase
                tracking-[0.22em]
                text-[#8395b8]
              "
            >
              Analysis Findings
            </p>

            <p className="text-sm text-slate-300">
              Indicators produced by the AI forensic engine.
            </p>
          </div>
        </div>

        <div className="p-4 space-y-2">
          {ai?.reasons?.length > 0 ? (
            ai.reasons.map(
              (reason: string, index: number) => (
                <div
                  key={index}
                  className="
                    flex
                    items-center
                    gap-3
                    px-4
                    py-2
                    rounded-lg
                    bg-[#08111f]
                    border
                    border-[#1b2a41]
                  "
                >
                  <span
                    className={
                      aiGenerated
                        ? "text-red-400 mt-0.5"
                        : "text-[#19e6d2] mt-0.5"
                    }
                  >
                    •
                  </span>

                  <p className="text-sm leading-5 text-slate-300">
                    {reason}
                  </p>
                </div>
              )
            )
          ) : (
            <div
              className="
                bg-emerald-400/10
                border border-emerald-400/20
                rounded-xl
                p-4
                flex items-center gap-3
                text-emerald-300
                text-sm
              "
            >
              <CheckCircle2 size={18} />
              No strong synthetic-media indicators were detected.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}