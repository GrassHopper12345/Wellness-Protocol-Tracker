import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import type { LogEntry } from '@/types'
import type { LogEntryFormValues } from '@/components/log/LogEntryForm'

type LogEntriesResponse = { data: LogEntry[] }
type LogEntryResponse = { data: LogEntry }

export function useLogEntries(stageId?: string) {
  return useQuery<LogEntriesResponse>({
    queryKey: ['log-entries', stageId],
    queryFn: async () => {
      const url = stageId
        ? `/api/log-entries?stageId=${stageId}`
        : '/api/log-entries'
      const res = await fetch(url)
      if (!res.ok) throw new Error('Failed to fetch log entries')
      return res.json() as Promise<LogEntriesResponse>
    },
  })
}

export function useCreateLogEntry() {
  const queryClient = useQueryClient()

  return useMutation<LogEntryResponse, Error, LogEntryFormValues>({
    mutationFn: async (values) => {
      const res = await fetch('/api/log-entries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })
      if (!res.ok) throw new Error('Failed to create log entry')
      return res.json() as Promise<LogEntryResponse>
    },
    onSuccess: (_data, variables) => {
      void queryClient.invalidateQueries({ queryKey: ['log-entries', variables.stageId] })
    },
  })
}
