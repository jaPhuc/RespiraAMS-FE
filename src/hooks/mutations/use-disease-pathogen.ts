import { useMutation, useQueryClient } from "@tanstack/react-query"
import { api } from "@/src/lib/axios"

export function useCreateDiseasePathogen() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (payload: any) => (await api.post("/disease-pathogens", payload)).data,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["disease"] }) // F5 lại trang chi tiết
  })
}

export function useUpdateDiseasePathogen() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ id, payload }: { id: string; payload: any }) => (await api.put(`/disease-pathogens/${id}`, payload)).data,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["disease"] })
  })
}

export function useDeleteDiseasePathogen() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (id: string) => (await api.delete(`/disease-pathogens/${id}`)).data,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["disease"] })
  })
}