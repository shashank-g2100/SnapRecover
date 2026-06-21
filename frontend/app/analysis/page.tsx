// "use client"

// import axios from "axios"
// import { useEffect, useState } from "react"
// import Sidebar from "@/components/sidebar"

// export default function AnalysisPage() {

// return (

//   <div className="min-h-screen bg-gradient-to-br from-black via-zinc-950 to-zinc-900 text-white flex">

//     {/* SIDEBAR */}
//     <Sidebar />

//     {/* MAIN CONTENT */}
//     <main className="flex-1 p-6 md:p-10 overflow-y-auto">

//       {/* HEADER */}

//       <div className="mb-10">

//         <p className="text-blue-400 uppercase tracking-[0.3em] text-sm mb-3">
//           Analysis
//         </p>

//         <h1 className="text-5xl font-black">
//           Image Analysis
//         </h1>

//         <p className="text-zinc-400 mt-4 max-w-2xl">
//           Review all previously analyzed images, forensic reports,
//           metadata findings, and tampering detection results.
//         </p>

//       </div>
      
//     </main>
//   </div>
// )
// }

// "use client"

// import { useEffect, useState } from "react"

// import {
//   PieChart,
//   Pie,
//   Cell,
//   Tooltip,
//   ResponsiveContainer,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid
// } from "recharts"

// export default function AnalyticsPage() {

//   const [data, setData] = useState<any[]>([])

//   useEffect(() => {

//     fetch("http://127.0.0.1:8000/history")

//       .then(res => res.json())

//       .then(res => setData(res))

//   }, [])

//   const high = data.filter(
//     item => item.risk_level === "HIGH"
//   ).length

//   const medium = data.filter(
//     item => item.risk_level === "MEDIUM"
//   ).length

//   const low = data.filter(
//     item => item.risk_level === "LOW"
//   ).length

//   const chartData = [
//     { name: "High", value: high },
//     { name: "Medium", value: medium },
//     { name: "Low", value: low }
//   ]

//   const barData = data.map((item, index) => ({
//     name: `Case ${index + 1}`,
//     score: item.threat_score || 0
//   }))

//   return (

//     <div className="min-h-screen bg-black text-white p-10">

//       <h1 className="text-5xl font-bold mb-10">
//         Forensic Analytics Dashboard
//       </h1>

//       {/* STATS */}

//       <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">

//         <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800">

//           <p className="text-zinc-400">
//             Total Investigations
//           </p>

//           <h2 className="text-5xl font-bold mt-4 text-blue-400">
//             {data.length}
//           </h2>

//         </div>

//         <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800">

//           <p className="text-zinc-400">
//             High Risk
//           </p>

//           <h2 className="text-5xl font-bold mt-4 text-red-400">
//             {high}
//           </h2>

//         </div>

//         <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800">

//           <p className="text-zinc-400">
//             Medium Risk
//           </p>

//           <h2 className="text-5xl font-bold mt-4 text-yellow-400">
//             {medium}
//           </h2>

//         </div>

//         <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800">

//           <p className="text-zinc-400">
//             Low Risk
//           </p>

//           <h2 className="text-5xl font-bold mt-4 text-green-400">
//             {low}
//           </h2>

//         </div>

//       </div>

//       {/* CHARTS */}

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

//         {/* PIE CHART */}

//         <div className="bg-zinc-900 p-8 rounded-2xl border border-zinc-800">

//           <h2 className="text-3xl font-bold mb-8">
//             Threat Distribution
//           </h2>

//           <div className="h-[400px]">

//             <ResponsiveContainer width="100%" height="100%">

//               <PieChart>

//                 <Pie
//                   data={chartData}
//                   dataKey="value"
//                   outerRadius={140}
//                   label
//                 >

//                   <Cell fill="#ef4444" />
//                   <Cell fill="#facc15" />
//                   <Cell fill="#22c55e" />

//                 </Pie>

//                 <Tooltip />

//               </PieChart>

//             </ResponsiveContainer>

//           </div>

//         </div>

//         {/* BAR CHART */}

//         <div className="bg-zinc-900 p-8 rounded-2xl border border-zinc-800">

//           <h2 className="text-3xl font-bold mb-8">
//             Threat Scores
//           </h2>

//           <div className="h-[400px]">

//             <ResponsiveContainer width="100%" height="100%">

//               <BarChart data={barData}>

//                 <CartesianGrid strokeDasharray="3 3" />

//                 <XAxis dataKey="name" />

//                 <YAxis />

//                 <Tooltip />

//                 <Bar
//                   dataKey="score"
//                   fill="#3b82f6"
//                 />

//               </BarChart>

//             </ResponsiveContainer>

//           </div>

//         </div>

//       </div>

//     </div>
//   )
// }

"use client"

import { useEffect, useState } from "react"

import Sidebar from "@/components/sidebar"

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid
} from "recharts"

