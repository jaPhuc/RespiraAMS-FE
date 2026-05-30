import { z } from "zod"

export const antibioticSpectrumSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Vui lòng nhập tên kháng sinh!"),
  description: z
    .string()
    .trim()
    .min(1, "Vui lòng nhập mô tả!"),
})

export type AntibioticSpectrumSchemaFormValues = z.infer<typeof antibioticSpectrumSchema>