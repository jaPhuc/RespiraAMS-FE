import { z } from "zod"

const numberOrNull = z.union([z.number(), z.string()]).transform(val => {
  if (val === "" || val === null || val === undefined) return null;
  const num = Number(val);
  return isNaN(num) ? null : num;
}).nullable().optional();

export const resistanceRiskSchema = z.object({
  diseaseId: z.string().min(1, "Chưa chọn Bệnh lý"),
  pathogenId: z.string().min(1, "Chưa chọn Tác nhân"),
  name: z.string().min(1, "Tên nguy cơ không được để trống"),
  criterion: z.object({
    name: z.string().min(1, "Tên tiêu chuẩn không được để trống"),
    type: z.enum(["boolean", "numeric"]),
    min: numberOrNull,
    max: numberOrNull,
    unit: z.string().nullable().optional(),
    isExclusive: z.boolean().default(false)
  })
}).superRefine((data, ctx) => {
  if (data.criterion.type === "numeric") {
    if (data.criterion.min === null) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Nhập Min", path: ["criterion", "min"] });
    if (data.criterion.max === null) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Nhập Max", path: ["criterion", "max"] });
    if (data.criterion.min !== null && data.criterion.max !== null && data.criterion.min > data.criterion.max) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Min phải <= Max", path: ["criterion", "max"] });
    }
  }
});

export type ResistanceRiskFormValues = z.infer<typeof resistanceRiskSchema>