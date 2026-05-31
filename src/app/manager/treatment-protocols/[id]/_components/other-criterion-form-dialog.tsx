"use client"
import { useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useWatch } from "react-hook-form"
import { z } from "zod"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/src/components/ui/dialog"
import { Input } from "@/src/components/ui/input"
import { Button } from "@/src/components/ui/button"
import { Checkbox } from "@/src/components/ui/checkbox"
import { useAddProtocolCriteria } from "@/src/hooks/mutations/use-treatment-protocol"

const numberOrNull = z.union([z.number(), z.string()]).transform(val => {
  if (val === "" || val === null || val === undefined) return null;
  const num = Number(val);
  return isNaN(num) ? null : num;
}).nullable().optional();

const simpleCriterionSchema = z.object({
  name: z.string().min(1, "Tên tiêu chuẩn không được để trống"),
  type: z.enum(["boolean", "numeric"]),
  min: numberOrNull,
  max: numberOrNull,
  unit: z.string().nullable().optional(),
  isExclusive: z.boolean().default(false)
}).superRefine((data, ctx) => {
  if (data.type === "numeric") {
    if (data.min === null) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Nhập Min", path: ["min"] });
    if (data.max === null) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Nhập Max", path: ["max"] });
    if (data.min !== null && data.max !== null && data.min > data.max) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Min phải nhỏ hơn hoặc bằng Max", path: ["max"] });
    }
  }
});

type SimpleCriterionFormValues = z.infer<typeof simpleCriterionSchema>;

export function OtherCriterionFormDialog({ open, onOpenChange, protocolId }: { open: boolean, onOpenChange: any, protocolId: string }) {
  const addMutation = useAddProtocolCriteria()

  const { register, handleSubmit, reset, control, watch, setValue, formState: { errors } } = useForm<SimpleCriterionFormValues>({
    resolver: zodResolver(simpleCriterionSchema),
    defaultValues: { name: "", type: "boolean", min: null, max: null, unit: "", isExclusive: false }
  })

  const criterionType = useWatch({ control, name: "type" })

  useEffect(() => {
    if (open) reset({ name: "", type: "boolean", min: null, max: null, unit: "", isExclusive: false })
  }, [open, reset])

  const onSubmit = async (values: SimpleCriterionFormValues) => {
    const isNum = values.type === "numeric";
    const payloadArray = [{
      name: values.name,
      type: values.type,
      min: isNum ? (values.min?.toString() || "") : "",
      max: isNum ? (values.max?.toString() || "") : "",
      unit: isNum ? (values.unit || null) : null,
      isExclusive: isNum ? values.isExclusive : null
    }];

    try {
      await addMutation.mutateAsync({ protocolId, payload: payloadArray })
      onOpenChange(false)
    } catch (error: any) {
      alert("Lỗi Backend: " + (error.response?.data?.detail || "Lưu thất bại"))
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md p-0 gap-0 overflow-hidden rounded-2xl">
        <DialogHeader className="px-6 pt-6 pb-4 border-b">
          <DialogTitle className="text-lg font-semibold text-[#006591]">Thêm Tiêu Chuẩn Phụ (Cho Phác Đồ Này)</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="px-6 py-6 space-y-5">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">Tên Tiêu Chuẩn <span className="text-red-500">*</span></label>
            <Input {...register("name")} placeholder="VD: Suy giảm miễn dịch..." className="h-10" />
            {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">Loại Tiêu Chuẩn <span className="text-red-500">*</span></label>
            <div className="flex rounded-lg border border-gray-200 overflow-hidden bg-gray-50 p-1 gap-1">
              <button type="button" onClick={() => setValue("type", "boolean")} className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-all ${criterionType === "boolean" ? "bg-white text-[#006591] shadow-sm font-bold" : "text-gray-500"}`}>Boolean</button>
              <button type="button" onClick={() => setValue("type", "numeric")} className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-all ${criterionType === "numeric" ? "bg-[#006591] text-white shadow-sm font-bold" : "text-gray-500"}`}>Numeric</button>
            </div>
          </div>

          {criterionType === "numeric" && (
            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700">Min <span className="text-red-500">*</span></label>
                <Input type="number" step="any" {...register("min")} className="h-10" />
                {errors.min && <p className="text-xs text-red-500">{errors.min.message}</p>}
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700">Max <span className="text-red-500">*</span></label>
                <Input type="number" step="any" {...register("max")} className="h-10" />
                {errors.max && <p className="text-xs text-red-500">{errors.max.message}</p>}
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700">Đơn vị</label>
                <Input {...register("unit")} className="h-10" placeholder="VD: %" />
              </div>
              <div className="col-span-3 flex items-center gap-2 pt-2">
                <Checkbox id="exclusive" checked={watch("isExclusive")} onCheckedChange={(checked) => setValue("isExclusive", !!checked)} />
                <label htmlFor="exclusive" className="text-sm font-medium text-gray-700 cursor-pointer">Không bao gồm giá trị biên (Exclusive)</label>
              </div>
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" className="flex-1 h-10" onClick={() => onOpenChange(false)}>Hủy</Button>
            <Button type="submit" className="flex-1 bg-[#006591] hover:bg-[#004c6e] text-white h-10 font-bold" disabled={addMutation.isPending}>Tạo Tiêu Chuẩn</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}