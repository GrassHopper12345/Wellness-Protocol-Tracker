export default function ProtocolDetailPage({
  params,
}: {
  params: { id: string }
}) {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold">Protocol {params.id}</h1>
    </main>
  )
}
