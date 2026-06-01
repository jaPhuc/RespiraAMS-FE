import { z } from "zod"

export const diseasePathogenSchema = z.object({
  diseaseId: z.string().min(1, "Vui lòng chọn Bệnh lý"),
  pathogenId: z.string().min(1, "Vui lòng chọn Tác nhân"),
  severity: z.coerce.string().min(1, "Vui lòng chọn Mức độ"),
  treatmentSite: z.coerce.string().min(1, "Vui lòng chọn Nơi điều trị")
})

export type DiseasePathogenFormValues = z.infer<typeof diseasePathogenSchema>