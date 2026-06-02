import { useQuery } from "@tanstack/react-query"
import { getDiseaseById, getDiseases } from "@/src/services/disease.service"

export function useDiseases({ page, pageSize }: { page: number; pageSize: number }) {
  return useQuery({
    queryKey: ["diseases", page, pageSize],
    queryFn: () => getDiseases({page, pageSize}),
  })
}

export function useDisease(id: string) {
  return useQuery({
    queryKey: ["disease", id],
    queryFn: () => getDiseaseById(id),
    enabled: !!id, // Chỉ gọi API khi đã có ID
  })
}