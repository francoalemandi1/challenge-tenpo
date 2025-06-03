'use client'

import { create } from 'zustand'
import { AuthState, LoginCredentials } from '@/types/auth'
import { authService } from '@/services/auth'
import { useRouter } from 'next/navigation'
import { StateCreator } from 'zustand'

interface AuthStore extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>
  logout: () => Promise<void>
  setAuth: (state: Partial<AuthState>) => void
}

const createAuthStore: StateCreator<AuthStore> = set => ({
  token: null,
  user: null,
  isAuthenticated: false,
  setAuth: state => set(state),
  login: async (credentials: LoginCredentials) => {
    try {
      const response = await authService.login(credentials)
      set({
        token: response.token,
        user: response.user,
        isAuthenticated: true,
      })
    } catch (error) {
      set({ token: null, user: null, isAuthenticated: false })
      throw error
    }
  },
  logout: async () => {
    await authService.logout()
    set({
      token: null,
      user: null,
      isAuthenticated: false,
    })
  },
})

export const useAuthStore = create<AuthStore>(createAuthStore)

export function useAuth() {
  const router = useRouter()
  const authStore = useAuthStore()

  const login = async (credentials: LoginCredentials) => {
    try {
      await authStore.login(credentials)
      // Redirigir después de un login exitoso
      window.location.href = '/dashboard'
    } catch (error) {
      throw error
    }
  }

  const logout = async () => {
    await authStore.logout()
    router.replace('/auth/login')
  }

  return {
    ...authStore,
    login,
    logout,
  }
}
