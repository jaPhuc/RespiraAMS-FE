"use client"

import Link from "next/link"

import { usePathname } from "next/navigation"

import { NAVIGATION_ITEMS } from "@/src/constants/navigations"

export function SidebarNav() {
  const pathname = usePathname()

  return (
    <nav className="flex-1 space-y-1">
      {NAVIGATION_ITEMS.map((item) => {
        const Icon = item.icon

        const isActive =
          pathname === item.href ||
          pathname.startsWith(item.href + "/")

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`
flex items-center gap-4
py-3 pl-5
transition-all duration-200

${
  isActive
    ? "border-l-4 border-sky-300 bg-slate-900/20 font-semibold text-sky-300"
    : "text-slate-300 hover:bg-slate-900/20 hover:text-white"
}
`}
          >
            <Icon size={20} />

            <span>{item.label}</span>
          </Link>
        )
      })}
    </nav>
  )
}