// interface Props {
//   data: any
// }

// export default function ReverseImageSearchCard({
//   data
// }: Props) {

//   return (
//     <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">

//       <h2 className="text-2xl font-bold mb-5">
//         Reverse Image Search
//       </h2>

//       <div className="space-y-3">

//         <p>
//           Matches Found:
//           {" "}
//           {data?.matches_found
//             ? "Yes"
//             : "No"}
//         </p>

//         <p>
//           Platform:
//           {" "}
//           {data?.source_platform}
//         </p>

//         <p>
//           Confidence:
//           {" "}
//           {data?.confidence}%
//         </p>

//         <p className="break-all">
//           Hash:
//           {" "}
//           {data?.image_hash}
//         </p>

//       </div>

//     </div>
//   )
// }

// "use client";

// import {
//   Search,
//   Globe2,
//   BadgeCheck,
//   Hash,
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
//   breakWord = false,
// }: {
//   title: string;
//   value: any;
//   icon: React.ReactNode;
//   color?: string;
//   breakWord?: boolean;
// }) {
//   return (
//     <div className="bg-[#08111f] border border-[#1b2a41] rounded-xl p-4">
//       <div className="flex items-center gap-2">
//         <span className={color}>{icon}</span>

//         <p className="text-[10px] uppercase tracking-[0.18em] text-[#8191b1] font-mono">
//           {title}
//         </p>
//       </div>

//       <p
//         className={`mt-4 text-lg font-semibold ${color} ${
//           breakWord ? "break-all font-mono text-sm" : ""
//         }`}
//       >
//         {value ?? "—"}
//       </p>
//     </div>
//   );
// }

// export default function ReverseImageSearchCard({
//   data,
// }: Props) {
//   const matchesFound = Boolean(data?.matches_found);

//   return (
//     <div className="bg-[#050816] border border-[#1b2a41] rounded-2xl p-5 md:p-6">
//       {/* HEADER */}
//       <div className="flex items-start justify-between gap-4 mb-6">
//         <div className="flex items-center gap-3">
//           <div className="w-11 h-11 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
//             <Search size={21} />
//           </div>

//           <div>
//             <p className="text-[10px] uppercase tracking-[0.2em] text-[#8191b1] font-mono">
//               Open Source Intelligence
//             </p>

//             <h2 className="font-serif text-2xl font-bold text-white mt-1">
//               Reverse Image Search
//             </h2>
//           </div>
//         </div>

//         <div
//           className={`px-3 py-2 rounded-lg border text-xs font-semibold flex items-center gap-2 ${
//             matchesFound
//               ? "bg-yellow-400/10 border-yellow-400/30 text-yellow-400"
//               : "bg-emerald-400/10 border-emerald-400/30 text-emerald-400"
//           }`}
//         >
//           {matchesFound ? (
//             <AlertTriangle size={15} />
//           ) : (
//             <CheckCircle2 size={15} />
//           )}

//           {matchesFound ? "MATCHES FOUND" : "NO MATCHES"}
//         </div>
//       </div>

//       {/* METRICS */}
//       <div className="grid md:grid-cols-2 gap-4">
//         <MetricCard
//           title="Matches Found"
//           value={matchesFound ? "Yes" : "No"}
//           icon={<Search size={16} />}
//           color={matchesFound ? "text-yellow-400" : "text-emerald-400"}
//         />

//         <MetricCard
//           title="Source Platform"
//           value={data?.source_platform || "Unknown"}
//           icon={<Globe2 size={16} />}
//           color="text-sky-400"
//         />

//         <MetricCard
//           title="Match Confidence"
//           value={`${data?.confidence ?? 0}%`}
//           icon={<BadgeCheck size={16} />}
//           color="text-[#19e6d2]"
//         />

//         <MetricCard
//           title="Image Hash"
//           value={data?.image_hash}
//           icon={<Hash size={16} />}
//           color="text-violet-400"
//           breakWord
//         />
//       </div>
//     </div>
//   );
// }

"use client";

import {
  Search,
  Globe2,
  BadgeCheck,
  Hash,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

import ForensicMetric from "./ForensicMetric";

interface Props {
  data: any;
}

export default function ReverseImageSearchCard({ data }: Props) {
  const matchFound = Boolean(data?.matches_found);
  const confidence = Number(data?.confidence || 0);

  return (
    <div className="bg-[#050816] border border-[#1b2a41] rounded-2xl overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.22)]">
      <div className="h-1 bg-sky-400" />

      <div className="p-5 md:p-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-sky-400/10 border border-sky-400/20 flex items-center justify-center">
              <Search size={21} className="text-sky-400" />
            </div>

            <div>
              <p className="text-[12px] uppercase tracking-[0.2em] text-[#8191b1]">
                Open Source Intelligence
              </p>

              <h2 className="font-serif text-2xl font-bold text-white mt-1">
                Reverse Image Search
              </h2>
            </div>
          </div>

          <div
            className={`px-3 py-2 rounded-lg border text-xs font-semibold flex items-center gap-2 ${
              matchFound
                ? "bg-yellow-400/10 border-yellow-400/30 text-yellow-400"
                : "bg-emerald-400/10 border-emerald-400/30 text-emerald-400"
            }`}
          >
            {matchFound ? <AlertTriangle size={15} /> : <CheckCircle2 size={15} />}

            {matchFound ? "ONLINE MATCH FOUND" : "NO ONLINE MATCH"}
          </div>
        </div>

        {/* <div className="bg-[#08111f] border border-[#1b2a41] rounded-xl p-4 mb-5">
          <div className="flex items-center justify-between">
            <p className="text-[10px] uppercase tracking-[0.18em] text-[#8191b1] font-mono">
              Match Confidence
            </p>

            <p className="text-sm font-semibold text-sky-400">
              {confidence.toFixed(1)}%
            </p>
          </div>

          <div className="mt-3 h-2 bg-[#111d31] rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-sky-400"
              style={{ width: `${Math.min(confidence, 100)}%` }}
            />
          </div>
        </div> */}

        <div className="grid sm:grid-cols-2 gap-4">
          <ForensicMetric
            label="Match Status"
            value={matchFound ? "Matches Found" : "No Matches"}
            icon={<Search size={18} />}
            tone={matchFound ? "yellow" : "green"}
          />

          <ForensicMetric
            label="Source Platform"
            value={data?.source_platform || "Unknown"}
            icon={<Globe2 size={18} />}
            tone="blue"
          />

          <ForensicMetric
            label="Confidence"
            value={`${confidence}%`}
            icon={<BadgeCheck size={18} />}
            tone="cyan"
          />

          <ForensicMetric
            label="Image Hash"
            value={data?.image_hash}
            icon={<Hash size={18} />}
            tone="purple"
            small
          />
        </div>
      </div>
    </div>
  );
}