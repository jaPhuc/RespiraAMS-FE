import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { apiFetch } from "@/src/lib/api/api"
import { queryKeys } from "@/src/features/shared/queries/key-factory"
import { notifySuccess, notifyError } from "@/src/features/shared/queries/toast"
import { AntibioticSpectrum, AntibioticSpectrumResponse } from "./types"

export function getAntibioticSpectra(page = 1, pageSize = 10) {
  return apiFetch<AntibioticSpectrumResponse>("/antibiotic-spectra", {
    params: { page, pageSize },
  })
}

export function createAntibioticSpectrum(payload: { name: string; description: string }) {
  return apiFetch<AntibioticSpectrum>("/antibiotic-spectra", {
    method: "POST",
    data: payload,
  })
}

export function updateAntibioticSpectrum(id: string, payload: { name: string; description: string }) {
  return apiFetch<AntibioticSpectrum>(`/antibiotic-spectra/${id}`, {
    method: "PUT",
    data: payload,
  })
}

export function deleteAntibioticSpectrum(id: string) {
  return apiFetch<void>(`/antibiotic-spectra/${id}`, {
    method: "DELETE",
  })
}

export function useAntibioticSpectra(params?: { page?: number; pageSize?: number }) {
  const page = params?.page ?? 1
  const pageSize = params?.pageSize ?? 10
  return useQuery({
    queryKey: queryKeys.antibioticSpectra.list(page, pageSize),
    queryFn: () => getAntibioticSpectra(page, pageSize),
  })
}

export function useCreateAntibioticSpectrum() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: { name: string; description: string }) =>
      createAntibioticSpectrum(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.antibioticSpectra.all })
      notifySuccess("Thêm phổ kháng sinh thành công")
    },
    onError: () => notifyError("Thêm phổ kháng sinh thất bại"),
  })
}

export function useUpdateAntibioticSpectrum() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: { name: string; description: string } }) =>
      updateAntibioticSpectrum(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.antibioticSpectra.all })
      notifySuccess("Cập nhật phổ kháng sinh thành công")
    },
    onError: () => notifyError("Cập nhật phổ kháng sinh thất bại"),
  })
}

export function useDeleteAntibioticSpectrum() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => deleteAntibioticSpectrum(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.antibioticSpectra.all })
      notifySuccess("Xóa phổ kháng sinh thành công")
    },
    onError: () => notifyError("Xóa phổ kháng sinh thất bại"),
  })
}
