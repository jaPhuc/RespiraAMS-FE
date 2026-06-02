import { useQuery } from "@tanstack/react-query"
import { getResistanceRisks } from "@/src/services/resistance-risk.service"

export function useResistanceRisks({ page, pageSize }: { page: number; pageSize: number }) {
  return useQuery({
    queryKey: ["resistance-risks", page, pageSize],
    queryFn: () => getResistanceRisks({ page, pageSize }),
  })
}
