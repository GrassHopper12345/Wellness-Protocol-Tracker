import { NextRequest, NextResponse } from 'next/server'

type RouteContext = { params: { id: string } }

export async function GET(
  _: NextRequest,
  { params }: RouteContext
): Promise<NextResponse> {
  try {
    // TODO: const stage = await prisma.stage.findUnique({ where: { id: params.id }, include: { supplements: true, logEntries: true, protocol: true } })
    // if (!stage) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json({ data: null }, { status: 200 })
  } catch (error) {
    console.error(`[GET /api/stages/${params.id}]`, error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: RouteContext
): Promise<NextResponse> {
  try {
    const body: unknown = await request.json()
    // TODO: validate with Zod schema, then prisma.stage.update({ where: { id: params.id }, data: body })
    return NextResponse.json({ data: body }, { status: 200 })
  } catch (error) {
    console.error(`[PATCH /api/stages/${params.id}]`, error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(
  _: NextRequest,
  { params }: RouteContext
): Promise<NextResponse> {
  try {
    // TODO: await prisma.stage.delete({ where: { id: params.id } })
    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error(`[DELETE /api/stages/${params.id}]`, error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
