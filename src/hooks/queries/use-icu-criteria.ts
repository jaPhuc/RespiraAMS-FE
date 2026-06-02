import { useQuery } from "@tanstack/react-query"
import { getIcuCriteria } from "@/src/services/icu-criterion.service"

export function useIcuCriteria({ page, pageSize }: { page: number; pageSize: number }) {
  return useQuery({
    queryKey: ["icu-criteria", page, pageSize],
    queryFn: () => getIcuCriteria({ page, pageSize }),
  })
}