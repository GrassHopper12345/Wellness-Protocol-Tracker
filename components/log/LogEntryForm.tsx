'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const logEntrySchema = z.object({
  date: z.string().min(1, 'Date is required'),
  energyLevel: z.number().int().min(1).max(10).optional(),
  symptoms: z.string().optional(),
  notes: z.string().optional(),
  stageId: z.string().min(1, 'Stage is required'),
})

export type LogEntryFormValues = z.infer<typeof logEntrySchema>

type LogEntryFormProps = {
  defaultValues?: Partial<LogEntryFormValues>
  onSubmit: (values: LogEntryFormValues) => void
}

export function LogEntryForm({ defaultValues, onSubmit }: LogEntryFormProps) {
  const form = useForm<LogEntryFormValues>({
    resolver: zodResolver(logEntrySchema),
    defaultValues: {
      date: new Date().toISOString().split('T')[0],
      symptoms: '',
      notes: '',
      ...defaultValues,
    },
  })

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-1">
        <label className="text-sm font-medium" htmlFor="date">Date</label>
        <input
          id="date"
          type="date"
          className="w-full border rounded-md px-3 py-2 text-sm"
          {...form.register('date')}
        />
        {form.formState.errors.date && (
          <p className="text-xs text-destructive">{form.formState.errors.date.message}</p>
        )}
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium" htmlFor="energyLevel">
          Energy Level (1–10, optional)
        </label>
        <input
          id="energyLevel"
          type="number"
          min={1}
          max={10}
          className="w-full border rounded-md px-3 py-2 text-sm"
          {...form.register('energyLevel', { setValueAs: (v: string) => v === '' ? undefined : parseInt(v, 10) })}
        />
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium" htmlFor="symptoms">Symptoms (optional)</label>
        <textarea
          id="symptoms"
          className="w-full border rounded-md px-3 py-2 text-sm"
          rows={2}
          {...form.register('symptoms')}
        />
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium" htmlFor="notes">Notes (optional)</label>
        <textarea
          id="notes"
          className="w-full border rounded-md px-3 py-2 text-sm"
          rows={3}
          {...form.register('notes')}
        />
      </div>

      <button
        type="submit"
        className="rounded-md bg-primary text-primary-foreground px-4 py-2 text-sm font-medium"
      >
        Save Entry
      </button>
    </form>
  )
}
