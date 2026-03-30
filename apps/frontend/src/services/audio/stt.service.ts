import { STTService } from '@/types/audio'
import { WebSpeechSTT } from './webSpeech.stt'

let instance: STTService | null = null

export function getSTTService(): STTService {
  if (!instance) {
    instance = new WebSpeechSTT()
  }
  return instance
}
