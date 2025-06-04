import { redirect } from 'next/navigation'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'
import { isPrivateRoute, isPublicRoute, ROUTES } from '@/config/routes'

// Define public and private routes
export const PUBLIC_ROUTES = [ROUTES.public.login]

export const PRIVATE_ROUTES = [ROUTES.private.home]

// Authentication state management
export function requireAuth(path: string) {
  const isAuthenticated = document.cookie.includes('auth_token=')

  if (!isAuthenticated && isPrivateRoute(path)) {
    redirect(ROUTES.public.login)
  }

  if (isAuthenticated && isPublicRoute(path)) {
    redirect(ROUTES.private.home)
  }
}

// Route configuration type
export type RouteConfig = {
  path: string
  isPublic: boolean
  roles?: string[]
}

// JWT configuration
export const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'
export const COOKIE_NAME = 'auth_token'

// Token utilities
export function generateToken(payload: { id: string; email: string; role: string }) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' })
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET)
  } catch {
    return null
  }
}

export async function getTokenFromCookies() {
  const cookieStore = await cookies()
  return cookieStore.get(COOKIE_NAME)?.value
}

export async function isAuthenticated() {
  const token = await getTokenFromCookies()
  if (!token) return false

  const payload = await verifyToken(token)
  return !!payload
}
