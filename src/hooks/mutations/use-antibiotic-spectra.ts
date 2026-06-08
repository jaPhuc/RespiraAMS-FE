import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query"

import {
  createAntibioticSpectrum,
  deleteAntibioticSpectrum,
  updateAntibioticSpectrum,
} from "@/src/services/antibiotic-spectrum.service"

export function useCreateAntibioticSpectrum() {
  const queryClient =
    useQueryClient()

  return useMutation({
    mutationFn: (
      payload: {
        name: string
        description: string
      }
    ) =>
      createAntibioticSpectrum(
        payload
      ),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          "antibiotic-spectra",
        ],
      })
    },
  })
}

export function useUpdateAntibioticSpectrum() {
  const queryClient =
    useQueryClient()

  return useMutation({
    mutationFn: ({
                   id,
                   payload,
                 }: {
      id: string

      payload: {
        name: string
        description: string
      }
    }) =>
      updateAntibioticSpectrum(
        id,
        payload
      ),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          "antibiotic-spectra",
        ],
      })
    },
  })
}

export function useDeleteAntibioticSpectrum() {
  const queryClient =
    useQueryClient()

  return useMutation({
    mutationFn: (id: string) =>
      deleteAntibioticSpectrum(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          "antibiotic-spectra",
        ],
      })
    },
  })
}