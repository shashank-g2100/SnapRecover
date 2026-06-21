// "use client"

// import axios from "axios"
// import { useState } from "react"
// import {
//   Upload,
//   Shield,
//   ImageIcon,
//   FileSearch,
//   History,
// } from "lucide-react"

// export default function Home() {

//   const [file, setFile] = useState<File | null>(null)
//   const [result, setResult] = useState<any>(null)
//   const [preview, setPreview] = useState<string>("")
//   const [loading, setLoading] = useState(false)

//   const uploadImage = async () => {

//     if (!file) return

//     setLoading(true)

//     const formData = new FormData()

//     formData.append("file", file)

//     try {

//       const response = await axios.post(
//         "http://127.0.0.1:8000/upload",
//         formData
//       )

//       setResult(response.data)

//     } catch (error) {
//       console.log(error)
//     }

//     setLoading(false)
//   }

//   return (

//     <div className="min-h-screen bg-black text-white flex">

//       {/* SIDEBAR */}

//       <div className="w-64 bg-zinc-950 border-r border-zinc-800 p-6 hidden md:block">
//         <h1 className="text-3xl font-bold text-blue-500 mb-10">
//           SnapRecover
//         </h1>

//         <div className="space-y-6">
//           <div className="flex items-center gap-3 text-zinc-300">
//             <Shield size={20} />
//             Dashboard
//           </div>

//           <div className="flex items-center gap-3 text-zinc-300">
//             <ImageIcon size={20} />
//             Image Analysis
//           </div>

//           <div className="flex items-center gap-3 text-zinc-300">
//             <FileSearch size={20} />
//             Reports
//           </div>
//           <div className="flex items-center gap-3 text-zinc-300">
//             <History size={20} />
//             <a
//               href="/history"
//               className="flex items-center gap-3 text-zinc-300"
//             >
//               Investigation History
//             </a>
//           </div>
//         </div>
//       </div>

//       {/* MAIN CONTENT */}

//       <div className="flex-1 p-6 md:p-10">

//         <h1 className="text-4xl font-bold mb-8">
//           Digital Image Forensics
//         </h1>

//         {/* UPLOAD BOX */}

//         <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
//           <div className="border-2 border-dashed border-zinc-700 rounded-xl p-10 text-center">
//             <Upload className="mx-auto mb-5 text-blue-500" size={50} />
//             <h2 className="text-2xl font-semibold mb-3">
//               Upload Screenshot/Image
//             </h2>

//             <p className="text-zinc-400 mb-6">
//               Analyze metadata and forensic evidence
//             </p>


//             <input
//               type="file"
//               className="mb-5"
//               onChange={(e) => {
//                 if (e.target.files) {
//                   const selectedFile = e.target.files[0]
//                   setFile(selectedFile)
//                   setPreview(URL.createObjectURL(selectedFile))
//                 }
//               }}
//             />
//             <br />

//             <button
//               onClick={uploadImage}
//               className="bg-blue-600 hover:bg-blue-700 transition px-6 py-3 rounded-xl font-semibold"
//             >
//               {
//                 loading ? "Analyzing..." : "Upload & Analyze"
//               }
//             </button>
//           </div>
//         </div>

//         {/* RESULT SECTION */}

//         {
//           result && (
//             <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-10">
//               <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 flex flex-col justify-between">

//                 <div>
//                   <p className="text-zinc-400 mb-3">
//                     Investigation Status
//                   </p>

//                   <div className="mb-5">
//                     <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
//                       result.risk_level === "HIGH"
//                         ? "bg-red-500/20 text-red-400"

//                         : result.risk_level === "MEDIUM"
//                         ? "bg-yellow-500/20 text-yellow-400"

//                         : "bg-green-500/20 text-green-400"
//                     }`}>
//                       {result.risk_level} RISK
//                     </span>
//                   </div>

//                   <h2 className={`text-4xl font-bold leading-tight ${
//                     result.status.includes("Suspicious")
//                       ? "text-red-400"
//                       : "text-green-400"
//                   }`}>
//                     {result.status}
//                   </h2>

//                 </div>
//               </div>

//               <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
//                 <div className="space-y-4">
//                   {
//                     Object.entries(result.metadata).map(
//                       ([key, value]: any) => (

//                         <div
//                           key={key}
//                           className="flex justify-between items-start bg-zinc-800 rounded-xl p-4 gap-4"
//                         >

