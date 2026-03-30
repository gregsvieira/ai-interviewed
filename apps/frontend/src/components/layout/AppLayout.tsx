import { ReactNode } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LogOut, History } from 'lucide-react'
import { useAuthStore } from '@/stores/auth.store'
import { Button } from '@/components/ui/button'

interface AppLayoutProps {
  children: ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  const navigate = useNavigate()
  const { user, logout, isAuthenticated } = useAuthStore()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  if (!isAuthenticated) {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen bg-zinc-950">
      <header className="border-b border-zinc-800 bg-zinc-900">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/config" className="text-xl font-bold text-zinc-100">
            Interviewed
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm text-zinc-400">{user?.name}</span>
            <nav className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/history')}
                className="text-zinc-400 hover:text-zinc-100"
              >
                <History className="w-4 h-4 mr-1" />
                Histórico
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="text-zinc-400 hover:text-zinc-100"
              >
                <LogOut className="w-4 h-4 mr-1" />
                Sair
              </Button>
            </nav>
          </div>
        </div>
      </header>
      <main>{children}</main>
    </div>
  )
}
