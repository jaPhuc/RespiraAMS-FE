import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ResistanceRiskPayload } from "@/src/types/resistance-risk.type"
import { createResistanceRisk, updateResistanceRisk, deleteResistanceRisk } from "@/src/services/resistance-risk.service"

export function useCreateResistanceRisk() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createResistanceRisk,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["resistance-risks"] }),
  })
}

export function useUpdateResistanceRisk() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: ResistanceRiskPayload }) =>
      updateResistanceRisk(id, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["resistance-risks"] }),
  })
}

export function useDeleteResistanceRisk() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteResistanceRisk,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["resistance-risks"] }),
  })
}
