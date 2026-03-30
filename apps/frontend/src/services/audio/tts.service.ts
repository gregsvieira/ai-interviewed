import { TTSService } from '@/types/audio'
import { WebSpeechTTS } from './webSpeech.tts'

let instance: TTSService | null = null

export function getTTSService(): TTSService {
  if (!instance) {
    instance = new WebSpeechTTS()
  }
  return instance
}
