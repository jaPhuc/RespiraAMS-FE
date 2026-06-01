import { z } from "zod"

const numberOrNull = z.union([z.number(), z.string()]).transform(val => {
  if (val === "" || val === null || val === undefined) return null;
  const num = Number(val);
  return isNaN(num) ? null : num;
}).nullable().optional();

export const icuCriterionSchema = z.object({
  diseaseId: z.string().min(1, "Chưa chọn Bệnh lý!"),
  isMainCriteria: z.boolean().default(false),
  criterion: z.object({
    name: z.string().min(1, "Tên tiêu chuẩn không được để trống!"),
    type: z.enum(["boolean", "numeric"]),
    min: numberOrNull,
    max: numberOrNull,
    unit: z.string().nullable().optional(),
    isExclusive: z.boolean().default(false)
  })
}).superRefine((data, ctx) => {
  if (data.criterion.type === "numeric") {
    if (data.criterion.min === null) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Min không được để trống",
        path: ["criterion", "min"]
      });
    }
    if (data.criterion.max === null) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Max không được để trống",
        path: ["criterion", "max"]
      });
    }
    if (data.criterion.min !== null && data.criterion.max !== null && data.criterion.min >= data.criterion.max) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Min phải nhỏ hơn Max!",
        path: ["criterion", "max"]
      });
    }
  }
});

export type IcuCriterionFormValues = z.infer<typeof icuCriterionSchema>