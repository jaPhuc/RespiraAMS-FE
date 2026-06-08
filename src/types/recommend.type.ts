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

export interface TreatmentProtocol {
  id: string
  name: string
  description: string
  specialInfection: SpecialInfection
  medicines: Medicine[]
}

export type RecommendResponse = TreatmentProtocol[]
