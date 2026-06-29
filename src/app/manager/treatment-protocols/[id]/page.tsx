"use client"
import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Edit, Plus, Calendar, Stethoscope, AlertTriangle, Building2, Bug } from "lucide-react"
import { Button } from "@/src/components/ui/button"
import { useTreatmentProtocol } from "@/src/features/manager/treatment-protocols/api"
import { useDiseases } from "@/src/features/manager/diseases/api"

import { TreatmentProtocolFormDialog } from "@/src/features/manager/treatment-protocols/components/treatment-protocol-form-dialog"
import { ProtocolAntibioticTable } from "@/src/features/manager/treatment-protocols/detail/components/protocol-antibiotic-table"
import { ProtocolCriterionTable } from "@/src/features/manager/treatment-protocols/detail/components/protocol-criterion-table"
import { OtherCriterionFormDialog } from "@/src/features/manager/treatment-protocols/detail/components/other-criterion-form-dialog"

export default function TreatmentProtocolDetailPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string

  const [openEditProtocol, setOpenEditProtocol] = useState(false)
  const [openAddCriterion, setOpenAddCriterion] = useState(false)

  const { data: protocol, isLoading, isError } = useTreatmentProtocol(id)
  const { data: diseasesData } = useDiseases({ page: 1, pageSize: 100 })

  if (isLoading) return <div className="p-8 font-medium">Đang tải chi tiết phác đồ...</div>
  if (isError || !protocol) return <div className="p-8 text-red-500">Lỗi không tìm thấy phác đồ!</div>

  const diseaseName = diseasesData?.items?.find((d) => d.id === protocol.diseaseId)?.name || protocol.diseaseId

  return (
    <main className="p-8 space-y-8 max-w-300 mx-auto">
      {/* Nút Back */}
      <button 
        onClick={() => router.push('/manager/treatment-protocols')}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#006591] transition-colors font-medium"
      >
        <ArrowLeft className="h-4 w-4" /> Quay lại danh sách
      </button>

      {/* HÀNG 1: THÔNG TIN TỔNG QUAN */}
      <div className="bg-white rounded-2xl p-6 border shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -z-0 opacity-50" />
        
        <div className="space-y-4 z-10 w-full">
          <div>
            <h1 className="text-2xl font-bold text-[#006591] mb-1">{diseaseName}</h1>
            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
              <span className="flex items-center gap-1"><Stethoscope className="h-4 w-4"/> Version {protocol.version}</span>
              <span>•</span>
              <span className="flex items-center gap-1"><Calendar className="h-4 w-4"/> Cập nhật: {new Date(protocol.updatedAt).toLocaleDateString('vi-VN')}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 pt-2">
            <div className="flex flex-col">
              <span className="text-xs text-gray-400 font-bold uppercase mb-1 flex items-center gap-1"><AlertTriangle className="h-3 w-3"/> Mức Độ</span>
              <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-md text-sm font-bold uppercase w-fit">{protocol.severity}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-gray-400 font-bold uppercase mb-1 flex items-center gap-1"><Building2 className="h-3 w-3"/> Nơi Điều Trị</span>
              <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-md text-sm font-bold w-fit">{protocol.treatmentSite}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-gray-400 font-bold uppercase mb-1 flex items-center gap-1"><Bug className="h-3 w-3"/> Tác Nhân Đặc Biệt</span>
              {protocol.specialInfection ? (
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-md text-sm font-bold w-fit">🦠 {protocol.specialInfection.name}</span>
              ) : (
                <span className="text-gray-400 text-sm italic py-1">Không có</span>
              )}
            </div>
          </div>
        </div>

        <Button onClick={() => setOpenEditProtocol(true)} className="bg-[#006591] hover:bg-[#004c6e] text-white z-10 shrink-0">
          <Edit className="h-4 w-4 mr-2" /> Chỉnh sửa phác đồ
        </Button>
      </div>

      {/* HÀNG 2: BẢNG KHÁNG SINH */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          💊 Kháng Sinh Khuyến Cáo <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full">{protocol.medicines?.length || 0}</span>
        </h2>
        {protocol.medicines?.length > 0 ? (
          <ProtocolAntibioticTable data={protocol.medicines} />
        ) : (
          <div className="p-8 text-center text-gray-500 bg-gray-50 rounded-xl border border-dashed">Chưa có thuốc nào trong phác đồ.</div>
        )}
      </div>

      {/* HÀNG 3: BẢNG TIÊU CHUẨN PHỤ */}
      <div className="space-y-4 pt-4 border-t">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            📋 Các Tiêu Chuẩn Đi Kèm <span className="bg-amber-100 text-amber-700 text-xs px-2 py-0.5 rounded-full">{protocol.otherCriteria?.length || 0}</span>
          </h2>
          <Button variant="outline" className="text-[#006591] border-[#006591]" onClick={() => setOpenAddCriterion(true)}>
            <Plus className="h-4 w-4 mr-1" /> Thêm tiêu chuẩn
          </Button>
        </div>
        
        {protocol.otherCriteria?.length > 0 ? (
          <ProtocolCriterionTable data={protocol.otherCriteria} />
        ) : (
          <div className="p-8 text-center text-gray-500 bg-gray-50 rounded-xl border border-dashed">Không có tiêu chuẩn phụ.</div>
        )}
      </div>

      {/* Popup Form */}
      <TreatmentProtocolFormDialog open={openEditProtocol} onOpenChange={setOpenEditProtocol} initialData={protocol} />
      <OtherCriterionFormDialog open={openAddCriterion} onOpenChange={setOpenAddCriterion} protocolId={id} />
    </main>
  )
}