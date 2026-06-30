'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const protocolSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  goal: z.string().optional(),
})

export type ProtocolFormValues = z.infer<typeof protocolSchema>

type ProtocolFormProps = {
  defaultValues?: Partial<ProtocolFormValues>
  onSubmit: (values: ProtocolFormValues) => void
}

export function ProtocolForm({ defaultValues, onSubmit }: ProtocolFormProps) {
  const form = useForm<ProtocolFormValues>({
    resolver: zodResolver(protocolSchema),
    defaultValues: {
      name: '',
      description: '',
      goal: '',
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
        <label className="text-sm font-medium" htmlFor="description">Description</label>
        <textarea
          id="description"
          className="w-full border rounded-md px-3 py-2 text-sm"
          rows={3}
          {...form.register('description')}
        />
        {form.formState.errors.description && (
          <p className="text-xs text-destructive">{form.formState.errors.description.message}</p>
        )}
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium" htmlFor="goal">Goal (optional)</label>
        <input
          id="goal"
          className="w-full border rounded-md px-3 py-2 text-sm"
          {...form.register('goal')}
        />
      </div>

      <button
        type="submit"
        className="rounded-md bg-primary text-primary-foreground px-4 py-2 text-sm font-medium"
      >
        Save Protocol
      </button>
    </form>
  )
}
