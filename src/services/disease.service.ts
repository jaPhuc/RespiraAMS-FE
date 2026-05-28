// src/services/disease.service.ts
import { api } from "@/src/lib/axios"
import { Disease } from "@/src/types/disease.type"
import { DiseaseFormValues } from "@/src/schemas/disease.schema"
import { PaginationResponse } from "@/src/types/common.type"

interface GetDiseasesParams {
  page?: number
  pageSize?: number
}

export async function getDiseases({
  page = 1,
  pageSize = 10,
}: GetDiseasesParams): Promise<PaginationResponse<Disease>> {
  const response = await api.get("/Diseases", {
    params: {
      page,
      pageSize,
    },
  })

  return response.data
}

export async function createDisease(
  payload: DiseaseFormValues
) {
  const response = await api.post(
    "/Diseases",
    payload
  )

  return response.data
}

export async function updateDisease(
  id: string,
  payload: DiseaseFormValues
) {
  const response = await api.put(
    `/Diseases/${id}`,
    payload
  )

  return response.data
}

export async function deleteDisease(
  id: string
) {
  const response = await api.delete(
    `/Diseases/${id}`
  )

  return response.data
}

export async function getDiseaseById(id: string): Promise<Disease> {
  const response = await api.get(`/Diseases/${id}`)
  return response.data
}