//                           <p className="text-blue-400 min-w-[180px] font-semibold">
//                             {key}
//                           </p>

//                           <p className="text-zinc-200 break-all text-right">
//                             {value}
//                           </p>

//                         </div>
//                       )
//                     )
//                   }
//                 </div>

//                 <a
//                   href={`http://127.0.0.1:8000/download-report/${result.filename}`}
//                   target="_blank"
//                   className="bg-green-600 hover:bg-green-700 transition px-6 py-3 rounded-xl inline-block mt-6"
//                 >
//                   Download Forensic Report
//                 </a>

//                 <h2 className="text-3xl font-bold text-blue-400">
//                   {Object.keys(result.metadata).length}
//                 </h2>
//               </div>

//               <div className="mt-8">
//                 <h2 className="text-2xl font-bold mb-5">
//                   Threat Indicators
//                 </h2>
//                 <div className="space-y-3">
//                   {
//                     result.risk_reasons.map(
//                       (reason: string, index: number) => (
//                         <div
//                           key={index}
//                           className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-red-300"
//                         >
//                           {reason}
//                         </div>
//                       )
//                     )
//                   }
//                 </div>
//               </div>

//               <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
//                 <p className="text-zinc-400 mb-2">
//                   Uploaded File
//                 </p>

//                 <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">

//                   <p className="text-zinc-400 mb-3">
//                     Threat Score
//                   </p>

//                   <div className="flex items-center gap-4">
//                     <h2 className={`text-6xl font-bold ${
//                       result.threat_score >= 70
//                         ? "text-red-400"

//                         : result.threat_score >= 40
//                         ? "text-yellow-400"

//                         : "text-green-400"
//                     }`}>
//                       {result.threat_score}
//                     </h2>

//                     <span className="text-zinc-500 text-xl">
//                       /100
//                     </span>

//                   </div>
//                 </div>

//                 <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800">
//                   <h2 className="text-2xl font-bold mb-5">
//                     ELA Tampering Analysis
//                   </h2>
//                   <img
//                     src={`http://127.0.0.1:8000/uploads/${result.ela_image.split("/").pop()}`}
//                     alt="ELA"
//                     className="rounded-xl w-full h-[300px] object-cover border border-zinc-700"
//                   />
//                 </div>

//                 <h2 className="text-lg font-bold text-purple-400 break-all">
//                   {result.filename}
//                 </h2>
//               </div>
//             </div>
//           )
//         }
//       </div>
//     </div>
//   )
// }

// "use client"

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

// export default function Home() {

//   const [file, setFile] = useState<File | null>(null)
//   const [result, setResult] = useState<any>(null)
//   const [preview, setPreview] = useState<string>("")
//   const [loading, setLoading] = useState(false)

//   const uploadImage = async () => {

//     if (!file) return

//     setLoading(true)

//     const formData = new FormData()
//     formData.append("file", file)

//     try {

//       const response = await axios.post(
//         "http://127.0.0.1:8000/upload",
//         formData
//       )

//       setResult(response.data)

//     } catch (error) {
//       console.log(error)
//       alert("Failed to analyze image.")
//     } finally {
//       setLoading(false)
//     }
//   }

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

//   const aiScore = result?.ai_detection?.score || 0

//   const aiMessage =
//     aiScore <= 20
//       ? "Authentic Camera Media"

//       : aiScore <= 40
//       ? "Digital Graphic Content"

//       : aiScore <= 60
//       ? "Synthetic Styled Media"

//       : aiScore <= 80
//       ? "Suspicious AI Content"

//       : "Highly Suspicious AI Media"

//   const aiBadge =
//     aiScore >= 80
//       ? "HIGH RISK"

//       : aiScore >= 60
//       ? "SUSPICIOUS"

//       : aiScore >= 40
//       ? "SYNTHETIC STYLE"

//       : "LIKELY AUTHENTIC"

//   const aiColor =
//     aiScore >= 80
//       ? "text-red-500"

//       : aiScore >= 60
//       ? "text-orange-400"

//       : aiScore >= 40
//       ? "text-yellow-400"

//       : "text-green-400"

//   const aiBorderColor =
//     aiScore >= 80
//       ? "border-red-500 text-red-500"

//       : aiScore >= 60
//       ? "border-orange-400 text-orange-400"

//       : aiScore >= 40
//       ? "border-yellow-400 text-yellow-400"

