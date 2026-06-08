import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createTreatmentProtocol } from "@/src/services/treatment-protocol.service"
export function useCreateTreatmentProtocol() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createTreatmentProtocol,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["treatment-protocols"] })
  })
}

import { updateTreatmentProtocol } from "@/src/services/treatment-protocol.service"
export function useUpdateTreatmentProtocol() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: any }) => updateTreatmentProtocol(id, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["treatment-protocols"] })
  })
}

import { deleteTreatmentProtocol } from "@/src/services/treatment-protocol.service"
export function useDeleteTreatmentProtocol() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteTreatmentProtocol,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["treatment-protocols"] })
  })
}

import { addProtocolCriteria } from "@/src/services/treatment-protocol.service"
export function useAddProtocolCriteria() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ protocolId, payload }: { protocolId: string; payload: any[] }) => 
      addProtocolCriteria(protocolId, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["treatment-protocol", variables.protocolId] })
    }
  })
}