export interface AntibioticSpectrum {
  id: string
  name: string
  description: string
}

export interface AntibioticSpectrumResponse {
  metadata: {
    hasNextPage: boolean
    hasPreviousPage: boolean
    totalItemCount: number
    pageCount: number
    currentPage: number
    pageSize: number
  }
  items: AntibioticSpectrum[]
}
