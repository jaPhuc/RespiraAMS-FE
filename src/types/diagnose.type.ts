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
