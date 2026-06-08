import { api } from "@/src/lib/axios"
import { DiagnoseRequest, DiagnoseResponse } from "@/src/types/diagnose.type"

export async function diagnose(diseaseId: string, payload: DiagnoseRequest): Promise<DiagnoseResponse> {
  const response = await api.post(`/Diagnose/${diseaseId}`, payload)
  return response.data
}
