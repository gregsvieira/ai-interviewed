import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/stores/auth.store'
import type { User } from '@/types/auth'

interface UseAuthReturn {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, name: string) => Promise<void>
  logout: () => void
  checkAuth: () => Promise<void>
}

export function useAuth(): UseAuthReturn {
  const navigate = useNavigate()
  const { user, isAuthenticated, isLoading, login, register, logout, checkAuth } = useAuthStore()

  const handleLogout = useCallback(() => {
    logout()
    navigate('/login')
  }, [logout, navigate])

  return {
    user,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout: handleLogout,
    checkAuth,
  }
}
