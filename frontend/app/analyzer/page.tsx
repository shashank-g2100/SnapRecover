// "use client"

// import { motion } from "framer-motion";
// import axios from "axios"
// import { useState } from "react"
// import {
//   Upload,
//   Shield,
//   ImageIcon,
//   FileSearch,
//   History,
//   AlertTriangle,
//   CheckCircle2,
//   Camera, Monitor, Palette, ScanLine, Bot,
// } from "lucide-react"
// import Sidebar from "@/components/sidebar"
// import Header from "@/components/Header"
// import AIAnalysisCard from "@/components/analysis/AIAnalysisCard"
// import OCRAnalysis from "@/components/analysis/OCRAnalysis"
// import ELAAnalysisCard from "@/components/analyzer/ELAAnalysis"
// import MetadataAnalysisCard from "@/components/analyzer/MetadataAnalysisCard"
// import ThreatIndicatorsCard from "@/components/analysis/ThreatIndicatorsCard"
// import ThreatSummaryCard from "@/components/analysis/ThreatSummaryCard"
// import InvestigationResultCard from "@/components/analysis/InvestigationResultCard"
// import CompressionAnalysisCard from "@/components/analysis/CompressionAnalysisCard"
// import CorruptionAnalysisCard from "@/components/analysis/CorruptionAnalysisCard"
// import AdvancedFaceForensicsCard from "@/components/analysis/AdvancedFaceForensicsCard"
// import ReverseImageSearchCard from "@/components/analysis/ReverseImageSearchCard"
// import SourceAttributionCard from "@/components/analysis/SourceAttributionCard"
// import ChainOfCustodyCard from "@/components/analysis/ChainOfCustodyCard"
// import SummaryCards from "@/components/analyzer/SummaryCards"
// import CaseBanner from "@/components/analyzer/CaseBanner"
// import AIAnalysisTab from "@/components/analyzer/AIAnalysisTab";

// export default function Home() {

//   const [file, setFile] = useState<File | null>(null)
//   const [result, setResult] = useState<any>(null)
//   const [preview, setPreview] = useState<string>("")
//   const [loading, setLoading] = useState(false)
//   const [analysisStep, setAnalysisStep] =
//     useState("")
//   const [progress, setProgress] =
//     useState(0)
//   const [showOverlay, setShowOverlay] =
//     useState(false)

//   const uploadImage = async () => {
//     if (!file) return
//     setLoading(true)
//     setShowOverlay(true)
//     setProgress(0)

//     const formData = new FormData()
//     formData.append(
//       "file",
//       file
//     )

//     const steps = [
//       "Uploading Evidence",
//       "Extracting Metadata",
//       "Running OCR Analysis",
//       "Generating ELA",
//       "AI Forensics",
//       "Compression Analysis",
//       "Corruption Analysis",
//       "Threat Assessment",
//       "Generating Report",
//       "Saving Investigation"
//     ]

//     let currentStep = 0
//     const interval =
//       setInterval(() => {
//         if (
//           currentStep <
//           steps.length
//         ) {
//           setAnalysisStep(
//             steps[currentStep]
//           )
//           setProgress(
//             ((currentStep + 1)
//             / steps.length) * 100
//           )
//           currentStep++
//         }
//       }, 800)

//     try {
//       const response =
//         await axios.post(
//           "http://127.0.0.1:8000/upload",
//           formData
//         )
//       clearInterval(interval)
//       setProgress(100)
//       setAnalysisStep(
//         "Analysis Complete"
//       )
//       setTimeout(() => {
//         setResult(
//           response.data
//         )
//         setShowOverlay(false)
//       }, 1000)
//     } catch (error) {
//       clearInterval(interval)
//       console.log(error)
//       alert(
//         "Failed to analyze image."
//       )
//       setShowOverlay(false)
//     } finally {
//       setLoading(false)
//     }
//   }

//   const [activeTab, setActiveTab] =
//     useState("overview");

//   const tabs = [
//     // {
//     //   id: "overview",
//     //   label: "Overview",
//     // },
//     {
//       id: "metadata",
//       label: "Metadata",
//     },
//     {
//       id: "ocr",
//       label: "OCR",
//     },
//     {
//       id: "ela",
//       label: "ELA",
//     },
//     {
//       id: "ai",
//       label: "AI Analysis",
//     },
//     {
//       id: "forensics",
//       label: "Forensics",
//     },
//     {
//       id: "chain",
//       label: "Chain Of Custody",
//     },
//   ];

//   const isDanger =
//     result?.status?.includes("Suspicious") ||
//     result?.status?.includes("Corrupted") ||
//     result?.status?.includes("Invalid") ||
//     result?.status?.includes("Malicious")

//   const isMedium =
//     result?.risk_level === "MEDIUM"

//   const statusColor =
//     isDanger
//       ? "text-red-400"
//       : isMedium
//       ? "text-yellow-400"
//       : "text-green-400"

//   const statusBg =
//     isDanger
//       ? "bg-red-500/10 border-red-500/20"
//       : isMedium
//       ? "bg-yellow-500/10 border-yellow-500/20"
//       : "bg-green-500/10 border-green-500/20"

//   const progressColor =
//     result?.threat_score >= 70
//       ? "bg-red-500"
//       : result?.threat_score >= 40
//       ? "bg-yellow-500"
//       : "bg-green-500"

//   // ====================================
//   // ADD THESE BELOW progressColor
//   // ====================================

//   // const aiScore = result?.ai_detection?.score || 0
//   const threatEngine =
//   result?.ai_detection?.threat_engine;

//   const aiScore =
//     threatEngine?.final_threat_score || 0;

//   const aiRisk =
//     threatEngine?.risk_level || "UNKNOWN";

