import type { Stage } from '@/types'

type StageListProps = {
  stages: Stage[]
}

export function StageList({ stages }: StageListProps) {
  if (stages.length === 0) {
    return <p className="text-sm text-muted-foreground">No stages yet.</p>
  }

  return (
    <ul className="space-y-2">
      {stages.map((stage) => (
        <li key={stage.id} className="rounded-md border px-4 py-3 flex items-center justify-between">
          <div>
            <span className="font-medium text-sm">{stage.name}</span>
            {stage.description && (
              <p className="text-xs text-muted-foreground">{stage.description}</p>
            )}
          </div>
          <span className="text-xs font-medium text-muted-foreground">{stage.status}</span>
        </li>
      ))}
    </ul>
  )
}
