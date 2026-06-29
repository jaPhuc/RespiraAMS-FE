"use client"
import { useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/src/components/ui/dialog"
import { Input } from "@/src/components/ui/input"
import { Button } from "@/src/components/ui/button"
import { Textarea } from "@/src/components/ui/textarea"
import { diseaseSchema, DiseaseFormValues } from "@/src/features/manager/diseases/schema"
import { mapDiseaseToForm, mapFormToDiseasePayload } from "@/src/features/manager/diseases/mapper"
import { useCreateDisease, useUpdateDisease } from "@/src/features/manager/diseases/api"

export function DiseaseFormDialog({ open, onOpenChange, initialData }: any) {
  const isEdit = !!initialData
  const createMutation = useCreateDisease()
  const updateMutation = useUpdateDisease()

  const { register, handleSubmit, reset, formState: { errors } } = useForm<DiseaseFormValues>({
    resolver: zodResolver(diseaseSchema),
    defaultValues: { name: "", description: "", requiredIcuMainCriteria: 1, requiredIcuSecondaryCriteria: 1 }
  })

  useEffect(() => {
    if (initialData) reset(mapDiseaseToForm(initialData))
    else reset({ name: "", description: "", requiredIcuMainCriteria: 1, requiredIcuSecondaryCriteria: 1 })
  }, [initialData, reset, open])

  const onSubmit = async (values: DiseaseFormValues) => {
    const payload = mapFormToDiseasePayload(values)
    try {
      if (isEdit) await updateMutation.mutateAsync({ id: initialData.id, payload })
      else await createMutation.mutateAsync(payload)
      onOpenChange(false)
    } catch (error: any) {
      alert("Lỗi: " + (error.response?.data?.detail || "Lưu thất bại"))
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Chỉnh Sửa Bệnh Lý" : "Thêm Bệnh Lý Mới"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium">Tên Bệnh Lý <span className="text-red-500">*</span></label>
            <Input {...register("name")} placeholder="VD: Viêm phổi cộng đồng" />
            {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium">Mô Tả <span className="text-red-500">*</span></label>
            <Textarea {...register("description")} placeholder="Mô tả..." className="resize-none" />
            {errors.description && <p className="text-xs text-red-500">{errors.description.message}</p>}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium">Số TC ICU Chính</label>
              <Input type="number" min="1" {...register("requiredIcuMainCriteria")} />
              {errors.requiredIcuMainCriteria && <p className="text-xs text-red-500">{errors.requiredIcuMainCriteria.message}</p>}
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Số TC ICU Phụ</label>
              <Input type="number" min="1" {...register("requiredIcuSecondaryCriteria")} />
              {errors.requiredIcuSecondaryCriteria && <p className="text-xs text-red-500">{errors.requiredIcuSecondaryCriteria.message}</p>}
            </div>
          </div>
          <Button type="submit" className="w-full bg-[#006591] hover:bg-[#004c6e]" disabled={createMutation.isPending || updateMutation.isPending}>
            {isEdit ? "Cập Nhật" : "Lưu Lại"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}