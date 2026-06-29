"use client"
import { useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useWatch } from "react-hook-form"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/src/components/ui/dialog"
import { Input } from "@/src/components/ui/input"
import { Button } from "@/src/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select"
import { Checkbox } from "@/src/components/ui/checkbox"

import { resistanceRiskSchema, ResistanceRiskFormValues } from "@/src/schemas/resistance-risk.schema"
import { mapRiskToForm, mapFormToRiskPayload } from "@/src/app/mappers/resistance-risk.mapper"
import { useCreateResistanceRisk, useUpdateResistanceRisk } from "@/src/features/manager/resistance-risks/api"
import { useDiseases } from "@/src/features/manager/diseases/api"
import { usePathogens } from "@/src/features/manager/pathogens/api"

export function ResistanceRiskFormDialog({ open, onOpenChange, initialData, fixedDiseaseId }: any) {
  const isEdit = !!initialData
  const createMutation = useCreateResistanceRisk()
  const updateMutation = useUpdateResistanceRisk()

  const { data: diseasesData } = useDiseases({ page: 1, pageSize: 100 })
  const { data: pathogensData } = usePathogens({ page: 1, pageSize: 100 })

  const { register, handleSubmit, reset, control, watch, setValue, formState: { errors } } = useForm<ResistanceRiskFormValues>({
    resolver: zodResolver(resistanceRiskSchema),
    defaultValues: {
      diseaseId: fixedDiseaseId || "",
      pathogenId: "",
      name: "",
      criterion: { name: "", type: "boolean", min: null, max: null, unit: "", isExclusive: false }
    }
  })

  const criterionType = useWatch({ control, name: "criterion.type" })

  useEffect(() => {
    if (initialData) reset(mapRiskToForm(initialData))
    else reset({
      diseaseId: fixedDiseaseId || "", pathogenId: "", name: "",
      criterion: { name: "", type: "boolean", min: null, max: null, unit: "", isExclusive: false }
    })
  }, [initialData, reset, open, fixedDiseaseId])

  const onSubmit = async (values: ResistanceRiskFormValues) => {
    const payload = mapFormToRiskPayload(values)
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
      <DialogContent className="sm:max-w-xl p-0 gap-0 overflow-hidden rounded-2xl">
        <DialogHeader className="px-6 pt-6 pb-4 border-b">
          <DialogTitle className="text-lg font-semibold text-[#006591]">
            {isEdit ? "Cập Nhật Nguy Cơ Kháng Thuốc" : "Thêm Nguy Cơ Kháng Thuốc"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="px-6 py-6 space-y-5 max-h-[80vh] overflow-y-auto">

          <div className="grid grid-cols-2 gap-4">
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
              <label className="text-sm font-medium text-gray-700">Tác Nhân (Pathogen)</label>
              <Select value={watch("pathogenId")} onValueChange={(val) => setValue("pathogenId", val)}>
                <SelectTrigger className="w-full rounded-lg border-gray-200 bg-white h-10">
                  <SelectValue placeholder="-- Chọn Tác Nhân --" />
                </SelectTrigger>
                <SelectContent>
                  {pathogensData?.items?.map((p: any) => (
                    <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.pathogenId && <p className="text-xs text-red-500">{errors.pathogenId.message}</p>}
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">Tên Nguy Cơ <span className="text-red-500">*</span></label>
            <Input {...register("name")} placeholder="VD: S. pneumoniae kháng thuốc..." className="rounded-lg h-10" />
            {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
          </div>

          <div className="bg-amber-50/50 p-4 rounded-xl border border-amber-100 space-y-4">
            <h4 className="font-semibold text-amber-800 text-sm border-b border-amber-200 pb-2">Tiêu Chuẩn Đi Kèm</h4>
            
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">Tên Tiêu Chuẩn</label>
              <Input {...register("criterion.name")} placeholder="VD: Người cao tuổi (>65)..." className="rounded-lg h-10" />
              {errors.criterion?.name && <p className="text-xs text-red-500">{errors.criterion.name.message}</p>}
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">Loại Tiêu Chuẩn</label>
              <div className="flex rounded-lg border border-gray-200 overflow-hidden bg-gray-50 p-1 gap-1">
                <button type="button" onClick={() => setValue("criterion.type", "boolean")} className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-all ${criterionType === "boolean" ? "bg-white text-amber-700 shadow-sm font-bold" : "text-gray-500"}`}>Boolean</button>
                <button type="button" onClick={() => setValue("criterion.type", "numeric")} className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-all ${criterionType === "numeric" ? "bg-amber-600 text-white shadow-sm font-bold" : "text-gray-500"}`}>Numeric</button>
              </div>
            </div>

            {criterionType === "numeric" && (
              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-700">Min</label>
                  <Input type="number" step="any" {...register("criterion.min")} className="rounded-lg h-10" />
                  {errors.criterion?.min && <p className="text-xs text-red-500">{errors.criterion.min.message}</p>}
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-700">Max</label>
                  <Input type="number" step="any" {...register("criterion.max")} className="rounded-lg h-10" />
                  {errors.criterion?.max && <p className="text-xs text-red-500">{errors.criterion.max.message}</p>}
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-700">Đơn vị</label>
                  <Input {...register("criterion.unit")} className="rounded-lg h-10" />
                </div>
                <div className="col-span-3 flex items-center gap-2 pt-2 h-10">
                  <Checkbox id="exclusive" checked={watch("criterion.isExclusive")} onCheckedChange={(checked) => setValue("criterion.isExclusive", !!checked)} />
                  <label htmlFor="exclusive" className="text-sm font-medium cursor-pointer">Không bao gồm giá trị biên (Exclusive)</label>
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-3 pt-2">
            <Button type="button" variant="outline" className="flex-1 h-10" onClick={() => onOpenChange(false)}>Hủy</Button>
            <Button type="submit" className="flex-1 bg-[#006591] hover:bg-[#004c6e] text-white h-10 font-medium" disabled={createMutation.isPending || updateMutation.isPending}>
              {isEdit ? "Cập Nhật" : "Lưu Lại"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}