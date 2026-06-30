export default function StageDetailPage({
  params,
}: {
  params: { id: string; stageId: string }
}) {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold">Stage {params.stageId}</h1>
    </main>
  )
}
