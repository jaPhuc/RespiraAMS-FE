"use client"

import { useState } from "react"

import { X } from "lucide-react"

import { cn } from "@/src/lib/utils"
import { Button } from "@/src/components/ui/button"

import { SidebarNav } from "./sidebar-nav"

interface DashboardSidebarProps {
  variant?: "manager" | "doctor"
}

export function DashboardSidebar({ variant = "manager" }: DashboardSidebarProps) {
  const [open, setOpen] = useState(false)

  const isDoctor = variant === "doctor"

  return (
    <>
      {/* Mobile Overlay */}
      {open && (
        <div
          className="
            fixed inset-0 z-40
            bg-black/40
            lg:hidden
          "
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          `
          fixed left-0 top-0 z-50
          flex h-screen w-70 flex-col
          py-6
          transition-transform duration-300
          `,
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
          isDoctor
            ? "border-r border-gray-200 bg-[#ECEEF0]"
            : "border-r border-slate-700/20 bg-[#0d2b3e]"
        )}
      >
        {/* Header */}
        <div className="mb-10 flex items-center justify-between px-6">
          <div>
            <h1 className={cn("text-2xl font-bold", isDoctor ? "text-gray-800" : "text-sky-300")}>
              RespiraAMS
            </h1>

            <p className={cn("text-sm", isDoctor ? "text-gray-500" : "text-slate-300/70")}>
              Hospital System
            </p>
          </div>

          <Button
            size="icon"
            variant="ghost"
            className={cn(isDoctor ? "text-gray-600" : "text-white", "lg:hidden")}
            onClick={() => setOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <SidebarNav variant={variant} />
      </aside>

      {/* Mobile Trigger */}
      <Button
        size="icon"
        className="
          fixed left-4 top-4 z-30
          lg:hidden
        "
        onClick={() => setOpen(true)}
      >
        ☰
      </Button>
    </>
  )
}