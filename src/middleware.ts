import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { ROUTES, isPublicRoute, isPrivateRoute, isApiRoute } from '@/config/routes'

const COOKIE_NAME = 'auth_token'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  console.log('🚀 Middleware - Path:', pathname)

  // No interceptar archivos estáticos ni rutas de API no protegidas
  if (pathname.startsWith('/_next') || pathname.includes('.') || isApiRoute(pathname)) {
    console.log('⏩ Skipping middleware - Static/API path')
    return NextResponse.next()
  }

  // Solo verificamos presencia del token, no su validez
  const isAuthenticated = request.cookies.has(COOKIE_NAME)
  console.log('🔐 Token present:', isAuthenticated)

  // Manejar rutas públicas
  if (isPublicRoute(pathname)) {
    console.log('📍 Public path detected')
    if (isAuthenticated) {
      console.log('↪️ Redirecting to dashboard - Token present')
      return NextResponse.redirect(new URL(ROUTES.private.dashboard, request.url))
    }
    console.log('✅ Allowing access to public path')
    return NextResponse.next()
  }

  // Manejar rutas protegidas
  if (isPrivateRoute(pathname)) {
    console.log('🔒 Protected path detected')
    if (!isAuthenticated) {
      console.log('↪️ Redirecting to login - No token present')
      return NextResponse.redirect(new URL(ROUTES.public.login, request.url))
    }
    console.log('✅ Allowing access to protected path')
    return NextResponse.next()
  }

  // Manejar la ruta raíz
  if (pathname === '/') {
    console.log('🏠 Root path detected')
    if (isAuthenticated) {
      console.log('↪️ Redirecting to dashboard - Token present')
      return NextResponse.redirect(new URL(ROUTES.private.dashboard, request.url))
    }
    console.log('↪️ Redirecting to login - No token present')
    return NextResponse.redirect(new URL(ROUTES.public.login, request.url))
  }

  // Para cualquier otra ruta
  console.log('📄 Unhandled path detected')
  if (!isAuthenticated) {
    console.log('↪️ Redirecting to login - No token present')
    return NextResponse.redirect(new URL(ROUTES.public.login, request.url))
  }

  console.log('✅ Allowing access to path')
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
