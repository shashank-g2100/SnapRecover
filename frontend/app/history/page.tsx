// "use client"

// import axios from "axios"
// import { useEffect, useState } from "react"
// import Sidebar from "@/components/sidebar"
// import Link from "next/link"

// export default function HistoryPage() {

//   const [history, setHistory] = useState<any[]>([])
//   const [search, setSearch] = useState("")
//   const [filter, setFilter] = useState("ALL")

//   useEffect(() => {

//     fetchHistory()

//   }, [])

//   const fetchHistory = async () => {

//     try {

//       const response = await axios.get(
//         "http://127.0.0.1:8000/history"
//       )

//       setHistory(response.data)

//     } catch (error) {

//       console.log(error)
//     }
//   }

//   const filteredHistory = history.filter(
// 		(item: any) => {

// 			const matchesSearch = item.filename
// 				.toLowerCase()
// 				.includes(search.toLowerCase())

// 			const matchesFilter =
// 				filter === "ALL"
// 					? true
// 					: item.risk_level === filter

// 			return matchesSearch && matchesFilter
// 		}
// 	)

// return (

//   <div className="min-h-screen bg-gradient-to-br from-black via-zinc-950 to-zinc-900 text-white flex">

//     {/* SIDEBAR */}
//     <Sidebar />

//     {/* MAIN CONTENT */}
//     <main className="flex-1 p-6 md:p-10 overflow-y-auto">

//       {/* HEADER */}

//       <div className="mb-10">

//         <p className="text-blue-400 uppercase tracking-[0.3em] text-sm mb-3">
//           Investigation Logs
//         </p>

//         <h1 className="text-5xl font-black">
//           Investigation History
//         </h1>

//         <p className="text-zinc-400 mt-4 max-w-2xl">
//           Review all previously analyzed images, forensic reports,
//           metadata findings, and tampering detection results.
//         </p>

//       </div>

// 			<div className="flex flex-col lg:flex-row gap-4 mb-6 justify-between items-center ">
// 				{/* SEARCH */}
// 				<input
// 					type="text"
// 					placeholder="Search evidence file..."
// 					value={search}
// 					onChange={(e) =>
// 						setSearch(e.target.value)
// 					}
// 					className="
// 						bg-zinc-900
// 						border
// 						border-zinc-800
// 						rounded-xl
// 						px-5
// 						py-2
// 						w-full
// 						outline-none
// 						focus:border-blue-500
// 					"
// 				/>

// 				{/* FILTERS */}
// 				<div className="flex gap-3">
// 					{
// 						["ALL", "HIGH", "MEDIUM", "LOW"].map(
// 							(level) => (
// 								<button
// 									key={level}
// 									onClick={() =>
// 										setFilter(level)
// 									}
// 									className={`
// 										px-5
// 										py-2
// 										rounded-xl
// 										border
// 										transition
// 										${
// 											filter === level
// 												? "bg-blue-600 border-blue-500"
// 												: "bg-zinc-900 border-zinc-800"
// 										}
// 									`}
// 								>
// 									{level}
// 								</button>
// 							)
// 						)
// 					}
// 				</div>
// 			</div>

// 			{/* EMPTY STATE */}
//       {
//         history.length === 0 && (
//           <div className="bg-white/5 border border-white/10 rounded-3xl p-10 text-center mb-4">
//             <h2 className="text-3xl font-bold mb-3">
//               No Investigations Found
//             </h2>

//             <p className="text-zinc-400">
//               Upload and analyze an image to generate forensic history.
//             </p>
//           </div>
//         )
//       }

//       {/* HISTORY GRID */}

//       <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
// 				{
// 					filteredHistory.length === 0 && (

// 						<div className="
// 							col-span-full
// 							w-full
// 							bg-zinc-900
// 							border
// 							border-zinc-800
// 							rounded-2xl
// 							p-40
// 							text-center
// 							text-zinc-400
// 						">
// 							No investigations found.
// 						</div>
// 					)
// 				}

//         {
//           filteredHistory.map((item, index) => (
// 						<Link
// 							href={`/history/${item._id}`}
// 							key={`${item._id}-${index}`}
// 						>

// 							<div
// 								className="
// 									bg-white/5
// 									backdrop-blur-xl
// 									border
// 									border-white/10
// 									rounded-3xl
// 									p-8
// 									hover:border-blue-500/30
// 									transition-all
// 									duration-300
// 									hover:scale-[1.01]
// 									hover:bg-white/[0.07]
// 									cursor-pointer
// 								"
// 							>

//               {/* FILE NAME */}

//               <div className="mb-6">

//                 <p className="text-zinc-500 text-sm mb-2">
//                   Uploaded File
//                 </p>

//                 <h2 className="text-2xl font-black text-blue-400 break-all">
//                   {item.filename}
//                 </h2>

//               </div>

//               {/* TIMESTAMP */}

//               <div className="mb-6">

//                 <p className="text-zinc-500 text-sm mb-2">
//                   Investigation Timestamp
//                 </p>

//                 <p className="text-zinc-300">
//                   {item.timestamp}
//                 </p>

//               </div>

//               {/* STATUS */}

//               <div className="flex items-center justify-between">

//                 <div>

//                   <p className="text-zinc-500 text-sm mb-2">
//                     Investigation Status
//                   </p>

//                   <h2 className={`text-2xl font-black ${
//                     item.status.includes("Suspicious")
//                       ? "text-red-400"
//                       : "text-green-400"
//                   }`}>
//                     {item.status}
//                   </h2>

//                 </div>

