'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const labResultSchema = z.object({
  testName: z.string().min(1, 'Test name is required'),
  value: z.number(),
  unit: z.string().min(1, 'Unit is required'),
  referenceMin: z.number().optional(),
  referenceMax: z.number().optional(),
  date: z.string().min(1, 'Date is required'),
  flagged: z.boolean(),
  notes: z.string().optional(),
  protocolId: z.string().min(1, 'Protocol is required'),
})

export type LabResultFormValues = z.infer<typeof labResultSchema>

type LabResultFormProps = {
  defaultValues?: Partial<LabResultFormValues>
  onSubmit: (values: LabResultFormValues) => void
}

export function LabResultForm({ defaultValues, onSubmit }: LabResultFormProps) {
  const form = useForm<LabResultFormValues>({
    resolver: zodResolver(labResultSchema),
    defaultValues: {
      testName: '',
      unit: '',
      flagged: false,
      notes: '',
      ...defaultValues,
    },
  })

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-1">
        <label className="text-sm font-medium" htmlFor="testName">Test Name</label>
        <input
          id="testName"
          className="w-full border rounded-md px-3 py-2 text-sm"
          {...form.register('testName')}
        />
        {form.formState.errors.testName && (
          <p className="text-xs text-destructive">{form.formState.errors.testName.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-sm font-medium" htmlFor="value">Value</label>
          <input
            id="value"
            type="number"
            step="any"
            className="w-full border rounded-md px-3 py-2 text-sm"
            {...form.register('value', { valueAsNumber: true })}
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium" htmlFor="unit">Unit</label>
          <input
            id="unit"
            className="w-full border rounded-md px-3 py-2 text-sm"
            {...form.register('unit')}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-sm font-medium" htmlFor="referenceMin">Ref. Min (optional)</label>
          <input
            id="referenceMin"
            type="number"
            step="any"
            className="w-full border rounded-md px-3 py-2 text-sm"
            {...form.register('referenceMin', { setValueAs: (v: string) => v === '' ? undefined : parseFloat(v) })}
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium" htmlFor="referenceMax">Ref. Max (optional)</label>
          <input
            id="referenceMax"
            type="number"
            step="any"
            className="w-full border rounded-md px-3 py-2 text-sm"
            {...form.register('referenceMax', { setValueAs: (v: string) => v === '' ? undefined : parseFloat(v) })}
          />
        </div>
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

      <div className="flex items-center gap-2">
        <input
          id="flagged"
          type="checkbox"
          className="h-4 w-4"
          {...form.register('flagged')}
        />
        <label className="text-sm font-medium" htmlFor="flagged">Flag as abnormal</label>
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium" htmlFor="notes">Notes (optional)</label>
        <textarea
          id="notes"
          className="w-full border rounded-md px-3 py-2 text-sm"
          rows={2}
          {...form.register('notes')}
        />
      </div>

      <button
        type="submit"
        className="rounded-md bg-primary text-primary-foreground px-4 py-2 text-sm font-medium"
      >
        Save Lab Result
      </button>
    </form>
  )
}
