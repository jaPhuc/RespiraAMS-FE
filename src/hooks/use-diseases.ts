import { useQuery } from "@tanstack/react-query"
import { getDiseases } from "@/src/services/disease.service"

export function useDiseases({ page, pageSize }: { page: number; pageSize: number }) {
  return useQuery({
    queryKey: ["diseases", page, pageSize],
    queryFn: () => getDiseases(page, pageSize),
  })
}