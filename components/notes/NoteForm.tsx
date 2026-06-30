'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const noteSchema = z.object({
  title: z.string().optional(),
  content: z.string().min(1, 'Content is required'),
  date: z.string().min(1, 'Date is required'),
  protocolId: z.string().optional(),
})

export type NoteFormValues = z.infer<typeof noteSchema>

type NoteFormProps = {
  defaultValues?: Partial<NoteFormValues>
  onSubmit: (values: NoteFormValues) => void
}

export function NoteForm({ defaultValues, onSubmit }: NoteFormProps) {
  const form = useForm<NoteFormValues>({
    resolver: zodResolver(noteSchema),
    defaultValues: {
      title: '',
      content: '',
      date: new Date().toISOString().split('T')[0],
      ...defaultValues,
    },
  })

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-1">
        <label className="text-sm font-medium" htmlFor="title">Title (optional)</label>
        <input
          id="title"
          className="w-full border rounded-md px-3 py-2 text-sm"
          {...form.register('title')}
        />
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium" htmlFor="content">Content</label>
        <textarea
          id="content"
          className="w-full border rounded-md px-3 py-2 text-sm"
          rows={5}
          {...form.register('content')}
        />
        {form.formState.errors.content && (
          <p className="text-xs text-destructive">{form.formState.errors.content.message}</p>
        )}
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium" htmlFor="date">Date</label>
        <input
          id="date"
          type="date"
          className="w-full border rounded-md px-3 py-2 text-sm"
          {...form.register('date')}
        />
      </div>

      <button
        type="submit"
        className="rounded-md bg-primary text-primary-foreground px-4 py-2 text-sm font-medium"
      >
        Save Note
      </button>
    </form>
  )
}
