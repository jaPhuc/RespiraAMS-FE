import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import {
  createAntibiotic,
  updateAntibiotic,
  deleteAntibiotic,
  getAntibiotics,
} from "@/src/services/antibiotics.service"
import { Antibiotic, AntibioticPayload, PaginatedResponse } from "@/src/types/antibiotic.type"

interface UseAntibioticsProps {
  page: number
  pageSize: number
}

export function useAntibiotics({
                                 page,
                                 pageSize,
                               }: UseAntibioticsProps) {
  return useQuery<
    PaginatedResponse<Antibiotic>
  >({
    queryKey: [
      "antibiotics",
      page,
      pageSize,
    ],

    queryFn: () =>
      getAntibiotics({
        page,
        pageSize,
      }),
  })
}

export function useUpdateAntibiotic() {
  const queryClient =
    useQueryClient()

  return useMutation({
    mutationFn: ({
                   id,
                   payload,
                 }: {
      id: string
      payload: AntibioticPayload
    }) =>
      updateAntibiotic(
        id,
        payload
      ),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [
          "Antibiotics",
        ],
      })
    },
  })
}

export function useDeleteAntibiotic() {
  const queryClient =
    useQueryClient()

  return useMutation({
    mutationFn:
    deleteAntibiotic,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [
          "Antibiotics",
        ],
      })
    },
  })
}

export function useCreateAntibiotic() {
  const queryClient =
    useQueryClient()

  return useMutation({
    mutationFn:
    createAntibiotic,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [
          "Antibiotics",
        ],
      })
    },
  })
}