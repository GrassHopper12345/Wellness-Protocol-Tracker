import { NextRequest, NextResponse } from 'next/server'

export async function GET(): Promise<NextResponse> {
  try {
    // TODO: return await prisma.stage.findMany({ orderBy: { order: 'asc' } })
    return NextResponse.json({ data: [] }, { status: 200 })
  } catch (error) {
    console.error('[GET /api/stages]', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body: unknown = await request.json()
    // TODO: validate with Zod schema, then prisma.stage.create({ data: body })
    return NextResponse.json({ data: body }, { status: 201 })
  } catch (error) {
    console.error('[POST /api/stages]', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
