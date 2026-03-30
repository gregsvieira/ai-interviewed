import { TTSService, Gender } from '@/types/audio'

export class WebSpeechTTS implements TTSService {
  private speakingCallback?: (speaking: boolean) => void
  private voices: SpeechSynthesisVoice[] = []

  constructor() {
    this.loadVoices()
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = () => this.loadVoices()
    }
  }

  private loadVoices(): void {
    this.voices = window.speechSynthesis.getVoices()
  }

  private selectVoice(gender?: Gender): SpeechSynthesisVoice | null {
    if (this.voices.length === 0) {
      this.voices = window.speechSynthesis.getVoices()
    }

    const englishVoices = this.voices.filter(v => v.lang.startsWith('en'))
    
    if (englishVoices.length === 0) return null

    if (gender === 'female') {
      const femaleVoices = englishVoices.filter(v => 
        v.name.toLowerCase().includes('female') || 
        v.name.toLowerCase().includes('woman') ||
        v.name.toLowerCase().includes('samantha') ||
        v.name.toLowerCase().includes('victoria') ||
        v.name.toLowerCase().includes('karen') ||
        v.name.toLowerCase().includes('moira') ||
        v.name.toLowerCase().includes('tessa') ||
        v.name.toLowerCase().includes('fiona') ||
        v.name.toLowerCase().includes('veena') ||
        v.name.toLowerCase().includes('zira')
      )
      if (femaleVoices.length > 0) return femaleVoices[0]
    }

    if (gender === 'male') {
      const maleVoices = englishVoices.filter(v => 
        v.name.toLowerCase().includes('male') ||
        v.name.toLowerCase().includes('man') ||
        v.name.toLowerCase().includes('daniel') ||
        v.name.toLowerCase().includes('alex') ||
        v.name.toLowerCase().includes('david') ||
        v.name.toLowerCase().includes('mark') ||
        v.name.toLowerCase().includes('tom') ||
        v.name.toLowerCase().includes('fred') ||
        v.name.toLowerCase().includes('ralph') ||
        v.name.toLowerCase().includes('aaron') ||
        v.name.toLowerCase().includes('michael')
      )
      if (maleVoices.length > 0) return maleVoices[0]
    }

    return englishVoices[0]
  }

  speak(text: string, gender?: Gender): Promise<void> {
    return new Promise((resolve, reject) => {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = 'en-US'
      utterance.rate = 1.0
      utterance.pitch = 1.0

      const voice = this.selectVoice(gender)
      if (voice) {
        utterance.voice = voice
      }

      utterance.onstart = () => this.speakingCallback?.(true)
      utterance.onend = () => {
        this.speakingCallback?.(false)
        resolve()
      }
      utterance.onerror = () => {
        this.speakingCallback?.(false)
        reject(new Error('TTS error'))
      }

      window.speechSynthesis.cancel()
      window.speechSynthesis.speak(utterance)
    })
  }

  getEstimatedDuration(text: string): number {
    const wordsPerMinute = 150
    const words = text.split(/\s+/).length
    const minutes = words / wordsPerMinute
    return minutes * 60 * 1000
  }

  stop(): void {
    window.speechSynthesis.cancel()
    this.speakingCallback?.(false)
  }

  onSpeakingChange(callback: (speaking: boolean) => void): void {
    this.speakingCallback = callback
  }

  isSupported(): boolean {
    return 'speechSynthesis' in window
  }
}
