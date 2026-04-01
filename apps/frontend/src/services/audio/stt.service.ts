import { MediaRecorderService } from './mediaRecorder.stt'

let instance: MediaRecorderService | null = null

export function getSTTService(): MediaRecorderService {
  if (!instance) {
    instance = new MediaRecorderService()
  }
  return instance
}
