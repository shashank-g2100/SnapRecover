"use client"

import { Activity } from "lucide-react"
import Link from "next/link"

interface HeaderProps {
  title: string
  subtitle?: string
}

export default function Header({
  title,
  subtitle = "Overview",
}: HeaderProps) {
  return (
    <header className="h-20 border-b border-[#1b2435] bg-[#070b15] px-6 py-6 flex items-center justify-between fixed top-0 left-[230px] right-0 z-50">

      {/* LEFT */}
      <div className="flex flex-col justify-center">
        <h1 className="text-3xl font-black tracking-tight text-white">
          {title}
        </h1>

        <div className="flex items-center gap-1 text-[#6f7a98]">
          <span>SnapRecover</span>
          <span>/</span>
          <span>{subtitle}</span>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-2 ">

        {/* System Active */}
        <div className="flex items-center gap-3 px-6 py-2 rounded-full border border-[#1b2435] bg-[#0d1322]">
          <Activity
            size={12}
            fill="#12f7d6"
            className="text-[#12f7d6]"
          />

          <div>
            System Active
          </div>
        </div>

        {/* Analyze Button */}
        <Link
          href="/analyzer"
          className="
            px-6 py-2
            rounded-2xl
            bg-[#12f7d6]
            hover:bg-[#0fe0c2]
            text-[#050914]
            font-bold
            transition-all
            hover:scale-105
            duration-300
          "
        >
          + Analyze Image
        </Link>

      </div>
    </header>
  )
}