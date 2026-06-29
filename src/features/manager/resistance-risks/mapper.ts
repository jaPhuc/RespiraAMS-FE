import { ResistanceRiskFormValues } from "@/src/features/manager/resistance-risks/schema"

export function mapRiskToForm(item: any): ResistanceRiskFormValues {
  const cType = item.criterion?.type?.toString().toLowerCase();
  return {
    diseaseId: item.diseaseId,
    pathogenId: item.pathogen?.id || "",
    name: item.name,
    criterion: {
      name: item.criterion?.name || "",
      type: (cType === "1" || cType === "numeric") ? "numeric" : "boolean",
      min: item.criterion?.min,
      max: item.criterion?.max,
      unit: item.criterion?.unit || "",
      isExclusive: item.criterion?.isExclusive || false
    }
  }
}

export function mapFormToRiskPayload(values: ResistanceRiskFormValues) {
  const isNum = values.criterion.type === "numeric";
  return {
    diseaseId: values.diseaseId,
    pathogenId: values.pathogenId,
    name: values.name,
    criterion: {
      name: values.criterion.name,
      type: values.criterion.type,
      min: isNum && values.criterion.min !== null ? values.criterion.min.toString() : null,
      max: isNum && values.criterion.max !== null ? values.criterion.max.toString() : null,
      unit: isNum ? (values.criterion.unit || null) : null,
      isExclusive: isNum ? values.criterion.isExclusive : null
    }
  }
}