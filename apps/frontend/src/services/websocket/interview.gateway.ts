import { io, Socket } from 'socket.io-client'
import { WS_URL } from '@/lib/utils'

let socket: Socket | null = null

export function getInterviewSocket(token: string): Socket {
  if (!socket) {
    socket = io(WS_URL, {
      auth: { token },
      transports: ['websocket'],
    })
  }
  return socket
}

export function disconnectSocket(): void {
  if (socket) {
    socket.disconnect()
    socket = null
  }
}
