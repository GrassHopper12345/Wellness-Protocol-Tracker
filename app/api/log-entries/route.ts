import { NextRequest, NextResponse } from 'next/server'

export async function GET(): Promise<NextResponse> {
  try {
    // TODO: return await prisma.logEntry.findMany({ orderBy: { date: 'desc' } })
    return NextResponse.json({ data: [] }, { status: 200 })
  } catch (error) {
    console.error('[GET /api/log-entries]', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body: unknown = await request.json()
    // TODO: validate with Zod schema, then prisma.logEntry.create({ data: body })
    return NextResponse.json({ data: body }, { status: 201 })
  } catch (error) {
    console.error('[POST /api/log-entries]', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
