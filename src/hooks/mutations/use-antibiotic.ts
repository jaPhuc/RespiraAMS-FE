import { useMutation, useQueryClient } from "@tanstack/react-query"

import { createAntibiotic, deleteAntibiotic, updateAntibiotic } from "@/src/services/antibiotics.service"

export function useCreateAntibiotic() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createAntibiotic,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["antibiotics"],
      })
    },
  })
}

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
        queryKey: ["antibiotics"],
      })
    },
  })
}

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