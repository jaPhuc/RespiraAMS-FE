import { api } from "@/src/lib/axios"
import { ResistanceRiskPayload, ResistanceRisksResponse } from "@/src/types/resistance-risk.type"

export async function getResistanceRisks({ page = 1, pageSize = 10 }): Promise<ResistanceRisksResponse> {
  const response = await api.get("/resistance-risks", { params: { page, pageSize } })
  return response.data
}

export async function createResistanceRisk(payload: ResistanceRiskPayload) {
  const response = await api.post("/resistance-risks", payload)
  return response.data
}

export async function updateResistanceRisk(id: string, payload: ResistanceRiskPayload) {
  const response = await api.put(`/resistance-risks/${id}`, payload)
  return response.data
}

export async function deleteResistanceRisk(id: string) {
  const response = await api.delete(`/resistance-risks/${id}`)
  return response.data
}
