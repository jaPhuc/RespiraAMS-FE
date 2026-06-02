import { useQuery } from "@tanstack/react-query"

import {
  getAntibiotics,
} from "@/src/services/antibiotics.service"
import { Antibiotic } from "@/src/types/antibiotic.type"
import { PaginationResponse } from "@/src/types/common.type"

interface UseAntibioticsProps {
  page: number
  pageSize: number
}

export function useAntibiotics({
                                 page,
                                 pageSize,
                               }: UseAntibioticsProps) {
  return useQuery<
    PaginationResponse<Antibiotic>
  >({
    queryKey: [
      "Antibiotics",
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
