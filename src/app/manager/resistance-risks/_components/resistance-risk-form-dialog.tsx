"use client"

import { useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog"

import { Input } from "@/src/components/ui/input"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select"

import { Button } from "@/src/components/ui/button"

import {
  resistanceRiskSchema,
  ResistanceRiskFormValues,
} from "@/src/schemas/resistance-risk.schema"

import { useDiseases } from "@/src/hooks/queries/use-diseases"
import { usePathogens } from "@/src/hooks/queries/use-pathogens"

import { useCreateResistanceRisk, useUpdateResistanceRisk } from "@/src/hooks/mutations/use-resistance-risk"

import { ResistanceRisk, ResistanceRiskPayload } from "@/src/types/resistance-risk.type"
import { Disease } from "@/src/types/disease.type"
import { Pathogen } from "@/src/types/pathogen.type"

interface Props {
  open: boolean
  onOpenChange: (value: boolean) => void
  initialData?: ResistanceRisk | null
}

const TYPE_OPTIONS = [
  { label: "Boolean", value: "boolean" },
  { label: "Numeric", value: "numeric" },
]

export function ResistanceRiskFormDialog({
  open,
  onOpenChange,
  initialData,
}: Props) {
  const isEdit = !!initialData

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    setError,
    watch,
    formState: { errors },
  } = useForm<ResistanceRiskFormValues>({
    resolver: zodResolver(resistanceRiskSchema),
    defaultValues: {
      diseaseId: "",
      pathogenId: "",
      criterion: {
        name: "",
        type: "boolean",
        min: "",
        max: "",
        unit: "",
        isExclusive: false,
      },
      name: "",
    },
  })

  const { data: diseasesData } = useDiseases({ page: 1, pageSize: 100 })
  const { data: pathogensData } = usePathogens({ page: 1, pageSize: 100 })

  const createMutation = useCreateResistanceRisk()
  const updateMutation = useUpdateResistanceRisk()

  const criterionType = watch("criterion.type")

  useEffect(() => {
    if (initialData) {
      reset({
        diseaseId: initialData.diseaseId,
        pathogenId: initialData.pathogen.id,
        criterion: {
          name: initialData.criterion.name,
          type: initialData.criterion.type === "numeric" ? "numeric" : "boolean",
          min: initialData.criterion.min != null ? String(initialData.criterion.min) : "",
          max: initialData.criterion.max != null ? String(initialData.criterion.max) : "",
          unit: initialData.criterion.unit ?? "",
          isExclusive: false,
        },
        name: initialData.name,
      })
    } else {
      reset({
        diseaseId: "",
        pathogenId: "",
        criterion: {
          name: "",
          type: "boolean",
          min: "",
          max: "",
          unit: "",
          isExclusive: false,
        },
        name: "",
      })
    }
  }, [initialData, reset])

  function buildPayload(values: ResistanceRiskFormValues): ResistanceRiskPayload {
    const isNumeric = values.criterion.type === "numeric"

    return {
      diseaseId: values.diseaseId,
      pathogenId: values.pathogenId,
      criterion: {
        name: values.criterion.name,
        type: values.criterion.type,
        min: isNumeric ? values.criterion.min : null,
        max: isNumeric ? values.criterion.max : null,
        unit: isNumeric ? values.criterion.unit : null,
        isExclusive: null,
      },
      name: values.name,
    }
  }

  async function onSubmit(values: ResistanceRiskFormValues) {
    if (values.criterion.type === "numeric") {
      if (!values.criterion.min) {
        setError("criterion.min", { message: "Vui lòng nhập giá trị tối thiểu" })
        return
      }
      if (!values.criterion.max) {
        setError("criterion.max", { message: "Vui lòng nhập giá trị tối đa" })
        return
      }
      if (!values.criterion.unit) {
        setError("criterion.unit", { message: "Vui lòng nhập đơn vị" })
        return
      }
    }

    const payload = buildPayload(values)

    try {
      if (isEdit) {
        await updateMutation.mutateAsync({ id: initialData!.id, payload })
      } else {
        await createMutation.mutateAsync(payload)
      }
      onOpenChange(false)
    } catch (error: unknown) {
      const err = error as { response?: { data?: { detail?: string; title?: string } } }
      const errorMsg = err.response?.data?.detail || err.response?.data?.title || "Có lỗi khi lưu dữ liệu!"
      alert(`Lỗi: ${errorMsg}`)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Chỉnh Sửa Nguy Cơ Kháng Thuốc" : "Thêm Nguy Cơ Kháng Thuốc Mới"}
          </DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit, (errors) => console.log(errors))}
          className="space-y-5"
        >
          {/* Disease */}
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Bệnh lý<span className="text-red-500">*</span>
            </label>

            <Select
              value={watch("diseaseId")}
              onValueChange={(value) => setValue("diseaseId", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Chọn bệnh lý" />
              </SelectTrigger>

              <SelectContent>
                {diseasesData?.items?.map((item: Disease) => (
                  <SelectItem key={item.id} value={item.id}>
                    {item.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {errors.diseaseId && (
              <p className="text-sm text-red-500">{errors.diseaseId.message}</p>
            )}
          </div>

          {/* Pathogen */}
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Tác nhân<span className="text-red-500">*</span>
            </label>

            <Select
              value={watch("pathogenId")}
              onValueChange={(value) => setValue("pathogenId", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Chọn tác nhân" />
              </SelectTrigger>

              <SelectContent>
                {pathogensData?.items?.map((item: Pathogen) => (
                  <SelectItem key={item.id} value={item.id}>
                    {item.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {errors.pathogenId && (
              <p className="text-sm text-red-500">{errors.pathogenId.message}</p>
            )}
          </div>

          {/* Criterion - Name */}
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Tên tiêu chí<span className="text-red-500">*</span>
            </label>

            <Input
              {...register("criterion.name")}
              placeholder="Nhập tên tiêu chí"
            />

            {errors.criterion?.name && (
              <p className="text-sm text-red-500">{errors.criterion.name.message}</p>
            )}
          </div>

          {/* Criterion - Type */}
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Loại tiêu chí<span className="text-red-500">*</span>
            </label>

            <Select
              value={watch("criterion.type")}
              onValueChange={(value: "boolean" | "numeric") => setValue("criterion.type", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Chọn loại tiêu chí" />
              </SelectTrigger>

              <SelectContent>
                {TYPE_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {errors.criterion?.type && (
              <p className="text-sm text-red-500">{errors.criterion.type.message}</p>
            )}
          </div>

          {/* Criterion - Numeric fields */}
          {criterionType === "numeric" && (
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Min<span className="text-red-500">*</span>
                </label>

                <Input
                  {...register("criterion.min")}
                  placeholder="Giá trị min"
                />

                {errors.criterion?.min && (
                  <p className="text-sm text-red-500">{errors.criterion.min.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Max<span className="text-red-500">*</span>
                </label>

                <Input
                  {...register("criterion.max")}
                  placeholder="Giá trị max"
                />

                {errors.criterion?.max && (
                  <p className="text-sm text-red-500">{errors.criterion.max.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Đơn vị<span className="text-red-500">*</span>
                </label>

                <Input
                  {...register("criterion.unit")}
                  placeholder="VD: Celsius"
                />

                {errors.criterion?.unit && (
                  <p className="text-sm text-red-500">{errors.criterion.unit.message}</p>
                )}
              </div>
            </div>
          )}

          {/* Name (Description) */}
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Mô tả<span className="text-red-500">*</span>
            </label>

            <Input
              {...register("name")}
              placeholder="Nhập mô tả nguy cơ kháng thuốc"
            />

            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={createMutation.isPending || updateMutation.isPending}
          >
            {isEdit ? "Cập nhật" : "Thêm mới"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