//   const aiVerdict =
//     threatEngine?.verdict || "UNKNOWN";

//   const aiConfidence =
//     threatEngine?.confidence || 0;

//   const mediaType =
//     result?.ai_detection?.classification?.media_type;

//   const mediaLabel =
//     result?.ai_detection?.media_type_label ||
//     "Unknown";

//   const authenticity =
//     result?.ai_detection?.authenticity ||
//     "Unknown";

//   const aiMessage =
// 		result?.ai_detection?.message ||
// 		"Unknown Media"

//   const aiBadge =
// 		result?.ai_detection?.authenticity ||
// 		"Unknown"

// 	// const mediaType =
//   // 	result?.ai_detection?.media_type || "unknown"

//   const aiColor =
//   aiRisk === "HIGH"
//     ? "text-red-400"
//     : aiRisk === "MEDIUM"
//     ? "text-orange-400"
//     : "text-green-400";

//   const aiBorderColor =
//     aiRisk === "HIGH"
//       ? "border-red-500 text-red-400"
//       : aiRisk === "MEDIUM"
//       ? "border-orange-500 text-orange-400"
//       : "border-green-500 text-green-400";

//   const aiDetection =
//     result?.ai_detection;

// 	const handleReportDownload = async () => {
// 		try {
// 			await fetch(
// 				"http://127.0.0.1:8000/stats/report-generated",
// 				{
// 					method: "POST",
// 				}
// 			)

// 		} catch (error) {
// 			console.error(error)
// 		}

// 		window.open(
// 			`http://127.0.0.1:8000/download-report/${result.filename}`,
// 			"_blank"
// 		)
// 	}

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-black via-zinc-950 to-zinc-900 text-white flex">
//       <Sidebar />
//       {/* MAIN */}
//       <main className="flex-1 overflow-y-auto ml-[230px] pt-24">
        // <div
        //   className="
        //   max-w-7xl
        //   mx-auto
        //   px-6
        //   "
        // >
        //   <div
        //     className="
        //     sticky
        //     top-0
        //     z-20
        //     bg-[#081221]
        //     border-b
        //     border-zinc-800
        //     "
        //   >
        //     <Header
        //       title="Analyzer"
        //       subtitle="Evidence Analysis"
        //     />
        //   </div>
//           {/* HERO */}
//           <div className="mb-12">
//             <p className="text-blue-400 uppercase tracking-[0.3em] text-sm mb-3">
//               Evidence Analysis Engine
//             </p>
//             <h1 className="text-5xl md:text-6xl font-black leading-tight max-w-4xl">
//               Digital Forensic
//               <span className="text-blue-500"> Investigation Console</span>
//             </h1>
//             <p className="text-zinc-400 text-lg mt-6 max-w-2xl">
//               Analyze screenshots and images for metadata anomalies,
//               tampering evidence, compression artifacts, and forensic indicators.
//             </p>
//           </div>

//           {/* UPLOAD SECTION */}
//           <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl">
//             <div className="border-2 border-dashed border-zinc-700 hover:border-blue-500 transition-all duration-300 rounded-3xl p-6 text-center">
//               {/* ICON */}
//               <div className="w-20 h-20 rounded-full bg-blue-500/10 flex items-center justify-center mx-auto mb-5">
//                 <Upload className="text-blue-400" size={28} />
//               </div>
//               {/* TITLE */}
//               <h2 className="text-2xl font-bold mb-3">
//                 Upload Evidence
//               </h2>
//               <p className="text-zinc-400 mb-6">
//                 Supported formats: PNG, JPG, JPEG, WEBP
//               </p>
//               {/* CUSTOM FILE INPUT */}
//               <label className="cursor-pointer block max-w-xl mx-auto mb-8">
//                 <div className="bg-zinc-900 border border-zinc-800 hover:border-blue-500 transition-all duration-300 rounded-2xl px-6 py-5 flex items-center justify-between gap-4">
//                   {/* LEFT */}
//                   <div className="flex items-center gap-4">
//                     <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
//                       <ImageIcon className="text-blue-400" size={22} />
//                     </div>
//                     <div className="text-left">
//                       <h2 className="font-semibold text-white">
//                         Choose Evidence File
//                       </h2>
//                       <p className="text-sm text-zinc-400">
//                         Click to browse your device
//                       </p>
//                     </div>
//                   </div>

//                   {/* RIGHT */}
//                   <div className="text-sm text-zinc-400 max-w-[180px] truncate">
//                     {
//                       file
//                         ? file.name
//                         : "No file selected"
//                     }
//                   </div>
//                 </div>
//                 <input
//                   type="file"
//                   className="hidden"
//                   onChange={(e) => {
//                     if (e.target.files) {
//                       const selectedFile = e.target.files[0]
//                       setFile(selectedFile)
//                       setPreview(URL.createObjectURL(selectedFile))
//                     }
//                   }}
//                 />
//               </label>
//               {/* IMAGE PREVIEW */}
//               {
//                 preview && (
//                   <div className="mb-8">
//                     <img
//                       src={preview}
//                       alt="Preview"
//                       className="w-full max-w-md mx-auto rounded-3xl border border-zinc-700 shadow-2xl"
//                     />
//                   </div>
//                 )
//               }
//               {/* BUTTON */}
//               <button
//                 onClick={uploadImage}
//                 className="bg-blue-600 hover:bg-blue-700 transition-all duration-300 px-5 py-2 rounded-2xl font-bold text-lg shadow-lg hover:scale-105">
//                 {
//                   loading
//                     ? "Analyzing Evidence..."
//                     : "Upload & Analyze"
//                 }
//               </button>
//             </div>
//           </div>

