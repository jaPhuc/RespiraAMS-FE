"use client"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select"
import { useDiseases } from "@/src/hooks/use-diseases"
import { Disease } from "@/src/types/disease.type"

interface DiseaseSelectSectionProps {
  value: string
  onValueChange: (value: string) => void
}

export function DiseaseSelectSection({ value, onValueChange }: DiseaseSelectSectionProps) {
  const { data, isLoading, isError } = useDiseases({ page: 1, pageSize: 1000 })

  return (
    <Card>
      <CardHeader>
        <CardTitle>2. Chọn bệnh lý nghi ngờ</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="max-w-md">
          <label className="text-sm font-medium">Bệnh lý<span className="text-red-500">*</span></label>
          <Select value={value} onValueChange={onValueChange}>
            <SelectTrigger className="mt-2 w-full">
              <SelectValue placeholder={isLoading ? "Đang tải..." : "Chọn bệnh lý"} />
            </SelectTrigger>
            <SelectContent>
              {isLoading && (
                <SelectItem value="loading" disabled>
                  Đang tải dữ liệu...
                </SelectItem>
              )}
              {isError && (
                <SelectItem value="error" disabled>
                  Lỗi tải dữ liệu
                </SelectItem>
              )}
              {data?.items.map((disease: Disease) => (
                <SelectItem key={disease.id} value={disease.id}>
                  {disease.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  )
}
