import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { apiFetch } from "@/src/lib/api/api"
import { PaginationResponse } from "@/src/features/shared/types/common"
import { queryKeys } from "@/src/features/shared/queries/key-factory"
import { notifySuccess, notifyError } from "@/src/features/shared/queries/toast"
import { Pathogen, PathogenPayload } from "./types"

export function getPathogens(page = 1, pageSize = 10) {
  return apiFetch<PaginationResponse<Pathogen>>("/Pathogens", {
    params: { page, pageSize },
  })
}

export function createPathogen(payload: PathogenPayload) {
  return apiFetch<Pathogen>("/Pathogens", {
    method: "POST",
    data: payload,
  })
}

export function updatePathogen(id: string, payload: PathogenPayload) {
  return apiFetch<Pathogen>(`/Pathogens/${id}`, {
    method: "PUT",
    data: payload,
  })
}

export function deletePathogen(id: string) {
  return apiFetch<void>(`/Pathogens/${id}`, {
    method: "DELETE",
  })
}

export function usePathogens({ page, pageSize }: { page: number; pageSize: number }) {
  return useQuery({
    queryKey: queryKeys.pathogens.list(page, pageSize),
    queryFn: () => getPathogens(page, pageSize),
  })
}

export function useCreatePathogen() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: PathogenPayload) => createPathogen(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.pathogens.all })
      notifySuccess("Thêm tác nhân thành công")
    },
    onError: () => notifyError("Thêm tác nhân thất bại"),
  })
}

export function useUpdatePathogen() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: PathogenPayload }) =>
      updatePathogen(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.pathogens.all })
      notifySuccess("Cập nhật tác nhân thành công")
    },
    onError: () => notifyError("Cập nhật tác nhân thất bại"),
  })
}

export function useDeletePathogen() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => deletePathogen(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.pathogens.all })
      notifySuccess("Xóa tác nhân thành công")
    },
    onError: () => notifyError("Xóa tác nhân thất bại"),
  })
}
