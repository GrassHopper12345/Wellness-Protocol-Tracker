import type { LabResult } from '@/types'

type LabTableProps = {
  results: LabResult[]
}

export function LabTable({ results }: LabTableProps) {
  if (results.length === 0) {
    return <p className="text-sm text-muted-foreground">No lab results yet.</p>
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b text-left text-muted-foreground">
            <th className="pb-2 pr-4 font-medium">Test</th>
            <th className="pb-2 pr-4 font-medium">Value</th>
            <th className="pb-2 pr-4 font-medium">Unit</th>
            <th className="pb-2 pr-4 font-medium">Reference</th>
            <th className="pb-2 pr-4 font-medium">Date</th>
            <th className="pb-2 font-medium">Flagged</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {results.map((result) => (
            <tr key={result.id}>
              <td className="py-2 pr-4">{result.testName}</td>
              <td className="py-2 pr-4 font-medium">{result.value}</td>
              <td className="py-2 pr-4 text-muted-foreground">{result.unit}</td>
              <td className="py-2 pr-4 text-muted-foreground">
                {result.referenceMin !== null && result.referenceMax !== null
                  ? `${result.referenceMin} – ${result.referenceMax}`
                  : '—'}
              </td>
              <td className="py-2 pr-4 text-muted-foreground">
                {new Date(result.date).toLocaleDateString()}
              </td>
              <td className="py-2">
                {result.flagged ? (
                  <span className="text-destructive font-medium">Yes</span>
                ) : (
                  <span className="text-muted-foreground">No</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
