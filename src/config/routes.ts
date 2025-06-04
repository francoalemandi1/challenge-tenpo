export const ROUTES = {
  public: {
    login: '/auth/login',
    register: '/auth/register',
    forgotPassword: '/auth/forgot-password',
  },
  private: {
    home: '/home',
    profile: '/profile',
    settings: '/settings',
  },
  api: {
    auth: {
      login: '/api/auth/login',
      logout: '/api/auth/logout',
      check: '/api/auth/check',
    },
  },
} as const

export type Routes = typeof ROUTES

export const isPublicRoute = (path: string) =>
  Object.values(ROUTES.public).some(route => path.startsWith(route))

export const isPrivateRoute = (path: string) =>
  Object.values(ROUTES.private).some(route => path.startsWith(route))

export const isApiRoute = (path: string) =>
  Object.values(ROUTES.api.auth).some(route => path.startsWith(route))
