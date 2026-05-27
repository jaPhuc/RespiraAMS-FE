import { api } from "@/src/lib/axios"

export async function getAntibioticSpectra() {
  const response = await api.get(
    "/antibiotic-spectra"
  )

  return response.data
}