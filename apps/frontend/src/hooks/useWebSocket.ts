import { useEffect, useRef, useCallback, useState } from 'react'
import { io, Socket } from 'socket.io-client'
import { WS_URL } from '@/lib/utils'

interface UseWebSocketOptions {
  onAiText?: (text: string) => void
  onAiSpeaking?: (speaking: boolean) => void
  onInterviewEnded?: () => void
  onError?: (error: Error) => void
}

interface UseWebSocketReturn {
  socket: Socket | null
  isConnected: boolean
  emit: (event: string, data?: unknown) => void
  disconnect: () => void
}

export function useWebSocket(token: string | null, options: UseWebSocketOptions = {}): UseWebSocketReturn {
  const [socket, setSocket] = useState<Socket | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const optionsRef = useRef(options)

  useEffect(() => {
    optionsRef.current = options
  }, [options])

  useEffect(() => {
    if (!token) {
      setSocket(null)
      setIsConnected(false)
      return
    }

    const newSocket = io(WS_URL, {
      auth: { token },
      transports: ['websocket'],
    })

    newSocket.on('connect', () => {
      setIsConnected(true)
    })

    newSocket.on('disconnect', () => {
      setIsConnected(false)
    })

    newSocket.on('ai:text', (data: { text: string }) => {
      optionsRef.current.onAiText?.(data.text)
    })

    newSocket.on('ai:speaking', (speaking: boolean) => {
      optionsRef.current.onAiSpeaking?.(speaking)
    })

    newSocket.on('interview:ended', () => {
      optionsRef.current.onInterviewEnded?.()
    })

    newSocket.on('error', (error: Error) => {
      optionsRef.current.onError?.(error)
    })

    setSocket(newSocket)

    return () => {
      newSocket.disconnect()
    }
  }, [token])

  const emit = useCallback((event: string, data?: unknown) => {
    socket?.emit(event, data)
  }, [socket])

  const disconnect = useCallback(() => {
    socket?.disconnect()
  }, [socket])

  return {
    socket,
    isConnected,
    emit,
    disconnect,
  }
}
