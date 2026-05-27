import { useMutation, useQueryClient } from "@tanstack/react-query"

import { deleteAntibiotic } from "@/src/services/antibiotics.service"

export function useDeleteAntibiotic() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteAntibiotic,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["antibiotics"],
      })
    },
  })
}