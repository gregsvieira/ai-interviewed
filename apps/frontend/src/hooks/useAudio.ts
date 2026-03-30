import { useState, useEffect, useCallback } from 'react'
import { WebSpeechSTT } from '@/services/audio/webSpeech.stt'
import { WebSpeechTTS } from '@/services/audio/webSpeech.tts'
import type { STTService, TTSService } from '@/types/audio'

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
  const [sttService] = useState<STTService>(() => new WebSpeechSTT())
  const [ttsService] = useState<TTSService>(() => new WebSpeechTTS())
  const [isUserSpeaking, setIsUserSpeaking] = useState(false)
  const [isAiSpeaking, setIsAiSpeaking] = useState(false)

  useEffect(() => {
    sttService.onSpeakingChange(setIsUserSpeaking)
    ttsService.onSpeakingChange(setIsAiSpeaking)
  }, [sttService, ttsService])

  const startListening = useCallback(async () => {
    await sttService.start()
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
