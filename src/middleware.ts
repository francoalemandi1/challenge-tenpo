import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { COOKIE_NAME } from '@/lib/auth'
import { ROUTES } from '@/config/routes'

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Skip middleware for static files and API routes
  if (pathname.startsWith('/_next') || pathname.includes('/api/')) {
    return NextResponse.next()
  }

  const isAuthenticated = request.cookies.has(COOKIE_NAME)

  // Handle root path and empty path - redirect to login if not authenticated
  if (pathname === '/' || pathname === '') {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL(ROUTES.private.dashboard, request.url))
    }
    return NextResponse.redirect(new URL(ROUTES.public.login, request.url))
  }

  // Handle public routes (login, register, etc)
  if (pathname.startsWith('/auth')) {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL(ROUTES.private.dashboard, request.url))
    }
    return NextResponse.next()
  }

  // Handle protected routes (dashboard, profile, etc)
  if (pathname.startsWith('/dashboard')) {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL(ROUTES.public.login, request.url))
    }
    return NextResponse.next()
  }

  // Handle unmatched routes - redirect to login if not authenticated
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
