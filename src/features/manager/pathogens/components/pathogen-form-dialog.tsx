"use client"
import { useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/src/components/ui/dialog"
import { Input } from "@/src/components/ui/input"
import { Button } from "@/src/components/ui/button"
import { Textarea } from "@/src/components/ui/textarea"
import { pathogenSchema, PathogenFormValues } from "@/src/features/manager/pathogens/schema"
import { mapPathogenToForm, mapFormToPathogenPayload } from "@/src/features/manager/pathogens/mapper"
import { useCreatePathogen, useUpdatePathogen } from "@/src/features/manager/pathogens/api"

export function PathogenFormDialog({ open, onOpenChange, initialData }: any) {
  const isEdit = !!initialData
  const createMutation = useCreatePathogen()
  const updateMutation = useUpdatePathogen()

  const { register, handleSubmit, reset, formState: { errors } } = useForm<PathogenFormValues>({
    resolver: zodResolver(pathogenSchema),
    defaultValues: { name: "", description: "" }
  })

  useEffect(() => {
    if (initialData) reset(mapPathogenToForm(initialData))
    else reset({ name: "", description: "" })
  }, [initialData, reset, open])

  const onSubmit = async (values: PathogenFormValues) => {
    const payload = mapFormToPathogenPayload(values)
    try {
      if (isEdit) await updateMutation.mutateAsync({ id: initialData.id, payload })
      else await createMutation.mutateAsync(payload)
      onOpenChange(false)
    } catch (error: any) {
      alert("Lỗi Backend: " + (error.response?.data?.detail || "Lưu thất bại"))
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md border-t-4 border-t-primary">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Chỉnh Sửa Tác Nhân" : "Thêm Tác Nhân Mới"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-2">
          <div className="space-y-1">
            <label className="text-sm font-medium">Tên Tác Nhân <span className="text-red-500">*</span></label>
            <Input {...register("name")} placeholder="VD: Streptococcus pneumoniae" />
            {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium">Mô Tả <span className="text-red-500">*</span></label>
            <Textarea {...register("description")} placeholder="Mô tả đặc điểm..." className="resize-none" rows={4} />
            {errors.description && <p className="text-xs text-red-500">{errors.description.message}</p>}
          </div>
          <Button type="submit" className="w-full bg-primary hover:bg-primary/80 text-white" disabled={createMutation.isPending || updateMutation.isPending}>
            {isEdit ? "Cập Nhật" : "Lưu Lại"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}