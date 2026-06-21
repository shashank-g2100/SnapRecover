// interface Props {
//   data: any
// }

// export default function CorruptionAnalysisCard({
//   data
// }: Props) {

//   return (
//     <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">

//       <h2 className="text-2xl font-bold mb-5">
//         Corruption Analysis
//       </h2>

//       <div className="space-y-3">

//         <p>
//           Corruption Detected:
//           {" "}
//           {data?.corruption_detected
//             ? "Yes"
//             : "No"}
//         </p>

//         <p>
//           Corruption Score:
//           {" "}
//           {data?.corruption_score}
//         </p>

//         <p>
//           Risk Level:
//           {" "}
//           {data?.risk_level}
//         </p>

//         <p>
//           Horizontal Score:
//           {" "}
//           {data?.horizontal_score}
//         </p>

//         <p>
//           Vertical Score:
//           {" "}
//           {data?.vertical_score}
//         </p>

//         <div>

//           <h3 className="font-semibold">
//             Artifact Types
//           </h3>

//           <ul className="list-disc ml-5 text-zinc-400">

//             {
//               data?.artifact_types?.map(
//                 (
//                   item: string,
//                   index: number
//                 ) => (
//                   <li key={index}>
//                     {item}
//                   </li>
//                 )
//               )
//             }

//           </ul>

//         </div>

//       </div>

//     </div>
//   )
// }

// "use client";

// import {
//   ShieldAlert,
//   Activity,
//   ArrowLeftRight,
//   ArrowUpDown,
//   CheckCircle2,
//   AlertTriangle,
//   ScanSearch,
// } from "lucide-react";

// interface Props {
//   data: any;
// }

// function MetricCard({
//   title,
//   value,
//   icon,
//   color = "text-[#19e6d2]",
// }: {
//   title: string;
//   value: any;
//   icon: React.ReactNode;
//   color?: string;
// }) {
//   return (
//     <div className="bg-[#08111f] border border-[#1b2a41] rounded-xl p-4">
//       <div className="flex items-center gap-2">
//         <span className={color}>{icon}</span>

//         <p className="text-[10px] uppercase tracking-[0.18em] text-[#8191b1] font-mono">
//           {title}
//         </p>
//       </div>

//       <p className={`mt-4 text-xl font-semibold ${color}`}>
//         {value ?? "—"}
//       </p>
//     </div>
//   );
// }

// export default function CorruptionAnalysisCard({
//   data,
// }: Props) {
//   const corrupted = Boolean(data?.corruption_detected);

//   const riskColor =
//     data?.risk_level === "HIGH"
//       ? "text-red-400"
//       : data?.risk_level === "MEDIUM"
//       ? "text-yellow-400"
//       : "text-emerald-400";

//   return (
//     <div className="bg-[#050816] border border-[#1b2a41] rounded-2xl p-5 md:p-6">
//       {/* HEADER */}
//       <div className="flex items-start justify-between gap-4 mb-6">
//         <div className="flex items-center gap-3">
//           <div className="w-11 h-11 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400">
//             <ShieldAlert size={21} />
//           </div>

//           <div>
//             <p className="text-[10px] uppercase tracking-[0.2em] text-[#8191b1] font-mono">
//               File Integrity
//             </p>

//             <h2 className="font-serif text-2xl font-bold text-white mt-1">
//               Corruption Analysis
//             </h2>
//           </div>
//         </div>

//         <div
//           className={`px-3 py-2 rounded-lg border text-xs font-semibold flex items-center gap-2 ${
//             corrupted
//               ? "bg-red-500/10 border-red-500/30 text-red-400"
//               : "bg-emerald-400/10 border-emerald-400/30 text-emerald-400"
//           }`}
//         >
//           {corrupted ? (
//             <AlertTriangle size={15} />
//           ) : (
//             <CheckCircle2 size={15} />
//           )}

//           {corrupted ? "CORRUPTION FOUND" : "FILE INTACT"}
//         </div>
//       </div>

//       {/* METRICS */}
//       <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
//         <MetricCard
//           title="Corruption Detected"
//           value={corrupted ? "Yes" : "No"}
//           icon={<ShieldAlert size={16} />}
//           color={corrupted ? "text-red-400" : "text-emerald-400"}
//         />

//         <MetricCard
//           title="Corruption Score"
//           value={data?.corruption_score?.toFixed?.(2) ?? data?.corruption_score}
//           icon={<Activity size={16} />}
//           color="text-[#19e6d2]"
//         />

//         <MetricCard
//           title="Risk Level"
//           value={data?.risk_level ?? "Unknown"}
//           icon={<AlertTriangle size={16} />}
//           color={riskColor}
//         />

//         <MetricCard
//           title="Horizontal Score"
//           value={data?.horizontal_score?.toFixed?.(2) ?? data?.horizontal_score}
//           icon={<ArrowLeftRight size={16} />}
//           color="text-sky-400"
//         />

