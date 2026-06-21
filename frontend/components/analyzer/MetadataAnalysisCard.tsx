// "use client";

// import MetadataItem from "./MetadataItem";

// interface MetadataAnalysisCardProps {
//   metadata: Record<string, any>;
//   status?: string;
//   riskLevel?: string;
//   threatScore?: number;
//   onDownloadReport?: () => void;
// }

// export default function MetadataAnalysisCard({
//   metadata,
//   status,
//   riskLevel,
//   threatScore,
// }: MetadataAnalysisCardProps) {
//   return (
//     <div>
//       <div className="flex items-center justify-between mb-4">
//         <div>
//           <p className="text-zinc-400 uppercase tracking-widest text-xs mb-2">
//             Intelligence Data
//           </p>
//           <h2 className="text-3xl font-black">
//             Metadata Analysis
//           </h2>
//         </div>
//         <div className="bg-blue-500/10 border border-blue-500/20 text-blue-400 px-4 py-2 rounded-2xl font-semibold">
//           {Object.keys(metadata || {}).length} Fields
//         </div>
//       </div>

//       <div
//         className="
//         max-h-[650px]
//         overflow-y-auto
//         pr-2
//         "
//       >
//         <div
//           className="
//           grid
//           md:grid-cols-2
//           gap-3
//           "
//         >
//           <MetadataItem
//             label="Filename"
//             value={metadata["File Name"]}
//           />
//           <MetadataItem
//             label="Status"
//             value={status}
//           />
//           <MetadataItem
//             label="Risk Level"
//             value={riskLevel}
//           />
//           <MetadataItem
//             label="Threat Score"
//             value={threatScore}
//           />
//           <MetadataItem
//             label="File Size (KB)"
//             value={metadata["File Size (KB)"]}
//           />
//           <MetadataItem
//             label="Image Width"
//             value={metadata["Image Width"]}
//           />
//           <MetadataItem
//             label="Image Height"
//             value={metadata["Image Height"]}
//           />
//             <MetadataItem
//               label="SHA256 Hash"
//               value={metadata["SHA256 Hash"]}
//             />
//           <MetadataItem
//             label="File Format"
//             value={metadata["File Type"]}
//           />
//           <MetadataItem
//             label="Dimensions"
//             value={`${metadata["Image Width"] || "-"} × ${
//               metadata["Image Height"] || "-"
//             }`}
//           />
//           {/* <MetadataItem
//             label="Color Mode"
//             value={metadata["Color Mode"]}
//           />
//           <MetadataItem
//             label="Camera Make"
//             value={metadata["Make"]}
//           />
//           <MetadataItem
//             label="Camera Model"
//             value={metadata["Model"]}
//           />
//           <MetadataItem
//             label="Software"
//             value={metadata["Software"]}
//           />
//           <MetadataItem
//             label="Date Taken"
//             value={metadata["DateTime"]}
//           />
//           <MetadataItem
//             label="GPS Latitude"
//             value={metadata["GPS Latitude"]}
//           />
//           <MetadataItem
//             label="GPS Longitude"
//             value={metadata["GPS Longitude"]}
//           />
//           <MetadataItem
//             label="ISO Speed"
//             value={metadata["ISO"]}
//           />
//           <MetadataItem
//             label="Focal Length"
//             value={metadata["FocalLength"]}
//           />
//           <MetadataItem
//             label="Flash"
//             value={metadata["Flash"]}
//           /> */}
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import {
  Database,
  FileText,
  Hash,
  ImageIcon,
  ShieldCheck,
  ScanLine,
} from "lucide-react";

import MetadataItem from "./MetadataItem";

interface MetadataAnalysisCardProps {
  metadata: Record<string, any>;
  status?: string;
  riskLevel?: string;
  threatScore?: number;
  onDownloadReport?: () => void;
}

