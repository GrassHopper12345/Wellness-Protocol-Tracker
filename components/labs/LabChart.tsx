'use client'

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
} from 'recharts'
import type { LabResult } from '@/types'

type LabChartProps = {
  results: LabResult[]
  referenceMin?: number
  referenceMax?: number
}

export function LabChart({ results, referenceMin, referenceMax }: LabChartProps) {
  const data = [...results]
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map((r) => ({
      date: new Date(r.date).toLocaleDateString(),
      value: r.value,
    }))

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" tick={{ fontSize: 12 }} />
        <YAxis tick={{ fontSize: 12 }} />
        <Tooltip />
        {referenceMin !== undefined && (
          <ReferenceLine y={referenceMin} stroke="hsl(var(--destructive))" strokeDasharray="4 4" label="Min" />
        )}
        {referenceMax !== undefined && (
          <ReferenceLine y={referenceMax} stroke="hsl(var(--destructive))" strokeDasharray="4 4" label="Max" />
        )}
        <Line type="monotone" dataKey="value" stroke="hsl(var(--primary))" dot={{ r: 4 }} />
      </LineChart>
    </ResponsiveContainer>
  )
}
