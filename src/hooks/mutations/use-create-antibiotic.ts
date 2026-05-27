import { useMutation, useQueryClient } from "@tanstack/react-query"

import { createAntibiotic } from "@/src/services/antibiotics.service"

export function useCreateAntibiotic() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createAntibiotic,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["Antibiotics"],
      })
    },
  })
}