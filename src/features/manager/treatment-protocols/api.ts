import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { apiFetch } from "@/src/lib/api/api"
import { PaginationResponse } from "@/src/features/shared/types/common"
import { queryKeys } from "@/src/features/shared/queries/key-factory"
import { notifySuccess, notifyError } from "@/src/features/shared/queries/toast"
import { TreatmentProtocol, TreatmentProtocolPayload } from "./types"

interface GetProtocolsParams {
  page?: number
  pageSize?: number
  diseaseId?: string
  severity?: string
}

export function getTreatmentProtocols({ page = 1, pageSize = 10, diseaseId, severity }: GetProtocolsParams = {}) {
  return apiFetch<PaginationResponse<TreatmentProtocol>>("/treatment-protocols", {
    params: {
      page,
      pageSize,
      ...(diseaseId && diseaseId !== "all" && { diseaseId }),
      ...(severity && severity !== "all" && { severity }),
    },
  })
}

export function getTreatmentProtocolById(id: string) {
  return apiFetch<TreatmentProtocol>(`/treatment-protocols/${id}`)
}

export function createTreatmentProtocol(payload: TreatmentProtocolPayload) {
  return apiFetch<TreatmentProtocol>("/treatment-protocols", {
    method: "POST",
    data: payload,
  })
}

export function updateTreatmentProtocol(id: string, payload: TreatmentProtocolPayload) {
  return apiFetch<TreatmentProtocol>(`/treatment-protocols/${id}`, {
    method: "PUT",
    data: payload,
  })
}

export function deleteTreatmentProtocol(id: string) {
  return apiFetch<void>(`/treatment-protocols/${id}`, {
    method: "DELETE",
  })
}

export function addProtocolCriteria(protocolId: string, payload: unknown[]) {
  return apiFetch<void>(`/treatment-protocols/${protocolId}/criteria`, {
    method: "POST",
    data: payload,
  })
}

interface UseProtocolsParams {
  page: number
  pageSize: number
  diseaseId?: string
  severity?: string
}

export function useTreatmentProtocols({ page, pageSize, diseaseId, severity }: UseProtocolsParams) {
  return useQuery({
    queryKey: queryKeys.treatmentProtocols.list(page, pageSize, { diseaseId, severity }),
    queryFn: () => getTreatmentProtocols({ page, pageSize, diseaseId, severity }),
  })
}

export function useTreatmentProtocol(id: string) {
  return useQuery({
    queryKey: queryKeys.treatmentProtocols.detail(id),
    queryFn: () => getTreatmentProtocolById(id),
    enabled: !!id,
  })
}

export function useCreateTreatmentProtocol() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: TreatmentProtocolPayload) => createTreatmentProtocol(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.treatmentProtocols.all })
      notifySuccess("Thêm phác đồ thành công")
    },
    onError: () => notifyError("Thêm phác đồ thất bại"),
  })
}

export function useUpdateTreatmentProtocol() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: TreatmentProtocolPayload }) =>
      updateTreatmentProtocol(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.treatmentProtocols.all })
      notifySuccess("Cập nhật phác đồ thành công")
    },
    onError: () => notifyError("Cập nhật phác đồ thất bại"),
  })
}

export function useDeleteTreatmentProtocol() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => deleteTreatmentProtocol(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.treatmentProtocols.all })
      notifySuccess("Xóa phác đồ thành công")
    },
    onError: () => notifyError("Xóa phác đồ thất bại"),
  })
}

export function useAddProtocolCriteria() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ protocolId, payload }: { protocolId: string; payload: unknown[] }) =>
      addProtocolCriteria(protocolId, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.treatmentProtocols.detail(variables.protocolId) })
      notifySuccess("Thêm tiêu chuẩn phụ thành công")
    },
    onError: () => notifyError("Thêm tiêu chuẩn phụ thất bại"),
  })
}
