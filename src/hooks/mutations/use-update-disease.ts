import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateDisease } from "@/src/services/disease.service"
import { DiseaseFormValues } from "@/src/schemas/disease.schema";

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