//       : "border-green-400 text-green-400"

//   return (

//     <div className="min-h-screen bg-gradient-to-br from-black via-zinc-950 to-zinc-900 text-white flex">

//       <Sidebar />

//       {/* MAIN */}
//       <main className="flex-1 p-6 md:p-12 overflow-y-auto">

//         {/* HERO */}
//         <div className="mb-12">

//           <p className="text-blue-400 uppercase tracking-[0.3em] text-sm mb-3">
//             Digital Forensics Platform
//           </p>

//           <h1 className="text-5xl md:text-6xl font-black leading-tight max-w-4xl">
//             Advanced Image
//             <span className="text-blue-500"> Tampering Detection</span>
//           </h1>

//           <p className="text-zinc-400 text-lg mt-6 max-w-2xl">
//             Analyze screenshots and images for metadata anomalies,
//             tampering evidence, compression artifacts, and forensic indicators.
//           </p>

//         </div>

//         {/* UPLOAD SECTION */}

//         <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
//           <div className="border-2 border-dashed border-zinc-700 hover:border-blue-500 transition-all duration-300 rounded-3xl p-10 text-center">

//             {/* ICON */}
//             <div className="w-20 h-20 rounded-full bg-blue-500/10 flex items-center justify-center mx-auto mb-5">
//               <Upload className="text-blue-400" size={28} />
//             </div>

//             {/* TITLE */}
//             <h2 className="text-2xl font-bold mb-3">
//               Upload Evidence
//             </h2>

//             <p className="text-zinc-400 mb-6">
//               Supported formats: PNG, JPG, JPEG, WEBP
//             </p>

//             {/* CUSTOM FILE INPUT */}
//             <label className="cursor-pointer block max-w-xl mx-auto mb-8">
//               <div className="bg-zinc-900 border border-zinc-800 hover:border-blue-500 transition-all duration-300 rounded-2xl px-6 py-5 flex items-center justify-between gap-4">

//                 {/* LEFT */}
//                 <div className="flex items-center gap-4">
//                   <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
//                     <ImageIcon className="text-blue-400" size={22} />
//                   </div>

//                   <div className="text-left">
//                     <h2 className="font-semibold text-white">
//                       Choose Evidence File
//                     </h2>

//                     <p className="text-sm text-zinc-400">
//                       Click to browse your device
//                     </p>
//                   </div>
//                 </div>

//                 {/* RIGHT */}
//                 <div className="text-sm text-zinc-400 max-w-[180px] truncate">
//                   {
//                     file
//                       ? file.name
//                       : "No file selected"
//                   }
//                 </div>
//               </div>

//               <input
//                 type="file"
//                 className="hidden"
//                 onChange={(e) => {
//                   if (e.target.files) {
//                     const selectedFile = e.target.files[0]
//                     setFile(selectedFile)
//                     setPreview(URL.createObjectURL(selectedFile))
//                   }
//                 }}
//               />
//             </label>

//             {/* IMAGE PREVIEW */}
//             {
//               preview && (
//                 <div className="mb-8">
//                   <img
//                     src={preview}
//                     alt="Preview"
//                     className="w-full max-w-md mx-auto rounded-3xl border border-zinc-700 shadow-2xl"
//                   />
//                 </div>
//               )
//             }

//             {/* BUTTON */}
//             <button
//               onClick={uploadImage}
//               className="bg-blue-600 hover:bg-blue-700 transition-all duration-300 px-5 py-2 rounded-2xl font-bold text-lg shadow-lg hover:scale-105">
//               {
//                 loading
//                   ? "Analyzing Evidence..."
//                   : "Upload & Analyze"
//               }
//             </button>
//           </div>
//         </div>

//         {/* RESULTS */}
//         {
//           result && (

//             <div className="mt-14 grid grid-cols-1 xl:grid-cols-2 gap-8">

//               {/* CARD 1 - STATUS */}
//               <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
//                 <div className="flex items-center justify-between mb-5">
//                   <div>
//                     <p className="text-zinc-400 uppercase tracking-widest text-xs mb-2">
//                       Investigation Result
//                     </p>
//                     <h2 className={`text-3xl font-black leading-tight ${statusColor}`}>
//                       {result.status}
//                     </h2>
//                   </div>

//                   <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center shrink-0 ${statusBg}`}>

