import Link from "next/link"
import { ArrowLeft, Home } from "lucide-react"
import { Button } from "@/src/components/ui/button"
import { Card } from "@/src/components/ui/card"

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center">
      <Card className="mx-auto max-w-md border-none bg-transparent p-8 text-center shadow-none">
        <div className="mx-auto flex h-36 w-36 items-center justify-center rounded-full bg-primary/10">
          <span className="text-5xl font-bold text-primary">404</span>
        </div>
        <h1 className="mb-2 text-2xl font-bold tracking-tight text-primary">
          Trang không tìm thấy
        </h1>
        <p className="mb-8 text-gray-500">
          Trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Button variant="outline" className="gap-2" asChild>
            <Link href="/">
              <ArrowLeft className="h-4 w-4" />
              Quay lại
            </Link>
          </Button>
          <Button className="gap-2 bg-primary hover:bg-primary/80" asChild>
            <Link href="/manager/antibiotics">
              <Home className="h-4 w-4" />
              Trang chủ
            </Link>
          </Button>
        </div>
      </Card>
    </div>
  )
}
