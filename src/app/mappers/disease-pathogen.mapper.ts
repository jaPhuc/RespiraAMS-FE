import { DiseasePathogenFormValues } from "@/src/schemas/disease-pathogen.schema"

export function mapPathogenToForm(item: any): DiseasePathogenFormValues {
  return {
    diseaseId: item.diseaseId,
    pathogenId: item.pathogen?.id || "",
    severity: item.severity || "mild",
    treatmentSite: item.treatmentSite || "outpatient"
  }
}

export function mapFormToPathogenPayload(values: DiseasePathogenFormValues) {
  return {
    diseaseId: values.diseaseId,
    pathogenId: values.pathogenId,
    severity: values.severity,
    treatmentSite: values.treatmentSite
  }
}