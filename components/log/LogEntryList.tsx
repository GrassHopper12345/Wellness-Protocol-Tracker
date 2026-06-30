import type { LogEntry } from '@/types'

type LogEntryListProps = {
  entries: LogEntry[]
}

export function LogEntryList({ entries }: LogEntryListProps) {
  if (entries.length === 0) {
    return <p className="text-sm text-muted-foreground">No log entries yet.</p>
  }

  return (
    <ul className="space-y-3">
      {entries.map((entry) => (
        <li key={entry.id} className="rounded-md border px-4 py-3 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">
              {new Date(entry.date).toLocaleDateString()}
            </span>
            {entry.energyLevel !== null && (
              <span className="text-xs text-muted-foreground">
                Energy: {entry.energyLevel}/10
              </span>
            )}
          </div>
          {entry.symptoms && (
            <p className="text-sm text-muted-foreground">Symptoms: {entry.symptoms}</p>
          )}
          {entry.notes && (
            <p className="text-sm text-muted-foreground">{entry.notes}</p>
          )}
        </li>
      ))}
    </ul>
  )
}
