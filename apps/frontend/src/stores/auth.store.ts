import { create } from 'zustand'
import { User } from '@/types/auth'
import { authApi } from '@/services/api/auth.api'

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, name: string) => Promise<void>
  logout: () => void
  checkAuth: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: localStorage.getItem('token'),
  isAuthenticated: !!localStorage.getItem('token'),
  isLoading: false,

  login: async (email, password) => {
    set({ isLoading: true })
    try {
      const response = await authApi.login(email, password)
      localStorage.setItem('token', response.token)
      set({ user: response.user, token: response.token, isAuthenticated: true, isLoading: false })
    } catch (error) {
      set({ isLoading: false })
      throw error
    }
  },

  register: async (email, password, name) => {
    set({ isLoading: true })
    try {
      const response = await authApi.register(email, password, name)
      localStorage.setItem('token', response.token)
      set({ user: response.user, token: response.token, isAuthenticated: true, isLoading: false })
    } catch (error) {
      set({ isLoading: false })
      throw error
    }
  },

  logout: () => {
    localStorage.removeItem('token')
    set({ user: null, token: null, isAuthenticated: false })
  },

  checkAuth: async () => {
    const token = localStorage.getItem('token')
    if (token) {
      try {
        const user = await authApi.me()
        set({ user, token, isAuthenticated: true })
      } catch {
        localStorage.removeItem('token')
        set({ user: null, token: null, isAuthenticated: false })
      }
    }
  },
}))
