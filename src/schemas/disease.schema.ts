import { z } from "zod"

export const diseaseSchema = z.object({
  name: z.string().min(1, "Tên bệnh lý không được để trống"),
  description: z.string().min(1, "Mô tả không được để trống"),
  requiredIcuMainCriteria: z.coerce.number().min(1, "Số lượng tiêu chuẩn chính phải lớn hơn 0"),
  requiredIcuSecondaryCriteria: z.coerce.number().min(1, "Số lượng tiêu chuẩn phụ phải lớn hơn 0"),
})

export type DiseaseFormValues = z.infer<typeof diseaseSchema>