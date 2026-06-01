"use client"
import { useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/src/components/ui/dialog"
import { Button } from "@/src/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select"

import { diseasePathogenSchema, DiseasePathogenFormValues } from "@/src/schemas/disease-pathogen.schema"
import { mapPathogenToForm, mapFormToPathogenPayload } from "@/src/app/mappers/disease-pathogen.mapper"
import { useCreateDiseasePathogen, useUpdateDiseasePathogen } from "@/src/hooks/mutations/use-disease-pathogen"
import { useDiseases } from "@/src/hooks/use-diseases"
import { usePathogens } from "@/src/hooks/use-pathogens"

export function DiseasePathogenFormDialog({ open, onOpenChange, initialData, fixedDiseaseId }: any) {
  const isEdit = !!initialData
  const createMutation = useCreateDiseasePathogen()
  const updateMutation = useUpdateDiseasePathogen()

  const { data: diseasesData } = useDiseases({ page: 1, pageSize: 100 })
  const { data: pathogensData } = usePathogens({ page: 1, pageSize: 100 })

  const { handleSubmit, reset, watch, setValue, formState: { errors } } = useForm<DiseasePathogenFormValues>({
    resolver: zodResolver(diseasePathogenSchema),
    defaultValues: { diseaseId: fixedDiseaseId || "", pathogenId: "", severity: "mild", treatmentSite: "outpatient" }
  })

  useEffect(() => {
    if (initialData) reset(mapPathogenToForm(initialData))
    else reset({ diseaseId: fixedDiseaseId || "", pathogenId: "", severity: "mild", treatmentSite: "outpatient" })
  }, [initialData, reset, open, fixedDiseaseId])

  const onSubmit = async (values: DiseasePathogenFormValues) => {
    const payload = mapFormToPathogenPayload(values)
    try {
      if (isEdit) await updateMutation.mutateAsync({ id: initialData.id, payload })
      else await createMutation.mutateAsync(payload)
      onOpenChange(false)
    } catch (error: any) {
      alert("Lỗi Backend: " + (error.response?.data?.detail || "Lưu thất bại"))
    }
  }

  const isDiseaseLocked = !!fixedDiseaseId;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md p-0 gap-0 overflow-hidden rounded-2xl">
        <DialogHeader className="px-6 pt-6 pb-4 border-b">
          <DialogTitle className="text-lg font-semibold text-purple-700">
            {isEdit ? "Cập Nhật Tác Nhân Gây Bệnh" : "Thêm Tác Nhân Gây Bệnh"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="px-6 py-6 space-y-5">

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">Bệnh lý</label>
            <Select value={watch("diseaseId")} onValueChange={(val) => setValue("diseaseId", val)} disabled={isDiseaseLocked}>
              <SelectTrigger className={`w-full rounded-lg border-gray-200 h-10 ${isDiseaseLocked ? 'bg-gray-100 opacity-80' : 'bg-white'}`}>
                <SelectValue placeholder="-- Chọn Bệnh Lý --" />
              </SelectTrigger>
              <SelectContent>
                {diseasesData?.items?.map((d: any) => (
                  <SelectItem key={d.id} value={d.id}>{d.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.diseaseId && <p className="text-xs text-red-500">{errors.diseaseId.message}</p>}
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">Tác Nhân (Pathogen) <span className="text-red-500">*</span></label>
            <Select value={watch("pathogenId")} onValueChange={(val) => setValue("pathogenId", val)}>
              <SelectTrigger className="w-full rounded-lg border-gray-200 bg-white h-10">
                <SelectValue placeholder="-- Chọn Tác Nhân --" />
              </SelectTrigger>
              <SelectContent>
                {pathogensData?.items?.map((p: any) => (
                  <SelectItem key={p.id} value={p.id}>🦠 {p.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.pathogenId && <p className="text-xs text-red-500">{errors.pathogenId.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">Mức Độ <span className="text-red-500">*</span></label>
              <Select value={watch("severity")} onValueChange={(val) => setValue("severity", val)}>
                <SelectTrigger className="w-full rounded-lg border-gray-200 bg-white h-10">
                  <SelectValue placeholder="Chọn..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mild">Nhẹ</SelectItem>
                  <SelectItem value="moderate">Trung bình</SelectItem>
                  <SelectItem value="severe">Nặng</SelectItem>
                </SelectContent>
              </Select>
              {errors.severity && <p className="text-xs text-red-500">{errors.severity.message}</p>}
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">Nơi Điều Trị <span className="text-red-500">*</span></label>
              <Select value={watch("treatmentSite")} onValueChange={(val) => setValue("treatmentSite", val)}>
                <SelectTrigger className="w-full rounded-lg border-gray-200 bg-white h-10">
                  <SelectValue placeholder="Chọn..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="outpatient">Ngoại trú</SelectItem>
                  <SelectItem value="inpatient">Nội trú</SelectItem>
                  <SelectItem value="intensiveCareUnit">ICU</SelectItem>
                </SelectContent>
              </Select>
              {errors.treatmentSite && <p className="text-xs text-red-500">{errors.treatmentSite.message}</p>}
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" className="flex-1 h-10" onClick={() => onOpenChange(false)}>Hủy</Button>
            <Button type="submit" className="flex-1 bg-purple-600 hover:bg-purple-700 text-white h-10 font-medium" disabled={createMutation.isPending || updateMutation.isPending}>
              {isEdit ? "Cập Nhật" : "Lưu Lại"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}