//                     {
//                       isDanger
//                         ? (<AlertTriangle className="text-red-400" size={30}/>)
//                         : isMedium
//                         ? (<Shield className="text-yellow-400" size={30}/>)
//                         : (<CheckCircle2 className="text-green-400" size={30}/>)
//                     }
//                   </div>
//                 </div>

//                 {/* SCORE */}

//                 <div className="bg-black/30 border border-zinc-800 rounded-3xl p-6">
//                   <p className="text-zinc-400 mb-2 uppercase tracking-widest text-xs">
//                     Threat Score
//                   </p>

//                   <div className="flex items-end gap-1">

//                     <h1 className={`text-5xl font-black ${
//                       result.threat_score >= 70
//                         ? "text-red-400"
//                         : result.threat_score >= 40
//                         ? "text-yellow-400"
//                         : "text-green-400"
//                     }`}>
//                       {result.threat_score}
//                     </h1>

//                     <span className="text-zinc-500 text-xl mb-1">
//                       /100
//                     </span>

//                   </div>

//                   {/* PROGRESS */}

//                   <div className="w-full h-3 bg-zinc-800 rounded-full mt-3 overflow-hidden">

//                     <div
//                       className={`h-full rounded-full ${
//                         result.threat_score >= 70
//                           ? "bg-red-500"
//                           : result.threat_score >= 40
//                           ? "bg-yellow-500"
//                           : "bg-green-500"
//                       }`}
//                       style={{
//                         width: `${result.threat_score}%`
//                       }}
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* CARD 4 - THREATS */}
//               <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
//                 <div className="mb-4">

//                   <p className="text-zinc-400 uppercase tracking-widest text-xs mb-2">
//                     Security Findings
//                   </p>

//                   <h2 className="text-3xl font-black">
//                     Threat Indicators
//                   </h2>
//                 </div>

//                 <div className="space-y-4">
//                   {
//                     result.risk_reasons.map(
//                       (reason: string, index: number) => (
//                         <div
//                           key={index}
//                           className="bg-red-500/10 border border-red-500/20 rounded-2xl p-2.5 text-red-300"
//                         >
//                           <div className="flex items-center gap-4">
//                             <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center shrink-0">
//                               <AlertTriangle size={20} />
//                             </div>
//                             <p className="leading-relaxed">
//                               {reason}
//                             </p>
//                           </div>
//                         </div>
//                       )
//                     )
//                   }
//                 </div>
//               </div>

//               <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
//                 <h2 className="text-3xl font-bold mb-5">
//                   OCR Text Extraction
//                 </h2>
//                 <div className="bg-zinc-800 rounded-xl p-5 whitespace-pre-wrap text-zinc-300 max-h-[450px] overflow-y-auto
//                 ">
//                   {
//                     result.ocr_text
//                       ? result.ocr_text
//                       : "No text detected."
//                   }
//                 </div>
//               </div>

//               {/* CARD 3 - ELA */}
//               <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
//                 <div className="mb-5">
//                   <p className="text-zinc-400 uppercase tracking-widest text-sm mb-2">
//                     Tampering Detection
//                   </p>
//                   <h2 className="text-3xl font-black">
//                     ELA Analysis
//                   </h2>
//                 </div>
//                 {
//                   result?.ela_image && (
//                     <img
//                       src={`http://127.0.0.1:8000/uploads/${result.ela_image.split("/").pop()}`}
//                       alt="ELA"
//                       className="rounded-3xl w-full h-[400px] object-cover border border-zinc-700"
//                     />
//                   )
//                 }
//               </div>

//               {/* CARD 5 - AI ANALYSIS */}
//               <div className="bg-[#111] border border-gray-800 rounded-2xl p-8 shadow-2xl">

//                 {/* HEADER */}

//                 <div className="flex items-center justify-between mb-8">

//                   <div>

//                     <p className="text-sm uppercase tracking-widest text-gray-500">
//                       Artificial Intelligence
//                     </p>

//                     <h2 className="text-4xl font-bold mt-2">
//                       Synthetic Media Intelligence
//                     </h2>

//                   </div>

//                   {/* BADGE */}

//                   <div
//                     className={`px-4 py-2 rounded-full text-sm font-semibold border ${
//                       aiScore >= 80
//                         ? "bg-red-950 text-red-400 border-red-700"

//                         : aiScore >= 60
//                         ? "bg-orange-950 text-orange-400 border-orange-700"

