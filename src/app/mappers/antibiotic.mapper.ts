import {
  Antibiotic,
  AntibioticPayload,
} from "@/src/types/antibiotic.type"

import {
  AntibioticFormValues,
} from "@/src/schemas/antibiotic.schema"

export function mapAntibioticToForm(
  antibiotic: Antibiotic
): AntibioticFormValues {
  return {
    name: antibiotic.name,

    antibioticSpectrumId:
      antibiotic
        .antibioticSpectrum
        ?.id || "",

    category:
    antibiotic.category,

    routeOfAdministrations:
      antibiotic.routeOfAdministrations.map(
        (route) =>
          typeof route === "string" ? route : ""
      ),

    dosages:
      antibiotic.dosages || {},
  }
}

export function mapFormToPayload(
  values: AntibioticFormValues
): AntibioticPayload {
  return {
    name: values.name,

    antibioticSpectrumId:
    values.antibioticSpectrumId,

    category:
    values.category,

    routeOfAdministrations:
    values.routeOfAdministrations,

    dosages:
    values.dosages,
  }
}