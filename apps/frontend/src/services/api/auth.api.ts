import { apiClient } from './client'
import { AuthResponse, User } from '@/types/auth'

export const authApi = {
  async login(email: string, password: string): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/login', {
      email,
      password,
    })
    return response.data
  },

  async register(email: string, password: string, name: string): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/register', {
      email,
      password,
      name,
    })
    return response.data
  },

  async me(): Promise<User> {
    const response = await apiClient.get<User>('/auth/me')
    return response.data
  },
}
