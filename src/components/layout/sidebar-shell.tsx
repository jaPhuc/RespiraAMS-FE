"use client"

import { usePathname } from "next/navigation"

import { DashboardSidebar } from "./dashboard-sidebar"

export function SidebarShell() {
  const pathname = usePathname()
  const isDoctor = pathname.startsWith("/doctor")

  return <DashboardSidebar variant={isDoctor ? "doctor" : "manager"} />
}
