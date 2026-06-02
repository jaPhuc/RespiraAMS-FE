import { useQuery } from "@tanstack/react-query"
import { getPathogens } from "@/src/services/pathogen.service"

export function usePathogens({ page, pageSize }: { page: number; pageSize: number }) {
  return useQuery({
    queryKey: ["pathogens", page, pageSize],
    queryFn: () => getPathogens({ page, pageSize }),
  })
}