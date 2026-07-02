import { NextRequest, NextResponse } from 'next/server'

type RouteContext = { params: { id: string } }

export async function GET(
  _: NextRequest,
  { params }: RouteContext
): Promise<NextResponse> {
  try {
    // TODO: const protocol = await prisma.protocol.findUnique({ where: { id: params.id }, include: { stages: true, labResults: true, notes: true } })
    // if (!protocol) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json({ data: null }, { status: 200 })
  } catch (error) {
    console.error(`[GET /api/protocols/${params.id}]`, error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: RouteContext
): Promise<NextResponse> {
  try {
    const body: unknown = await request.json()
    // TODO: validate with Zod schema, then prisma.protocol.update({ where: { id: params.id }, data: body })
    return NextResponse.json({ data: body }, { status: 200 })
  } catch (error) {
    console.error(`[PATCH /api/protocols/${params.id}]`, error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(
  _: NextRequest,
  { params }: RouteContext
): Promise<NextResponse> {
  try {
    // TODO: await prisma.protocol.delete({ where: { id: params.id } })
    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error(`[DELETE /api/protocols/${params.id}]`, error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
