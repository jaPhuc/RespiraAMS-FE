import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createIcuCriterion } from "@/src/services/icu-criterion.service"

export function useCreateIcuCriterion() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createIcuCriterion,
    onSuccess: () => {queryClient.invalidateQueries({ queryKey: ["icu-criteria"] }),
    queryClient.invalidateQueries({ queryKey: ["disease"] })}
  })
}

import { updateIcuCriterion } from "@/src/services/icu-criterion.service"

export function useUpdateIcuCriterion() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: any }) => updateIcuCriterion(id, payload),
    onSuccess: () => {queryClient.invalidateQueries({ queryKey: ["icu-criteria"] }),
    queryClient.invalidateQueries({ queryKey: ["disease"] })}
  })
}

import { deleteIcuCriterion } from "@/src/services/icu-criterion.service"

export function useDeleteIcuCriterion() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteIcuCriterion,
    onSuccess: () => {queryClient.invalidateQueries({ queryKey: ["icu-criteria"] }),
    queryClient.invalidateQueries({ queryKey: ["disease"] })}
  })
}