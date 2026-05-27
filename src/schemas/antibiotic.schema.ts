import { z } from "zod"

export const antibioticSchema =
  z.object({
    name: z
      .string()
      .min(1, "Name is required"),

    antibioticSpectrumId:
      z
        .string()
        .min(
          1,
          "Spectrum is required"
        ),

    category: z
      .string()
      .min(
        1,
        "Category is required"
      ),

    routeOfAdministrations:
      z
        .array(z.string())
        .min(
          1,
          "Select at least one route"
        ),

    dosages: z.record(
      z.string(),
      z.array(z.string())
    ),
  })

export type AntibioticFormValues =
  z.infer<
    typeof antibioticSchema
  >