"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import {
  LayoutGrid,
  ScanSearch,
  FileText,
  History,
  SunMedium,
  Hexagon,
} from "lucide-react"

export default function Sidebar() {
  const pathname = usePathname()

  const navItems = [
    {
      name: "Dashboard",
      href: "/",
      icon: LayoutGrid,
    },
    {
      name: "Analyzer",
      href: "/analyzer",
      icon: ScanSearch,
    },
    {
      name: "Reports",
      href: "/reports",
      icon: FileText,
    },
    {
      name: "History",
      href: "/history",
      icon: History,
    },
  ]

  return (
    <aside className="w-[230px] bg-[#050914] border-r border-[#1b2435] h-screen flex flex-col justify-between fixed top-0 left-0 z-50 overflow-y-auto">

      {/* TOP */}
      <div>
        {/* Logo */}
        <div className="h-20 border-b border-[#1b2435] flex items-center px-6">
          <div className="flex items-center gap-3">
            <Hexagon
              size={24}
              className="text-[#12f7d6]"
              strokeWidth={1.8}
            />

            <h1 className="text-[22px] font-extrabold tracking-wide">
              <span className="text-white">
                Snap
              </span>
              <span className="text-[#a8fff3]">
                Recover
              </span>
            </h1>
          </div>
        </div>

        {/* Navigation */}
        <div className="px-2 py-5 space-y-2">

          {navItems.map((item) => {
            const isActive = pathname === item.href

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`
                  relative flex items-center gap-4
                  px-6 py-2 rounded-2xl
                  transition-all duration-300
                  group
                  ${
                    isActive
                      ? "bg-[#0b3a35] text-[#12f7d6]"
                      : "text-[#8d97b3] hover:bg-[#0d1322] hover:text-white"
                  }
                `}
              >
                {isActive && (
                  <div className="absolute left-0 top-3 bottom-3 w-1 rounded-full bg-[#12f7d6]" />
                )}

                <item.icon
                  size={22}
                  strokeWidth={2}
                />

                <span className="font-semibold text-[18px]">
                  {item.name}
                </span>
              </Link>
            )
          })}
        </div>
      </div>

      {/* BOTTOM */}
      <div className="border-t border-[#1b2435] px-6 py-7">

        <div className="flex items-center justify-between">

          {/* Theme Button */}
          <button
            className="
              h-12 w-12
              rounded-full
              bg-[#11182c]
              hover:bg-[#17213a]
              flex items-center justify-center
              transition
            "
          >
            <SunMedium
              size={18}
              className="text-[#8d97b3]"
            />
          </button>

          {/* Version Badge */}
          <div
            className="
              px-3 py-2
              rounded-lg
              bg-[#11182c]
              text-[#6f7a98]
              text-sm
              font-medium
            "
          >
            v1.0.0
          </div>
        </div>
      </div>
    </aside>
  )
}