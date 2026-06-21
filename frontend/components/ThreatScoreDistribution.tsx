"use client"

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts"

interface Props {
  data: {
    range: string
    count: number
  }[]
}

function CustomTooltip({
  active,
  payload,
}: any) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#111827] border border-[#1b2435] rounded-xl px-4 py-2 shadow-xl">
        <p className="text-[#12f7d6] font-semibold">
          Count : {payload[0].value}
        </p>
      </div>
    )
  }

  return null
}

export default function ThreatScoreDistribution({
  data,
}: Props) {
  return (
    <div className="xl:col-span-2 bg-[#050914] shadow-[0_0_40px_rgba(0,0,0,0.25)] rounded-[24px] border border-zinc-800 p-6">

      <div className="flex justify-between mb-6">

        <h2 className="text-2xl font-bold">
          Threat Score Distribution
        </h2>

        <div className="text-zinc-500 text-sm mt-2">
          Evidence Risk Intelligence
        </div>

      </div>

      <div className="h-[350px]">

        <ResponsiveContainer width="100%" height="100%">

          <BarChart data={data}>

            <CartesianGrid
              stroke="#1f2937"
            />

            <XAxis
              dataKey="range"
              stroke="#94a3b8"
            />

            <YAxis
              stroke="#94a3b8"
            />

            <Tooltip
              cursor={false}
              content={<CustomTooltip />}
            />

            <Bar
              dataKey="count"
              fill="#12f7d6"
              radius={[8, 8, 0, 0]}
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>
  )
}