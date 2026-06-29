export const queryKeys = {
  antibiotics: {
    all: ["antibiotics"] as const,
    list: (page: number, pageSize: number) =>
      ["antibiotics", "list", page, pageSize] as const,
  },
  antibioticSpectra: {
    all: ["antibiotic-spectra"] as const,
    list: (page?: number, pageSize?: number) =>
      ["antibiotic-spectra", "list", page, pageSize] as const,
  },
  diseases: {
    all: ["diseases"] as const,
    list: (page: number, pageSize: number) =>
      ["diseases", "list", page, pageSize] as const,
    detail: (id: string) => ["diseases", "detail", id] as const,
  },
  diseasePathogens: {
    all: ["disease-pathogens"] as const,
  },
  pathogens: {
    all: ["pathogens"] as const,
    list: (page: number, pageSize: number) =>
      ["pathogens", "list", page, pageSize] as const,
  },
  icuCriteria: {
    all: ["icu-criteria"] as const,
    list: (page: number, pageSize: number) =>
      ["icu-criteria", "list", page, pageSize] as const,
  },
  resistanceRisks: {
    all: ["resistance-risks"] as const,
    list: (page: number, pageSize: number) =>
      ["resistance-risks", "list", page, pageSize] as const,
  },
  treatmentProtocols: {
    all: ["treatment-protocols"] as const,
    list: (page: number, pageSize: number, filters?: Record<string, string | undefined>) =>
      ["treatment-protocols", "list", page, pageSize, filters] as const,
    detail: (id: string) => ["treatment-protocol", "detail", id] as const,
  },
}
