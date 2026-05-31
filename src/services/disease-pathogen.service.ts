import { api } from "@/src/lib/axios"

export async function createDiseasePathogen(payload: any) {
  const { data } = await api.post("/disease-pathogens", payload)
  return data
}
export async function updateDiseasePathogen(id: string, payload: any) {
  const { data } = await api.put(`/disease-pathogens/${id}`, payload)
  return data
}
export async function deleteDiseasePathogen(id: string) {
  const { data } = await api.delete(`/disease-pathogens/${id}`)
  return data
}