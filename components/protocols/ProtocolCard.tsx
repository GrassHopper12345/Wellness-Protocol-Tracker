import type { Protocol } from '@/types'

type ProtocolCardProps = {
  protocol: Protocol
}

export function ProtocolCard({ protocol }: ProtocolCardProps) {
  return (
    <div className="rounded-lg border p-4 space-y-1">
      <h2 className="font-semibold">{protocol.name}</h2>
      <p className="text-sm text-muted-foreground">{protocol.description}</p>
      {protocol.goal && (
        <p className="text-xs text-muted-foreground">Goal: {protocol.goal}</p>
      )}
    </div>
  )
}