export default function MetadataAnalysisCard({
  metadata,
  status,
  riskLevel,
  threatScore,
}: MetadataAnalysisCardProps) {
  const fieldCount = Object.keys(metadata || {}).length;

  const normalizedRisk = (riskLevel || "UNKNOWN").toUpperCase();

  const riskTone =
    normalizedRisk === "HIGH"
      ? "red"
      : normalizedRisk === "MEDIUM"
      ? "yellow"
      : normalizedRisk === "LOW"
      ? "green"
      : "default";

  const statusTone =
    status?.toLowerCase().includes("suspicious") ||
    status?.toLowerCase().includes("corrupted") ||
    status?.toLowerCase().includes("invalid")
      ? "red"
      : "green";

  return (
    <div className="space-y-6">
      {/* HEADER */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 border-b border-[#1b2a41] pb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#19e6d2]/10 border border-[#19e6d2]/20 flex items-center justify-center">
            <Database className="text-[#19e6d2]" size={22} />
          </div>

          <div>
            <p className="text-[12px] uppercase tracking-[0.25em] text-[#7e91b8]">
              Evidence Intelligence
            </p>
            <h2 className="text-2xl md:text-3xl font-bold mt-2">
              Metadata Analysis
            </h2>
            <p className="text-sm text-[#7e91b8] mt-1">
              File properties, integrity information, and source metadata.
            </p>
          </div>
        </div>

        <div className="bg-[#0a1323] border border-[#1b2a41] rounded-xl px-4 py-3 flex items-center gap-3">
          <ScanLine className="text-[#19e6d2]" size={18} />

          <div>
            <p className=" text-[10px] uppercase tracking-[0.18em] text-[#7e91b8]">
              Extracted Fields
            </p>
            <p className="text-lg font-bold text-[#19e6d2]">
              {fieldCount}
            </p>
          </div>
        </div>
      </div>

      {/* PRIMARY FORENSIC SUMMARY */}
      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
        <MetadataItem
          label="Investigation Status"
          value={status}
          tone={statusTone}
        />
        <MetadataItem
          label="Risk Level"
          value={normalizedRisk}
          tone={riskTone}
        />
        <MetadataItem
          label="Threat Score"
          value={`${threatScore ?? 0} / 100`}
          tone={
            (threatScore ?? 0) >= 70
              ? "red"
              : (threatScore ?? 0) >= 40
              ? "yellow"
              : "green"
          }
        />
        <MetadataItem
          label="Evidence Integrity"
          value="Verified"
          tone="green"
        />
      </div>

      {/* FILE INFORMATION */}
      <div className="bg-[#060b16] border border-[#1b2a41] rounded-2xl overflow-hidden">
        <div className="px-5 py-4 border-b border-[#1b2a41] flex items-center gap-3">
          <FileText className="text-[#19e6d2]" size={19} />
          <div>
            <p className="text-[12px] uppercase tracking-[0.2em] text-[#7e91b8]">
              File Information
            </p>
            <p className="text-sm text-slate-300 mt-1">
              Core evidence file properties
            </p>
          </div>
        </div>

        <div className="p-4 grid md:grid-cols-2 gap-4">
          <MetadataItem
            label="Filename"
            value={metadata?.["File Name"]}
          />
          <MetadataItem
            label="File Size"
            value={
              metadata?.["File Size (KB)"]
                ? `${metadata["File Size (KB)"]} KB`
                : "—"
            }
          />
          <MetadataItem
            label="File Format"
            value={metadata?.["File Type"]}
          />
          <MetadataItem
            label="Dimensions"
            value={`${metadata?.["Image Width"] || "—"} × ${
              metadata?.["Image Height"] || "—"
            } px`}
          />
          <MetadataItem
            label="Image Width"
            value={
              metadata?.["Image Width"]
                ? `${metadata["Image Width"]} px`
                : "—"
            }
          />
          <MetadataItem
            label="Image Height"
            value={
              metadata?.["Image Height"]
                ? `${metadata["Image Height"]} px`
                : "—"
            }
          />
        </div>
      </div>

      {/* HASH / INTEGRITY */}
      <div className="bg-[#060b16] border border-[#1b2a41] rounded-2xl overflow-hidden">
        <div className="px-5 py-4 border-b border-[#1b2a41] flex items-center gap-3">
          <Hash className="text-[#19e6d2]" size={19} />
          <div>
            <p className="text-[12px] uppercase tracking-[0.2em] text-[#7e91b8]">
              Evidence Integrity
            </p>
            <p className="text-sm text-slate-300 mt-1">
              Cryptographic identity verification
            </p>
          </div>
        </div>
        <div className="p-4">
          <MetadataItem
            label="SHA256 Hash"
            value={metadata?.["SHA256 Hash"]}
            mono
            tone="cyan"
          />
        </div>
      </div>

      {/* OPTIONAL CAMERA / EXIF SECTION */}
      {(metadata?.["Make"] ||
        metadata?.["Model"] ||
        metadata?.["Software"] ||
        metadata?.["DateTime"] ||
        metadata?.["GPS Latitude"]) && (
        <div className="bg-[#060b16] border border-[#1b2a41] rounded-2xl overflow-hidden">
          <div className="px-5 py-4 border-b border-[#1b2a41] flex items-center gap-3">
            <ImageIcon className="text-[#19e6d2]" size={19} />
            <div>
              <p className="text-[12px] uppercase tracking-[0.2em] text-[#7e91b8]">
                Camera & EXIF Metadata
              </p>
              <p className="text-sm text-slate-300 mt-1">
                Device, capture, and geolocation information
              </p>
            </div>
          </div>
          <div className="p-5 grid md:grid-cols-2 gap-4">
            <MetadataItem
              label="Camera Make"
              value={metadata?.["Make"]}
            />
            <MetadataItem
              label="Camera Model"
              value={metadata?.["Model"]}
            />
            <MetadataItem
              label="Software"
              value={metadata?.["Software"]}
            />
            <MetadataItem
              label="Date Taken"
              value={metadata?.["DateTime"]}
            />
            <MetadataItem
              label="GPS Latitude"
              value={metadata?.["GPS Latitude"]}
              mono
            />
            <MetadataItem
              label="GPS Longitude"
              value={metadata?.["GPS Longitude"]}
              mono
            />
            <MetadataItem
              label="ISO Speed"
              value={metadata?.["ISO"]}
            />
            <MetadataItem
              label="Focal Length"
              value={metadata?.["FocalLength"]}
            />
          </div>
        </div>
      )}

      {/* FOOTER STATUS */}
      <div className="flex items-center gap-3 text-sm text-[#7e91b8]">
        <ShieldCheck className="text-emerald-400" size={18} />
        <span>
          Metadata extraction completed. Values shown are derived from the uploaded evidence file.
        </span>
      </div>
    </div>
  );
}