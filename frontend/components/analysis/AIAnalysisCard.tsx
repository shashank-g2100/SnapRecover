// "use client";

// import {
//   Bot,
//   Shield,
//   ScanLine
// } from "lucide-react";

// interface Props {
//   result: any;
//   aiRisk: string;
//   aiColor: string;
//   aiVerdict: string;
//   aiConfidence: number;
//   aiScore: number;
//   aiBorderColor: string;
// 	aiMessage: string;
// 	aiBadge: string;
// 	mediaType: string;
//   mediaLabel: string;
//   authenticity: string;
//   threatEngine: any;
// }

// export default function AIAnalysisCard({
//   result,
//   aiRisk,
//   aiColor,
//   aiVerdict,
//   aiConfidence,
//   aiScore,
//   aiBorderColor,
//   aiMessage,
// 	aiBadge,
//   mediaType,
//   mediaLabel,
//   authenticity,
//   threatEngine,
// }: Props) {

//   return (
//     <div className="xl:col-span-2 bg-[#111] border border-gray-800 rounded-2xl p-8 shadow-2xl">
//       {/* HEADER */}
//       <div className="flex items-center justify-between mb-4">
//         <div>
//           <p className="text-sm uppercase tracking-widest text-gray-500">
//             Artificial Intelligence
//           </p>
//         	<h2 className="text-2xl font-bold mt-2">
//             AI Synthetic Media Intelligence Engine
//           </h2>
//         </div>
//         {/* BADGE */}
//         <div
//           className={`px-4 py-2 rounded-full text-sm font-semibold border ${
//             aiRisk === "HIGH"
//               ? "bg-red-950 text-red-400 border-red-700"
//               : aiRisk === "MEDIUM"
//               ? "bg-orange-950 text-orange-400 border-orange-700"
//               : "bg-green-950 text-green-400 border-green-700"
//             }`}
//           >
//           	{aiRisk}
//         	</div>
//       	</div>

//         {/* MAIN LABEL */}
//         <div className={`text-2xl font-bold mb-4 ${aiColor}`}>
//           {aiVerdict}
//         </div>
// 					{/* SCORE CARD */}
// 					<div className="bg-[#0b0b0b] border border-gray-800 rounded-2xl p-6 mb-8">
//             <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-8">
//               {/* LEFT */}
//               <div className="flex-1">
//                 <p className="text-gray-400 text-sm uppercase tracking-widest">
//                   Digital Authenticity Score
//                 </p>
//                 {/* CATEGORY GRID */}
//               	<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
//                 	<div className="bg-[#050816] border border-blue-900 rounded-2xl p-4">
//                     <div className="flex items-center gap-2">
//                       <Bot className="text-blue-400" size={18} />
//                       <div className="text-xs uppercase tracking-wider text-gray-500">
//                         Media Category
//                       </div>
//                     </div>
// 										<div className="text-2xl font-bold text-blue-400">
//                       {mediaLabel}
//                     </div>
//                   </div>

//                   {/* AUTHENTICITY */}
//                   <div className="bg-[#050816] border border-green-900 rounded-2xl p-4">
//                     <div className="flex items-center gap-2">
//                       <Shield className="text-green-400" size={18} />
//                       <div className="text-xs uppercase tracking-wider text-gray-500">
//                       	Authenticity
//                       </div>
//                     </div>
//                     <div className="text-2xl font-bold text-green-400 mt-2">
//                       {authenticity}
//                     </div>
//                   </div>

// 									{/* CONTENT TYPE */}
//                   <div className="bg-[#050816] border border-cyan-900 rounded-2xl p-4">
//                     <div className="flex items-center gap-2">
//                       <ScanLine className="text-cyan-400" size={18} />
//                       <div className="text-xs uppercase tracking-wider text-gray-500">
//                         Content Type
//                       </div>
//                     </div>

//                     <div className="text-2xl font-bold text-cyan-400 mt-2">
//                       {
//                         result?.ai_detection?.content_type ||
//                         "Unknown"
//                       }
//                     </div>
//                   </div>
//                 </div>