//         <MetricCard
//           title="Vertical Score"
//           value={data?.vertical_score?.toFixed?.(2) ?? data?.vertical_score}
//           icon={<ArrowUpDown size={16} />}
//           color="text-violet-400"
//         />
//       </div>

//       {/* ARTIFACTS */}
//       <div className="mt-5 bg-[#08111f] border border-[#1b2a41] rounded-xl overflow-hidden">
//         <div className="px-5 py-4 border-b border-[#1b2a41] flex items-center gap-2">
//           <ScanSearch size={17} className="text-[#19e6d2]" />

//           <p className="text-[10px] uppercase tracking-[0.2em] text-[#8191b1] font-mono">
//             Artifact Types Detected
//           </p>
//         </div>

//         <div className="p-5 space-y-3">
//           {data?.artifact_types?.length > 0 ? (
//             data.artifact_types.map((item: string, index: number) => (
//               <div
//                 key={index}
//                 className="flex items-start gap-3 text-sm text-slate-300"
//               >
//                 <span className="text-red-400 mt-0.5">•</span>
//                 <span>{item}</span>
//               </div>
//             ))
//           ) : (
//             <p className="text-sm text-[#8191b1]">
//               No visible corruption artifacts were identified.
//             </p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import {
  ShieldAlert,
  Activity,
  ArrowLeftRight,
  ArrowUpDown,
  ScanSearch,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

import ForensicMetric from "./ForensicMetric";
import ForensicFindings from "./ForensicFindings";

interface Props {
  data: any;
}

export default function CorruptionAnalysisCard({ data }: Props) {
  const corrupted = Boolean(data?.corruption_detected);

  const score = Number(data?.corruption_score || 0);

  const risk = String(data?.risk_level || "LOW").toUpperCase();

  const riskTone =
    risk === "HIGH"
      ? "red"
      : risk === "MEDIUM"
      ? "yellow"
      : "green";

  return (
    <div className="bg-[#050816] border border-[#1b2a41] rounded-2xl overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.22)]">
      <div className="h-1 bg-red-400" />

      <div className="p-5 md:p-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-red-400/10 border border-red-400/20 flex items-center justify-center">
              <ShieldAlert size={21} className="text-red-400" />
            </div>

            <div>
              <p className="text-[12px] uppercase tracking-[0.2em] text-[#8191b1]">
                File Integrity Engine
              </p>

              <h2 className="font-serif text-2xl font-bold text-white mt-1">
                Corruption Analysis
              </h2>
            </div>
          </div>

          <div
            className={`px-3 py-2 rounded-lg border text-xs font-semibold flex items-center gap-2 ${
              corrupted
                ? "bg-red-400/10 border-red-400/30 text-red-400"
                : "bg-emerald-400/10 border-emerald-400/30 text-emerald-400"
            }`}
          >
            {corrupted ? <AlertTriangle size={15} /> : <CheckCircle2 size={15} />}
            {corrupted ? "CORRUPTION FOUND" : "FILE STRUCTURE VALID"}
          </div>
        </div>

        {/* <div className="bg-[#08111f] border border-[#1b2a41] rounded-xl p-4 mb-5">
          <div className="flex items-center justify-between">
            <p className="text-[10px] uppercase tracking-[0.18em] text-[#8191b1] font-mono">
              Corruption Risk Score
            </p>

            <p className="text-sm font-semibold text-red-400">
              {score.toFixed(1)} / 100
            </p>
          </div>

          <div className="mt-3 h-2 bg-[#111d31] rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full ${
                score >= 70
                  ? "bg-red-400"
                  : score >= 40
                  ? "bg-yellow-400"
                  : "bg-emerald-400"
              }`}
              style={{ width: `${Math.min(score, 100)}%` }}
            />
          </div>
        </div> */}

        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
          <ForensicMetric
            label="Corruption Status"
            value={corrupted ? "Detected" : "Not Detected"}
            icon={<ShieldAlert size={18} />}
            tone={corrupted ? "red" : "green"}
          />

          <ForensicMetric
            label="Risk Level"
            value={risk}
            icon={<AlertTriangle size={18} />}
            tone={riskTone}
          />

          <ForensicMetric
            label="Horizontal Artifacts"
            value={data?.horizontal_score?.toFixed?.(2) ?? data?.horizontal_score}
            icon={<ArrowLeftRight size={18} />}
            tone="blue"
          />

          <ForensicMetric
            label="Vertical Artifacts"
            value={data?.vertical_score?.toFixed?.(2) ?? data?.vertical_score}
            icon={<ArrowUpDown size={18} />}
            tone="purple"
          />

          <ForensicMetric
            label="Corruption Score"
            value={data?.corruption_score?.toFixed?.(2) ?? data?.corruption_score}
            icon={<Activity size={18} />}
            tone="red"
          />
        </div>

        <ForensicFindings
          title="Detected Artifact Types"
          findings={data?.artifact_types || []}
          severity={corrupted ? "high" : "low"}
          emptyText="No structural corruption artifacts were identified."
        />
      </div>
    </div>
  );
}