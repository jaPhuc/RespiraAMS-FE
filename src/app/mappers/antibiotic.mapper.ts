import { Antibiotic } from "@/src/types/antibiotic.type"

import { AntibioticFormValues } from "@/src/schemas/antibiotic.schema"
import { ROUTE_OPTIONS } from "@/src/constants/antibiotic"

const ROUTE_VALUE_MAP: Record<string | number, string> = {
  0: "Oral",
  1: "Intravenous",
  "Oral": "Oral",
  "Intravenous": "Intravenous",
  "oral": "Oral",
  "intravenous": "Intravenous"
}

const CATEGORY_MAP: Record<string | number, string> = {
  0: "Access",
  1: "Watch",
  2: "Reserve",
  3: "AccessWatch",
  4: "Others",
  5: "Unclassified",
  "Access": "Access",
  "Watch": "Watch",
  "Reserve": "Reserve",
  "AccessWatch": "AccessWatch",
  "Others": "Others",
  "Unclassified": "Unclassified",
  "access": "Access",
  "watch": "Watch",
  "reserve": "Reserve",
  "accessWatch": "AccessWatch",
  "others": "Others",
  "unclassified": "Unclassified"
}

export function mapAntibioticToForm(
  antibiotic: Antibiotic
): AntibioticFormValues {
  
  const normalizedDosages: Record<string, string[]> = {};
  if (antibiotic.dosages) {
    Object.entries(antibiotic.dosages).forEach(([key, value]) => {
      const normalizedKey = key.charAt(0).toUpperCase() + key.slice(1).toLowerCase();
      normalizedDosages[normalizedKey] = value;
    });
  }
  return {
    name: antibiotic.name || "",

    antibioticSpectrumId: antibiotic.antibioticSpectrum?.id || "",

    category: CATEGORY_MAP[antibiotic.category as string | number] || antibiotic.category?.toString() || "",

    routeOfAdministrations: antibiotic.routeOfAdministrations?.map((route) => {
      return ROUTE_VALUE_MAP[route as keyof typeof ROUTE_VALUE_MAP] || String(route)
    }) || [],

    dosages: normalizedDosages,
  }
}

export function mapFormToPayload(
  values: AntibioticFormValues
) {

  const cleanedDosages: Record<string, string[]> = {};
  
  values.routeOfAdministrations.forEach((route) => {
    if (values.dosages[route]) {
      const validDosages = values.dosages[route].filter(d => d.trim() !== "");
      if (validDosages.length > 0) {
        cleanedDosages[route] = validDosages;
      }
    }
  });

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