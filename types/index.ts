import type {
  Protocol,
  Stage,
  Supplement,
  LogEntry,
  LabResult,
  Note,
  StageStatus,
} from '@/app/generated/prisma/client'

// Re-export Prisma types for convenience
export type { Protocol, Stage, Supplement, LogEntry, LabResult, Note, StageStatus }

// Protocol with all relations
export type ProtocolWithStages = Protocol & {
  stages: (Stage & {
    supplements: Supplement[]
    logEntries: LogEntry[]
  })[]
  labResults: LabResult[]
  notes: Note[]
}

// Stage with its relations and parent protocol
export type StageWithRelations = Stage & {
  supplements: Supplement[]
  logEntries: LogEntry[]
  protocol: Protocol
}
