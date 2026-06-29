export interface DiagnoseRequest {
  confusion: boolean
  urea: string
  respiratory: string
  systolic: string
  diastolic: string
  age: string
  icuHospitalizeCriteria: string[]
  resistanceRiskFactors: string[]
  otherCriteria: string[]
}

export interface InfectionProbability {
  pathogen: {
    id: string
    name: string
    description: string
  }
  probability: string
}

export interface DiagnoseResponse {
  severity: string
  treatmentSite: string
  infectionProbabilities: InfectionProbability[]
}

export interface RecommendRequest {
  severity: string
  treatmentSite: string
  infectionProbabilities: Record<string, string>
  otherCriteria: string[]
}

export interface Medicine {
  id: string
  name: string
  antibioticSpectrum: {
    id: string
    name: string
  }
  category: string
  routeOfAdministrations: string[]
  dosages: Record<string, string[]>
}

export interface SpecialInfection {
  id: string
  name: string
  description?: string
}

export interface TreatmentProtocolRecommend {
  id: string
  name: string
  description: string
  specialInfection: SpecialInfection
  medicines: Medicine[]
}

export type TreatmentProtocol = TreatmentProtocolRecommend
export type RecommendResponse = TreatmentProtocolRecommend[]
