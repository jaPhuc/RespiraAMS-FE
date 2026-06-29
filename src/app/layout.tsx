import { Geist, Geist_Mono, Inter } from "next/font/google"

import "@/src/app/globals.css"
// import { ThemeProvider } from "@/src/components/theme-provider"
import { cn } from "@/src/lib/utils";
import QueryProvider from "@/src/providers/query-provider"

import { SidebarShell } from "@/src/features/manager/layouts/sidebar-shell"
import { DashboardHeader } from "@/src/features/manager/layouts/dashboard-header"

const inter = Inter({subsets:['latin'],variable:'--font-sans'})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", fontMono.variable, "font-sans", inter.variable)}
    >
      <body>
        <div className="min-h-screen bg-[#f8f9ff]">
          <SidebarShell />

          <div
            className="
            lg:ml-70
            min-h-screen
          "
          >
            <DashboardHeader />

            <main className="px-4 py-2 lg:px-8 lg:py-4">
              <QueryProvider>{children}</QueryProvider>
            </main>
          </div>
        </div>
      </body>
    </html>
  )
}
