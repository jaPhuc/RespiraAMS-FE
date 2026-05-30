import { api } from "@/src/lib/axios"

export async function getAntibioticSpectra(
  params: {
    page: number
    pageSize: number
  }
) {
  const response = await api.get(
    "/antibiotic-spectra",
    {
      params,
    }
  )

  return response.data
}

export async function createAntibioticSpectrum(
  payload: {
    name: string
    description: string
  }
) {
  const response = await api.post(
    "/antibiotic-spectra",
    payload
  )

  return response.data
}

export async function updateAntibioticSpectrum(
  id: string,
  payload: {
    name: string
    description: string
  }
) {
  const response = await api.put(
    `/antibiotic-spectra/${id}`,
    payload
  )

  return response.data
}

export async function deleteAntibioticSpectrum(
  id: string
) {
  const response = await api.delete(
    `/antibiotic-spectra/${id}`
  )

  return response.data
}
