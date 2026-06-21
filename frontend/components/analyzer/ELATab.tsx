// "use client";

// interface Props {
//   ela: any;
//   originalImage?: string;
// }

// export default function ELATab({
//   ela,
//   originalImage,
// }: Props) {
//   return (
//     <div className="space-y-4">

//       {/* IMAGE COMPARISON */}
//       <div className="grid md:grid-cols-2 gap-4">

//         {/* ORIGINAL */}
//         <div className="bg-[#15233f] rounded-xl overflow-hidden border border-[#243554]">
//           <div className="px-4 py-3 border-b border-[#243554]">
//             <p className="text-[10px] tracking-[3px] uppercase text-zinc-500">
//               Original
//             </p>
//           </div>
//           <div className="p-4 flex items-center justify-center h-[300px]">
//             <img
//               src={originalImage}
//               alt="Original"
//               className="
//                 max-h-full
//                 object-contain
//                 rounded-lg
//               "
//             />
//           </div>
//         </div>

//         {/* ELA */}
//         <div className="bg-[#15233f] rounded-xl overflow-hidden border border-[#243554]">
//           <div className="px-4 py-3 border-b border-[#243554]">
//             <p className="text-[10px] tracking-[3px] uppercase text-zinc-500">
//               ELA Map
//             </p>
//           </div>
//           <div className="p-4 flex items-center justify-center h-[300px]">
//             <img
//               src={`http://127.0.0.1:8000/${ela?.ela_image}`}
//               alt="ELA"
//               className="
//                 max-h-full
//                 object-contain
//                 rounded-lg
//               "
//             />
//           </div>
//         </div>
//       </div>

//       {/* METRICS */}
//       <div className="grid md:grid-cols-3 gap-4">
//         <MetricCard
//           title="ELA Score"
//           value={ela?.ela_score}
//         />
//         <MetricCard
//           title="ELA Mean"
//           value={ela?.ela_mean}
//         />
//         <MetricCard
//           title="ELA Std Dev"
//           value={ela?.ela_std}
//         />
//         <MetricCard
//           title="ELA Max"
//           value={ela?.ela_max}
//         />
//         <MetricCard
//           title="ELA Risk"
//           value={ela?.ela_risk}
//         />
//         <MetricCard
//           title="Anomaly Detected"
//           value={
//             ela?.ela_anomaly_detected
//               ? "✓ Yes"
//               : "✓ No"
//           }
//         />
//       </div>

//       {/* FINDINGS */}
//       {ela?.reasons?.length > 0 && (
//         <div className="bg-[#15233f] rounded-xl p-4">
//           <h3 className="text-cyan-400 font-semibold mb-2">
//             Forensic Findings
//           </h3>
//           <div className="space-y-2">
//             {ela.reasons.map(
//               (
//                 reason: string,
//                 index: number
//               ) => (
//                 <div
//                   key={index}
//                   className="
//                     bg-red-500/10
//                     border
//                     border-red-500/20
//                     rounded-xl
//                     p-2
//                     text-red-300
//                   "
//                 >
//                   {reason}
//                 </div>
//               )
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// function MetricCard({
//   title,
//   value,
// }: {
//   title: string;
//   value: any;
// }) {
//   return (
//     <div className="bg-[#15233f] rounded-xl p-4">

//       <p
//         className="
//         text-[10px]
//         uppercase
//         tracking-[3px]
//         text-zinc-500
//         mb-2
//         "
//       >
//         {title}
//       </p>

//       <p className="text-xl font-semibold text-white">
//         {value ?? "—"}
//       </p>

//     </div>
//   );
// }

"use client";

import {
  Image as ImageIcon,
  ScanSearch,
  Activity,
  AlertTriangle,
  CheckCircle2,
  ShieldAlert,
} from "lucide-react";

interface Props {
  ela: any;
  originalImage?: string;
}

