export interface AntibioticSpectrum {
  id: string
  name: string
}

export interface Antibiotic {
  id: string
  name: string
  antibioticSpectrum: AntibioticSpectrum
  category: string
  routeOfAdministrations: string[]
  dosages: Record<string, string[]>
}

export interface PaginationMetadata {
  hasNextPage: boolean
  hasPreviousPage: boolean
  totalItemCount: number
  pageCount: number
  currentPage: number
  pageSize: number
}

export interface AntibioticsResponse {
  metadata: PaginationMetadata
  items: Antibiotic[]
}