//           {
//             showOverlay && (
//               <div
//                 className="
//                 fixed
//                 inset-0
//                 bg-black/80
//                 backdrop-blur-sm
//                 z-50
//                 flex
//                 items-center
//                 justify-center
//                 "
//               >
//                 <div
//                   className="
//                   bg-zinc-900
//                   border
//                   border-zinc-700
//                   rounded-3xl
//                   p-8
//                   w-[500px]
//                   "
//                 >
//                   <h2
//                     className="
//                     text-2xl
//                     font-bold
//                     mb-6
//                     text-center
//                     "
//                   >
//                     Analyzing Evidence
//                   </h2>
//                   <div
//                     className="
//                     text-blue-400
//                     text-center
//                     mb-6
//                     "
//                   >
//                     {analysisStep}
//                   </div>
//                   <div
//                     className="
//                     w-full
//                     h-4
//                     bg-zinc-800
//                     rounded-full
//                     overflow-hidden
//                     "
//                   >
//                     <div
//                       className="
//                       h-full
//                       bg-blue-500
//                       transition-all
//                       duration-500
//                       "
//                       style={{
//                         width: `${progress}%`
//                       }}
//                     />
//                   </div>
//                   <div
//                     className="
//                     text-center
//                     mt-4
//                     text-zinc-400
//                     "
//                   >
//                     {Math.round(progress)}%
//                   </div>
//                   <div className="mt-6 space-y-2">
//                     {progress >= 10 && (
//                       <div className="text-green-400">
//                         ✓ Metadata Extraction
//                       </div>
//                     )}

//                     {progress >= 25 && (
//                       <div className="text-green-400">
//                         ✓ OCR Processing
//                       </div>
//                     )}

//                     {progress >= 40 && (
//                       <div className="text-green-400">
//                         ✓ ELA Generation
//                       </div>
//                     )}

//                     {progress >= 60 && (
//                       <div className="text-green-400">
//                         ✓ AI Detection
//                       </div>
//                     )}

//                     {progress >= 80 && (
//                       <div className="text-green-400">
//                         ✓ Threat Analysis
//                       </div>
//                     )}

//                     {progress >= 100 && (
//                       <div className="text-green-400">
//                         ✓ PDF Report Creation
//                       </div>
//                     )}

//                   </div>
//                 </div>
//               </div>
//             )
//           }

//           {/* RESULTS */}
//           {
//             result && (
//               <motion.div
//                 initial={{
//                   opacity: 0,
//                   y: 30
//                 }}
//                 animate={{
//                   opacity: 1,
//                   y: 0
//                 }}
//                 transition={{
//                   duration: 0.5
//                 }}
//               >
//                 <div
//                   className="
//                   bg-[#0c1529]
//                   border
//                   border-[#1b2c52]
//                   rounded-3xl
//                   p-8
//                   mt-6
//                   "
//                 >
//                   <div className="flex items-center gap-6 mb-8">
//                     <div
//                       className="
//                       px-6
//                       py-3
//                       rounded-xl
//                       border
//                       border-emerald-500/40
//                       bg-emerald-500/10
//                       "
//                     >
//                       <span className="text-emerald-400 font-bold">
//                         {result.status.toUpperCase()}
//                       </span>
//                     </div>

//                     <div className="flex-1">
//                       <p className="text-zinc-500 text-sm">
//                         Threat Score
//                       </p>
//                       <div className="flex items-center gap-3 mt-2">
//                         <div className="w-full h-2 bg-zinc-800 rounded-full">
//                           <div
//                             className="
//                             h-full
//                             rounded-full
//                             bg-cyan-400
//                             "
//                             style={{
//                               width: `${
//                                 threatEngine?.final_threat_score || 0
//                               }%`
//                             }}
//                           />

//                         </div>

//                         <span className="text-white font-semibold">
//                           {threatEngine?.final_threat_score || 0}/100
//                         </span>

//                         <span className="text-zinc-400">
//                           {threatEngine?.risk_level}
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                   <div
//                     className="
//                     flex
//                     gap-10
//                     border-b
//                     border-zinc-800
//                     mb-8
//                     overflow-x-auto
//                     "
//                   >
//                     {tabs.map((tab) => (
//                       <button
//                         key={tab.id}
//                         onClick={() =>
//                           setActiveTab(tab.id)
//                         }
//                         className={`
//                           pb-4
//                           whitespace-nowrap
//                           transition
//                           ${
//                             activeTab === tab.id
//                               ? "text-[#19e6d2] border-b-2 border-cyan-400"
//                               : "text-zinc-500"
//                           }
//                         `}
//                       >
//                         {tab.label}
//                       </button>
//                     ))}
//                   </div>
//                   <div className="min-h-[700px] mt-6">
//                     {
//                       activeTab === "overview" && (
//                         <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
//                           <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">
//                             <h2 className="text-2xl font-bold mb-5">
//                               Evidence Preview
//                             </h2>
//                             <img
//                               src={preview}
//                               className="
//                                 w-full
//                                 h-[500px]
//                                 object-contain
//                                 rounded-2xl
//                                 border
//                                 border-zinc-700
//                               "
//                             />
//                           </div>

//                           <InvestigationResultCard
//                             status={result.status}
//                             threatScore={
//                               threatEngine?.final_threat_score || 0
//                             }
//                             statusColor={statusColor}
//                             statusBg={statusBg}
//                             isDanger={isDanger}
//                             isMedium={isMedium}
//                           />

//                           <ThreatIndicatorsCard
//                             reasons={
//                               result?.risk_reasons || []
//                             }
//                           />

