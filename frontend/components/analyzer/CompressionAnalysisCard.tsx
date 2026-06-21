// interface Props {
//   data: any
// }

// export default function CompressionAnalysisCard({
//   data
// }: Props) {

//   return (
//     <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">

//       <h2 className="text-2xl font-bold mb-5">
//         Compression Analysis
//       </h2>

//       <div className="space-y-3">

//         <p>
//           Compression Detected:
//           {" "}
//           {data?.compression_detected
//             ? "Yes"
//             : "No"}
//         </p>

//         <p>
//           Compression Score:
//           {" "}
//           {data?.compression_score}
//         </p>

//         <p>
//           Compression Level:
//           {" "}
//           {data?.compression_level}
//         </p>

//         <p>
//           Sharpness:
//           {" "}
//           {data?.sharpness}
//         </p>

//         <p>
//           Unique Colors:
//           {" "}
//           {data?.unique_colors}
//         </p>

//         <div>
//           <h3 className="font-semibold">
//             Reasons
//           </h3>

//           <ul className="list-disc ml-5 text-zinc-400">

//             {
//               data?.reasons?.map(
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
//   Archive,
//   Gauge,
//   Layers3,
//   Palette,
//   ScanLine,
//   CheckCircle2,
//   AlertTriangle,
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

// export default function CompressionAnalysisCard({
//   data,
// }: Props) {
//   const detected = Boolean(data?.compression_detected);

//   return (
//     <div className="bg-[#050816] border border-[#1b2a41] rounded-2xl p-5 md:p-6">
//       {/* HEADER */}
//       <div className="flex items-start justify-between gap-4 mb-6">
//         <div className="flex items-center gap-3">
//           <div className="w-11 h-11 rounded-xl bg-[#19e6d2]/10 border border-[#19e6d2]/20 flex items-center justify-center text-[#19e6d2]">
//             <Archive size={21} />
//           </div>

//           <div>
//             <p className="text-[10px] uppercase tracking-[0.2em] text-[#8191b1] font-mono">
//               Image Integrity
//             </p>

//             <h2 className="font-serif text-2xl font-bold text-white mt-1">
//               Compression Analysis
//             </h2>
//           </div>
//         </div>

//         <div
//           className={`px-3 py-2 rounded-lg border text-xs font-semibold flex items-center gap-2 ${
//             detected
//               ? "bg-yellow-400/10 border-yellow-400/30 text-yellow-400"
//               : "bg-emerald-400/10 border-emerald-400/30 text-emerald-400"
//           }`}
//         >
//           {detected ? (
//             <AlertTriangle size={15} />
//           ) : (
//             <CheckCircle2 size={15} />
//           )}

//           {detected ? "COMPRESSION FOUND" : "NO COMPRESSION"}
//         </div>
//       </div>

//       {/* METRICS */}
//       <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
//         <MetricCard
//           title="Compression Detected"
//           value={detected ? "Yes" : "No"}
//           icon={<Archive size={16} />}
//           color={detected ? "text-yellow-400" : "text-emerald-400"}
//         />

//         <MetricCard
//           title="Compression Score"
//           value={data?.compression_score?.toFixed?.(2) ?? data?.compression_score}
//           icon={<Gauge size={16} />}
//           color="text-[#19e6d2]"
//         />

//         <MetricCard
//           title="Compression Level"
//           value={data?.compression_level ?? "Unknown"}
//           icon={<Layers3 size={16} />}
//           color="text-sky-400"
//         />

//         <MetricCard
//           title="Sharpness"
//           value={data?.sharpness?.toFixed?.(2) ?? data?.sharpness}
//           icon={<ScanLine size={16} />}
//           color="text-violet-400"
//         />

//         <MetricCard
//           title="Unique Colors"
//           value={data?.unique_colors}
//           icon={<Palette size={16} />}
//           color="text-pink-400"
//         />
//       </div>

