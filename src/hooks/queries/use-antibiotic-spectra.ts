import { useQuery } from "@tanstack/react-query"

import { getAntibioticSpectra } from "@/src/services/antibiotic-spectrum.service"

export function useAntibioticSpectra() {
  return useQuery({
    queryKey: ["antibiotic-spectra"],
    queryFn: getAntibioticSpectra,
  })
}