import { z } from "zod"

export const antibioticSchema =
  z.object({
    name: z
      .string()
      .trim()
      .min(1, "Vui lòng nhập tên thuốc"),

    antibioticSpectrumId:
      z
        .string()
        .min(
          1,
          "Vui lòng chọn phổ kháng khuẩn!"
        ),

    category: z
      .string()
      .min(
        1,
        "Vui lòng chọn phân loại!"
      ),

    routeOfAdministrations:
      z
        .array(z.string())
        .min(
          1,
          "Vui lòng chọn ít nhất 1 đường dùng!"
        ),

    dosages: z.record(z.string(), z.array(z.string())),
  }).refine((data) => {
      return data.routeOfAdministrations.every((route) => {
        const routeDosages = data.dosages[route];
        return routeDosages && routeDosages.some((d) => d.trim() !== "");
      });
    }, {
      message: "Vui lòng nhập liều dùng cho đường dùng đã chọn!",
      path: ["dosages"],
    });

export type AntibioticFormValues =
  z.infer<
    typeof antibioticSchema
  >