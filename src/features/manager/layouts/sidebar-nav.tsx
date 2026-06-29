"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { NAVIGATION_ITEMS, DOCTOR_NAVIGATION_ITEMS } from "@/src/constants/navigations"

interface SidebarNavProps {
  variant?: "manager" | "doctor"
}

export function SidebarNav({ variant = "manager" }: SidebarNavProps) {
  const pathname = usePathname()
  const items = variant === "doctor" ? DOCTOR_NAVIGATION_ITEMS : NAVIGATION_ITEMS

  const isActiveStyle = variant === "doctor"
    ? "border-l-4 border-primary bg-primary/10 font-semibold text-primary"
    : "border-l-4 border-sky-300 bg-slate-900/20 font-semibold text-sky-300"

  const inactiveStyle = variant === "doctor"
    ? "text-gray-600 hover:bg-gray-200/70 hover:text-gray-900"
    : "text-slate-300 hover:bg-slate-900/20 hover:text-white"

  return (
    <nav className="flex-1 space-y-1">
      {items.map((item) => {
        const Icon = item.icon
        const isActive = pathname === item.href || pathname.startsWith(item.href + "/")

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-4 py-3 pl-5 transition-all duration-200 ${isActive ? isActiveStyle : inactiveStyle}`}
          >
            <Icon size={20} />
            <span>{item.label}</span>
          </Link>
        )
      })}
    </nav>
  )
}