//                         : aiScore >= 40
//                         ? "bg-yellow-950 text-yellow-400 border-yellow-700"

//                         : "bg-green-950 text-green-400 border-green-700"
//                     }`}
//                   >
//                     {aiBadge}
//                   </div>

//                 </div>

//                 {/* MAIN LABEL */}

//                 <div className={`text-4xl font-bold mb-8 ${aiColor}`}>
//                   {aiMessage}
//                 </div>

//                 {/* SCORE CARD */}

//                 <div className="bg-[#0b0b0b] border border-gray-800 rounded-2xl p-6 mb-8">

//                   <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-8">

//                     {/* LEFT */}

//                     <div className="flex-1">

//                       <p className="text-gray-400 text-sm uppercase tracking-widest">
//                         Digital Authenticity Score
//                       </p>

//                       {/* CATEGORY GRID */}

//                       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">

//                         {/* MEDIA CATEGORY */}

//                         <div className="bg-[#050816] border border-blue-900 rounded-2xl p-5">

//                           <div className="flex items-center gap-2 mb-2">

//                             {
//                               result?.ai_detection?.media_type === "camera_image" ? (
//                                 <Camera className="text-blue-400" size={18} />
//                               )

//                               : result?.ai_detection?.media_type === "graphic_design" ? (
//                                 <Palette className="text-blue-400" size={18} />
//                               )

//                               : result?.ai_detection?.media_type === "screenshot" ? (
//                                 <Monitor className="text-blue-400" size={18} />
//                               )

//                               : (
//                                 <Bot className="text-blue-400" size={18} />
//                               )
//                             }

//                             <div className="text-xs uppercase tracking-wider text-gray-500">
//                               Media Category
//                             </div>

//                           </div>

//                           <div className="text-2xl font-bold text-blue-400 mt-4">
//                             {
//                               result?.ai_detection?.media_type_label ||
//                               "Unknown"
//                             }
//                           </div>

//                         </div>

//                         {/* AUTHENTICITY */}

//                         <div className="bg-[#050816] border border-green-900 rounded-2xl p-5">

//                           <div className="flex items-center gap-2 mb-2">

//                             <Shield className="text-green-400" size={18} />

//                             <div className="text-xs uppercase tracking-wider text-gray-500">
//                               Authenticity
//                             </div>

//                           </div>

//                           <div className="text-2xl font-bold text-green-400 mt-4">
//                             {
//                               result?.ai_detection?.authenticity ||
//                               "Unknown"
//                             }
//                           </div>

//                         </div>

//                         {/* CONTENT TYPE */}

//                         <div className="bg-[#050816] border border-cyan-900 rounded-2xl p-5">

//                           <div className="flex items-center gap-2 mb-2">

//                             <ScanLine className="text-cyan-400" size={18} />

//                             <div className="text-xs uppercase tracking-wider text-gray-500">
//                               Content Type
//                             </div>

//                           </div>

//                           <div className="text-2xl font-bold text-cyan-400 mt-4">

//                             {
//                               result?.ai_detection?.media_type === "camera_image"
//                                 ? "Authentic Camera Media"

//                                 : result?.ai_detection?.media_type === "graphic_design"
//                                 ? "Designed Digital Media"

//                                 : result?.ai_detection?.media_type === "screenshot"
//                                 ? "Screen Captured Media"

//                                 : result?.ai_detection?.media_type === "document_scan"
//                                 ? "Scanned Document"

//                                 : result?.ai_detection?.media_type === "poster"
//                                 ? "Poster / Artwork"

//                                 : result?.ai_detection?.media_type === "ui_mockup"
//                                 ? "User Interface Mockup"

//                                 : result?.ai_detection?.media_type === "ai_artwork"
//                                 ? "AI Generated Artwork"

//                                 : "Unknown Media"
//                             }

//                           </div>

//                         </div>

//                       </div>

//                       {/* SCORE */}

//                       <div className="mt-10">

//                         <h3 className={`text-6xl font-black ${aiColor}`}>

//                           {aiScore}

//                           <span className="text-lg text-gray-500 ml-1">
//                             /100
//                           </span>

//                         </h3>

//                         <div className="mt-3 text-sm text-gray-500">

//                           Confidence Level: {

//                             aiScore >= 80
//                               ? "High"

//                               : aiScore >= 60
//                               ? "Moderate"

