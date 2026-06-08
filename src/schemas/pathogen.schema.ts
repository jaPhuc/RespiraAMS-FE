import { z } from "zod"

export const pathogenSchema = z.object({
  name: z.string().min(1, "Tên tác nhân không được để trống nha bồ"),
  description: z.string().min(1, "Mô tả không được để trống"),
})

export type PathogenFormValues = z.infer<typeof pathogenSchema>