//                 <div className={`px-4 py-2 rounded-2xl text-sm font-bold ${
//                   item.status.includes("Suspicious")
//                     ? "bg-red-500/10 text-red-400 border border-red-500/20"
//                     : "bg-green-500/10 text-green-400 border border-green-500/20"
//                 }`}>
//                   {
//                     item.status.includes("Suspicious")
//                       ? "HIGH RISK"
//                       : "SAFE"
//                   }
//                 </div>

//               </div>

//             </div>
// 						</Link>
//           ))
//         }
//       </div>
//     </main>
//   </div>
// )
// }

"use client"

import axios from "axios"
import { useEffect, useState } from "react"
import Sidebar from "@/components/sidebar"
import Link from "next/link"
import Header from "@/components/Header"

export default function HistoryPage() {

  const [history, setHistory] = useState<any[]>([])
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("ALL")

  useEffect(() => {

    fetchHistory()

  }, [])

  const fetchHistory = async () => {

    try {

      const response = await axios.get(
        "http://127.0.0.1:8000/history"
      )

      console.log(response.data)

      setHistory(response.data)

    } catch (error) {

      console.log(error)
    }
  }

  // FILTER LOGIC

  const filteredHistory = history.filter(
    (item: any) => {

      const matchesSearch =
        item.filename
          ?.toLowerCase()
          .includes(search.toLowerCase())

      const matchesFilter =
        filter === "ALL"
          ? true
          : item.risk_level === filter

      return matchesSearch && matchesFilter
    }
  )

  return (

    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-950 to-zinc-900 text-white flex">

      {/* SIDEBAR */}

      <Sidebar />

      {/* MAIN */}

      <main className="flex-1 p-5 overflow-y-auto ml-[230px] pt-24">

        {/* HEADER */}
        <Header
          title="History"
          subtitle="Investigation Timeline"
        />

        <div className="mb-10">

          <p className="text-blue-400 uppercase tracking-[0.3em] text-sm mb-3">
            Investigation Logs
          </p>

          <h1 className="text-5xl font-black">
            Investigation History
          </h1>

          <p className="text-zinc-400 mt-4 max-w-2xl">
            Review all forensic investigations,
            metadata findings, threat analysis,
            and tampering reports.
          </p>

        </div>

        {/* SEARCH + FILTER */}

        <div className="flex flex-col lg:flex-row gap-4 mb-8">

          {/* SEARCH */}

          <input
            type="text"
            placeholder="Search evidence file..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="
              bg-zinc-900
              border
              border-zinc-800
              rounded-xl
              px-5
              py-2
              w-full
              outline-none
              focus:border-blue-500
            "
          />

          {/* FILTER BUTTONS */}

          <div className="flex gap-3">
            {
              ["ALL", "HIGH", "MEDIUM", "LOW"].map(
                (level) => (
                  <button
                    key={level}
                    onClick={() =>
                      setFilter(level)
                    }
                    className={`
                      px-5
                      py-3
                      rounded-xl
                      border
                      transition
                      ${
                        filter === level
                          ? "bg-blue-600 border-blue-500"
                          : "bg-zinc-900 border-zinc-800"
                      }
                    `}
                  >
                    {level}
                  </button>
                )
              )
            }
          </div>
        </div>

        {/* EMPTY STATE */}
        {
          filteredHistory.length === 0 && (
            <div className="
              bg-zinc-900
              border
              border-zinc-800
              rounded-3xl
              p-20
              text-center
              text-zinc-400
            ">
              No investigations found.
            </div>
          )
        }

        {/* HISTORY GRID */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {
            filteredHistory.map((item: any, index: number) => {

              // SAFETY CHECK
              if (!item._id) {
                return null
              }
              return (
                <Link
                  href={`/history/${item._id}`}
                  key={item._id || index}
                >
                  <div
                    className="
                      bg-white/5
                      backdrop-blur-xl
                      border
                      border-white/10
                      rounded-3xl
                      p-8
                      hover:border-blue-500/30
                      transition-all
                      duration-300
                      hover:scale-[1.01]
                      hover:bg-white/[0.07]
                      cursor-pointer
                    "
                  >

                    {/* FILE */}
                    <div className="mb-4">

                      <p className="text-zinc-500 text-sm mb-2">
                        Uploaded File
                      </p>

                      <h2 className="text-2xl font-black text-blue-400 break-all">
                        {item.filename}
                      </h2>

                    </div>

                    {/* TIMESTAMP */}
                    <div className="mb-4">

                      <p className="text-zinc-500 text-sm mb-2">
                        Investigation Timestamp
                      </p>

                      <p className="text-zinc-300">
                        {item.timestamp}
                      </p>

                    </div>

                    {/* STATUS */}
                    <div className="flex items-center justify-between">
                      <div>

                        <p className="text-zinc-500 text-sm mb-2">
                          Investigation Status
                        </p>

                        <h2 className={`
                          text-2xl
                          font-black
                          ${
                            item.risk_level === "HIGH"
                              ? "text-red-400"
                              : item.risk_level === "MEDIUM"
                              ? "text-yellow-400"
                              : "text-green-400"
                          }
                        `}>
                          {item.status}
                        </h2>

                      </div>

                      {/* RISK BADGE */}

                      <div className={`
                        px-4
                        py-2
                        rounded-2xl
                        text-sm
                        font-bold
                        border
                        ${
                          item.risk_level === "HIGH"
                            ? "bg-red-500/10 text-red-400 border-red-500/20"
                            : item.risk_level === "MEDIUM"
                            ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                            : "bg-green-500/10 text-green-400 border-green-500/20"
                        }
                      `}>
                        {item.risk_level} RISK
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })
          }
        </div>
      </main>
    </div>
  )
}