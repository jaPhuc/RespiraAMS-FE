"use client"

import { useState } from "react"

import { X } from "lucide-react"

import { Button } from "@/src/components/ui/button"

import { SidebarNav } from "./sidebar-nav"

export function DashboardSidebar() {
  const [open, setOpen] = useState(false)

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
        className={`
          fixed left-0 top-0 z-50
          flex h-screen w-70 flex-col
          border-r border-slate-700/20
          bg-[#0d2b3e]
          py-6
          transition-transform duration-300
     
          ${
            open
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
        `}
      >
        {/* Header */}
        <div className="mb-10 flex items-center justify-between px-6">
          <div>
            <h1 className="text-2xl font-bold text-sky-300">
              RespiraAMS
            </h1>

            <p className="text-sm text-slate-300/70">
              Hospital System
            </p>
          </div>

          <Button
            size="icon"
            variant="ghost"
            className="text-white lg:hidden"
            onClick={() => setOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <SidebarNav />
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