import { useQuery } from "@tanstack/react-query"
import { getDiseaseById } from "@/src/services/disease.service"

export function useDisease(id: string) {
  return useQuery({
    queryKey: ["disease", id],
    queryFn: () => getDiseaseById(id),
    enabled: !!id, // Chỉ gọi API khi đã có ID
  })
}