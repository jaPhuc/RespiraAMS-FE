import { api } from "@/src/lib/axios"

export async function createResistanceRisk(payload: any) {
  const { data } = await api.post("/resistance-risks", payload)
  return data
}
export async function updateResistanceRisk(id: string, payload: any) {
  const { data } = await api.put(`/resistance-risks/${id}`, payload)
  return data
}
export async function deleteResistanceRisk(id: string) {
  const { data } = await api.delete(`/resistance-risks/${id}`)
  return data
}