//       {/* FINDINGS */}
//       <div className="mt-5 bg-[#08111f] border border-[#1b2a41] rounded-xl overflow-hidden">
//         <div className="px-5 py-4 border-b border-[#1b2a41]">
//           <p className="text-[10px] uppercase tracking-[0.2em] text-[#8191b1] font-mono">
//             Compression Findings
//           </p>
//         </div>

//         <div className="p-5 space-y-3">
//           {data?.reasons?.length > 0 ? (
//             data.reasons.map((item: string, index: number) => (
//               <div
//                 key={index}
//                 className="flex items-start gap-3 text-sm text-slate-300"
//               >
//                 <span className="text-[#19e6d2] mt-0.5">•</span>
//                 <span>{item}</span>
//               </div>
//             ))
//           ) : (
//             <p className="text-sm text-[#8191b1]">
//               No compression-related forensic indicators found.
//             </p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import {
  Archive,
  Gauge,
  Layers3,
  Palette,
  ScanLine,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

import ForensicMetric from "./ForensicMetric";
import ForensicFindings from "./ForensicFindings";

interface Props {
  data: any;
}

export default function CompressionAnalysisCard({ data }: Props) {
  const detected = Boolean(data?.compression_detected);

  const score = Number(data?.compression_score || 0);

  return (
    <div className="bg-[#050816] border border-[#1b2a41] rounded-2xl overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.22)]">
      <div className="h-1 bg-[#19e6d2]" />

      <div className="p-5 md:p-6">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-[#19e6d2]/10 border border-[#19e6d2]/20 flex items-center justify-center">
              <Archive size={21} className="text-[#19e6d2]" />
            </div>

            <div>
              <p className="text-[12px] uppercase tracking-[0.2em] text-[#8191b1]">
                Image Integrity Engine
              </p>

              <h2 className="font-serif text-2xl font-bold text-white mt-1">
                Compression Analysis
              </h2>
            </div>
          </div>

          <div
            className={`px-2 py-2 rounded-lg border text-xs font-semibold flex items-center gap-2 ${
              detected
                ? "bg-yellow-400/10 border-yellow-400/30 text-yellow-400"
                : "bg-emerald-400/10 border-emerald-400/30 text-emerald-400"
            }`}
          >
            {detected ? <AlertTriangle size={15} /> : <CheckCircle2 size={15} />}
            {detected ? "COMPRESSION DETECTED" : "INTEGRITY VERIFIED"}
          </div>
        </div>

        {/* SCORE */}
        {/* <div className="bg-[#08111f] border border-[#1b2a41] rounded-xl p-4 mb-5">
          <div className="flex items-center justify-between">
            <p className="text-[10px] uppercase tracking-[0.18em] text-[#8191b1] font-mono">
              Compression Risk Score
            </p>

            <p className="text-sm font-semibold text-[#19e6d2]">
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
                  : "bg-[#19e6d2]"
              }`}
              style={{ width: `${Math.min(score, 100)}%` }}
            />
          </div>
        </div> */}

        {/* METRICS */}
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
          <ForensicMetric
            label="Compression Status"
            value={detected ? "Detected" : "Not Detected"}
            icon={<Archive size={18} />}
            tone={detected ? "yellow" : "green"}
          />

          <ForensicMetric
            label="Compression Level"
            value={data?.compression_level || "Unknown"}
            icon={<Layers3 size={18} />}
            tone="blue"
          />

          <ForensicMetric
            label="Sharpness Score"
            value={data?.sharpness?.toFixed?.(2) ?? data?.sharpness}
            icon={<ScanLine size={18} />}
            tone="purple"
          />

          <ForensicMetric
            label="Unique Colors"
            value={data?.unique_colors}
            icon={<Palette size={18} />}
            tone="cyan"
          />

          <ForensicMetric
            label="Compression Score"
            value={data?.compression_score?.toFixed?.(2) ?? data?.compression_score}
            icon={<Gauge size={18} />}
            tone="cyan"
          />
        </div>

        <ForensicFindings
          title="Compression Findings"
          findings={data?.reasons || []}
          severity={detected ? "medium" : "low"}
          emptyText="No significant compression anomalies were identified."
        />
      </div>
    </div>
  );
}