export default function AnalysisPage() {

  const [data, setData] = useState<any[]>([])

  useEffect(() => {

    fetch("http://127.0.0.1:8000/history")

      .then(res => res.json())

      .then(res => setData(res))

  }, [])

  const high = data.filter(
    item => item.risk_level === "HIGH"
  ).length

  const medium = data.filter(
    item => item.risk_level === "MEDIUM"
  ).length

  const low = data.filter(
    item => item.risk_level === "LOW"
  ).length

  const chartData = [
    { name: "High", value: high },
    { name: "Medium", value: medium },
    { name: "Low", value: low }
  ]

  const barData = data.map((item, index) => ({
    name: `Case ${index + 1}`,
    score: item.threat_score || 0
  }))

  return (

    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-950 to-zinc-900 text-white flex">

      {/* SIDEBAR */}

      <Sidebar />

      {/* MAIN */}

      <main className="flex-1 p-6 md:p-10 overflow-y-auto">

        {/* HEADER */}

        <div className="mb-10">

          <p className="text-blue-400 uppercase tracking-[0.3em] text-sm mb-3">
            Analytics Dashboard
          </p>

          <h1 className="text-5xl font-black">
            Forensic Analytics
          </h1>

          <p className="text-zinc-400 mt-4 max-w-2xl">
            Analyze investigation history, risk distributions,
            threat intelligence, and forensic detection metrics
            across all uploaded evidence files.
          </p>

        </div>

        {/* STATS */}

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-6">

          {/* TOTAL */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl hover:border-white/30 transition-all duration-300 hover:scale-[1.01]">
            <p className="text-zinc-400 uppercase tracking-widest text-xs mb-1">
              Total Investigations
            </p>

            <h2 className="text-5xl font-black text-blue-400">
              {data.length}
            </h2>
          </div>

          {/* HIGH */}
          <div className="bg-white/5 backdrop-blur-xl border border-red-500/20 rounded-3xl p-8 shadow-2xl hover:border-red-500/30 transition-all duration-300 hover:scale-[1.01]">
            <p className="text-zinc-400 uppercase tracking-widest text-xs mb-1">
              High Risk
            </p>

            <h2 className="text-5xl font-black text-red-400">
              {high}
            </h2>
          </div>

          {/* MEDIUM */}
          <div className="bg-white/5 backdrop-blur-xl border border-yellow-500/20 rounded-3xl p-8 shadow-2xl hover:border-yellow-500/30 transition-all duration-300 hover:scale-[1.01]">
            <p className="text-zinc-400 uppercase tracking-widest text-xs mb-1">
              Medium Risk
            </p>

            <h2 className="text-5xl font-black text-yellow-400">
              {medium}
            </h2>
          </div>

          {/* LOW */}
          <div className="bg-white/5 backdrop-blur-xl border border-green-500/20 rounded-3xl p-8 shadow-2xl hover:border-green-500/30 transition-all duration-300 hover:scale-[1.01]">
            <p className="text-zinc-400 uppercase tracking-widest text-xs mb-1">
              Low Risk
            </p>

            <h2 className="text-5xl font-black text-green-400">
              {low}
            </h2>
          </div>
        </div>

        {/* CHARTS */}

        <div className="grid grid-cols-1 2xl:grid-cols-2 gap-6">

          {/* PIE CHART */}

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">

            <div>

              <p className="text-zinc-400 uppercase tracking-widest text-sm mb-2">
                Risk Intelligence
              </p>

              <h2 className="text-3xl font-black">
                Threat Distribution
              </h2>

            </div>

            <div className="h-[400px]">

              <ResponsiveContainer width="100%" height="100%">

                <PieChart>

                  <Pie
                    data={chartData}
                    dataKey="value"
                    outerRadius={150}
                    label
                  >

                    <Cell fill="#ef4444" />
                    <Cell fill="#facc15" />
                    <Cell fill="#22c55e" />

                  </Pie>

                  <Tooltip />

                </PieChart>

              </ResponsiveContainer>

            </div>

          </div>

          {/* BAR CHART */}

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">

            <div className="mb-6">

              <p className="text-zinc-400 uppercase tracking-widest text-sm mb-2">
                Threat Intelligence
              </p>

              <h2 className="text-3xl font-black">
                Threat Scores
              </h2>

            </div>

            <div className="h-[400px]">

              <ResponsiveContainer width="100%" height="100%">

                <BarChart data={barData}>

                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#27272a"
                  />

                  <XAxis
                    dataKey="name"
                    stroke="#a1a1aa"
                  />

                  <YAxis stroke="#a1a1aa" />

                  <Tooltip />

                  <Bar
                    dataKey="score"
                    fill="#3b82f6"
                    radius={[10, 10, 0, 0]}
                  />

                </BarChart>

              </ResponsiveContainer>

            </div>

          </div>

        </div>

      </main>

    </div>
  )
}