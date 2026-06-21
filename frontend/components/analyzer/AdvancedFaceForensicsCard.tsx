// interface Props {
//   data: any
// }

// export default function AdvancedFaceForensicsCard({
//   data
// }: Props) {

//   return (
//     <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">

//       <h2 className="text-2xl font-bold mb-5">
//         Advanced Face Analysis
//       </h2>

//       <div className="space-y-3">

//         <p>
//           Face Detected:
//           {" "}
//           {data?.face_detected
//             ? "Yes"
//             : "No"}
//         </p>

//         <p>
//           Consistency Score:
//           {" "}
//           {data?.face_consistency_score}
//         </p>

//         <p>
//           Synthetic Face:
//           {" "}
//           {data?.synthetic_face_suspected
//             ? "Yes"
//             : "No"}
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
//   ScanFace,
//   ShieldCheck,
//   UserRoundSearch,
//   CheckCircle2,
//   AlertTriangle,
//   FileSearch,
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

// export default function AdvancedFaceForensicsCard({
//   data,
// }: Props) {
//   const faceDetected = Boolean(data?.face_detected);
//   const syntheticFace = Boolean(data?.synthetic_face_suspected);

//   return (
//     <div className="bg-[#050816] border border-[#1b2a41] rounded-2xl p-5 md:p-6">
//       {/* HEADER */}
//       <div className="flex items-start justify-between gap-4 mb-6">
//         <div className="flex items-center gap-3">
//           <div className="w-11 h-11 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400">
//             <ScanFace size={21} />
//           </div>

//           <div>
//             <p className="text-[10px] uppercase tracking-[0.2em] text-[#8191b1] font-mono">
//               Biometric Intelligence
//             </p>

//             <h2 className="font-serif text-2xl font-bold text-white mt-1">
//               Advanced Face Analysis
//             </h2>
//           </div>
//         </div>

//         <div
//           className={`px-3 py-2 rounded-lg border text-xs font-semibold flex items-center gap-2 ${
//             syntheticFace
//               ? "bg-red-500/10 border-red-500/30 text-red-400"
//               : "bg-emerald-400/10 border-emerald-400/30 text-emerald-400"
//           }`}
//         >
//           {syntheticFace ? (
//             <AlertTriangle size={15} />
//           ) : (
//             <CheckCircle2 size={15} />
//           )}

//           {syntheticFace ? "SYNTHETIC RISK" : "FACE INTEGRITY OK"}
//         </div>
//       </div>

//       {/* METRICS */}
//       <div className="grid md:grid-cols-3 gap-4">
//         <MetricCard
//           title="Face Detected"
//           value={faceDetected ? "Yes" : "No"}
//           icon={<ScanFace size={16} />}
//           color={faceDetected ? "text-[#19e6d2]" : "text-[#8191b1]"}
//         />

//         <MetricCard
//           title="Consistency Score"
//           value={
//             data?.face_consistency_score?.toFixed?.(2) ??
//             data?.face_consistency_score
//           }
//           icon={<ShieldCheck size={16} />}
//           color="text-emerald-400"
//         />

//         <MetricCard
//           title="Synthetic Face"
//           value={syntheticFace ? "Suspected" : "Not Suspected"}
//           icon={<UserRoundSearch size={16} />}
//           color={syntheticFace ? "text-red-400" : "text-emerald-400"}
//         />
//       </div>

//       {/* FINDINGS */}
//       <div className="mt-5 bg-[#08111f] border border-[#1b2a41] rounded-xl overflow-hidden">
//         <div className="px-5 py-4 border-b border-[#1b2a41] flex items-center gap-2">
//           <FileSearch size={17} className="text-[#19e6d2]" />

//           <p className="text-[10px] uppercase tracking-[0.2em] text-[#8191b1] font-mono">
//             Face Forensic Findings
//           </p>
//         </div>

