import { api } from "@/src/lib/axios"
import { TreatmentProtocolsResponse } from "@/src/types/treatment-protocol.type"

interface GetParams {
  page?: number
  pageSize?: number
  diseaseId?: string
  severity?: string
}

export async function getTreatmentProtocols({page = 1, pageSize = 10, diseaseId, severity}: GetParams): Promise<TreatmentProtocolsResponse> {
  const response = await api.get("/treatment-protocols", {
    params: { page, pageSize, 
      ...(diseaseId && diseaseId !== "all" && { diseaseId }),
      ...(severity && severity !== "all" && { severity }) },
  })
  return response.data
}

export async function createTreatmentProtocol(payload: any) {
  const response = await api.post("/treatment-protocols", payload)
  return response.data
}

export async function updateTreatmentProtocol(id: string, payload: any) {
  const response = await api.put(`/treatment-protocols/${id}`, payload)
  return response.data
}

export async function deleteTreatmentProtocol(id: string) {
  const response = await api.delete(`/treatment-protocols/${id}`)
  return response.data
}

export async function getTreatmentProtocolById(id: string) {
  const response = await api.get(`/treatment-protocols/${id}`)
  return response.data
}

export async function addProtocolCriteria(protocolId: string, payload: any[]) {
  const response = await api.post(`/treatment-protocols/${protocolId}/criteria`, payload)
  return response.data
}