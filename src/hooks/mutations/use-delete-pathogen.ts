import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deletePathogen } from "@/src/services/pathogen.service"

export function useDeletePathogen() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deletePathogen,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["pathogens"] }),
  })
}