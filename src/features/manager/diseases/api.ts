import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { apiFetch } from "@/src/lib/api/api"
import { PaginationResponse } from "@/src/features/shared/types/common"
import { queryKeys } from "@/src/features/shared/queries/key-factory"
import { notifySuccess, notifyError } from "@/src/features/shared/queries/toast"
import { Disease, DiseasePayload } from "./types"

export function getDiseases(page = 1, pageSize = 10) {
  return apiFetch<PaginationResponse<Disease>>("/Diseases", {
    params: { page, pageSize },
  })
}

export function getDiseaseById(id: string) {
  return apiFetch<Disease>(`/Diseases/${id}`)
}

export function createDisease(payload: DiseasePayload) {
  return apiFetch<Disease>("/Diseases", {
    method: "POST",
    data: payload,
  })
}

export function updateDisease(id: string, payload: DiseasePayload) {
  return apiFetch<Disease>(`/Diseases/${id}`, {
    method: "PUT",
    data: payload,
  })
}

export function deleteDisease(id: string) {
  return apiFetch<void>(`/Diseases/${id}`, {
    method: "DELETE",
  })
}

export function useDiseases({ page, pageSize }: { page: number; pageSize: number }) {
  return useQuery({
    queryKey: queryKeys.diseases.list(page, pageSize),
    queryFn: () => getDiseases(page, pageSize),
  })
}

export function useDisease(id: string) {
  return useQuery({
    queryKey: queryKeys.diseases.detail(id),
    queryFn: () => getDiseaseById(id),
    enabled: !!id,
  })
}

export function useCreateDisease() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: DiseasePayload) => createDisease(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.diseases.all })
      notifySuccess("Thêm bệnh lý thành công")
    },
    onError: () => notifyError("Thêm bệnh lý thất bại"),
  })
}

export function useUpdateDisease() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: DiseasePayload }) =>
      updateDisease(id, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.diseases.all })
      queryClient.invalidateQueries({ queryKey: queryKeys.diseases.detail(variables.id) })
      notifySuccess("Cập nhật bệnh lý thành công")
    },
    onError: () => notifyError("Cập nhật bệnh lý thất bại"),
  })
}

export function useDeleteDisease() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => deleteDisease(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.diseases.all })
      notifySuccess("Xóa bệnh lý thành công")
    },
    onError: () => notifyError("Xóa bệnh lý thất bại"),
  })
}
