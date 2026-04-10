import { Interview, InterviewStats, Topic } from '@/types/interview'
import { apiClient } from './client'

export const interviewApi = {
  async getTopics(): Promise<Topic[]> {
    const response = await apiClient.get<Topic[]>('/topics')
    return response.data
  },

  async getHistory(): Promise<Interview[]> {
    const response = await apiClient.get<Interview[]>('/interviews/history')
    return response.data
  },

  async getStats(): Promise<InterviewStats> {
    const response = await apiClient.get<InterviewStats>('/interviews/stats')
    return response.data
  },

  async getInterview(id: string): Promise<Interview> {
    const response = await apiClient.get<Interview>(`/interviews/${id}`)
    return response.data
  },

  async deleteInterview(id: string): Promise<void> {
    await apiClient.delete(`/interviews/${id}`)
  },
}
