import { useQuery } from "@tanstack/react-query"

import { getAntibiotics } from "@/src/services/antibiotics.service"

interface UseAntibioticsProps {
  page: number
  pageSize: number
}

export function useAntibiotics({
  page,
  pageSize,
}: UseAntibioticsProps) {
  return useQuery({
    queryKey: ["antibiotics", page, pageSize],
    queryFn: () =>
      getAntibiotics({
        page,
        pageSize,
      }),
  })
}