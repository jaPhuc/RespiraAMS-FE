import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createDisease, updateDisease, deleteDisease } from "@/src/services/disease.service"

export function useCreateDisease() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createDisease,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["diseases"] }),
  })
}

export function useUpdateDisease() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: DiseaseFormValues }) => 
      updateDisease(id, payload),
      
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["diseases"],
      })
      queryClient.invalidateQueries({ queryKey: ["disease", variables.id] })
    },
  })
}

export function useDeleteDisease() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteDisease,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["diseases"] }),
  })
}