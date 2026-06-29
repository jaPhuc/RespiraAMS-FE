"use client"
import { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/src/components/ui/dialog"
import { Input } from "@/src/components/ui/input"
import { Button } from "@/src/components/ui/button"
import { Badge } from "@/src/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select"
import { X, Check, Search } from "lucide-react"

import { treatmentProtocolSchema, TreatmentProtocolFormValues } from "@/src/features/manager/treatment-protocols/schema"
import { mapProtocolToForm, mapFormToProtocolPayload } from "@/src/features/manager/treatment-protocols/mapper"
import { useCreateTreatmentProtocol, useUpdateTreatmentProtocol } from "@/src/features/manager/treatment-protocols/api"
import { useDiseases } from "@/src/features/manager/diseases/api"
import { usePathogens } from "@/src/features/manager/pathogens/api"
import { useAntibiotics } from "@/src/features/manager/antibiotics/api"
import { useIcuCriteria } from "@/src/features/manager/icu-criteria/api"

export function TreatmentProtocolFormDialog({ open, onOpenChange, initialData }: any) {
  const isEdit = !!initialData
  const createMutation = useCreateTreatmentProtocol()
  const updateMutation = useUpdateTreatmentProtocol()

  const { data: diseasesData } = useDiseases({ page: 1, pageSize: 100 })
  const { data: pathogensData } = usePathogens({ page: 1, pageSize: 100 })
  const { data: antibioticsData } = useAntibiotics({ page: 1, pageSize: 200 })
  const { data: icuCriteriaData } = useIcuCriteria({ page: 1, pageSize: 200 })

  const { register, handleSubmit, reset, watch, setValue, formState: { errors } } = useForm<TreatmentProtocolFormValues>({
    resolver: zodResolver(treatmentProtocolSchema),
    defaultValues: {
      diseaseId: "", version: 1, severity: "", treatmentSite: "",
      specialInfectionId: "none", otherCriteriaIds: [], medicineIds: []
    }
  })

  const [openMeds, setOpenMeds] = useState(false)
  const [searchMeds, setSearchMeds] = useState("")

  const [openCriteria, setOpenCriteria] = useState(false)
  const [searchCriteria, setSearchCriteria] = useState("")

  useEffect(() => {
    if (initialData) reset(mapProtocolToForm(initialData))
    else reset({
      diseaseId: "", version: 1, severity: "", treatmentSite: "",
      specialInfectionId: "none", otherCriteriaIds: [], medicineIds: []
    })
    setSearchMeds("")
    setSearchCriteria("")
  }, [initialData, reset, open])

  const onSubmit = async (values: TreatmentProtocolFormValues) => {
    const payload = mapFormToProtocolPayload(values)
    try {
      if (isEdit) await updateMutation.mutateAsync({ id: initialData.id, payload })
      else await createMutation.mutateAsync(payload)
      onOpenChange(false)
    } catch (error: any) {
      alert("Lỗi Backend: " + (error.response?.data?.detail || "Lưu thất bại"))
    }
  }

  const toggleArrayItem = (fieldName: "medicineIds" | "otherCriteriaIds", id: string) => {
    const current = watch(fieldName) || []
    if (current.includes(id)) setValue(fieldName, current.filter(x => x !== id))
    else setValue(fieldName, [...current, id])
  }

  const allMeds = antibioticsData?.items || []
  const filteredMeds = allMeds.filter(m => m.name.toLowerCase().includes(searchMeds.toLowerCase()))
  const selectedMeds = watch("medicineIds") || []

  const allCriteria = icuCriteriaData?.items || []
  const filteredCriteria = allCriteria.filter(c => c.criterion?.name.toLowerCase().includes(searchCriteria.toLowerCase()))
  const selectedCriteria = watch("otherCriteriaIds") || []

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl !max-h-[85dvh] md:!max-h-[90vh] flex flex-col p-0 overflow-hidden bg-gray-50" 
                      style={{ 
                        maxHeight: "shadow" in window ? "calc(100vh - 140px)" : "82vh", 
                        maxWidth: "680px" 
                      }}>
        <DialogHeader className="p-5 pb-3 bg-white border-b shrink-0">
          <DialogTitle className="text-[#006591] text-xl">
            {isEdit ? "Chỉnh Sửa Phác Đồ" : "Thêm Phác Đồ Mới"}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col flex-1 overflow-hidden">
          <div className="flex-1 overflow-y-auto p-5 space-y-5">
            <div className="bg-white p-4 rounded-xl border shadow-sm space-y-4">
              <h3 className="font-semibold text-gray-700 border-b pb-2">1. Thông tin cơ bản</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sm font-medium">Bệnh Lý <span className="text-red-500">*</span></label>
                  <Select value={watch("diseaseId")} onValueChange={(val) => setValue("diseaseId", val)}>
                    <SelectTrigger><SelectValue placeholder="Chọn Bệnh Lý" /></SelectTrigger>
                    <SelectContent>
                      {diseasesData?.items?.map((d: any) => (
                        <SelectItem key={d.id} value={d.id}>{d.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.diseaseId && <p className="text-xs text-red-500">{errors.diseaseId.message}</p>}
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium">Version <span className="text-red-500">*</span></label>
                  {/* <Input type="text" pattern="^\d+(?:\.\d+)*$" {...register("version")} placeholder="VD: 1, 2, 3..." /> */}
                  <Input type="number" min="1" {...register("version")} placeholder="VD: 1, 2, 3..." />

                  {errors.version && <p className="text-xs text-red-500">{errors.version.message}</p>}
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium">Mức Độ (Severity) <span className="text-red-500">*</span></label>
                  <Select value={watch("severity")} onValueChange={(val) => setValue("severity", val)}>
                    <SelectTrigger><SelectValue placeholder="Chọn Mức Độ" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mild">Nhẹ (Mild)</SelectItem>
                      <SelectItem value="moderate">Trung Bình (Moderate)</SelectItem>
                      <SelectItem value="severe">Nặng (Severe)</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.severity && <p className="text-xs text-red-500">{errors.severity.message}</p>}
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium">Nơi Điều Trị <span className="text-red-500">*</span></label>
                  <Select value={watch("treatmentSite")} onValueChange={(val) => setValue("treatmentSite", val)}>
                    <SelectTrigger><SelectValue placeholder="Chọn Nơi Điều Trị" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="outpatient">Ngoại Trú (Outpatient)</SelectItem>
                      <SelectItem value="inpatient">Nội Trú (Inpatient)</SelectItem>
                      <SelectItem value="intensiveCareUnit">ICU (Hồi sức tích cực)</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.treatmentSite && <p className="text-xs text-red-500">{errors.treatmentSite.message}</p>}
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl border shadow-sm space-y-4">
              <h3 className="font-semibold text-gray-700 border-b pb-2">2. Tiêu chuẩn & Tác nhân</h3>
              
              <div className="space-y-1">
                <label className="text-sm font-medium">Tác Nhân Đặc Biệt (Nếu có)</label>
                <Select value={watch("specialInfectionId") || "none"} onValueChange={(val) => setValue("specialInfectionId", val)}>
                  <SelectTrigger><SelectValue placeholder="Không có" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">--- Không có tác nhân ---</SelectItem>
                    {pathogensData?.items?.map((p: any) => (
                      <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* <div className="space-y-1 relative">
                <label className="text-sm font-medium">Các Tiêu Chuẩn Phụ (Other Criteria)</label>
                <div 
                  className="min-h-10 border rounded-md p-2 flex flex-wrap gap-2 items-center cursor-text bg-white"
                  onClick={() => setOpenCriteria(true)}
                >
                  {selectedCriteria.length === 0 && !searchCriteria && (
                    <span className="text-gray-400 text-sm ml-1">Bấm để tìm và chọn tiêu chuẩn...</span>
                  )}
                  
                  {selectedCriteria.map((id) => {
                    const c = allCriteria.find(x => x.id === id);
                    return c ? (
                      <Badge key={id} variant="secondary" className="bg-amber-100 text-amber-700 hover:bg-amber-200 pr-1 border-none">
                        {c.criterion?.name}
                        <span 
                          className="ml-1 p-0.5 rounded-full hover:bg-amber-300 cursor-pointer" 
                          onClick={(e) => { e.stopPropagation(); toggleArrayItem("otherCriteriaIds", id); }}
                        >
                          <X className="h-3 w-3" />
                        </span>
                      </Badge>
                    ) : null;
                  })}

                  <input 
                    type="text" 
                    className="flex-1 outline-none bg-transparent min-w-[120px] text-sm" 
                    value={searchCriteria} 
                    onChange={(e) => setSearchCriteria(e.target.value)}
                    onFocus={() => setOpenCriteria(true)}
                  />
                </div>

                {openCriteria && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setOpenCriteria(false)} />
                    <div className="absolute z-50 mt-1 w-full bg-white border rounded-md shadow-lg max-h-60 overflow-y-auto">
                      {filteredCriteria.length === 0 ? (
                        <div className="p-3 text-sm text-gray-500 text-center">Không tìm thấy tiêu chuẩn nào.</div>
                      ) : (
                        filteredCriteria.map((c: any) => (
                          <div 
                            key={c.id} 
                            className="flex items-center justify-between p-2.5 hover:bg-gray-100 cursor-pointer text-sm"
                            onClick={() => toggleArrayItem("otherCriteriaIds", c.id)}
                          >
                            <span>{c.criterion?.name}</span>
                            {selectedCriteria.includes(c.id) && <Check className="h-4 w-4 text-green-600" />}
                          </div>
                        ))
                      )}
                    </div>
                  </>
                )}
              </div> */}
            </div>

            <div className="bg-white p-4 rounded-xl border shadow-sm space-y-4">
              <h3 className="font-semibold text-gray-700 border-b pb-2">3. Kháng Sinh Điều Trị</h3>

              {/* 👉 CUSTOM COMBOBOX: KHÁNG SINH (Chips/Tags) */}
              <div className="space-y-1 relative">
                <label className="text-sm font-medium">Chọn Kháng Sinh <span className="text-red-500">*</span></label>
                <div 
                  className="min-h-12 border rounded-md p-2 flex flex-wrap gap-2 items-center cursor-text bg-white"
                  onClick={() => setOpenMeds(true)}
                >
                  {selectedMeds.length === 0 && !searchMeds && (
                    <span className="text-gray-400 text-sm ml-1">Tìm kiếm thuốc kháng sinh...</span>
                  )}
                  
                  {selectedMeds.map((id) => {
                    const m = allMeds.find(x => x.id === id);
                    return m ? (
                      <Badge key={id} variant="default" className="bg-[#006591] hover:bg-[#004c6e] pr-1">
                        {m.name}
                        <span 
                          className="ml-1 p-0.5 rounded-full hover:bg-blue-800 cursor-pointer" 
                          onClick={(e) => { e.stopPropagation(); toggleArrayItem("medicineIds", id); }}
                        >
                          <X className="h-3 w-3" />
                        </span>
                      </Badge>
                    ) : null;
                  })}

                  <input 
                    type="text" 
                    className="flex-1 outline-none bg-transparent min-w-[120px] text-sm" 
                    value={searchMeds} 
                    onChange={(e) => setSearchMeds(e.target.value)}
                    onFocus={() => setOpenMeds(true)}
                  />
                </div>

                {openMeds && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setOpenMeds(false)} />
                    <div className="absolute z-50 mt-1 w-full bg-white border rounded-md shadow-lg max-h-60 overflow-y-auto p-1">
                      {filteredMeds.length === 0 ? (
                        <div className="p-3 text-sm text-gray-500 text-center">Không có kháng sinh nào khớp.</div>
                      ) : (
                        filteredMeds.map((m: any) => (
                          <div 
                            key={m.id} 
                            className="flex items-center justify-between p-2.5 hover:bg-blue-50 rounded cursor-pointer text-sm"
                            onClick={() => toggleArrayItem("medicineIds", m.id)}
                          >
                            <div className="flex flex-col">
                              <span className="font-medium text-gray-800">{m.name}</span>
                              <span className="text-[10px] text-gray-400 uppercase">{m.category}</span>
                            </div>
                            {selectedMeds.includes(m.id) ? (
                              <Check className="h-5 w-5 text-[#006591]" />
                            ) : (
                              <div className="h-4 w-4 border rounded-sm border-gray-300" />
                            )}
                          </div>
                        ))
                      )}
                    </div>
                  </>
                )}
                {errors.medicineIds && <p className="text-xs text-red-500 pt-1">{errors.medicineIds.message}</p>}
              </div>
            </div>
          </div>
          <div className="p-4 bg-white border-t shrink-0 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
            <Button type="submit" className="w-full bg-[#006591] hover:bg-[#004c6e] text-white h-11 text-base font-bold" disabled={createMutation.isPending || updateMutation.isPending}>
              {isEdit ? "Cập Nhật Phác Đồ" : "Tạo Mới Phác Đồ"}
            </Button>
          </div>
          
        </form>
      </DialogContent>
    </Dialog>
  )
}