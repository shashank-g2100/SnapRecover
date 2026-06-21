"use client"

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts"

interface PieData {
  name: string
  value: number
}

interface AuthenticityBreakdownProps {
  data: PieData[]
}

export default function AuthenticityBreakdown({
  data,
}: AuthenticityBreakdownProps) {
  return (
    <div className="bg-[#050914] rounded-[24px] border border-[#1b2435] p-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold tracking-tight">
                Authenticity Breakdown
              </h2>
              <div className="px-4 py-2 rounded-full bg-[#11182c] text-[#6f7a98] text-sm">
                All time
              </div>
            </div>
            {/* Chart */}
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    dataKey="value"
                    cx="50%"
                    cy="48%"
                    innerRadius={95}
                    outerRadius={145}
                    paddingAngle={1}
                    stroke="#0d1322"
                    strokeWidth={3}
                  >
                    <Cell fill="#12f7d6" />
                    <Cell fill="#ff4d6d" />
                    <Cell fill="#d4af37" />
                  </Pie>
                  <Tooltip
                    cursor={false}
                    contentStyle={{
                      backgroundColor: "#111827",
                      border: "1px solid #1b2435",
                      borderRadius: "12px",
                      color: "#fff"
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            {/* Legend */}
            <div className="flex justify-center gap-2 -mt-4">
              <div className="flex items-center gap-2">
                <div className="w-12 h-2 bg-[#12f7d6]" />
                <span className="text-[#8d97b3]">
                  Authentic
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-12 h-2 bg-[#ff4d6d]" />
                <span className="text-[#8d97b3]">
                  Manipulated
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-12 h-2 bg-[#d4af37]" />
                <span className="text-[#8d97b3]">
                  Review
                </span>
              </div>
            </div>
          </div>
  )
}