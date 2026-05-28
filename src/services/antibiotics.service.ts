import { api } from "@/src/lib/axios"
import { Antibiotic, AntibioticPayload, PaginatedResponse } from "@/src/types/antibiotic.type"

interface GetAntibioticsParams {
  page?: number
  pageSize?: number
}

export async function getAntibiotics({
  page = 1,
  pageSize = 10,
}: GetAntibioticsParams): Promise<PaginatedResponse<Antibiotic>> {
  const response = await api.get("/Antibiotics", {
    params: {
      page,
      pageSize,
    },
  })

  return response.data
}

export async function createAntibiotic(
  payload: AntibioticPayload
) {
  const response = await api.post(
    "/Antibiotics",
    payload
  )

  return response.data
}

export async function updateAntibiotic(
  id: string,
  payload: AntibioticPayload
) {
  const response = await api.put(
    `/Antibiotics/${id}`,
    payload
  )

  return response.data
}

export async function deleteAntibiotic(
  id: string
) {
  const response = await api.delete(
    `/Antibiotics/${id}`
  )

  return response.data
}