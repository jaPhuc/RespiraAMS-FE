import { api } from "@/src/lib/axios"
import { RecommendRequest, RecommendResponse } from "@/src/types/recommend.type"

export async function recommend(diseaseId: string, payload: RecommendRequest): Promise<RecommendResponse> {
  const response = await api.post(`/Diagnose/${diseaseId}/recommend`, payload)
  return response.data
}
