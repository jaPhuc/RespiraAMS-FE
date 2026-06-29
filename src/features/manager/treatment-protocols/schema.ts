import { z } from "zod"

export const treatmentProtocolSchema = z.object({
  diseaseId: z.string().min(1, "Vui lòng chọn bệnh"),
  severity: z.string().min(1, "Vui lòng chọn mức độ"),
  treatmentSite: z.string().min(1, "Vui lòng chọn nơi điều trị"),
  specialInfectionId: z.string().nullable().optional(),
  otherCriteriaIds: z.array(z.string()).default([]),
  medicineIds: z.array(z.string()).min(1, "Phác đồ phải có ít nhất 1 kháng sinh!"),
  version: z.coerce.number().min(1, "Version phải lớn hơn 0!"),
})

export type TreatmentProtocolFormValues = z.infer<typeof treatmentProtocolSchema>