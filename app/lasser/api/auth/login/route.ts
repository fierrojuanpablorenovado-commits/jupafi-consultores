import { NextResponse } from 'next/server'

const PASS = process.env.LASSER_PASS ?? 'Lasser2026'

export async function POST(req: Request) {
  const { password } = await req.json()
  if (password !== PASS) {
    return NextResponse.json({ error: 'Contraseña incorrecta' }, { status: 401 })
  }
  const res = NextResponse.json({ ok: true })
  res.cookies.set('ls_session', 'ok', {
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  })
  return res
}
