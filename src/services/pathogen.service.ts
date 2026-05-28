import { api } from "@/src/lib/axios"
import { PathogenFormValues } from "@/src/schemas/pathogen.schema"
import { PathogensResponse } from "@/src/types/pathogen.type"

export async function getPathogens({ page = 1, pageSize = 10 }): Promise<PathogensResponse> {
  const response = await api.get("/Pathogens", { params: { page, pageSize } })
  return response.data
}

export async function createPathogen(payload: PathogenFormValues) {
  const response = await api.post("/Pathogens", payload)
  return response.data
}

export async function updatePathogen(id: string, payload: PathogenFormValues) {
  const response = await api.put(`/Pathogens/${id}`, payload)
  return response.data
}

export async function deletePathogen(id: string) {
  const response = await api.delete(`/Pathogens/${id}`)
  return response.data
}