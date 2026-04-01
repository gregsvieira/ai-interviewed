import { useState, useCallback } from 'react'
import { MediaRecorderService } from '@/services/audio/mediaRecorder.stt'
import { WebSpeechTTS } from '@/services/audio/webSpeech.tts'
import type { TTSService } from '@/types/audio'

interface UseAudioReturn {
  isSttSupported: boolean
  isTtsSupported: boolean
  isUserSpeaking: boolean
  isAiSpeaking: boolean
  startListening: () => Promise<void>
  stopListening: () => void
  speak: (text: string) => Promise<void>
  stopSpeaking: () => void
}

export function useAudio(): UseAudioReturn {
  const [sttService] = useState(() => new MediaRecorderService())
  const [ttsService] = useState<TTSService>(() => new WebSpeechTTS())
  const [isUserSpeaking, setIsUserSpeaking] = useState(false)
  const [isAiSpeaking] = useState(false)

  const startListening = useCallback(async () => {
    await sttService.start({
      onSpeakingChange: setIsUserSpeaking,
      onChunk: () => {},
      onError: () => {}
    })
  }, [sttService])

  const stopListening = useCallback(() => {
    sttService.stop()
  }, [sttService])

  const speak = useCallback(async (text: string) => {
    await ttsService.speak(text)
  }, [ttsService])

  const stopSpeaking = useCallback(() => {
    ttsService.stop()
  }, [ttsService])

  return {
    isSttSupported: sttService.isSupported(),
    isTtsSupported: ttsService.isSupported(),
    isUserSpeaking,
    isAiSpeaking,
    startListening,
    stopListening,
    speak,
    stopSpeaking,
  }
}
