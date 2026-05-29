import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updatePathogen } from "@/src/services/pathogen.service"
import { PathogenFormValues } from "@/src/schemas/pathogen.schema"

export function useUpdatePathogen() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: PathogenFormValues }) => updatePathogen(id, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["pathogens"] }),
  })
}