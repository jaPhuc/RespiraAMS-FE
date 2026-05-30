import { z } from "zod"

export const resistanceRiskSchema = z.object({
  diseaseId: z.string().min(1, "Vui lòng chọn bệnh lý"),
  pathogenId: z.string().min(1, "Vui lòng chọn tác nhân"),
  criterion: z.object({
    name: z.string().min(1, "Tên tiêu chí không được để trống"),
    type: z.string(),
    min: z.string(),
    max: z.string(),
    unit: z.string(),
    isExclusive: z.string(),
  }),
  name: z.string().min(1, "Mô tả không được để trống"),
})

export type ResistanceRiskFormValues = z.infer<typeof resistanceRiskSchema>
