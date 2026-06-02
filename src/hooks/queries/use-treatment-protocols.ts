import { useQuery } from "@tanstack/react-query"
import { getTreatmentProtocolById, getTreatmentProtocols } from "@/src/services/treatment-protocol.service"

interface UseParams {
  page: number
  pageSize: number
  diseaseId?: string
  severity?: string
}

export function useTreatmentProtocols({ page, pageSize, diseaseId, severity }: UseParams) {
  return useQuery({
    queryKey: ["treatment-protocols", page, pageSize, diseaseId, severity],
    queryFn: () => getTreatmentProtocols({ page, pageSize, diseaseId, severity }),
  })
}

export function useTreatmentProtocol(id: string) {
  return useQuery({
    queryKey: ["treatment-protocol", id],
    queryFn: () => getTreatmentProtocolById(id),
    enabled: !!id,
  })
}