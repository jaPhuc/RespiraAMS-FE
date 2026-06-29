import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { apiFetch } from "@/src/lib/api/api"
import { PaginationResponse } from "@/src/features/shared/types/common"
import { queryKeys } from "@/src/features/shared/queries/key-factory"
import { notifySuccess, notifyError } from "@/src/features/shared/queries/toast"
import { IcuCriterion, IcuCriterionPayload } from "./types"

export function getIcuCriteria(page = 1, pageSize = 10) {
  return apiFetch<PaginationResponse<IcuCriterion>>("/icu-criteria", {
    params: { page, pageSize },
  })
}

export function createIcuCriterion(payload: IcuCriterionPayload) {
  return apiFetch<IcuCriterion>("/icu-criteria", {
    method: "POST",
    data: payload,
  })
}

export function updateIcuCriterion(id: string, payload: IcuCriterionPayload) {
  return apiFetch<IcuCriterion>(`/icu-criteria/${id}`, {
    method: "PUT",
    data: payload,
  })
}

export function deleteIcuCriterion(id: string) {
  return apiFetch<void>(`/icu-criteria/${id}`, {
    method: "DELETE",
  })
}

export function useIcuCriteria({ page, pageSize }: { page: number; pageSize: number }) {
  return useQuery({
    queryKey: queryKeys.icuCriteria.list(page, pageSize),
    queryFn: () => getIcuCriteria(page, pageSize),
  })
}

export function useCreateIcuCriterion() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: IcuCriterionPayload) => createIcuCriterion(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.icuCriteria.all })
      notifySuccess("Thêm tiêu chuẩn ICU thành công")
    },
    onError: () => notifyError("Thêm tiêu chuẩn ICU thất bại"),
  })
}

export function useUpdateIcuCriterion() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: IcuCriterionPayload }) =>
      updateIcuCriterion(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.icuCriteria.all })
      notifySuccess("Cập nhật tiêu chuẩn ICU thành công")
    },
    onError: () => notifyError("Cập nhật tiêu chuẩn ICU thất bại"),
  })
}

export function useDeleteIcuCriterion() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => deleteIcuCriterion(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.icuCriteria.all })
      notifySuccess("Xóa tiêu chuẩn ICU thành công")
    },
    onError: () => notifyError("Xóa tiêu chuẩn ICU thất bại"),
  })
}
