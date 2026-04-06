import { LoginForm } from '@/components/auth/LoginForm'
import { PulsatingOrb } from '@/components/orb'

export function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">

      <div className="absolute inset-0 z-0 flex items-center justify-center">
        <div className="w-full h-full">
          <PulsatingOrb
            hue={0} 
            hoverIntensity={0.5} 
            backgroundColor="#09090b" 
          />
        </div>
      </div>

        <div className="relative z-10 w-full flex items-center justify-center p-4">
        <div className=" p-8 rounded-3xl w-full max-w-md">
           <LoginForm />
        </div>
      </div>
    </div>
  )
}