//                               : "Low"
//                           }

//                         </div>

//                       </div>

//                     </div>

//                     {/* RIGHT ICON */}

//                     <div
//                       className={`w-24 h-24 rounded-full flex items-center justify-center text-4xl font-bold border-4 ${aiBorderColor}`}
//                     >

//                       {
//                         aiScore >= 80
//                           ? "!"

//                           : aiScore >= 60
//                           ? "⚠"

//                           : aiScore >= 40
//                           ? "?"

//                           : "✓"
//                       }

//                     </div>

//                   </div>

//                   {/* PROGRESS */}

//                   <div className="w-full h-6 bg-gray-900 rounded-full overflow-hidden mt-8">

//                     <div
//                       className={`h-6 transition-all duration-700 ${
//                         aiScore >= 80
//                           ? "bg-red-500"

//                           : aiScore >= 60
//                           ? "bg-orange-400"

//                           : aiScore >= 40
//                           ? "bg-yellow-400"

//                           : "bg-green-500"
//                       }`}
//                       style={{
//                         width: `${aiScore}%`
//                       }}
//                     />

//                   </div>

//                 </div>

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

//                   <div className="bg-[#0b0b0b] border border-gray-800 rounded-xl p-5">

//                     <p className="text-gray-500 text-sm uppercase">
//                       Face Detection
//                     </p>

//                     <h4 className="text-2xl font-bold mt-3 text-blue-400">

//                       {
//                         result?.ai_detection?.reasons?.some(
//                           (r: string) =>
//                             r.includes("No human face")
//                         )
//                           ? "No Face"
//                           : "Detected"
//                       }

//                     </h4>

//                   </div>

//                   {/* METADATA */}

//                   <div className="bg-[#0b0b0b] border border-gray-800 rounded-xl p-5">

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

//                   </div>

//                   {/* SENSOR */}

//                   <div className="bg-[#0b0b0b] border border-gray-800 rounded-xl p-5">

//                     <p className="text-gray-500 text-sm uppercase">
//                       Sensor Noise
//                     </p>

//                     <h4 className="text-2xl font-bold mt-3 text-cyan-400">

//                       {
//                         result?.ai_detection?.reasons?.some(
//                           (r: string) =>
//                             r.includes("noise")
//                         )
//                           ? "Artificial"
//                           : "Natural"
//                       }

//                     </h4>

//                   </div>

//                 </div>

//               </div>



//               {/* CARD 2 - METADATA */}
//               <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
//                 <div className="flex items-center justify-between mb-5">
//                   <div>
//                     <p className="text-zinc-400 uppercase tracking-widest text-xs mb-2">
//                       Intelligence Data
//                     </p>
//                     <h2 className="text-3xl font-black">
//                       Metadata Analysis
//                     </h2>
//                   </div>
//                   <div className="bg-blue-500/10 border border-blue-500/20 text-blue-400 px-4 py-2 rounded-2xl font-semibold">
//                     {Object.keys(result.metadata).length} Fields
//                   </div>
//                 </div>
//                 <div className="space-y-4 max-h-[350px] overflow-y-auto pr-2">
//                   {
//                     Object.entries(result.metadata).map(
//                       ([key, value]: any) => (
//                         <div
//                           key={key}
//                           className="bg-black/30 border border-zinc-800 rounded-2xl p-4"
//                         >
//                           <p className="text-blue-400 font-semibold mb-2 text-sm uppercase tracking-wider">
//                             {key}
//                           </p>
//                           <p className="text-zinc-300 break-all text-sm leading-relaxed">
//                             {value}
//                           </p>
//                         </div>
//                       )
//                     )
//                   }
//                 </div>
//                 <a
//                   href={`http://127.0.0.1:8000/download-report/${result.filename}`}
//                   target="_blank"
//                   className="mt-8 inline-block bg-green-600 hover:bg-green-700 transition-all duration-300 px-6 py-4 rounded-2xl font-bold shadow-lg"
//                 >
//                   Download Forensic Report
//                 </a>
//               </div>

//             </div>

//           )
//         }
//       </main>
//     </div>
//   )
// }


