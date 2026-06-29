export interface ProtocolMedicine {
  id: string
  name: string
  category?: string
  antibioticSpectrum?: { id: string; name: string }
  routeOfAdministrations?: string[]
  dosages?: Record<string, string[]>
}

export interface ProtocolCriteria {
  id: string
  name: string
}

export interface ProtocolInfection {
  id: string
  name: string
}

export interface TreatmentProtocol {
  id: string
  updatedAt: string
  diseaseId: string
  version: number
  severity: string
  treatmentSite: string
  specialInfection: ProtocolInfection | null
  otherCriteria: ProtocolCriteria[]
  medicines: ProtocolMedicine[]
}

export interface TreatmentProtocolPayload {
  diseaseId: string
  version: number
  severity: string
  treatmentSite: string
  specialInfectionId: string | null
  otherCriteriaIds: string[]
  medicineIds: string[]
}
