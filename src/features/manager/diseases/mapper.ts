import { Disease } from "@/src/features/manager/diseases/types"
import { DiseaseFormValues } from "@/src/features/manager/diseases/schema"

export function mapDiseaseToForm(disease: Disease): DiseaseFormValues {
  return {
    name: disease.name,
    description: disease.description,
    requiredIcuMainCriteria: disease.requiredIcuMainCriteria,
    requiredIcuSecondaryCriteria: disease.requiredIcuSecondaryCriteria,
  }
}

export function mapFormToDiseasePayload(values: DiseaseFormValues) {
  return {
    name: values.name,
    description: values.description,
    requiredIcuMainCriteria: values.requiredIcuMainCriteria,
    requiredIcuSecondaryCriteria: values.requiredIcuSecondaryCriteria,
  }
}