//         <div className="p-5 space-y-3">
//           {data?.reasons?.length > 0 ? (
//             data.reasons.map((item: string, index: number) => (
//               <div
//                 key={index}
//                 className="flex items-start gap-3 text-sm text-slate-300"
//               >
//                 <span
//                   className={
//                     syntheticFace
//                       ? "text-red-400 mt-0.5"
//                       : "text-[#19e6d2] mt-0.5"
//                   }
//                 >
//                   •
//                 </span>

//                 <span>{item}</span>
//               </div>
//             ))
//           ) : (
//             <p className="text-sm text-[#8191b1]">
//               No additional facial forensic indicators were found.
//             </p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import {
  ScanFace,
  ShieldCheck,
  UserRoundSearch,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

import ForensicMetric from "./ForensicMetric";
import ForensicFindings from "./ForensicFindings";

interface Props {
  data: any;
}

export default function AdvancedFaceForensicsCard({ data }: Props) {
  const faceDetected = Boolean(data?.face_detected);
  const synthetic = Boolean(data?.synthetic_face_suspected);

  const score = Number(data?.face_consistency_score || 0);

  return (
    <div className="bg-[#050816] border border-[#1b2a41] rounded-2xl overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.22)]">
      <div className="h-1 bg-violet-400" />

      <div className="p-5 md:p-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-violet-400/10 border border-violet-400/20 flex items-center justify-center">
              <ScanFace size={21} className="text-violet-400" />
            </div>

            <div>
              <p className="text-[12px] uppercase tracking-[0.2em] text-[#8191b1]">
                Biometric Intelligence
              </p>

              <h2 className="font-serif text-2xl font-bold text-white mt-1">
                Advanced Face Forensics
              </h2>
            </div>
          </div>

          <div
            className={`px-3 py-2 rounded-lg border text-xs font-semibold flex items-center gap-2 ${
              synthetic
                ? "bg-red-400/10 border-red-400/30 text-red-400"
                : "bg-emerald-400/10 border-emerald-400/30 text-emerald-400"
            }`}
          >
            {synthetic ? <AlertTriangle size={15} /> : <CheckCircle2 size={15} />}
            {synthetic ? "SYNTHETIC FACE RISK" : "FACE INTEGRITY VERIFIED"}
          </div>
        </div>

        {/* <div className="bg-[#08111f] border border-[#1b2a41] rounded-xl p-4 mb-5">
          <div className="flex items-center justify-between">
            <p className="text-[10px] uppercase tracking-[0.18em] text-[#8191b1] font-mono">
              Facial Consistency Score
            </p>

            <p className="text-sm font-semibold text-violet-400">
              {score.toFixed(1)} / 100
            </p>
          </div>

          <div className="mt-3 h-2 bg-[#111d31] rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full ${
                score >= 75
                  ? "bg-emerald-400"
                  : score >= 45
                  ? "bg-yellow-400"
                  : "bg-red-400"
              }`}
              style={{ width: `${Math.min(score, 100)}%` }}
            />
          </div>
        </div> */}

        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
          <ForensicMetric
            label="Face Detected"
            value={faceDetected ? "Yes" : "No"}
            icon={<ScanFace size={18} />}
            tone={faceDetected ? "cyan" : "yellow"}
          />

          <ForensicMetric
            label="Face Consistency"
            value={data?.face_consistency_score?.toFixed?.(2) ?? data?.face_consistency_score}
            icon={<ShieldCheck size={18} />}
            tone="green"
          />

          <ForensicMetric
            label="Synthetic Face"
            value={synthetic ? "Suspected" : "Not Suspected"}
            icon={<UserRoundSearch size={18} />}
            tone={synthetic ? "red" : "green"}
          />
        </div>

        <ForensicFindings
          title="Facial Forensic Findings"
          findings={data?.reasons || []}
          severity={synthetic ? "high" : "low"}
          emptyText="No facial manipulation indicators were identified."
        />
      </div>
    </div>
  );
}