import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { ROUTES, isPublicRoute, isPrivateRoute, isApiRoute } from '@/config/routes'

const COOKIE_NAME = 'auth_token'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // No interceptar archivos estáticos ni rutas de API no protegidas
  if (pathname.startsWith('/_next') || pathname.includes('.') || isApiRoute(pathname)) {
    return NextResponse.next()
  }

  // Solo verificamos presencia del token, no su validez
  const isAuthenticated = request.cookies.has(COOKIE_NAME)

  // Manejar rutas públicas
  if (isPublicRoute(pathname)) {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL(ROUTES.private.dashboard, request.url))
    }
    return NextResponse.next()
  }

  // Manejar rutas protegidas
  if (isPrivateRoute(pathname)) {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL(ROUTES.public.login, request.url))
    }
    return NextResponse.next()
  }

  // Manejar la ruta raíz
  if (pathname === '/') {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL(ROUTES.private.dashboard, request.url))
    }
    return NextResponse.redirect(new URL(ROUTES.public.login, request.url))
  }

  // Para cualquier otra ruta
  if (!isAuthenticated) {
    return NextResponse.redirect(new URL(ROUTES.public.login, request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all paths except:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
