import { useQuery } from "@tanstack/react-query"
import { getAntibioticSpectra } from "@/src/services/antibiotic-spectrum.service"

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