import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query"

import {
  createAntibioticSpectrum,
  deleteAntibioticSpectrum,
  getAntibioticSpectra,
  updateAntibioticSpectrum,
} from "@/src/services/antibiotic-spectrum.service"

export function useAntibioticSpectra(
  params?: {
    page?: number
    pageSize?: number
  }
) {
  return useQuery({
    queryKey: [
      "antibiotic-spectra",
      params,
    ],

    queryFn: () =>
      getAntibioticSpectra({
        page: params?.page ?? 1,
        pageSize:
          params?.pageSize ?? 10,
      }),
  })
}

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