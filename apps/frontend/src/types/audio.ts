export type Gender = 'male' | 'female'

export interface TTSService {
  speak(text: string, gender?: Gender): Promise<void>
  stop(): void
  getEstimatedDuration(text: string): number
  onSpeakingChange(callback: (speaking: boolean) => void): void
  isSupported(): boolean
}
