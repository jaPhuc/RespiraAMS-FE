import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { apiFetch } from "@/src/lib/api/api"
import { PaginationResponse } from "@/src/features/shared/types/common"
import { queryKeys } from "@/src/features/shared/queries/key-factory"
import { notifySuccess, notifyError } from "@/src/features/shared/queries/toast"
import { Antibiotic, AntibioticPayload } from "./types"

export function getAntibiotics(page = 1, pageSize = 10) {
  return apiFetch<PaginationResponse<Antibiotic>>("/Antibiotics", {
    params: { page, pageSize },
  })
}

export function createAntibiotic(payload: AntibioticPayload) {
  return apiFetch<Antibiotic>("/Antibiotics", {
    method: "POST",
    data: payload,
  })
}

export function updateAntibiotic(id: string, payload: AntibioticPayload) {
  return apiFetch<Antibiotic>(`/Antibiotics/${id}`, {
    method: "PUT",
    data: payload,
  })
}

export function deleteAntibiotic(id: string) {
  return apiFetch<void>(`/Antibiotics/${id}`, {
    method: "DELETE",
  })
}

export function useAntibiotics({ page, pageSize }: { page: number; pageSize: number }) {
  return useQuery({
    queryKey: queryKeys.antibiotics.list(page, pageSize),
    queryFn: () => getAntibiotics(page, pageSize),
  })
}

export function useCreateAntibiotic() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: AntibioticPayload) => createAntibiotic(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.antibiotics.all })
      notifySuccess("Thêm kháng sinh thành công")
    },
    onError: () => notifyError("Thêm kháng sinh thất bại"),
  })
}

export function useUpdateAntibiotic() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: AntibioticPayload }) =>
      updateAntibiotic(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.antibiotics.all })
      notifySuccess("Cập nhật kháng sinh thành công")
    },
    onError: () => notifyError("Cập nhật kháng sinh thất bại"),
  })
}

export function useDeleteAntibiotic() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => deleteAntibiotic(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.antibiotics.all })
      notifySuccess("Xóa kháng sinh thành công")
    },
    onError: () => notifyError("Xóa kháng sinh thất bại"),
  })
}
