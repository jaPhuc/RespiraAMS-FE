import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { apiFetch } from "@/src/lib/api/api"
import { PaginationResponse } from "@/src/features/shared/types/common"
import { queryKeys } from "@/src/features/shared/queries/key-factory"
import { notifySuccess, notifyError } from "@/src/features/shared/queries/toast"
import { ResistanceRisk, ResistanceRiskPayload } from "./types"

export function getResistanceRisks(page = 1, pageSize = 10) {
  return apiFetch<PaginationResponse<ResistanceRisk>>("/resistance-risks", {
    params: { page, pageSize },
  })
}

export function createResistanceRisk(payload: ResistanceRiskPayload) {
  return apiFetch<ResistanceRisk>("/resistance-risks", {
    method: "POST",
    data: payload,
  })
}

export function updateResistanceRisk(id: string, payload: ResistanceRiskPayload) {
  return apiFetch<ResistanceRisk>(`/resistance-risks/${id}`, {
    method: "PUT",
    data: payload,
  })
}

export function deleteResistanceRisk(id: string) {
  return apiFetch<void>(`/resistance-risks/${id}`, {
    method: "DELETE",
  })
}

export function useResistanceRisks({ page, pageSize }: { page: number; pageSize: number }) {
  return useQuery({
    queryKey: queryKeys.resistanceRisks.list(page, pageSize),
    queryFn: () => getResistanceRisks(page, pageSize),
  })
}

export function useCreateResistanceRisk() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: ResistanceRiskPayload) => createResistanceRisk(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.resistanceRisks.all })
      notifySuccess("Thêm nguy cơ kháng thuốc thành công")
    },
    onError: () => notifyError("Thêm nguy cơ kháng thuốc thất bại"),
  })
}

export function useUpdateResistanceRisk() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: ResistanceRiskPayload }) =>
      updateResistanceRisk(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.resistanceRisks.all })
      notifySuccess("Cập nhật nguy cơ kháng thuốc thành công")
    },
    onError: () => notifyError("Cập nhật nguy cơ kháng thuốc thất bại"),
  })
}

export function useDeleteResistanceRisk() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => deleteResistanceRisk(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.resistanceRisks.all })
      notifySuccess("Xóa nguy cơ kháng thuốc thành công")
    },
    onError: () => notifyError("Xóa nguy cơ kháng thuốc thất bại"),
  })
}
