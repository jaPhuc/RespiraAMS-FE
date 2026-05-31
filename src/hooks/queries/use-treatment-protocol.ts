import { useQuery } from "@tanstack/react-query"
import { getTreatmentProtocolById } from "@/src/services/treatment-protocol.service"

export function useTreatmentProtocol(id: string) {
  return useQuery({
    queryKey: ["treatment-protocol", id],
    queryFn: () => getTreatmentProtocolById(id),
    enabled: !!id,
  })
}