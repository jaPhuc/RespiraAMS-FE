"use client"

import { useState } from "react"
import { Button } from "@/src/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Textarea } from "@/src/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/src/components/ui/table"
import { DiagnoseResponse } from "@/src/types/diagnose.type"
import { TreatmentProtocol } from "@/src/types/recommend.type"

const severityLabels: Record<string, string> = {
  mild: "Nhẹ",
  moderate: "Trung bình",
  severe: "Nặng",
  critical: "Nguy kịch",
}

const treatmentSiteLabels: Record<string, string> = {
  outpatient: "Ngoại trú",
  inpatient: "Nội trú",
  intensiveCareUnit: "Khoa ICU",
}

interface RecommendationViewProps {
  diagnoseResult: DiagnoseResponse
  protocols: TreatmentProtocol[]
  onBack: () => void
}

const routeLabels: Record<string, string> = {
  oral: "Uống",
  intravenous: "Tĩnh mạch",
  im: "Tiêm bắp",
  sc: "Dưới da",
  inhalation: "Hít",
  topical: "Bôi ngoài",
  rectal: "Đặt trực tràng",
  sublingual: "Ngậm dưới lưỡi",
}

function capitalize(str: string) {
  if (!str) return str
  return str.charAt(0).toUpperCase() + str.slice(1)
}

function MedicineTable({ medicines }: { medicines: TreatmentProtocol["medicines"] }) {
  if (!medicines.length) return null

  return (
    <Table className="mt-3">
      <TableHeader>
        <TableRow>
          <TableHead>Thuốc</TableHead>
          <TableHead>Phổ kháng khuẩn</TableHead>
          <TableHead>Phân loại</TableHead>
          <TableHead>Liều dùng</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {medicines.map((medicine) => (
          <TableRow key={medicine.id}>
            <TableCell className="font-medium">{medicine.name}</TableCell>
            <TableCell>{medicine.antibioticSpectrum.name}</TableCell>
            <TableCell>{capitalize(medicine.category)}</TableCell>
            <TableCell>
              <div className="flex flex-col gap-1.5">
                {medicine.routeOfAdministrations.map((route) => (
                  <div key={route} className="flex items-center gap-4">
                    <span className="text-xs font-semibold tracking-wider text-muted-foreground whitespace-nowrap min-w-10">{routeLabels[route] || route}</span>
                    <div className="flex flex-wrap gap-1.5">
                      {medicine.dosages[route]?.map((d, i) => (
                        <span key={i} className="inline-flex items-center rounded-md border bg-muted/50 px-2 py-0.5 text-sm font-medium">
                          {d}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export function RecommendationView({ diagnoseResult, protocols, onBack }: RecommendationViewProps) {
  const [selectedProtocolId, setSelectedProtocolId] = useState(protocols[0]?.id ?? "")
  const [reason, setReason] = useState("")

  const isRecommended = selectedProtocolId === (protocols[0]?.id ?? "")
  const selectedProtocol = protocols.find((p) => p.id === selectedProtocolId)

  return (
    <div className="space-y-6 max-w-300 mx-auto">
      <header className="mb-8">
        <p className="text-primary text-sm uppercase tracking-widest">
          Đánh giá lâm sàng
        </p>
        <h1 className="text-3xl font-bold mt-2">
          Phác đồ khuyến nghị
        </h1>
        <p className="text-muted-foreground mt-2">
          Dựa trên kết quả chẩn đoán, hệ thống đề xuất phác đồ điều trị phù hợp.
        </p>
      </header>

      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Mức độ nghiêm trọng</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-semibold">
              {severityLabels[diagnoseResult.severity] ?? diagnoseResult.severity}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Nơi điều trị</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-semibold">
              {treatmentSiteLabels[diagnoseResult.treatmentSite] ?? diagnoseResult.treatmentSite}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Chọn phác đồ điều trị</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {protocols.map((protocol, index) => (
            <div key={protocol.id}>
              <label
                className={`flex items-start gap-3 rounded-lg border p-4 cursor-pointer transition-colors ${
                  selectedProtocolId === protocol.id
                    ? "border-primary bg-primary/5"
                    : "hover:border-muted-foreground/30"
                }`}
              >
                <input
                  type="radio"
                  name="protocol"
                  value={protocol.id}
                  checked={selectedProtocolId === protocol.id}
                  onChange={(e) => setSelectedProtocolId(e.target.value)}
                  className="mt-1 h-4 w-4 text-primary accent-primary"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{protocol.specialInfection?.name || "Không có nguy cơ nhiễm khuẩn"}</span>
                    {index === 0 && (
                      <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                        Khuyến nghị
                      </span>
                    )}
                  </div>
                  {protocol.description && (
                    <p className="text-sm text-muted-foreground mt-1">
                      {protocol.description}
                    </p>
                  )}
                </div>
              </label>
              {selectedProtocolId === protocol.id && (
                <MedicineTable medicines={protocol.medicines} />
              )}
            </div>
          ))}

          {!isRecommended && selectedProtocol && (
            <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4">
              <label className="text-sm font-medium">
                Lý do không chọn phác đồ khuyến nghị
              </label>
              <Textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Vui lòng nhập lý do..."
                className="mt-2"
                rows={3}
              />
            </div>
          )}
        </CardContent>
      </Card>

      <footer className="flex justify-between border-t pt-6">
        <Button variant="outline" size="lg" onClick={onBack}>
          Quay lại biểu mẫu
        </Button>
        <Button size="lg">
          Hoàn tất biểu mẫu
        </Button>
      </footer>
    </div>
  )
}
