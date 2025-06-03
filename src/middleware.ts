import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'

const COOKIE_NAME = 'auth_token'
const AUTH_PAGES = ['/auth/login', '/auth/register']
const PROTECTED_PATHS = ['/dashboard']
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

function verifyToken(token: string) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload
    // Verificar si el token ha expirado
    if (decoded.exp && decoded.exp * 1000 < Date.now()) {
      return null
    }
    return decoded
  } catch {
    return null
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get(COOKIE_NAME)?.value
  const isAuthPage = AUTH_PAGES.some(path => pathname.startsWith(path))
  const isProtectedPath = PROTECTED_PATHS.some(path => pathname.startsWith(path))
  const isApiPath = pathname.startsWith('/api')

  // Skip middleware for API routes and static files
  if (isApiPath || pathname.match(/\.(ico|png|jpg|jpeg|svg|css|js)$/)) {
    return NextResponse.next()
  }

  // Si hay token, verificar su validez
  if (token) {
    const decoded = verifyToken(token)

    // Si el token es inválido o expiró, limpiar la cookie y redirigir al login
    if (!decoded) {
      const response = NextResponse.redirect(new URL('/auth/login', request.url))
      response.cookies.delete(COOKIE_NAME)
      return response
    }

    // Si el token es válido y está en página de auth, redirigir al dashboard
    if (isAuthPage) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  }

  // Si no hay token y es una ruta protegida, redirigir al login
  if (!token && isProtectedPath) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
