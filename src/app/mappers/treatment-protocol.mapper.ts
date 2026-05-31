import { TreatmentProtocol } from "@/src/types/treatment-protocol.type"
import { TreatmentProtocolFormValues } from "@/src/schemas/treatment-protocol.schema"

export function mapProtocolToForm(item: TreatmentProtocol): TreatmentProtocolFormValues {
  return {
    diseaseId: item.diseaseId,
    severity: item.severity,
    treatmentSite: item.treatmentSite,
    specialInfectionId: item.specialInfection?.id || null,
    otherCriteriaIds: item.otherCriteria?.map(c => c.id) || [],
    medicineIds: item.medicines?.map(m => m.id) || [],
    version: item.version
  }
}

export function mapFormToProtocolPayload(values: TreatmentProtocolFormValues) {
  return {
    diseaseId: values.diseaseId,
    version: values.version,
    severity: values.severity,
    treatmentSite: values.treatmentSite,
    specialInfectionId: values.specialInfectionId === "none" ? null : values.specialInfectionId,
    otherCriteriaIds: values.otherCriteriaIds,
    medicineIds: values.medicineIds
  }
}