export interface ResistanceRiskPathogen {
  id: string
  name: string
  description: string
}

export interface ResistanceRiskCriterion {
  id: string
  name: string
  type: string
  min: number | null
  max: number | null
  unit: string | null
  isExclusive: boolean | null
}

export interface ResistanceRiskDisease {
  id: string
  name: string
}

export interface ResistanceRisk {
  id: string
  diseaseId: string
  disease?: ResistanceRiskDisease
  pathogen: ResistanceRiskPathogen
  criterion: ResistanceRiskCriterion
  name: string
}

export interface ResistanceRiskCriterionPayload {
  name: string
  type: string
  min: string | null
  max: string | null
  unit: string | null
  isExclusive: null
}

export interface ResistanceRiskPayload {
  diseaseId: string
  pathogenId: string
  criterion: ResistanceRiskCriterionPayload
  name: string
}