//                           <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
//                             <h2 className="text-2xl font-bold mb-5">
//                               Investigation Timeline
//                             </h2>
//                             <div className="space-y-3">
//                               <div>
//                                 ✅ Evidence Uploaded
//                               </div>
//                               <div>
//                                 ✅ Metadata Extracted
//                               </div>
//                               <div>
//                                 ✅ OCR Analysis Completed
//                               </div>
//                               <div>
//                                 ✅ ELA Generated
//                               </div>
//                               <div>
//                                 ✅ AI Analysis Completed
//                               </div>
//                               <div>
//                                 ✅ Report Generated
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       )
//                     }
//                     {
//                       activeTab === "metadata" && (
//                         <MetadataAnalysisCard
//                           metadata={result?.metadata || {}}
//                           status={result?.status}
//                           riskLevel={result?.risk_level}
//                           threatScore={
//                             threatEngine?.final_threat_score
//                           }
//                           onDownloadReport={
//                             handleReportDownload
//                           }
//                         />
//                       )
//                     }
//                     {
//                       activeTab === "ocr" && (
//                         <OCRAnalysis
//                           ocr={result?.ocr_text}
//                         />
//                       )
//                     }
//                     {
//                       activeTab === "ela" && (
//                         <ELAAnalysisCard
//                           ela={
//                             typeof result?.ela_image === "object"
//                               ? result.ela_image
//                               : {
//                                   ela_image: result?.ela_image,
//                                   ela_score: 0,
//                                   ela_mean: 0,
//                                   ela_std: 0,
//                                   ela_max: 0,
//                                   ela_risk: "Unknown",
//                                   reasons: [],
//                                 }
//                           }
//                           originalImage={preview}
//                         />
//                       )
//                     }
//                     {/* {
//                       activeTab === "ai" && (
//                         <AIAnalysisCard
//                           result={result}
//                           aiScore={aiScore}
//                           aiRisk={aiRisk}
//                           aiColor={aiColor}
//                           aiVerdict={aiVerdict}
//                           aiConfidence={aiConfidence}
//                           mediaType={mediaType}
//                           mediaLabel={mediaLabel}
//                           authenticity={authenticity}
//                           aiMessage={aiMessage}
//                           aiBadge={aiBadge}
//                           aiBorderColor={aiBorderColor}
//                           threatEngine={threatEngine}
//                         />
//                       )
//                     } */}
//                     {
//                       activeTab === "ai" && (
//                         <AIAnalysisTab
//                           ai={result?.ai_detection}
//                         />
//                       )
//                     }
//                     {
//                       activeTab === "forensics" && (
//                         <div className="grid md:grid-cols-2 gap-6">
//                           <CompressionAnalysisCard
//                             data={
//                               result?.ai_detection
//                                 ?.compression_forensics
//                             }
//                           />
//                           <CorruptionAnalysisCard
//                             data={
//                               result?.ai_detection
//                                 ?.corruption_forensics
//                             }
//                           />
//                           <AdvancedFaceForensicsCard
//                             data={
//                               result?.ai_detection
//                                 ?.advanced_face_forensics
//                             }
//                           />
//                           <ReverseImageSearchCard
//                             data={
//                               result?.ai_detection
//                                 ?.reverse_image_search
//                             }
//                           />
//                           <SourceAttributionCard
//                             data={
//                               result?.ai_detection
//                                 ?.source_attribution
//                             }
//                           />
//                         </div>
//                       )
//                     }
//                     {
//                       activeTab === "chain" && (
//                         <div className="space-y-6">
//                           <CaseBanner
//                             caseId={
//                               result?.ai_detection
//                                 ?.case_id
//                             }
//                             evidenceId={
//                               result?.ai_detection
//                                 ?.chain_of_custody
//                                 ?.evidence_id
//                             }
//                             analyst={
//                               result?.ai_detection
//                                 ?.chain_of_custody
//                                 ?.analyst
//                             }
//                             integrityVerified={
//                               result?.ai_detection
//                                 ?.chain_of_custody
//                                 ?.integrity_verified
//                             }
//                           />
//                           <ChainOfCustodyCard
//                             custody={
//                               result?.ai_detection
//                                 ?.chain_of_custody
//                             }
//                           />
//                         </div>
//                       )
//                     }
//                     <div className="flex gap-4 mt-6">
//                       <button
//                         onClick={handleReportDownload}
//                         className="
//                         px-6
//                         py-3
//                         rounded-xl
//                         bg-zinc-800
//                         hover:bg-zinc-700
//                         border
//                         border-zinc-700
//                         "
//                       >
//                         Download PDF Report
//                       </button>
//                       <button
//                         onClick={() =>
//                           window.location.reload()
//                         }
//                         className="
//                         px-6
//                         py-3
//                         rounded-xl
//                         border
//                         border-zinc-700
//                         "
//                       >
//                         New Analysis
//                       </button>
//                     </div>
//                   </div>
//               </div>
//             </motion.div>
//             )
//           }
//         </div>
//       </main>
//     </div>
//   )
// }


"use client";

import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { useEffect, useState } from "react";

import {
  Upload,
  ImageIcon,
  FileSearch,
  CheckCircle2,
  AlertTriangle,
  FileText,
  ScanLine,
  ShieldCheck,
  X,
  RotateCcw,
  Loader2,
  Download,
  Clock3,
  Database,
  Fingerprint,
} from "lucide-react";

import Sidebar from "@/components/sidebar";
import Header from "@/components/Header";

import OCRAnalysis from "@/components/analyzer/OCRAnalysis";
import ELAAnalysisCard from "@/components/analyzer/ELAAnalysis";
import MetadataAnalysisCard from "@/components/analyzer/MetadataAnalysisCard";
import CompressionAnalysisCard from "@/components/analyzer/CompressionAnalysisCard";
import CorruptionAnalysisCard from "@/components/analyzer/CorruptionAnalysisCard";
import AdvancedFaceForensicsCard from "@/components/analyzer/AdvancedFaceForensicsCard";
import ReverseImageSearchCard from "@/components/analyzer/ReverseImageSearchCard";
import SourceAttributionCard from "@/components/analyzer/SourceAttributionCard";
import ChainOfCustodyCard from "@/components/analyzer/ChainOfCustodyCard";
import CaseBanner from "@/components/analyzer/CaseBanner";
import AIAnalysisTab from "@/components/analyzer/AIAnalysisTab";
import AIAnalysisCard from "@/components/analysis/AIAnalysisCard";

