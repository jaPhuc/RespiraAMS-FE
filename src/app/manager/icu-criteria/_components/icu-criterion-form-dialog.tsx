"use client"
import { useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useWatch } from "react-hook-form"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/src/components/ui/dialog"
import { Input } from "@/src/components/ui/input"
import { Button } from "@/src/components/ui/button"
import { Switch } from "@/src/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select"
import { icuCriterionSchema, IcuCriterionFormValues } from "@/src/schemas/icu-criterion.schema"
import { mapIcuCriterionToForm, mapFormToIcuCriterionPayload } from "@/src/app/mappers/icu-criterion.mapper"
import { useCreateIcuCriterion } from "@/src/hooks/mutations/use-icu-criterion"
import { useUpdateIcuCriterion } from "@/src/hooks/mutations/use-icu-criterion"
import { useDiseases } from "@/src/hooks/queries/use-diseases"
import { Checkbox } from "@/src/components/ui/checkbox"

export function IcuCriterionFormDialog({ open, onOpenChange, initialData }: any) {
  const isEdit = !!initialData
  const createMutation = useCreateIcuCriterion()
  const updateMutation = useUpdateIcuCriterion()

  const { data: diseasesData } = useDiseases({ page: 1, pageSize: 100 })

  const { register, handleSubmit, reset, control, watch, setValue, formState: { errors } } = useForm<IcuCriterionFormValues>({
    resolver: zodResolver(icuCriterionSchema),
    defaultValues: {
      diseaseId: "",
      isMainCriteria: false,
      criterion: { name: "", type: "boolean", min: null, max: null, unit: "", isExclusive: false }
    }
  })

  const criterionType = useWatch({ control, name: "criterion.type" })
  const isMainCriteria = useWatch({ control, name: "isMainCriteria" })

  useEffect(() => {
    if (initialData) reset(mapIcuCriterionToForm(initialData))
    else reset({
      diseaseId: "", isMainCriteria: false,
      criterion: { name: "", type: "boolean", min: null, max: null, unit: "", isExclusive: false }
    })
  }, [initialData, reset, open])

  const onSubmit = async (values: IcuCriterionFormValues) => {
    const payload = mapFormToIcuCriterionPayload(values)
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
      <DialogContent className="sm:max-w-md p-0 gap-0 overflow-hidden rounded-2xl">
        <DialogHeader className="px-6 pt-6 pb-4">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-lg font-semibold text-gray-900">
              {isEdit ? "Cập nhật tiêu chuẩn ICU" : "Thêm Mới tiêu chuẩn ICU"}
            </DialogTitle>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="px-6 pb-6 space-y-5">

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">Bệnh lý</label>
            <Select value={watch("diseaseId")} onValueChange={(val) => setValue("diseaseId", val)}>
              <SelectTrigger className="w-full rounded-lg border-gray-200 bg-white h-10">
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

          {/* Criterion Name */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">Tên Tiêu Chuẩn</label>
            <Input
              {...register("criterion.name")}
              placeholder="e.g. Systolic Blood Pressure"
              className="rounded-lg border-gray-200 h-10 placeholder:text-gray-400"
            />
            {errors.criterion?.name && <p className="text-xs text-red-500">{errors.criterion.name.message}</p>}
          </div>

          {/* Criterion Type — Toggle Button Group */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">Loại Tiêu Chuẩn</label>
            <div className="flex rounded-lg border border-gray-200 overflow-hidden bg-gray-50 p-1 gap-1">
              <button
                type="button"
                disabled={isEdit}
                onClick={() => setValue("criterion.type", "boolean")}
                className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-all duration-150 ${
                  criterionType === "boolean"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                } disabled:cursor-not-allowed disabled:opacity-60`}
              >
                Boolean
              </button>
              <button
                type="button"
                disabled={isEdit}
                onClick={() => setValue("criterion.type", "numeric")}
                className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-all duration-150 ${
                  criterionType === "numeric"
                    ? "bg-primary text-white shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                } disabled:cursor-not-allowed disabled:opacity-60`}
              >
                Numeric
              </button>
            </div>
          </div>

          {/* Numeric Fields */}
          {criterionType === "numeric" && (
            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700">Min</label>
                <Input
                  type="number"
                  step="any"
                  {...register("criterion.min")}
                  placeholder=""
                  className="rounded-lg border-gray-200 h-10"
                />
                {errors.criterion?.min && <p className="text-xs text-red-500">{errors.criterion.min.message}</p>}
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700">Max</label>
                <Input
                  type="number"
                  step="any"
                  {...register("criterion.max")}
                  placeholder=""
                  className="rounded-lg border-gray-200 h-10"
                />
                {errors.criterion?.max && <p className="text-xs text-red-500">{errors.criterion.max.message}</p>}
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700">Đơn vị</label>
                <Input
                  {...register("criterion.unit")}
                  placeholder="mmHg"
                  className="rounded-lg border-gray-200 h-10"
                />
              </div>
              <div className="flex items-center gap-2 pb-2 h-10">
                  <Checkbox 
                    id="exclusive" 
                    checked={watch("criterion.isExclusive")} 
                    onCheckedChange={(checked) => setValue("criterion.isExclusive", !!checked)} 
                  />
                  <label htmlFor="exclusive" className="text-sm font-medium cursor-pointer">
                    Không bao gồm giá trị biên (Exclusive)
                  </label>
                </div>
            </div>
          )}

          {/* Is Main Criterion — Toggle Row */}
          <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-primary/10 px-4 py-3">
            <div>
              <p className="text-sm font-medium text-gray-800">Là Tiêu Chuẩn Chính</p>
              {/* <p className="text-xs text-gray-500 mt-0.5">Primary diagnostic marker for this disease.</p> */}
            </div>
            <Switch
                size="sm"
                checked={!!isMainCriteria}
                onCheckedChange={(checked) => setValue("isMainCriteria", checked)}
                className="data-[state=checked]:bg-primary h-7 w-14"
              />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-1 pb-5">
            <Button
              type="button"
              variant="outline"
              className="flex-1 rounded-lg border-gray-200 text-gray-700 hover:bg-gray-50 h-10"
              onClick={() => onOpenChange(false)}
            >
              Hủy
            </Button>
            <Button
              type="submit"
              className="flex-1 rounded-lg bg-primary hover:bg-primary/90 text-white h-10 font-medium"
              disabled={createMutation.isPending || updateMutation.isPending}
            >
              {isEdit ? "Cập nhật Tiêu chuẩn" : "Lưu Tiêu chuẩn"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
