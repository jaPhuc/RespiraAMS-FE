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

export interface AntibioticPayload {
  name: string
  antibioticSpectrumId: string
  category: string
  routeOfAdministrations: string[]
  dosages: Record<string, string[]>
}
