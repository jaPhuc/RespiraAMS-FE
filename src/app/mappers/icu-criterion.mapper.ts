import { IcuCriterion } from "@/src/types/icu-criterion.type"
import { IcuCriterionFormValues } from "@/src/schemas/icu-criterion.schema"

export function mapIcuCriterionToForm(item: IcuCriterion): IcuCriterionFormValues {
  return {
    diseaseId: item.diseaseId,
    isMainCriteria: item.isMainCriteria,
    criterion: {
      name: item.criterion.name,
      type: item.criterion.type.toString().toLowerCase() as "boolean" | "numeric",
      min: item.criterion.min,
      max: item.criterion.max,
      unit: item.criterion.unit || "",
      isExclusive: item.criterion.isExclusive ?? false
    }
  }
}

export function mapFormToIcuCriterionPayload(values: IcuCriterionFormValues) {
  const isNum = values.criterion.type === "numeric";
  
  return {
    diseaseId: values.diseaseId,
    isMainCriteria: values.isMainCriteria,
    criterion: {
      name: values.criterion.name,
      type: values.criterion.type,
      min: isNum ? values.criterion.min : null,
      max: isNum ? values.criterion.max : null,
      unit: isNum ? (values.criterion.unit || null) : null,
      isExclusive: isNum ? values.criterion.isExclusive : false
    }
  }
}