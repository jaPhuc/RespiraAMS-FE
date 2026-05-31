import { api } from "@/src/lib/axios"
import { IcuCriteriaResponse } from "@/src/types/icu-criterion.type"
import { IcuCriterionFormValues } from "@/src/schemas/icu-criterion.schema"

interface GetParams {
  page?: number
  pageSize?: number
}

export async function getIcuCriteria({ page = 1, pageSize = 10 }: GetParams): Promise<IcuCriteriaResponse> {
  const response = await api.get("/icu-criteria", {
    params: { page, pageSize },
  })
  return response.data
}

export async function createIcuCriterion(payload: any) {
  const response = await api.post("/icu-criteria", payload)
  return response.data
}

export async function updateIcuCriterion(id: string, payload: any) {
  const response = await api.put(`/icu-criteria/${id}`, payload)
  return response.data
}

export async function deleteIcuCriterion(id: string) {
  const response = await api.delete(`/icu-criteria/${id}`)
  return response.data
}