//                 {/* SCORE */}
//                 <div className="mt-10">
//                   <h3 className={`text-6xl font-black ${aiColor}`}>
//                     {threatEngine?.final_threat_score || 0}
//                   	<span className="text-lg text-gray-500 ml-1">
//                       /100
//                     </span>
//                   </h3>
//                   <div className="mt-3 text-sm text-gray-500">
//                     Confidence: {aiConfidence}%
//                   </div>
//                 </div>
//               </div>
                    
// 							{/* RIGHT ICON */}
//               <div className={`w-24 h-24 rounded-full flex items-center justify-center text-4xl font-bold border-4 ${aiBorderColor}`}>
//                 {
//                   aiScore >= 80
//                     ? "!"
//                     : aiScore >= 60
//                     ? "⚠"
//                     : aiScore >= 40
//                     ? "?"
//                     : "✓"
//                 }
//               </div>
//             </div>
                  
// 						{/* PROGRESS */}
//             <div className="w-full h-6 bg-gray-900 rounded-full overflow-hidden mt-8">
//               <div
//                 className={`h-6 transition-all duration-700 ${
//                   aiScore >= 80
//                     ? "bg-red-500"
//                     : aiScore >= 60
//                     ? "bg-orange-400"
//                     : aiScore >= 40
//                     ? "bg-yellow-400"
//                     : "bg-green-500"
//                   }`}
//                   style={{
//                   	width: `${aiScore}%`
//                   }}
//                 />
//               </div>
//             </div>

//                 {/* FINDINGS */}
//                 <div className="mb-8">
//                   <h3 className="text-2xl font-bold mb-6">
//                     AI Analysis Findings
//                   </h3>
//                   <div className="space-y-4">
//                     {result?.ai_detection?.reasons?.length > 0 ? (
//                       result.ai_detection.reasons.map(
//                         (reason: string, index: number) => (
//                           <div
//                             key={index}
//                             className={`flex items-center gap-4 p-5 rounded-2xl border ${
//                               aiScore >= 80
//                                 ? "bg-red-950/40 border-red-700"
//                                 : aiScore >= 60
//                                 ? "bg-orange-950/40 border-orange-700"
//                                 : aiScore >= 40
//                                 ? "bg-yellow-950/20 border-yellow-700"
//                                 : "bg-green-950/20 border-green-700"
//                             }`}
//                           >
//                             <div
//                               className={`w-3 h-3 rounded-full shrink-0 ${
//                                 aiScore >= 80
//                                   ? "bg-red-500"
//                                   : aiScore >= 60
//                                   ? "bg-orange-400"
//                                   : aiScore >= 40
//                                   ? "bg-yellow-400"
//                                   : "bg-green-400"
//                               }`}
//                             />
//                             <p className="text-lg text-gray-200">
//                               {reason}
//                             </p>
//                           </div>
//                         )
//                       )
//                     ) : (
//                       <div className="bg-green-950/20 border border-green-700 rounded-xl p-5 text-green-400">
//                         No strong synthetic manipulation indicators detected.
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 {/* METRICS */}
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
//                   {/* FACE */}
//                   {/* <div className="bg-[#0b0b0b] border border-gray-800 rounded-xl p-5">
//                     <p className="text-gray-500 text-sm uppercase">
//                       Face Detection
//                     </p>
//                     <h4
// 											className={`text-2xl font-bold mt-3 ${
// 												result?.ai_detection?.face_status === "Detected"
// 													? "text-green-400"
// 													: result?.ai_detection?.face_status === "Not Detected"
// 													? "text-yellow-400"
// 													: "text-zinc-400"
// 											}`}
// 										>
// 											{result?.ai_detection?.face_status || "Unknown"}
// 										</h4>
//                   </div> */}
//                   <div className="bg-[#0b0b0b] border border-gray-800 rounded-xl p-5">
//                     <p className="text-gray-500 text-sm uppercase">
//                       Face Detection
//                     </p>

//                     <h4
//                       className={`text-2xl font-bold mt-3 ${
//                         result?.ai_detection?.face_detected
//                           ? "text-green-400"
//                           : "text-yellow-400"
//                       }`}
//                     >
//                       {
//                         result?.ai_detection?.face_status
//                       }
//                     </h4>

//                     <p className="text-sm text-gray-500 mt-2">
//                       Faces:
//                       {
//                         result?.ai_detection?.face_count
//                       }
//                     </p>
//                   </div>

