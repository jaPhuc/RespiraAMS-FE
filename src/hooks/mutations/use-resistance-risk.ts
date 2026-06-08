import { useMutation, useQueryClient } from "@tanstack/react-query"
import { api } from "@/src/lib/axios"

export function useCreateResistanceRisk() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (payload: any) => (await api.post("/resistance-risks", payload)).data,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["resistance-risks"] })
      queryClient.invalidateQueries({ queryKey: ["disease"] })
    }
  })
}

export function useUpdateResistanceRisk() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ id, payload }: { id: string; payload: any }) => (await api.put(`/resistance-risks/${id}`, payload)).data,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["resistance-risks"] })
      queryClient.invalidateQueries({ queryKey: ["disease"] })
    }
  })
}

export function useDeleteResistanceRisk() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (id: string) => (await api.delete(`/resistance-risks/${id}`)).data,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["resistance-risks"] })
      queryClient.invalidateQueries({ queryKey: ["disease"] })
    }
  })
}