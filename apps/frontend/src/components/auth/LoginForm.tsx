import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuthStore } from '@/stores/auth.store'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isRegister, setIsRegister] = useState(false)
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const { login, register, isLoading } = useAuthStore()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    try {
      if (isRegister) {
        await register(email, password, name)
      } else {
        await login(email, password)
      }
      navigate('/home')
    } catch {
      setError('Credenciais inválidas')
    }
  }

  return (
    <Card className="w-full max-w-md bg-zinc-900 border-zinc-800">
      <CardHeader>
        <CardTitle className="text-zinc-100">
          {isRegister ? 'Create Account' : 'Login'}
        </CardTitle>
        <CardDescription className="text-zinc-400">
          {isRegister
            ? 'Create your account to start'
            : 'Login to continue'}
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {error && (
            <div className="text-red-400 text-sm text-center">{error}</div>
          )}
          {isRegister && (
            <div className="space-y-2">
              <Label className="text-zinc-300">Name</Label>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="bg-zinc-800 border-zinc-700 text-zinc-100"
                required={isRegister}
              />
            </div>
          )}
          <div className="space-y-2">
            <Label className="text-zinc-300">Email</Label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="bg-zinc-800 border-zinc-700 text-zinc-100"
              required
            />
          </div>
          <div className="space-y-2">
            <Label className="text-zinc-300">Password</Label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="bg-zinc-800 border-zinc-700 text-zinc-100"
              required
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700"
            disabled={isLoading}
          >
            {isLoading ? 'Carregando...' : isRegister ? 'Criar Conta' : 'Entrar'}
          </Button>
          <Button
            type="button"
            variant="ghost"
            className="w-full text-zinc-400 hover:text-zinc-100"
            onClick={() => setIsRegister(!isRegister)}
          >
            {isRegister
              ? 'Already have an account? Log in here.'
              : 'Don\'t have an account? Sign up.'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
