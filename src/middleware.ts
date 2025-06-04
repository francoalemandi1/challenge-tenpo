import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const COOKIE_NAME = 'auth_token'

// Rutas públicas (no requieren autenticación)
const PUBLIC_PATHS = ['/auth/login']

// Rutas de API que no deben ser interceptadas
const UNPROTECTED_API_PATHS = ['/api/auth/login', '/api/auth/logout']

// Rutas protegidas (requieren autenticación)
const PROTECTED_PATHS = ['/dashboard']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  console.log('🚀 Middleware - Path:', pathname)

  // No interceptar archivos estáticos ni rutas de API no protegidas
  if (
    pathname.startsWith('/_next') ||
    pathname.includes('.') ||
    UNPROTECTED_API_PATHS.includes(pathname)
  ) {
    console.log('⏩ Skipping middleware - Static/API path')
    return NextResponse.next()
  }

  // Solo verificamos presencia del token, no su validez
  const isAuthenticated = request.cookies.has(COOKIE_NAME)
  console.log('🔐 Token present:', isAuthenticated)

  // Manejar rutas públicas
  if (PUBLIC_PATHS.includes(pathname)) {
    console.log('📍 Public path detected')
    if (isAuthenticated) {
      console.log('↪️ Redirecting to dashboard - Token present')
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
    console.log('✅ Allowing access to public path')
    return NextResponse.next()
  }

  // Manejar rutas protegidas
  if (PROTECTED_PATHS.includes(pathname)) {
    console.log('🔒 Protected path detected')
    if (!isAuthenticated) {
      console.log('↪️ Redirecting to login - No token present')
      return NextResponse.redirect(new URL('/auth/login', request.url))
    }
    console.log('✅ Allowing access to protected path')
    return NextResponse.next()
  }

  // Manejar la ruta raíz
  if (pathname === '/') {
    console.log('🏠 Root path detected')
    if (isAuthenticated) {
      console.log('↪️ Redirecting to dashboard - Token present')
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
    console.log('↪️ Redirecting to login - No token present')
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  // Para cualquier otra ruta
  console.log('📄 Unhandled path detected')
  if (!isAuthenticated) {
    console.log('↪️ Redirecting to login - No token present')
    return NextResponse.redirect(new URL('/auth/login', request.url))
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
