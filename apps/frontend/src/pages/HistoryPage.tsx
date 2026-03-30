import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Calendar, Clock, MessageSquare, Play } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { interviewApi } from '@/services/api/interview.api'
import { Interview } from '@/types/interview'

export function HistoryPage() {
  const [interviews, setInterviews] = useState<Interview[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    interviewApi
      .getHistory()
      .then(setInterviews)
      .catch(() => {
        setInterviews([])
      })
      .finally(() => setIsLoading(false))
  }, [])

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
  }

  const formatDuration = (minutes: number) => {
    return `${minutes} min`
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <p className="text-zinc-400">Carregando...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-zinc-950">
      <header className="border-b border-zinc-800 bg-zinc-900">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-xl font-bold text-zinc-100">Histórico de Entrevistas</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {interviews.length === 0 ? (
          <div className="text-center py-16">
            <MessageSquare className="w-16 h-16 text-zinc-600 mx-auto mb-4" />
            <h2 className="text-xl font-medium text-zinc-300 mb-2">
              Nenhuma entrevista realizada
            </h2>
            <p className="text-zinc-500 mb-6">
              Comece sua primeira entrevista para ver o histórico aqui
            </p>
            <Button
              onClick={() => navigate('/config')}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Play className="w-4 h-4 mr-2" />
              Iniciar Entrevista
            </Button>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {interviews.map((interview) => (
              <Card key={interview.id} className="bg-zinc-900 border-zinc-800">
                <CardHeader>
                  <CardTitle className="text-zinc-100 text-lg">
                    {interview.topic.name}
                  </CardTitle>
                  <p className="text-sm text-zinc-400">{interview.subtopic.name}</p>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 text-sm text-zinc-400">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {formatDate(interview.startedAt)}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {formatDuration(interview.duration)}
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-zinc-800">
                    <p className="text-sm text-zinc-400">
                      {interview.messages.length} mensagens trocadas
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
