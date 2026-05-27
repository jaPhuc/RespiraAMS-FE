import { useMutation, useQueryClient } from "@tanstack/react-query"

import { updateAntibiotic } from "@/src/services/antibiotics.service"

export function useUpdateAntibiotic() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
                   id,
                   payload,
                 }: {
      id: string
      payload: any
    }) =>
      updateAntibiotic(id, payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["Antibiotics"],
      })
    },
  })
}