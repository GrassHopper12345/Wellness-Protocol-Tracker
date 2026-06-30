import type { Note } from '@/types'

type NoteListProps = {
  notes: Note[]
}

export function NoteList({ notes }: NoteListProps) {
  if (notes.length === 0) {
    return <p className="text-sm text-muted-foreground">No notes yet.</p>
  }

  return (
    <ul className="space-y-3">
      {notes.map((note) => (
        <li key={note.id} className="rounded-md border px-4 py-3 space-y-1">
          <div className="flex items-center justify-between">
            {note.title && <h3 className="font-medium text-sm">{note.title}</h3>}
            <span className="text-xs text-muted-foreground ml-auto">
              {new Date(note.date).toLocaleDateString()}
            </span>
          </div>
          <p className="text-sm text-muted-foreground whitespace-pre-wrap">{note.content}</p>
        </li>
      ))}
    </ul>
  )
}
