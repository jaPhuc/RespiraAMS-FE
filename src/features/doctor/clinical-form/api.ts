import { useMutation } from "@tanstack/react-query"
import { apiFetch } from "@/src/lib/api/api"
import { notifySuccess, notifyError } from "@/src/features/shared/queries/toast"
import { DiagnoseRequest, DiagnoseResponse, RecommendRequest, RecommendResponse } from "./types"

export function diagnose(diseaseId: string, payload: DiagnoseRequest) {
  return apiFetch<DiagnoseResponse>(`/Diagnose/${diseaseId}`, {
    method: "POST",
    data: payload,
  })
}

export function recommend(diseaseId: string, payload: RecommendRequest) {
  return apiFetch<RecommendResponse>(`/Diagnose/${diseaseId}/recommend`, {
    method: "POST",
    data: payload,
  })
}

export function useDiagnose() {
  return useMutation<DiagnoseResponse, Error, { diseaseId: string; payload: DiagnoseRequest }>({
    mutationFn: ({ diseaseId, payload }) => diagnose(diseaseId, payload),
    onError: () => notifyError("Chẩn đoán thất bại"),
  })
}

export function useRecommend() {
  return useMutation<RecommendResponse, Error, { diseaseId: string; payload: RecommendRequest }>({
    mutationFn: ({ diseaseId, payload }) => recommend(diseaseId, payload),
    onSuccess: () => notifySuccess("Khuyến nghị phác đồ thành công"),
    onError: () => notifyError("Khuyến nghị phác đồ thất bại"),
  })
}
