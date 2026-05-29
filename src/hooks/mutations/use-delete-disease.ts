import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteDisease } from "@/src/services/disease.service"

export function useDeleteDisease() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteDisease,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["diseases"] }),
  })
}