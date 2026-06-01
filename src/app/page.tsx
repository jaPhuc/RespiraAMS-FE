import Link from "next/link"
import { ArrowRight, ArrowLeft, Shield } from "lucide-react"
import { Button } from "@/src/components/ui/button"
import { Card } from "@/src/components/ui/card"

export default function Page() {
  return (
    <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center">
      <Card className="mx-auto max-w-md border-none bg-transparent p-8 text-center shadow-none">
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-primary/10">
          <Shield className="h-12 w-12 text-primary" />
        </div>
        <h1 className="mb-2 text-2xl font-bold tracking-tight text-primary">
          RespiraAMS
        </h1>
        <p className="mb-2 text-gray-500">
          Hệ thống quản lý kháng sinh đồ — Antimicrobial Stewardship
        </p>
        <p className="mb-8 text-sm text-gray-400">
          Quản lý kháng sinh, tác nhân gây bệnh, phổ kháng sinh và phác đồ điều trị.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button className="gap-2 w-full sm:w-auto bg-[#0d2b3e] hover:bg-[#0d2b3e]/90" asChild>
            <Link href="/manager/antibiotics">
              <ArrowLeft className="h-4 w-4" />
              Quản lý
            </Link>
          </Button>
          <Button className="gap-2 w-full sm:w-auto bg-[#ECEEF0] text-gray-800 hover:bg-[#ECEEF0]/80 border border-gray-200" asChild>
            <Link href="/doctor/clinical-form">
              Bác sĩ
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </Card>
    </div>
  )
}