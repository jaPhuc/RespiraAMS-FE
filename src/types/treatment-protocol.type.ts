import { PaginationResponse } from "./common.type"

export interface ProtocolMedicine {
  id: string
  name: string
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
  severity: "mild" | "moderate" | "severe" | string
  treatmentSite: "outpatient" | "inpatient" | "intensiveCareUnit" | string
  specialInfection: ProtocolInfection | null
  otherCriteria: ProtocolCriteria[]
  medicines: ProtocolMedicine[]
}

export type TreatmentProtocolsResponse = PaginationResponse<TreatmentProtocol>