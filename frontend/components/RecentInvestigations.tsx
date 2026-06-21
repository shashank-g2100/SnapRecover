"use client"

interface Investigation {
  _id: string
  filename: string
  threat_score: number
  risk_level: string
  status: string
  timestamp: string
}

interface Props {
  history: Investigation[]
}

export default function RecentInvestigations({
  history,
}: Props) {
  return (
    <div className="xl:col-span-2 bg-[#050914] rounded-[24px] border border-[#1b2435] p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold tracking-tight">
          Recent Investigations
        </h2>
        <button
          className="
            px-5 py-2
            rounded-xl
            bg-[#141c2e]
            text-[#9aa5c3]
            hover:text-white
            transition
          "
        >
          View All
        </button>

      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full table-fixed">
					<thead>
						<tr className="border-b border-[#1b2435] text-[#6f7a98] text-[12px] uppercase tracking-[0.2em]">
							<th className="w-[40%] text-left py-2 px-4">
								File
							</th>
							<th className="w-[20%] text-left py-2">
								Status
							</th>
							<th className="w-[15%] text-left py-2">
								Risk
							</th>
							<th className="w-[20%] text-left py-2">
								Date
							</th>
							<th className="w-[15%] text-left py-2">
								Action
							</th>
						</tr>
					</thead>

					<tbody>
						{history.slice(0, 6).map((item) => (
							<tr
								key={item._id}
								className="
									border-b border-[#141c2e]
									hover:bg-blue-950/30
								  transition all duration-300
								"
							>
								{/* FILE */}
								<td className="py-4 px-4">
									<div
										className="
											font-semibold
											text-white
											truncate
										"
									>
										{item.filename}
									</div>
								</td>

								{/* STATUS */}
								<td>
									{item.risk_level === "LOW" && (
										<span className="inline-flex items-center px-4 py-1.5 rounded-full bg-emerald-500/15 text-emerald-400 text-sm font-semibold">
											✓ Clean
										</span>
									)}
									{item.risk_level === "MEDIUM" && (
										<span className="inline-flex items-center px-4 py-1.5 rounded-full bg-yellow-500/15 text-yellow-400 text-sm font-semibold">
											⚠ Warning
										</span>
									)}
									{item.risk_level === "HIGH" && (
										<span className="inline-flex items-center px-4 py-1.5 rounded-full bg-red-500/15 text-red-400 text-sm font-semibold">
											✕ Suspect
										</span>
									)}
								</td>

								{/* RISK */}
								<td className="text-[#9aa5c3] text-sm">
									{item.risk_level}
								</td>

								{/* DATE */}
								<td className="text-[#9aa5c3] text-sm">
									{new Date(item.timestamp).toLocaleDateString()}
								</td>

								{/* ACTION */}
								<td>
									<button
										className="
											px-5 py-1.5
											rounded-xl
											bg-[#141c2e]
											text-[#9aa5c3]
											border border-transparent
											hover:border-[#12f7d6]
											hover:text-[#12f7d6]
											transition
										"
									>
										View
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden space-y-4">
        {history.slice(0, 5).map((item) => (
          <div
            key={item._id}
            className="
              p-4
              rounded-2xl
              bg-[#111827]
              border border-[#1b2435]
            "
          >
            <div className="font-semibold text-white">
              {item.filename}
            </div>
            <div className="mt-2 text-sm text-[#8d97b3]">
              Score: {item.threat_score}
            </div>
            <div className="mt-1 text-sm text-[#8d97b3]">
              {item.timestamp?.split(" ")[0]}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}