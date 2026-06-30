'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const stageSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  order: z.number().int().min(0),
  startDate: z.string().optional(),
  status: z.enum(['ACTIVE', 'COMPLETE', 'PAUSED']),
})

export type StageFormValues = z.infer<typeof stageSchema>

type StageFormProps = {
  defaultValues?: Partial<StageFormValues>
  onSubmit: (values: StageFormValues) => void
}

export function StageForm({ defaultValues, onSubmit }: StageFormProps) {
  const form = useForm<StageFormValues>({
    resolver: zodResolver(stageSchema),
    defaultValues: {
      name: '',
      description: '',
      order: 0,
      status: 'ACTIVE',
      ...defaultValues,
    },
  })

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-1">
        <label className="text-sm font-medium" htmlFor="name">Name</label>
        <input
          id="name"
          className="w-full border rounded-md px-3 py-2 text-sm"
          {...form.register('name')}
        />
        {form.formState.errors.name && (
          <p className="text-xs text-destructive">{form.formState.errors.name.message}</p>
        )}
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium" htmlFor="description">Description (optional)</label>
        <textarea
          id="description"
          className="w-full border rounded-md px-3 py-2 text-sm"
          rows={2}
          {...form.register('description')}
        />
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium" htmlFor="order">Order</label>
        <input
          id="order"
          type="number"
          className="w-full border rounded-md px-3 py-2 text-sm"
          {...form.register('order', { valueAsNumber: true })}
        />
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium" htmlFor="status">Status</label>
        <select
          id="status"
          className="w-full border rounded-md px-3 py-2 text-sm"
          {...form.register('status')}
        >
          <option value="ACTIVE">Active</option>
          <option value="PAUSED">Paused</option>
          <option value="COMPLETE">Complete</option>
        </select>
      </div>

      <button
        type="submit"
        className="rounded-md bg-primary text-primary-foreground px-4 py-2 text-sm font-medium"
      >
        Save Stage
      </button>
    </form>
  )
}