"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Sidebar from "@/components/sidebar"
import Header from "@/components/Header"
import ThreatScoreDistribution from "@/components/ThreatScoreDistribution"
import AuthenticityBreakdown from "@/components/AuthenticityBreakdown"
import RecentInvestigations from "@/components/RecentInvestigations"
import ThreatIntelligenceFeed from "@/components/ThreatIntelligenceFeed"
import {
  Shield,
  AlertTriangle,
  Activity,
  FileSearch,
  Globe,
  FileText,
  Camera,
  ScanLine,
  Bot,
  TrendingUp
} from "lucide-react"

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid
} from "recharts"
import { report } from "process"

export default function DashboardPage() {

  const [history, setHistory] = useState<any[]>([])
  const [reportCount, setReportCount] = useState(0)

  useEffect(() => {

    fetch("http://127.0.0.1:8000/history")
      .then(res => res.json())
      .then(data => setHistory(data))
      .catch(console.error)

  }, [])

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/stats"
        )
        const data = await response.json()
        setReportCount(
          data.reports_generated || 0
        )
      } catch (error) {
        console.error(
          "Failed to load stats",
          error
        )
      }
    }
    fetchStats()
  }, [])

  const total = history.length

  const high = history.filter(
    item => item.risk_level === "HIGH"
  ).length

  const medium = history.filter(
    item => item.risk_level === "MEDIUM"
  ).length

  const low = history.filter(
    item => item.risk_level === "LOW"
  ).length

  const threatDistribution = [
    {
      range: "0-20",
      count: history.filter(
        item => item.threat_score <= 20
      ).length
    },
    {
      range: "21-40",
      count: history.filter(
        item =>
          item.threat_score > 20 &&
          item.threat_score <= 40
      ).length
    },
    {
      range: "41-60",
      count: history.filter(
        item =>
          item.threat_score > 40 &&
          item.threat_score <= 60
      ).length
    },
    {
      range: "61-80",
      count: history.filter(
        item =>
          item.threat_score > 60 &&
          item.threat_score <= 80
      ).length
    },
    {
      range: "81-100",
      count: history.filter(
        item =>
          item.threat_score > 80
      ).length
    }
  ]

  const pieData = [
    {
      name: "Authentic",
      value: low,
    },
    {
      name: "Manipulated",
      value: high,
    },
    {
      name: "Review",
      value: medium,
    },
  ]

  const sortedHistory = [...history].sort(
    (a, b) =>
      new Date(b.timestamp).getTime() -
      new Date(a.timestamp).getTime()
  )

  return (

    <div className="min-h-screen bg-[#070B14] text-white flex">

      <Sidebar />

      <main className="flex-1 p-4 overflow-y-auto ml-[230px] pt-24">

        {/* HEADER */}
        <Header title="Dashboard" subtitle="Overview" />

        {/* KPI CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-4">
          {/* CARD 1 */}
          <div className="relative overflow-hidden rounded-3xl bg-[#050914] border-r border-[#1b2435] shadow-[0_0_30px_rgba(0,0,0,0.25)] border border-cyan-500/20 px-7 py-5 hover:scale-[1.02] hover:border-cyan-400/40 transition-all duration-300 cursor-pointer">
            <div className="absolute top-0 left-0 w-full h-1 bg-cyan-400" />
            <p className="text-[#8d97b3] uppercase tracking-widest text-xs font-semibold">
              Images Analyzed
            </p>
            <h2 className="text-4xl font-black text-white mt-2 leading-none">
              {total}
            </h2>
            <p className="text-cyan-400 text-xs mt-1">
              Total Processed
            </p>
            <Shield
              size={38}
              className="absolute bottom-8 right-8 text-cyan-500/30"
            />
          </div>

          {/* CARD 2 */}
          <div className="relative overflow-hidden rounded-3xl bg-[#050914] border-r border-[#1b2435] shadow-[0_0_30px_rgba(0,0,0,0.25)] border border-red-500/20 px-7 py-5 hover:scale-[1.02] hover:border-red-400/40 transition-all duration-300 cursor-pointer">
            <div className="absolute top-0 left-0 w-full h-1 bg-red-500" />
            <p className="text-[#8d97b3] uppercase tracking-widest text-sm font-semibold">
              Manipulated Detected
            </p>
            <h2 className="text-4xl font-black text-white mt-2 leading-none">
              {high}
            </h2>
            <p className="text-red-400 text-xs mt-1">
              High Risk
            </p>
            <AlertTriangle
              size={38}
              className="absolute bottom-8 right-8 text-red-500/30"
            />
          </div>

          {/* CARD 3 */}
          <div className="relative overflow-hidden rounded-3xl bg-[#050914] border-r border-[#1b2435] shadow-[0_0_30px_rgba(0,0,0,0.25)] border border-yellow-500/20 px-7 py-5 hover:scale-[1.02] hover:border-yellow-400/40 transition-all duration-300 cursor-pointer">
            <div className="absolute top-0 left-0 w-full h-1 bg-yellow-400" />
            <p className="text-[#8d97b3] uppercase tracking-widest text-sm font-semibold">
              Manual Review
            </p>
            <h2 className="text-4xl font-black text-white mt-2 leading-none">
              {medium}
            </h2>
            <p className="text-yellow-400 text-xs mt-1">
              Requires Attention
            </p>
            <Globe
              size={38}
              className="absolute bottom-8 right-8 text-yellow-500/30"
            />
          </div>

          {/* CARD 4 */}
          <div className="relative overflow-hidden rounded-3xl bg-[#050914] border-r border-[#1b2435] shadow-[0_0_30px_rgba(0,0,0,0.25)] border border-violet-500/20 px-7 py-5 hover:scale-[1.02] hover:border-violet-400/40 transition-all duration-300 cursor-pointer">
            <div className="absolute top-0 left-0 w-full h-1 bg-violet-500" />
            <p className="text-[#8d97b3] uppercase tracking-widest text-sm font-semibold">
              Reports Generated
            </p>
            <h2 className="text-4xl font-black text-white mt-2 leading-none">
              {reportCount}
            </h2>
            <p className="text-violet-400 text-xs mt-1">
              Authentic Media
            </p>
            <FileText
              size={38}
              className="absolute bottom-8 right-8 text-violet-500/30"
            />
          </div>
        </div>

        {/* CHARTS */}
        <div className="grid xl:grid-cols-3 gap-4 mb-4">
          {/* BAR CHART */}
          <ThreatScoreDistribution
            data={threatDistribution}
          />
          {/* PIE */}
          <AuthenticityBreakdown
            data={pieData}
          />
        </div>

        {/* TABLE + ALERTS */}

        <div className="grid xl:grid-cols-3 gap-8">

          {/* RECENT INVESTIGATIONS */}
          <RecentInvestigations
            history={sortedHistory}
          />

          {/* ALERTS */}
          <ThreatIntelligenceFeed
            history={history}
          />

          {/* <div className="bg-[#111827] rounded-3xl border border-zinc-800 p-6">

            <h2 className="text-2xl font-bold mb-6">
              Threat Intelligence Feed
            </h2>

            <div className="space-y-4 ">

              {
                history
                  .filter(item => item.risk_reasons?.length)
                  .slice(0, 5)
                  .map(item => (

                    <div
                      key={item._id}
                      className="
                        bg-[#151b2d]
                        border
                        border-[#2a3247]
                        rounded-2xl
                        p-4
                        hover:bg-white/[0.02]
                        transition
                      "
                    >

                      <div className="flex gap-3 ">

                        <AlertTriangle
                          className="text-red-400 shrink-0"
                        />

                        <div>

                          <h4 className="font-semibold">
                            {item.filename}
                          </h4>

                          <p className="text-sm text-zinc-400 mt-1">
                            {item.risk_reasons[0]}
                          </p>

                        </div>

                      </div>

                    </div>

                  ))
              }

            </div>
          </div> */}
          {/* <div className="mt-8 bg-[#111827] rounded-3xl border border-zinc-800 p-6">
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp className="text-red-400" />
              <h2 className="text-2xl font-bold">
                Top Risk Cases
              </h2>
            </div>

            <div className="space-y-4">

              {
                [...history]
                  .sort(
                    (a,b) =>
                      b.threat_score - a.threat_score
                  )
                  .slice(0,5)
                  .map(item => (

                    <div
                      key={item._id}
                      className="
                      flex
                      justify-between
                      items-center
                      bg-black/20
                      rounded-2xl
                      p-4
                    "
                    >

                      <div>
                        <h4 className="font-semibold">
                          {item.filename}
                        </h4>

                        <p className="text-sm text-zinc-500">
                          {item.risk_level}
                        </p>
                      </div>

                      <div className="text-red-400 font-bold text-xl">
                        {item.threat_score}
                      </div>

                    </div>

                  ))
              }

            </div>

          </div> */}
        </div>
      </main>
    </div>
  )
}