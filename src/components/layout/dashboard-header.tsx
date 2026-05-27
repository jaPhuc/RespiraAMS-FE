"use client"

import {
  Bell,
  Search,
  Settings,
} from "lucide-react"

import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"

export function DashboardHeader() {
  return (
    <header
      className="
        sticky top-0 z-30
        flex h-16 items-center justify-between
        border-b bg-white/80
        px-4 lg:px-6
        backdrop-blur
      "
    >
      <div className="flex items-center gap-4">
        <h2 className="hidden text-xl font-bold md:block">
          Hospital Management
        </h2>

        <div className="hidden h-6 w-px bg-border md:block" />

        <div className="group relative hidden md:block">
          <Search
            className="
              absolute left-3 top-1/2
              h-4 w-4 -translate-y-1/2
              text-muted-foreground
            "
          />

          <Input
            placeholder="Search registry..."
            className="
              w-64 rounded-full pl-10
              transition-all duration-300
              group-hover:w-80
            "
          />
        </div>
      </div>

      <div className="ml-auto flex items-center gap-2">
        <Button
          size="icon"
          variant="ghost"
        >
          <Bell className="h-5 w-5" />
        </Button>

        <Button
          size="icon"
          variant="ghost"
        >
          <Settings className="h-5 w-5" />
        </Button>

        <div className="h-9 w-9 rounded-full border bg-slate-200" />
      </div>
    </header>
  )
}