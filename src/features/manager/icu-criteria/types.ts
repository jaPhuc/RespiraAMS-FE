export interface Criterion {
  id: string
  name: string
  type: "boolean" | "numeric"
  min: number | null
  max: number | null
  unit: string | null
  isExclusive: boolean | null
}

export interface IcuCriterion {
  id: string
  diseaseId: string
  criterion: Criterion
  isMainCriteria: boolean
}

export interface IcuCriterionPayload {
  diseaseId: string
  isMainCriteria: boolean
  criterion: {
    name: string
    type: "boolean" | "numeric"
    min: number | string | null
    max: number | string | null
    unit: string | null
    isExclusive: boolean | null
  }
}
