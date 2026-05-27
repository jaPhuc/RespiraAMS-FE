import { Antibiotic } from "@/src/types/antibiotic.type"

import { AntibioticFormValues } from "@/src/schemas/antibiotic.schema"
import { ROUTE_OPTIONS } from "@/src/constants/antibiotic"

const ROUTE_VALUE_MAP: Record<
  number,
  string
> = {
  1: "Oral",
  2: "Intravenous",
}

export function mapAntibioticToForm(
  antibiotic: Antibiotic
) {
  return {
    name: antibiotic.name,

    antibioticSpectrumId:
      antibiotic.antibioticSpectrum
        ?.id || "",

    category:
      antibiotic.category || "",

    routeOfAdministrations:
      antibiotic.routeOfAdministrations.map(
        (route) => {
          if (
            typeof route === "string"
          ) {
            return route
          }

          return (
            ROUTE_VALUE_MAP[route] || ""
          )
        }
      ),

    dosages:
      antibiotic.dosages || {},
  }
}

export function mapFormToPayload(
  values: AntibioticFormValues
) {
  return {
    name: values.name,

    antibioticSpectrumId:
    values.antibioticSpectrumId,

    category: values.category,

    routeOfAdministrations:
    values.routeOfAdministrations,

    dosages: values.dosages,
  }
}