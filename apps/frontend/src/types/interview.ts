export interface Subtopic {
  id: string
  name: string
}

export interface Topic {
  id: string
  name: string
  subtopics: Subtopic[]
}

export interface Message {
  role: 'user' | 'ai'
  text: string
  timestamp?: Date
}

export interface Interview {
  id: string
  topic: Topic
  subtopic: Subtopic
  duration: number
  startedAt: Date
  endedAt?: Date
  messages: Message[]
}
