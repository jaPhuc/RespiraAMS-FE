"use client"
import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Activity, ShieldAlert, Bug, Edit, Plus } from "lucide-react"
import { Button } from "@/src/components/ui/button"
import { useDisease } from "@/src/hooks/use-disease"
import { DiseaseFormDialog } from "../_components/disease-form-dialog"
import { IcuCriterionFormDialog } from "@/src/app/manager/icu-criteria/_components/icu-criterion-form-dialog"
import { DeleteIcuCriterionDialog } from "@/src/app/manager/icu-criteria/_components/delete-icu-criterion-dialog"
import { DiseasePathogenFormDialog } from "./_components/disease-pathogen-form-dialog"
import { DeleteDiseasePathogenDialog } from "./_components/delete-disease-pathogen-dialog"

import { DiseaseIcuTable } from "./_components/disease-icu-table"
import { ResistanceRiskTable } from "./_components/resistance-risk-table"
import { DiseasePathogenTable } from "./_components/disease-pathogen-table"
import { ResistanceRiskFormDialog } from "./_components/resistance-risk-form-dialog"
import { DeleteResistanceRiskDialog } from "./_components/delete-resistance-risk-dialog"

export default function DiseaseDetailPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string

  const [openEdit, setOpenEdit] = useState(false)

  const [openRiskForm, setOpenRiskForm] = useState(false)
  const [openDeleteRisk, setOpenDeleteRisk] = useState(false)
  const [selectedRisk, setSelectedRisk] = useState<any>(null)

  const [openPathogenForm, setOpenPathogenForm] = useState(false)
  const [openDeletePathogen, setOpenDeletePathogen] = useState(false)
  const [selectedPathogen, setSelectedPathogen] = useState<any>(null)

  const [openIcuForm, setOpenIcuForm] = useState(false)
  const [openDeleteIcu, setOpenDeleteIcu] = useState(false)
  const [selectedIcu, setSelectedIcu] = useState<any>(null)
  

  const { data: disease, isLoading, isError } = useDisease(id)

  if (isLoading) return <div className="p-8 text-gray-500 font-medium">Đang tải chi tiết bệnh lý...</div>
  if (isError || !disease) return <div className="p-8 text-red-500 font-medium">Lỗi hoặc không tìm thấy bệnh lý!</div>

  return (
    <main className="p-8 space-y-8 max-w-[1200px] mx-auto">
      
      <button onClick={() => router.push('/manager/diseases')} className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#006591] transition-colors w-fit font-medium">
        <ArrowLeft className="h-4 w-4" /> Quay lại danh sách
      </button>
      
      <div className="bg-[#006591] rounded-2xl p-8 text-white shadow-md flex justify-between items-start relative overflow-hidden">
        <div className="absolute top-0 right-0 opacity-10 pointer-events-none">
          <Activity className="w-64 h-64 -mt-10 -mr-10" />
        </div>
        <div className="z-10 max-w-3xl">
          <h1 className="text-3xl font-bold tracking-tight mb-3">{disease.name}</h1>
          <p className="text-blue-100 text-[15px] leading-relaxed mb-6">{disease.description}</p>
          <div className="flex gap-3">
            <span className="bg-white/20 px-4 py-1.5 rounded-full text-sm font-semibold border border-white/30">{disease.requiredIcuMainCriteria} TC ICU Chính</span>
            <span className="bg-white/20 px-4 py-1.5 rounded-full text-sm font-semibold border border-white/30">{disease.requiredIcuSecondaryCriteria} TC ICU Phụ</span>
          </div>
        </div>
        <button onClick={() => setOpenEdit(true)} className="z-10 bg-white text-[#006591] hover:bg-blue-50 px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2">
          <Edit className="h-4 w-4" /> Sửa Thông Tin
        </button>
      </div>

      <div className="space-y-4 pt-2">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <Activity className="h-6 w-6 text-amber-600" /> Tiêu chuẩn chẩn đoán (ICU)
          </h2>
          <Button variant="outline" className="text-amber-600 border-amber-600 hover:bg-amber-50" onClick={() => { setSelectedIcu(null); setOpenIcuForm(true); }}>
            <Plus className="h-4 w-4 mr-1" /> Thêm Tiêu Chuẩn
          </Button>
        </div>
        {disease.icuHospitalizedCriteria?.length > 0 ? (
          <DiseaseIcuTable 
            data={disease.icuHospitalizedCriteria} 
            onEdit={(item: any) => { setSelectedIcu(item); setOpenIcuForm(true); }}
            onDelete={(item: any) => { setSelectedIcu(item); setOpenDeleteIcu(true); }}
          />
        ) : (
          <div className="p-8 text-center text-gray-500 bg-gray-50 rounded-xl border border-dashed">Chưa có tiêu chuẩn ICU nào.</div>
        )}
      </div>

      <div className="space-y-4 pt-6 border-t">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <ShieldAlert className="h-6 w-6 text-red-500" /> Yếu tố nguy cơ kháng thuốc
          </h2>
          <Button variant="outline" className="text-red-500 border-red-500 hover:bg-red-50" onClick={() => { setSelectedRisk(null); setOpenRiskForm(true); }}>
            <Plus className="h-4 w-4 mr-1" /> Thêm Nguy Cơ
          </Button>
        </div>
        {disease.resistanceRisks?.length > 0 ? (
          <ResistanceRiskTable 
            data={disease.resistanceRisks} 
            onEdit={(item: any) => { setSelectedRisk(item); setOpenRiskForm(true); }} 
            onDelete={(item: any) => { setSelectedRisk(item); setOpenDeleteRisk(true); }} 
          />
        ) : (
          <div className="p-8 text-center text-gray-500 bg-gray-50 rounded-xl border border-dashed">Chưa có yếu tố nguy cơ.</div>
        )}
      </div>

      <div className="space-y-4 pt-6 border-t">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <Bug className="h-6 w-6 text-purple-600" /> Tác nhân gây bệnh
          </h2>
          <Button variant="outline" className="text-purple-600 border-purple-600 hover:bg-purple-50" onClick={() => { setSelectedPathogen(null); setOpenPathogenForm(true); }}>
            <Plus className="h-4 w-4 mr-1" /> Thêm Tác Nhân
          </Button>
        </div>
        {disease.diseasePathogens?.length > 0 ? (
          <DiseasePathogenTable 
            data={disease.diseasePathogens} 
            onEdit={(item: any) => { setSelectedPathogen(item); setOpenPathogenForm(true); }} 
            onDelete={(item: any) => { setSelectedPathogen(item); setOpenDeletePathogen(true); }} 
          />
        ) : (
          <div className="p-8 text-center text-gray-500 bg-gray-50 rounded-xl border border-dashed">Chưa có tác nhân gây bệnh.</div>
        )}
      </div>

      <DiseaseFormDialog open={openEdit} onOpenChange={setOpenEdit} initialData={disease} />

      <IcuCriterionFormDialog 
        open={openIcuForm} 
        onOpenChange={setOpenIcuForm} 
        initialData={selectedIcu} 
        fixedDiseaseId={id}
      />
      {selectedIcu && (
        <DeleteIcuCriterionDialog 
          open={openDeleteIcu} 
          onOpenChange={setOpenDeleteIcu} 
          criterionId={selectedIcu.id} 
          criterionName={selectedIcu.criterion?.name} 
        />
      )}

      <ResistanceRiskFormDialog 
          open={openRiskForm} 
          onOpenChange={setOpenRiskForm} 
          initialData={selectedRisk} 
          fixedDiseaseId={id} 
      />
      {selectedRisk && (
        <DeleteResistanceRiskDialog 
          open={openDeleteRisk} 
          onOpenChange={setOpenDeleteRisk} 
          riskId={selectedRisk.id} 
          riskName={selectedRisk.name} 
        />
      )}

      <DiseasePathogenFormDialog 
        open={openPathogenForm} 
        onOpenChange={setOpenPathogenForm} 
        initialData={selectedPathogen} 
        fixedDiseaseId={id} 
      />
      {selectedPathogen && (
        <DeleteDiseasePathogenDialog 
          open={openDeletePathogen} 
          onOpenChange={setOpenDeletePathogen} 
          pathogenId={selectedPathogen.id} 
          pathogenName={selectedPathogen.pathogen?.name} 
        />
      )}

    </main>
  )
}