import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import type { Protocol } from '@/types'
import type { ProtocolFormValues } from '@/components/protocols/ProtocolForm'

type ProtocolsResponse = { data: Protocol[] }
type ProtocolResponse = { data: Protocol }

export function useProtocols() {
  return useQuery<ProtocolsResponse>({
    queryKey: ['protocols'],
    queryFn: async () => {
      const res = await fetch('/api/protocols')
      if (!res.ok) throw new Error('Failed to fetch protocols')
      return res.json() as Promise<ProtocolsResponse>
    },
  })
}

export function useCreateProtocol() {
  const queryClient = useQueryClient()

  return useMutation<ProtocolResponse, Error, ProtocolFormValues>({
    mutationFn: async (values) => {
      const res = await fetch('/api/protocols', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })
      if (!res.ok) throw new Error('Failed to create protocol')
      return res.json() as Promise<ProtocolResponse>
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['protocols'] })
    },
  })
}