//                   <div className="bg-[#0b0b0b] border border-gray-800 rounded-xl p-5">
//                     <p className="text-gray-500 text-sm uppercase">
//                       Sensor Noise
//                     </p>

//                     <h4
//                       className={`text-2xl font-bold mt-3 ${
//                         result?.ai_detection?.sensor_noise_status === "Natural"
//                           ? "text-green-400"
//                           : "text-red-400"
//                       }`}
//                     >
//                       {result?.ai_detection?.sensor_noise_status}
//                     </h4>
//                   </div>

//                   {/* METADATA */}
//                   {/* <div className="bg-[#0b0b0b] border border-gray-800 rounded-xl p-5">
//                     <p className="text-gray-500 text-sm uppercase">
//                       Camera Metadata
//                     </p>
//                     <h4 className="text-2xl font-bold mt-3 text-purple-400">
//                       {
//                         result?.ai_detection?.reasons?.some(
//                           (r: string) =>
//                             r.includes("metadata")
//                         )
//                           ? "Missing"
//                           : "Available"
//                       }
//                     </h4>
//                   </div> */}
//                   <div className="bg-[#0b0b0b] border border-gray-800 rounded-xl p-5">
//                     <p className="text-gray-500 text-sm uppercase">
//                       Metadata Status
//                     </p>

//                     <h4 className="text-2xl font-bold mt-3 text-purple-400">
//                       {
//                         result?.ai_detection?.metadata_status ||
//                         "Unknown"
//                       }
//                     </h4>
//                   </div>

//                   {/* SENSOR */}
//                   {/* <div className="bg-[#0b0b0b] border border-gray-800 rounded-xl p-5">
//                     <p className="text-gray-500 text-sm uppercase">
//                       Sensor Noise
//                     </p>
//                     <h4 className="text-2xl font-bold mt-3 text-cyan-400">
//                       {
//                         result?.ai_detection
//                           ?.sensor_noise_status ||
//                         "Unknown"
//                       }
//                     </h4>
//                   </div> */}
//                 </div>
//               </div>

//   );
// }

"use client";

import {
  Bot,
  Shield,
  ScanLine,
  BrainCircuit,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  ScanFace,
  Activity,
  Radio,
  FileSearch,
  Database,
} from "lucide-react";

interface Props {
  result: any;
  aiRisk: string;
  aiColor: string;
  aiVerdict: string;
  aiConfidence: number;
  aiScore: number;
  aiBorderColor: string;
  aiMessage: string;
  aiBadge: string;
  mediaType: string;
  mediaLabel: string;
  authenticity: string;
  threatEngine: any;
}

function getRiskClasses(score: number) {
  if (score >= 80) {
    return {
      text: "text-red-400",
      border: "border-red-500/30",
      bg: "bg-red-500/10",
      solid: "bg-red-500",
      icon: <AlertTriangle size={20} />,
      label: "HIGH RISK",
    };
  }

  if (score >= 60) {
    return {
      text: "text-orange-400",
      border: "border-orange-500/30",
      bg: "bg-orange-500/10",
      solid: "bg-orange-400",
      icon: <AlertTriangle size={20} />,
      label: "MEDIUM RISK",
    };
  }

  if (score >= 40) {
    return {
      text: "text-yellow-400",
      border: "border-yellow-500/30",
      bg: "bg-yellow-500/10",
      solid: "bg-yellow-400",
      icon: <AlertTriangle size={20} />,
      label: "REVIEW REQUIRED",
    };
  }

  return {
    text: "text-[#19e6d2]",
    border: "border-[#19e6d2]/30",
    bg: "bg-[#19e6d2]/10",
    solid: "bg-[#19e6d2]",
    icon: <CheckCircle2 size={20} />,
    label: "LIKELY AUTHENTIC",
  };
}

