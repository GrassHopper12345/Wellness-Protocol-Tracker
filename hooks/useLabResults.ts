import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import type { LabResult } from '@/types'
import type { LabResultFormValues } from '@/components/labs/LabResultForm'

type LabResultsResponse = { data: LabResult[] }
type LabResultResponse = { data: LabResult }

export function useLabResults(protocolId?: string) {
  return useQuery<LabResultsResponse>({
    queryKey: ['lab-results', protocolId],
    queryFn: async () => {
      const url = protocolId
        ? `/api/lab-results?protocolId=${protocolId}`
        : '/api/lab-results'
      const res = await fetch(url)
      if (!res.ok) throw new Error('Failed to fetch lab results')
      return res.json() as Promise<LabResultsResponse>
    },
  })
}

export function useCreateLabResult() {
  const queryClient = useQueryClient()

  return useMutation<LabResultResponse, Error, LabResultFormValues>({
    mutationFn: async (values) => {
      const res = await fetch('/api/lab-results', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })
      if (!res.ok) throw new Error('Failed to create lab result')
      return res.json() as Promise<LabResultResponse>
    },
    onSuccess: (_data, variables) => {
      void queryClient.invalidateQueries({ queryKey: ['lab-results', variables.protocolId] })
    },
  })
}
