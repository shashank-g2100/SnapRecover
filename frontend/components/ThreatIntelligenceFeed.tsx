"use client"

import { AlertTriangle } from "lucide-react"

interface HistoryItem {
  _id: string
  filename: string
  risk_reasons?: string[]
}

interface Props {
  history: HistoryItem[]
}

export default function ThreatIntelligenceFeed({
  history,
}: Props) {
  const alerts = history
    .filter(item => item.risk_reasons?.length)
    .slice(0, 5)

  return (
    <div className="bg-[#050914] rounded-[24px] border border-[#1b2435] p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold tracking-tight">
          Threat Intelligence Feed
        </h2>
        <div className="px-4 py-2 rounded-full bg-[#11182c] text-[#6f7a98] text-sm">
          Live Feed
        </div>
      </div>

      {/* Feed */}
      <div className="space-y-3">
        {alerts.length > 0 ? (
          alerts.map((item) => (
            <div
              key={item._id}
              className="
                bg-[#11182c]
                border border-[#1b2435]
                rounded-2xl
                p-3
                hover:border-red-500/30
                hover:bg-[#151b2d]
                transition-all
                duration-300
              "
            >
              <div className="flex items-start gap-4">
                <div
                  className="
                    h-10 w-10
                    rounded-xl
                    bg-red-500/10
                    flex items-center justify-center
                    shrink-0
                  "
                >
                  <AlertTriangle
                    size={18}
                    className="text-red-400"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <h4
                    className="
                      text-white
                      font-semibold
                      truncate
                    "
                  >
                    {item.filename}
                  </h4>
                  <p
                    className="
                      text-sm
                      text-[#8d97b3]
                    "
                  >
                    {item.risk_reasons?.[0]}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div
            className="
              h-[250px]
              flex items-center justify-center
              text-[#6f7a98]
            "
          >
            No active threats detected
          </div>
        )}
      </div>
    </div>
  )
}