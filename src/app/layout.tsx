import { Geist, Geist_Mono, Inter } from "next/font/google"

import "@/src/app/globals.css"
// import { ThemeProvider } from "@/src/components/theme-provider"
import { cn } from "@/src/lib/utils";
import QueryProvider from "@/src/providers/query-provider"

import { DashboardSidebar } from "@/src/components/layout/dashboard-sidebar"
import { DashboardHeader } from "@/src/components/layout/dashboard-header"
import { SIDEBAR_WIDTH } from "@/src/constants/navigations"

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
          <DashboardSidebar />

          <div
            className="
            lg:ml-70
            min-h-screen
          "
          >
            <DashboardHeader />

            <main className="p-4 lg:p-8">
              <QueryProvider>{children}</QueryProvider>
            </main>
          </div>
        </div>
      </body>
    </html>
  )
}
