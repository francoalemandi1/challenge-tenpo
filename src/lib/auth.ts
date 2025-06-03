import { redirect } from 'next/navigation';

// Define public and private routes
export const PUBLIC_ROUTES = [
  '/auth/login',
  '/auth/register',
  '/auth/forgot-password',
];

export const PRIVATE_ROUTES = [
  '/dashboard',
  '/profile',
  '/settings',
];

// Route protection utilities
export function isPublicRoute(path: string): boolean {
  return PUBLIC_ROUTES.some(route => path.startsWith(route));
}

export function isPrivateRoute(path: string): boolean {
  return PRIVATE_ROUTES.some(route => path.startsWith(route));
}

// Authentication state management
export function requireAuth(path: string) {
  const isAuthenticated = document.cookie.includes('auth_token=');
  
  if (!isAuthenticated && isPrivateRoute(path)) {
    redirect('/auth/login');
  }
  
  if (isAuthenticated && isPublicRoute(path)) {
    redirect('/dashboard');
  }
}

// Route configuration type
export type RouteConfig = {
  path: string;
  isPublic: boolean;
  roles?: string[];
}; 