function MiniCard({
  title,
  value,
  icon,
  color = "text-[#19e6d2]",
}: {
  title: string;
  value: any;
  icon: React.ReactNode;
  color?: string;
}) {
  return (
    <div
      className="
        bg-[#08111f]
        border border-[#1b2a41]
        rounded-xl
        p-4
        min-h-[125px]
      "
    >
      <div className="flex items-center gap-2">
        <span className={color}>{icon}</span>

        <p
          className="
            text-[10px]
            uppercase
            tracking-[0.18em]
            text-[#8191b1]
            font-mono
          "
        >
          {title}
        </p>
      </div>

      <p className={`mt-4 text-lg font-semibold break-words ${color}`}>
        {value ?? "—"}
      </p>
    </div>
  );
}

export default function AIAnalysisCard({
  result,
  aiRisk,
  aiVerdict,
  aiConfidence,
  aiScore,
  mediaLabel,
  authenticity,
  threatEngine,
}: Props) {
  const risk = getRiskClasses(aiScore);

  const ai = result?.ai_detection;

  const finalScore =
    threatEngine?.final_threat_score ??
    aiScore ??
    0;

  const faceDetected = Boolean(ai?.face_detected);

  const aiGenerated = Boolean(
    ai?.ai_generated_detection?.detected
  );

  const contentType =
    ai?.content_type || "Unknown";

  const sensorNoise =
    ai?.sensor_noise_status || "Unknown";

  const metadataStatus =
    ai?.metadata_status || "Unknown";

  return (
    <div
      className="
        xl:col-span-2
        bg-[#050816]
        border border-[#1b2a41]
        rounded-2xl
        p-5 md:p-7
      "
    >
      {/* HEADER */}

      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5 mb-7">
        <div className="flex gap-4">
          <div
            className="
              w-12 h-12 shrink-0
              rounded-xl
              bg-[#19e6d2]/10
              border border-[#19e6d2]/20
              text-[#19e6d2]
              flex items-center justify-center
            "
          >
            <BrainCircuit size={24} />
          </div>

          <div>
            <p
              className="
                text-[10px]
                uppercase
                tracking-[0.22em]
                text-[#8191b1]
                font-mono
              "
            >
              Artificial Intelligence
            </p>

            <h2 className="font-serif text-2xl md:text-3xl font-bold text-white mt-2">
              Synthetic Media Intelligence
            </h2>

            <p className="text-sm text-[#8191b1] mt-2">
              AI-based authenticity and manipulation assessment.
            </p>
          </div>
        </div>

        <div
          className={`
            ${risk.bg}
            ${risk.border}
            ${risk.text}
            border
            rounded-xl
            px-4 py-3
            flex items-center gap-3
            self-start
          `}
        >
          {risk.icon}

          <div>
            <p className="text-[10px] uppercase tracking-[0.18em] font-mono opacity-70">
              Risk Classification
            </p>

            <p className="font-bold text-sm mt-1">
              {aiRisk || risk.label}
            </p>
          </div>
        </div>
      </div>

      {/* VERDICT + SCORE */}

      <div
        className="
          bg-[#08111f]
          border border-[#1b2a41]
          rounded-2xl
          p-5 md:p-6
          mb-6
        "
      >
        <div className="grid lg:grid-cols-[1fr_auto] gap-6 items-center">
          <div>
            <p
              className="
                text-[10px]
                uppercase
                tracking-[0.2em]
                text-[#8191b1]
                font-mono
              "
            >
              AI Verdict
            </p>

            <h3 className={`font-serif text-3xl font-bold mt-3 ${risk.text}`}>
              {aiVerdict || "Analysis Complete"}
            </h3>

            <p className="text-sm text-[#8191b1] mt-3">
              {ai?.ai_assessment ||
                "Automated synthetic-media forensic assessment completed."}
            </p>
          </div>

          <div
            className={`
              w-20 h-20
              rounded-full
              border-2
              ${risk.border}
              ${risk.bg}
              ${risk.text}
              flex items-center justify-center
              text-3xl font-bold
            `}
          >
            {finalScore >= 80
              ? "!"
              : finalScore >= 60
              ? "⚠"
              : finalScore >= 40
              ? "?"
              : "✓"}
          </div>
        </div>

        <div className="mt-7">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p
                className="
                  text-[10px]
                  uppercase
                  tracking-[0.18em]
                  text-[#8191b1]
                  font-mono
                "
              >
                Digital Authenticity Score
              </p>

              <p className={`font-serif text-5xl font-bold mt-2 ${risk.text}`}>
                {finalScore}
                <span className="text-base text-[#8191b1] ml-1">
                  /100
                </span>
              </p>
            </div>

            <p className="text-sm text-[#8191b1]">
              Confidence:{" "}
              <span className="text-white font-semibold">
                {aiConfidence ?? 0}%
              </span>
            </p>
          </div>

          <div className="w-full h-3 bg-[#111d32] rounded-full overflow-hidden mt-4">
            <div
              className={`h-full rounded-full ${risk.solid} transition-all duration-700`}
              style={{
                width: `${Math.min(Math.max(finalScore, 0), 100)}%`,
              }}
            />
          </div>
        </div>
      </div>

      {/* CATEGORY CARDS */}

      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <MiniCard
          title="Media Category"
          value={mediaLabel || "Unknown"}
          icon={<Bot size={17} />}
          color="text-sky-400"
        />

        <MiniCard
          title="Authenticity"
          value={authenticity || "Unknown"}
          icon={<Shield size={17} />}
          color="text-emerald-400"
        />

        <MiniCard
          title="Content Type"
          value={contentType}
          icon={<ScanLine size={17} />}
          color="text-[#19e6d2]"
        />
      </div>

      {/* FINDINGS */}

      <section
        className="
          bg-[#08111f]
          border border-[#1b2a41]
          rounded-2xl
          overflow-hidden
          mb-6
        "
      >
        <div className="px-5 py-4 border-b border-[#1b2a41] flex items-center gap-3">
          <FileSearch
            size={18}
            className="text-[#19e6d2]"
          />

          <div>
            <p
              className="
                text-[10px]
                uppercase
                tracking-[0.2em]
                text-[#8191b1]
                font-mono
              "
            >
              AI Analysis Findings
            </p>

            <p className="text-sm text-[#8191b1] mt-1">
              Indicators returned by the forensic analysis engine.
            </p>
          </div>
        </div>

        <div className="p-5 space-y-3">
          {ai?.reasons?.length > 0 ? (
            ai.reasons.map(
              (reason: string, index: number) => (
                <div
                  key={index}
                  className={`
                    flex items-start gap-3
                    rounded-xl p-4 border
                    ${risk.bg}
                    ${risk.border}
                  `}
                >
                  <span className={`${risk.text} mt-0.5`}>
                    •
                  </span>

                  <p className="text-sm text-slate-300 leading-6">
                    {reason}
                  </p>
                </div>
              )
            )
          ) : (
            <div
              className="
                flex items-center gap-3
                rounded-xl p-4
                bg-emerald-400/10
                border border-emerald-400/20
                text-emerald-300
                text-sm
              "
            >
              <CheckCircle2 size={18} />
              No strong synthetic manipulation indicators were detected.
            </div>
          )}
        </div>
      </section>

      {/* FORENSIC METRICS */}

      <div className="grid md:grid-cols-3 gap-4">
        <MiniCard
          title="Face Detection"
          value={
            faceDetected
              ? `${ai?.face_status || "Detected"} (${ai?.face_count ?? 0})`
              : "Not Detected"
          }
          icon={<ScanFace size={17} />}
          color={
            faceDetected
              ? "text-yellow-400"
              : "text-emerald-400"
          }
        />

        <MiniCard
          title="Sensor Noise"
          value={sensorNoise}
          icon={<Radio size={17} />}
          color={
            sensorNoise === "Natural"
              ? "text-emerald-400"
              : "text-red-400"
          }
        />

        <MiniCard
          title="Metadata Status"
          value={metadataStatus}
          icon={<Database size={17} />}
          color="text-violet-400"
        />

        <MiniCard
          title="AI Generated"
          value={aiGenerated ? "Detected" : "Not Detected"}
          icon={
            aiGenerated ? (
              <AlertTriangle size={17} />
            ) : (
              <CheckCircle2 size={17} />
            )
          }
          color={
            aiGenerated
              ? "text-red-400"
              : "text-emerald-400"
          }
        />

        <MiniCard
          title="Frequency Score"
          value={
            ai?.ai_forensics?.frequency_score?.toFixed?.(2) ??
            "—"
          }
          icon={<Activity size={17} />}
          color="text-sky-400"
        />

        <MiniCard
          title="Texture Score"
          value={
            ai?.ai_forensics?.texture_score?.toFixed?.(2) ??
            "—"
          }
          icon={<Activity size={17} />}
          color="text-[#19e6d2]"
        />
      </div>
    </div>
  );
}