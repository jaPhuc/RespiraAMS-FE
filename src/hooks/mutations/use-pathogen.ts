import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createPathogen, updatePathogen, deletePathogen } from "@/src/services/pathogen.service"
import { PathogenFormValues } from "@/src/schemas/pathogen.schema"

export function useCreatePathogen() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createPathogen,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["pathogens"] }),
  })
}

export function useUpdatePathogen() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: PathogenFormValues }) => updatePathogen(id, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["pathogens"] }),
  })
}

export function useDeletePathogen() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deletePathogen,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["pathogens"] }),
  })
}