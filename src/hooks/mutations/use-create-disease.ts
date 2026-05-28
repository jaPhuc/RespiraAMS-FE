import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createDisease } from "@/src/services/disease.service"

export function useCreateDisease() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createDisease,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["diseases"] }),
  })
}