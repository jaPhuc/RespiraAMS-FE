import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createPathogen } from "@/src/services/pathogen.service"

export function useCreatePathogen() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createPathogen,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["pathogens"] }),
  })
}