export default function AnalyzerPage() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<any>(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  const [analysisStep, setAnalysisStep] = useState("");
  const [progress, setProgress] = useState(0);
  const [showOverlay, setShowOverlay] = useState(false);

  const [activeTab, setActiveTab] = useState("metadata");

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const tabs = [
    { id: "metadata", label: "Metadata" },
    { id: "ocr", label: "OCR Text" },
    { id: "ela", label: "ELA Analysis" },
    { id: "ai", label: "AI Detection" },
    { id: "forensics", label: "Advanced Forensics" },
    { id: "chain", label: "Chain of Custody" },
  ];

  const analysisSteps = [
    {
      title: "Evidence Upload",
      description: "Securely transferring evidence file",
      icon: Upload,
    },
    {
      title: "Metadata Extraction",
      description: "Reading EXIF and image properties",
      icon: FileSearch,
    },
    {
      title: "OCR Processing",
      description: "Extracting visible text content",
      icon: ScanLine,
    },
    {
      title: "ELA Generation",
      description: "Detecting compression inconsistencies",
      icon: ImageIcon,
    },
    {
      title: "AI Detection",
      description: "Running synthetic media analysis",
      icon: Fingerprint,
    },
    {
      title: "Threat Assessment",
      description: "Calculating forensic threat score",
      icon: AlertTriangle,
    },
    {
      title: "Report Generation",
      description: "Preparing forensic report",
      icon: FileText,
    },
    {
      title: "Saving Investigation",
      description: "Saving evidence and audit record",
      icon: Database,
    },
  ];

  const threatEngine = result?.ai_detection?.threat_engine;

  const finalThreatScore =
    threatEngine?.final_threat_score ??
    result?.threat_score ??
    0;

  const riskLevel =
    threatEngine?.risk_level ??
    result?.risk_level ??
    "UNKNOWN";

  const isDanger =
    result?.status?.includes("Suspicious") ||
    result?.status?.includes("Corrupted") ||
    result?.status?.includes("Invalid") ||
    result?.status?.includes("Malicious") ||
    riskLevel === "HIGH";

  const isMedium =
    riskLevel === "MEDIUM";

  const statusColor =
    isDanger
      ? "text-red-400"
      : isMedium
      ? "text-yellow-400"
      : "text-emerald-400";

  const statusBorder =
    isDanger
      ? "border-red-500/40 bg-red-500/10"
      : isMedium
      ? "border-yellow-500/40 bg-yellow-500/10"
      : "border-[#19e6d2]/40 bg-[#19e6d2]/10";

  const progressColor =
    finalThreatScore >= 70
      ? "bg-red-500"
      : finalThreatScore >= 40
      ? "bg-yellow-400"
      : "bg-[#19e6d2]";



  // const aiVerdict =
  //   result?.aiVerdict ||
  //   result?.verdict ||
  //   "Analysis Pending";

  // const aiConfidence =
  //   result?.aiConfidence ||
  //   result?.confidence ||
  //   0;

  // const aiScore =
  //   result?.aiScore ||
  //   result?.riskScore ||
  //   result?.threatScore ||
  //   0;

  // const aiBorderColor =
  //   aiScore >= 80
  //     ? "border-red-500"
  //     : aiScore >= 50
  //     ? "border-yellow-500"
  //     : "border-emerald-500";

  // const aiMessage =
  //   result?.aiMessage ||
  //   result?.message ||
  //   "AI analysis completed successfully.";

  // const aiBadge =
  //   aiScore >= 80
  //     ? "HIGH RISK"
  //     : aiScore >= 50
  //     ? "SUSPICIOUS"
  //     : "SAFE";

  // const aiRisk =
  //   result?.aiRisk ||
  //   result?.riskLevel ||
  //   result?.risk ||
  //   "LOW";

  // const aiColor =
  // aiRisk === "HIGH"
  //   ? "text-red-400"
  //   : aiRisk === "MEDIUM"
  //   ? "text-yellow-400"
  //   : "text-emerald-400";



  const mediaType =
    result?.mediaType ||
    result?.fileType ||
    "Unknown";

  const mediaLabel =
    result?.mediaLabel ||
    result?.fileName ||
    "Uploaded File";

  const authenticity =
    result?.authenticity ||
    result?.authenticityStatus ||
    "Not Verified";

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) return;

    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(selectedFile.type)) {
      alert("Please upload PNG, JPG, JPEG, or WEBP images only.");
      return;
    }

    if (preview) {
      URL.revokeObjectURL(preview);
    }

    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
    setResult(null);
    setActiveTab("metadata");
  };

  const resetAnalysis = () => {
    if (preview) {
      URL.revokeObjectURL(preview);
    }

    setFile(null);
    setPreview("");
    setResult(null);
    setProgress(0);
    setAnalysisStep("");
    setActiveTab("metadata");
  };

  const uploadImage = async () => {
    if (!file) {
      alert("Please select an image first.");
      return;
    }

    setLoading(true);
    setShowOverlay(true);
    setProgress(0);
    setAnalysisStep(analysisSteps[0].title);

    const formData = new FormData();
    formData.append("file", file);

    let currentStep = 0;

    const interval = setInterval(() => {
      if (currentStep < analysisSteps.length) {
        setAnalysisStep(analysisSteps[currentStep].title);

        setProgress(
          ((currentStep + 1) / analysisSteps.length) * 100
        );

        currentStep++;
      }
    }, 850);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/upload",
        formData
      );

      clearInterval(interval);

      setProgress(100);
      setAnalysisStep("Analysis Complete");

      setTimeout(() => {
        setResult(response.data);
        setShowOverlay(false);
        setActiveTab("metadata");
      }, 800);
    } catch (error) {
      clearInterval(interval);
      console.error(error);
      alert("Analysis failed. Check whether the FastAPI backend is running.");
      setShowOverlay(false);
    } finally {
      setLoading(false);
    }
  };

  const handleReportDownload = async () => {
    if (!result?.filename) return;

    try {
      await fetch(
        "http://127.0.0.1:8000/stats/report-generated",
        {
          method: "POST",
        }
      );
    } catch (error) {
      console.error(error);
    }

    window.open(
      `http://127.0.0.1:8000/download-report/${result.filename}`,
      "_blank"
    );
  };

  return (
    <div className="min-h-screen bg-[#030712] text-white flex">
      <Sidebar />

      <main className="flex-1 ml-[220px] pt-20 mb-4">
        <div className="max-w-8xl mx-auto px-8">
          <div
            className="
            sticky
            top-0
            z-20
            bg-[#081221]
            border-b
            border-zinc-800
            "
          >
            <Header
              title="Analyzer"
              subtitle="Evidence Analysis"
            />
          </div>

          {/* PAGE INTRO */}

          <section className="pt-6 pb-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
              <div>
                <p className="text-[#19e6d2] uppercase tracking-[0.25em] text-xs mb-3">
                  Evidence Examination Console
                </p>

                <h1 className="text-3xl md:text-4xl font-bold">
                  Digital Evidence Analysis
                </h1>

                <p className="text-slate-400 mt-3 max-w-2xl">
                  Upload an image to extract metadata, inspect ELA patterns,
                  detect AI-generated media, recover OCR text, and generate
                  a forensic investigation report.
                </p>
              </div>
            </div>
          </section>

          {/* UPLOAD + PREVIEW WORKSPACE */}
          {!result && (
            <section className="max-w-7xl mx-auto">
              <div className="bg-[#060b16] border border-[#1b2a41] rounded-[28px] overflow-hidden">

                {/* CARD HEADER */}
                <div className="px-6 pt-6 pb-2 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#19e6d2]/10 flex items-center justify-center">
                      <Upload className="text-[#19e6d2]" size={23} />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold mt-1">
                        Upload Evidence Image
                      </h2>
                      <p className="text-sm text-slate-500 mt-1">
                        Upload an image and run a complete forensic examination.
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={resetAnalysis}
                    className="p-2 rounded-lg hover:bg-red-500/10 text-slate-400 hover:text-red-400 transition"
                    title="Remove selected image"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* BEFORE IMAGE SELECT */}
                {!preview && (
                  <div className="px-7 pb-7 pt-2">
                    <label className="block cursor-pointer">
                      <div
                        className="
                          min-h-[420px]
                          border-2
                          border-dashed
                          border-[#1f3a4b]
                          hover:border-[#19e6d2]
                          transition
                          rounded-2xl
                          bg-[#030712]
                          flex
                          flex-col
                          items-center
                          justify-center
                          text-center
                          px-6
                        "
                      >
                        <div className="w-20 h-20 rounded-2xl bg-[#19e6d2]/10 flex items-center justify-center mb-6">
                          <ImageIcon className="text-[#19e6d2]" size={38} />
                        </div>

                        <h3 className="text-xl font-semibold">
                          Select Evidence Image
                        </h3>

                        <p className="text-slate-500 mt-3 max-w-md">
                          Upload a digital image for metadata extraction, OCR,
                          ELA tampering analysis, AI detection, and report generation.
                        </p>

                        <div className=" text-sm text-[#a9b9d8]">
                          PNG · JPG · JPEG · WEBP
                        </div>
                        <p className="text-xs text-slate-600 mt-5">
                          Click anywhere in this area to browse files
                        </p>
                      </div>
                      <input
                        type="file"
                        accept=".png,.jpg,.jpeg,.webp"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                    </label>
                  </div>
                )}

                {/* AFTER IMAGE SELECT */}
                {preview && file && (
                  <div className="p-6">

                    {/* IMAGE PREVIEW */}
                    <div className="bg-[#030712] border border-[#1b2a41] rounded-2xl p-4">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#7e91b8]">
                          Evidence Preview
                        </p>

                        <div className="flex items-center gap-2 min-w-0">
                          <div className="w-8 h-8 rounded-xl bg-[#19e6d2]/10 flex items-center justify-center shrink-0">
                            <FileText className="text-[#19e6d2]" size={15} />
                          </div>
                            <p className="font-medium truncate max-w-[500px]">
                              {file.name}
                            </p>
                        </div>
                      </div>

                      <div className="bg-[#08101f] rounded-xl overflow-hidden border border-[#1b2a41]">
                        <img
                          src={preview}
                          alt="Selected evidence preview"
                          className="
                            w-full
                            h-[420px]
                            object-contain
                            bg-[#030712]
                          "
                        />
                      </div>
                    </div>

                    {/* ANALYZE BUTTON */}

                    <button
                      onClick={uploadImage}
                      disabled={loading}
                      className="
                        mt-6
                        w-full
                        bg-[#19e6d2]
                        hover:bg-[#36f3df]
                        disabled:bg-[#172235]
                        disabled:text-[#607196]
                        text-black
                        font-bold
                        py-3
                        rounded-xl
                        transition
                        flex
                        items-center
                        justify-center
                        gap-3
                        shadow-[0_0_24px_rgba(25,230,210,0.16)]
                      "
                    >
                      {loading ? (
                        <>
                          <Loader2 className="animate-spin" size={20} />
                          Running Forensic Analysis...
                        </>
                      ) : (
                        <>
                          <FileSearch size={20} />
                          Run Forensic Analysis
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* RESULTS AREA */}

          {result && (
            <motion.section
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="space-y-6"
            >
              {/* ANALYZED EVIDENCE PREVIEW */}
              {preview && file && (
                <div className="bg-[#060b16] border border-[#1b2a41] rounded-[28px] overflow-hidden">
                  <div className="px-7 py-5 border-b border-[#1b2a41] flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#19e6d2]/10 flex items-center justify-center">
                        <ImageIcon
                          className="text-[#19e6d2]"
                          size={20}
                        />
                      </div>

                      <div>
                        <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#7e91b8]">
                          Analyzed Evidence
                        </p>

                        <p className="text-sm text-white mt-1">
                          {file.name}
                        </p>
                      </div>
                    </div>

                    <div className="font-mono text-xs text-[#7e91b8]">
                      {(file.size / 1024).toFixed(1)} KB · {file.type}
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="bg-[#030712] border border-[#1b2a41] rounded-2xl overflow-hidden">
                      <img
                        src={preview}
                        alt="Analyzed evidence"
                        className="
                          w-full
                          max-h-[460px]
                          object-contain
                          bg-[#030712]
                        "
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* RESULT HEADER */}
              <div className="bg-[#060b16] border border-[#1b2a41] rounded-[28px] p-6 md:p-7">
                <div className="grid xl:grid-cols-[1fr_1.5fr] gap-6 items-center">
                  <div className="flex items-center gap-4">
                    <div
                      className={`
                        w-14 h-14
                        rounded-2xl
                        flex
                        items-center
                        justify-center
                        border
                        ${statusBorder}
                      `}
                    >
                      {isDanger ? (
                        <AlertTriangle className={statusColor} />
                      ) : (
                        <CheckCircle2 className={statusColor} />
                      )}
                    </div>

                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                        Investigation Result
                      </p>
                      <h2 className={`text-2xl font-bold mt-1 ${statusColor}`}>
                        {result?.status || "Analysis Completed"}
                      </h2>
                      <p className="text-sm text-slate-500 truncate max-w-[300px]">
                        {result?.filename}
                      </p>
                    </div>
                  </div>

                  <div>
                    <div className="mb-3">
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                        Threat Score
                      </p>
                    </div>

                    {/* PROGRESS BAR */}
                    <div className="h-3 rounded-full bg-[#0a1323] overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-700 ${progressColor}`}
                        style={{
                          width: `${Math.min(finalThreatScore, 100)}%`,
                        }}
                      />
                    </div>

                    {/* SCORE + RISK BELOW PROGRESS BAR */}
                    <div className="flex items-center justify-between mt-2">
                      <p className="text-sm text-slate-400">
                        {finalThreatScore}/100
                      </p>
                      <span className={`text-sm font-bold ${statusColor}`}>
                        {riskLevel} RISK
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* TAB NAVIGATION */}

              {/* TAB CONTENT */}
              <div className="bg-[#060b16] border border-[#1b2a41] rounded-[28px] p-5 md:p-7 min-h-[620px]">
                <div
                    className="
                    flex
                    gap-10
                    border-b
                    border-zinc-800
                    mb-6
                    overflow-x-auto
                    "
                  >
                    {tabs.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() =>
                          setActiveTab(tab.id)
                        }
                        className={`
                          pb-4
                          whitespace-nowrap
                          transition
                          ${
                            activeTab === tab.id
                              ? "text-[#19e6d2] border-b-2 border-[#19e6d2]"
                              : "text-zinc-500 border-transparent text-slate-500 hover:text-slate-300"
                          }
                        `}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                {activeTab === "metadata" && (
                  <MetadataAnalysisCard
                    metadata={result?.metadata || {}}
                    status={result?.status}
                    riskLevel={riskLevel}
                    threatScore={finalThreatScore}
                    onDownloadReport={handleReportDownload}
                  />
                )}

                {activeTab === "ocr" && (
                  <OCRAnalysis
                    ocr={{
                      text:
                        result?.ocr_text ||
                        result?.ocr?.text ||
                        result?.ai_detection?.ocr?.text ||
                        "",
                      text_length:
                        result?.ocr?.text_length ||
                        result?.ai_detection?.ocr?.text_length ||
                        result?.ocr_text?.length ||
                        0,
                    }}
                  />
                )}

                {activeTab === "ela" && (
                  <ELAAnalysisCard
                    ela={
                      typeof result?.ela_image === "object"
                        ? result.ela_image
                        : {
                            ela_image: result?.ela_image,
                            ela_score: 0,
                            ela_mean: 0,
                            ela_std: 0,
                            ela_max: 0,
                            ela_risk: "Unknown",
                            reasons: [],
                          }
                    }
                    originalImage={preview}
                  />
                )}

                {/* {activeTab === "ai" && (
                  <AIAnalysisCard
                    result={result}
                    aiRisk={aiRisk}
                    aiColor={aiColor}
                    aiVerdict={aiVerdict}
                    aiConfidence={aiConfidence}
                    aiScore={aiScore}
                    aiBorderColor={aiBorderColor}
                    aiMessage={aiMessage}
                    aiBadge={aiBadge}
                    mediaType={mediaType}
                    mediaLabel={mediaLabel}
                    authenticity={authenticity}
                    threatEngine={threatEngine}
                  />
                )} */}

                {activeTab === "ai" && (
                  <AIAnalysisTab
                    ai={result?.ai_detection}
                  />
                )}

                {activeTab === "forensics" && (
                  <div className="grid md:grid-cols-2 gap-6">
                    <CompressionAnalysisCard
                      data={
                        result?.ai_detection?.compression_forensics
                      }
                    />

                    <CorruptionAnalysisCard
                      data={
                        result?.ai_detection?.corruption_forensics
                      }
                    />

                    <SourceAttributionCard
                      data={
                        result?.ai_detection?.source_attribution
                      }
                    />

                    <ReverseImageSearchCard
                      data={
                        result?.ai_detection?.reverse_image_search
                      }
                    />

                    <AdvancedFaceForensicsCard
                      data={
                        result?.ai_detection?.advanced_face_forensics
                      }
                    />
                  </div>
                )}

                {activeTab === "chain" && (
                  <div className="space-y-6">
                    {/* <CaseBanner
                      evidenceId={
                        result?.ai_detection?.chain_of_custody?.evidence_id
                      }
                      analyst={
                        result?.ai_detection?.chain_of_custody?.analyst
                      }
                      integrityVerified={
                        result?.ai_detection?.chain_of_custody
                          ?.integrity_verified
                      }
                    /> */}

                    <ChainOfCustodyCard
                      custody={
                        result?.ai_detection?.chain_of_custody
                      }
                    />
                  </div>
                )}
              </div>

              {/* ACTION BAR */}

              <div className="flex flex-wrap gap-4">
                <button
                  onClick={handleReportDownload}
                  className="
                    bg-[#19e6d2]
                    hover:bg-[#36f3df]
                    text-black
                    font-bold
                    px-6
                    py-3
                    rounded-xl
                    flex
                    items-center
                    gap-2
                    transition
                  "
                >
                  <Download size={18} />
                  Download PDF Report
                </button>

                <button
                  onClick={resetAnalysis}
                  className="
                    border
                    border-[#1b2a41]
                    hover:bg-[#111a2d]
                    text-[#a9b9d8]
                    px-6
                    py-3
                    rounded-xl
                    flex
                    items-center
                    gap-2
                    transition
                  "
                >
                  <RotateCcw size={18} />
                  New Analysis
                </button>
              </div>
            </motion.section>
          )}
        </div>
      </main>

      {/* FORENSIC ANALYSIS OVERLAY */}

      <AnimatePresence>
        {showOverlay && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="
              fixed
              inset-0
              z-[100]
              bg-black/80
              backdrop-blur-md
              flex
              items-center
              justify-center
              px-4
              py-4
              overflow-hidden
            "
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="
                w-full
                max-w-xl
                max-h-[calc(100vh-48px)]
                overflow-y-auto
                bg-[#0b1628]
                border
                border-[#243554]
                rounded-2xl
                shadow-2xl
                p-2
                md:p-4
                custom-scrollbar
              "
            >
              {/* HEADER */}
              {/* <div className="text-center mb-4">
                <div className="w-11 h-11 rounded-xl bg-[#19e6d2]/10 border border-[#19e6d2]/20 flex items-center justify-center mx-auto mb-3">
                  <ShieldCheck
                    className="text-[#19e6d2] animate-pulse"
                    size={22}
                  />
                </div>

                <h2 className="font-serif text-2xl md:text-3xl font-bold text-white">
                  Analyzing Evidence
                </h2>

                <p className="text-sm text-[#8191b1] mt-1">
                  Secure forensic processing in progress
                </p>
              </div> */}

              {/* PROGRESS CARD */}
              <div className="bg-[#08111f] border border-[#243554] rounded-xl p-3 mb-3">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm font-semibold text-[#19e6d2]">
                    {analysisStep || "Preparing Analysis"}
                  </p>

                  <p className="text-sm text-[#aab8d4]">
                    {Math.round(progress)}%
                  </p>
                </div>

                <div className="h-2 rounded-full bg-[#14213a] overflow-hidden">
                  <motion.div
                    className="h-full bg-[#19c9e6] rounded-full"
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
              </div>

              {/* PROCESSING STEPS */}
              <div className="space-y-3">
                {analysisSteps.map((step, index) => {
                  const completed =
                    progress >=
                    ((index + 1) / analysisSteps.length) * 100;
                  const active = analysisStep === step.title;
                  const Icon = step.icon;
                  return (
                    <div
                      key={step.title}
                      className={`
                        rounded-xl
                        border
                        px-3
                        py-2
                        transition-all
                        ${
                          active
                            ? "bg-[#101d35] border-[#19e6d2]/40"
                            : completed
                            ? "bg-[#0b1c29] border-emerald-400/20"
                            : "bg-[#101d35] border-[#243554]"
                        }
                      `}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`
                            w-9
                            h-9
                            rounded-lg
                            shrink-0
                            flex
                            items-center
                            justify-center
                            ${
                              active
                                ? "bg-[#19e6d2]/15 text-[#19e6d2]"
                                : completed
                                ? "bg-emerald-400/15 text-emerald-400"
                                : "bg-[#1d2d4a] text-[#6d7e9d]"
                            }
                          `}
                        >
                          {completed ? (
                            <CheckCircle2 size={18} />
                          ) : active ? (
                            <Loader2 size={18} className="animate-spin" />
                          ) : (
                            <Icon size={18} />
                          )}
                        </div>

                        <div className="min-w-0">
                          <p
                            className={`
                              text-sm
                              font-semibold
                              ${
                                active
                                  ? "text-white"
                                  : completed
                                  ? "text-emerald-300"
                                  : "text-[#9aabc8]"
                              }
                            `}
                          >
                            {step.title}
                          </p>

                          <p className="text-xs text-[#70819f] truncate">
                            {step.description}
                          </p>
                        </div>

                        {active && (
                          <div className="ml-auto w-2 h-2 rounded-full bg-[#19e6d2] animate-pulse" />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}