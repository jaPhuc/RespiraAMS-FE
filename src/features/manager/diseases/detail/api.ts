import { useMutation, useQueryClient } from "@tanstack/react-query"
import { apiFetch } from "@/src/lib/api/api"
import { queryKeys } from "@/src/features/shared/queries/key-factory"
import { notifySuccess, notifyError } from "@/src/features/shared/queries/toast"
import { DiseasePathogenPayload } from "./types"

export function createDiseasePathogen(payload: DiseasePathogenPayload) {
  return apiFetch<void>("/disease-pathogens", {
    method: "POST",
    data: payload,
  })
}

export function updateDiseasePathogen(id: string, payload: DiseasePathogenPayload) {
  return apiFetch<void>(`/disease-pathogens/${id}`, {
    method: "PUT",
    data: payload,
  })
}

export function deleteDiseasePathogen(id: string) {
  return apiFetch<void>(`/disease-pathogens/${id}`, {
    method: "DELETE",
  })
}

export function useCreateDiseasePathogen() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: DiseasePathogenPayload) => createDiseasePathogen(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.diseases.all })
      notifySuccess("Thêm tác nhân vào bệnh lý thành công")
    },
    onError: () => notifyError("Thêm tác nhân thất bại"),
  })
}

export function useUpdateDiseasePathogen() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: DiseasePathogenPayload }) =>
      updateDiseasePathogen(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.diseases.all })
      notifySuccess("Cập nhật tác nhân thành công")
    },
    onError: () => notifyError("Cập nhật tác nhân thất bại"),
  })
}

export function useDeleteDiseasePathogen() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => deleteDiseasePathogen(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.diseases.all })
      notifySuccess("Xóa tác nhân khỏi bệnh lý thành công")
    },
    onError: () => notifyError("Xóa tác nhân thất bại"),
  })
}
