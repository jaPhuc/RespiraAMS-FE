"use client"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Activity, ShieldAlert, Bug, Edit } from "lucide-react"
import { Button } from "@/src/components/ui/button"
import { useDisease } from "@/src/hooks/queries/use-disease"
import { DiseaseFormDialog } from "../_components/disease-form-dialog"
import { useState } from "react"

export default function DiseaseDetailPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string

  const [openEdit, setOpenEdit] = useState(false)

  const { data: disease, isLoading, isError } = useDisease(id)

  if (isLoading) return <div className="p-8 text-gray-500 font-medium">Đang tải chi tiết bệnh lý...</div>
  if (isError || !disease) return <div className="p-8 text-red-500 font-medium">Lỗi hoặc không tìm thấy bệnh lý!</div>

  return (
    <main className="p-8 space-y-6 max-w-[1200px] mx-auto">
      <div className="flex flex-col gap-4">
        <button 
          onClick={() => router.push('/manager/diseases')}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-primary transition-colors w-fit font-medium"
        >
          <ArrowLeft className="h-4 w-4" /> Quay lại danh sách
        </button>
        
        <div className="bg-[#006591] rounded-2xl p-8 text-white shadow-md flex justify-between items-start relative overflow-hidden">
        
            {/* Decorate background (Option cho đẹp) */}
            <div className="absolute top-0 right-0 opacity-10 pointer-events-none">
            <Activity className="w-64 h-64 -mt-10 -mr-10" />
            </div>

            <div className="z-10 max-w-3xl">
            <h1 className="text-3xl font-bold tracking-tight mb-3">{disease.name}</h1>
            <p className="text-blue-100 text-[15px] leading-relaxed mb-6">
                {disease.description}
            </p>
            
            {/* Badges Tiêu chuẩn */}
            <div className="flex gap-3">
                <span className="bg-white/20 text-white px-4 py-1.5 rounded-full text-sm font-semibold backdrop-blur-sm border border-white/30">
                {disease.requiredIcuMainCriteria} TC ICU Chính
                </span>
                <span className="bg-white/20 text-white px-4 py-1.5 rounded-full text-sm font-semibold backdrop-blur-sm border border-white/30">
                {disease.requiredIcuSecondaryCriteria} TC ICU Phụ
                </span>
            </div>
            </div>

            {/* Nút Edit */}
            <button 
            onClick={() => setOpenEdit(true)}
            className="z-10 bg-white text-[#006591] hover:bg-blue-50 px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors shadow-sm"
            >
            <Edit className="h-4 w-4" /> Sửa Thông Tin
            </button>
        </div>
      </div>

      {/* Grid 3 cột chi tiết */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        
        {/* Cột 1: Tiêu chuẩn ICU */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 bg-gray-50 flex items-center gap-2">
            <Activity className="h-5 w-5 text-amber-600" />
            <h3 className="font-bold text-gray-800">Tiêu chuẩn chẩn đoán (ICU)</h3>
          </div>
          <div className="p-5">
            {disease.icuHospitalizedCriteria?.length > 0 ? (
              <ul className="space-y-3">
                {disease.icuHospitalizedCriteria.map((item) => (
                  <li key={item.id} className="text-sm text-gray-700 flex items-start gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-500 mt-1.5 flex-shrink-0"></span>
                    <span>{item.name}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-400 italic">Chưa có dữ liệu tiêu chuẩn.</p>
            )}
          </div>
        </div>

        {/* Cột 2: Yếu tố nguy cơ */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 bg-gray-50 flex items-center gap-2">
            <ShieldAlert className="h-5 w-5 text-red-500" />
            <h3 className="font-bold text-gray-800">Yếu tố nguy cơ kháng thuốc</h3>
          </div>
          <div className="p-5">
            {disease.resistanceRisks?.length > 0 ? (
              <ul className="space-y-3">
                {disease.resistanceRisks.map((item) => (
                  <li key={item.id} className="text-sm text-gray-700 flex items-start gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-red-400 mt-1.5 flex-shrink-0"></span>
                    <span>{item.name}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-400 italic">Chưa có yếu tố nguy cơ nào.</p>
            )}
          </div>
        </div>

        {/* Cột 3: Tác nhân gây bệnh */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 bg-gray-50 flex items-center gap-2">
            <Bug className="h-5 w-5 text-purple-600" />
            <h3 className="font-bold text-gray-800">Tác nhân gây bệnh</h3>
          </div>
          <div className="p-5">
            {disease.diseasePathogens?.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {disease.diseasePathogens.map((item) => (
                  <span key={item.id} className="bg-purple-50 text-purple-700 px-3 py-1.5 rounded-lg text-sm font-medium border border-purple-100">
                    {item.pathogen?.name}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-400 italic">Chưa có dữ liệu tác nhân.</p>
            )}
          </div>
        </div>

      </div>
      <DiseaseFormDialog 
        open={openEdit} 
        onOpenChange={setOpenEdit} 
        initialData={disease}
      />
    </main>
  )
}