function MetricCard({
  title,
  value,
  icon,
  tone = "cyan",
}: {
  title: string;
  value: any;
  icon: React.ReactNode;
  tone?: "cyan" | "green" | "yellow" | "red";
}) {
  const toneStyles = {
    cyan: "text-[#19e6d2] bg-[#19e6d2]/10 border-[#19e6d2]/20",
    green: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
    yellow: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
    red: "text-red-400 bg-red-400/10 border-red-400/20",
  };

  return (
    <div
      className="
        bg-[#0a1323]
        border
        border-[#1b2a41]
        rounded-2xl
        p-4
        min-h-[100px]
        transition
        hover:border-[#2a4b67]
      "
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p
            className="
              text-[12px]
              uppercase
              tracking-[0.18em]
              text-[#7e91b8]
            "
          >
            {title}
          </p>

          <p className="text-2xl font-bold text-white mt-2 break-words">
            {value ?? "—"}
          </p>
        </div>

        <div
          className={`
            w-10 h-10 rounded-xl border
            flex items-center justify-center shrink-0
            ${toneStyles[tone]}
          `}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}

function EvidenceImageCard({
  title,
  subtitle,
  src,
  alt,
  icon,
}: {
  title: string;
  subtitle: string;
  src?: string;
  alt: string;
  icon: React.ReactNode;
}) {
  return (
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
          px-5 py-4
          border-b border-[#1b2a41]
          flex items-center justify-between gap-3
        "
      >
        <div>
          <p
            className="
              text-[12px]
              uppercase
              tracking-[0.18em]
              text-[#7e91b8]
            "
          >
            {title}
          </p>

          <p className="text-sm text-slate-300 mt-1">
            {subtitle}
          </p>
        </div>

        <div
          className="
            w-10 h-10 rounded-xl
            bg-[#19e6d2]/10
            border border-[#19e6d2]/20
            text-[#19e6d2]
            flex items-center justify-center
          "
        >
          {icon}
        </div>
      </div>

      <div
        className="
          p-4
          h-[260px]
          sm:h-[320px]
          lg:h-[360px]
          flex
          items-center
          justify-center
          bg-[#0a1323]
        "
      >
        {src ? (
          <img
            src={src}
            alt={alt}
            className="
              max-w-full
              max-h-full
              object-contain
              rounded-xl
              border
              border-[#1b2a41]
            "
          />
        ) : (
          <div className="text-center text-[#7e91b8]">
            <ImageIcon
              size={34}
              className="mx-auto mb-3"
            />
            <p className="text-sm">Image preview unavailable</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ELATab({
  ela,
  originalImage,
}: Props) {
  const anomalyDetected = Boolean(ela?.ela_anomaly_detected);

  const risk = String(ela?.ela_risk || "UNKNOWN").toUpperCase();

  const riskTone =
    risk === "HIGH"
      ? "red"
      : risk === "MEDIUM"
      ? "yellow"
      : "green";

  return (
    <div className="space-y-4">
      {/* ELA HEADER */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 border-b border-[#1b2a41] pb-6">
        <div className="flex items-center gap-4">
          <div
            className="
              w-12 h-12 rounded-2xl
              bg-[#19e6d2]/10
              border border-[#19e6d2]/20
              flex items-center justify-center
            "
          >
            <ScanSearch
              size={23}
              className="text-[#19e6d2]"
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
              Tampering Detection
            </p>

            <h2 className="text-2xl md:text-3xl font-bold mt-2">
              Error Level Analysis
            </h2>

            <p className="text-sm text-[#7e91b8]">
              Compare the original evidence with its compression anomaly map.
            </p>
          </div>
        </div>

        <div
          className={`
            px-4 py-3 rounded-xl border flex items-center gap-3
            ${
              anomalyDetected
                ? "bg-red-400/10 border-red-400/20"
                : "bg-emerald-400/10 border-emerald-400/20"
            }
          `}
        >
          {anomalyDetected ? (
            <ShieldAlert
              size={20}
              className="text-red-400"
            />
          ) : (
            <CheckCircle2
              size={20}
              className="text-emerald-400"
            />
          )}

          <div>
            <p
              className="
                text-[10px]
                uppercase
                tracking-[0.18em]
                text-[#7e91b8]
              "
            >
              Integrity Signal
            </p>

            <p
              className={`
                text-sm font-bold mt-1
                ${
                  anomalyDetected
                    ? "text-red-400"
                    : "text-emerald-400"
                }
              `}
            >
              {anomalyDetected
                ? "Anomaly Detected"
                : "No Major Anomaly"}
            </p>
          </div>
        </div>
      </div>

      {/* ORIGINAL + ELA MAP */}
      <div className="grid lg:grid-cols-2 gap-5">
        <EvidenceImageCard
          title="Original Evidence"
          subtitle="Uploaded image under investigation"
          src={originalImage}
          alt="Original evidence"
          icon={<ImageIcon size={20} />}
        />

        <EvidenceImageCard
          title="ELA Map"
          subtitle="Compression-level anomaly visualization"
          src={
            ela?.ela_image
              ? `http://127.0.0.1:8000/${ela.ela_image}`
              : undefined
          }
          alt="ELA analysis map"
          icon={<ScanSearch size={20} />}
        />
      </div>

      {/* METRICS */}
      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
        <MetricCard
          title="ELA Score"
          value={ela?.ela_score}
          icon={<Activity size={19} />}
          tone="cyan"
        />
        <MetricCard
          title="ELA Mean"
          value={ela?.ela_mean}
          icon={<Activity size={19} />}
          tone="cyan"
        />
        <MetricCard
          title="ELA Std Deviation"
          value={ela?.ela_std}
          icon={<Activity size={19} />}
          tone="cyan"
        />
        <MetricCard
          title="ELA Maximum"
          value={ela?.ela_max}
          icon={<Activity size={19} />}
          tone="yellow"
        />
        <MetricCard
          title="ELA Risk Level"
          value={risk}
          icon={<AlertTriangle size={19} />}
          tone={riskTone}
        />
        <MetricCard
          title="Anomaly Detection"
          value={anomalyDetected ? "Detected" : "Not Detected"}
          icon={
            anomalyDetected ? (
              <ShieldAlert size={19} />
            ) : (
              <CheckCircle2 size={19} />
            )
          }
          tone={anomalyDetected ? "red" : "green"}
        />
      </div>

      {/* FINDINGS */}
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
              tracking-[0.18em]
              text-[#7e91b8]
            "
          >
            Forensic Findings
          </p>

          <p className="text-sm text-slate-300 mt-1">
            ELA-based compression and manipulation indicators.
          </p>
        </div>

        <div className="p-4 space-y-4">
          {ela?.reasons?.length > 0 ? (
            ela.reasons.map(
              (reason: string, index: number) => (
                <div
                  key={index}
                  className={`
                    flex items-start gap-3
                    rounded-xl p-4 border
                    ${
                      anomalyDetected
                        ? "bg-red-400/10 border-red-400/20"
                        : "bg-[#0a1323] border-[#1b2a41]"
                    }
                  `}
                >
                  <span
                    className={`
                      mt-0.5
                      ${
                        anomalyDetected
                          ? "text-red-400"
                          : "text-[#19e6d2]"
                      }
                    `}
                  >
                    •
                  </span>

                  <p className="text-sm leading-6 text-slate-300">
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
                rounded-xl p-4
                text-emerald-300
                text-sm
              "
            >
              No significant compression anomalies were reported.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}