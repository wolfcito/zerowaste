"use client"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { isAuthenticated } from "@/lib/auth"

export function AuthWrapper({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [authState, setAuthState] = useState<'checking' | 'authenticated' | 'unauthenticated'>('checking')

  useEffect(() => {
    // No verificar en la página de auth
    if (pathname === '/auth') {
      setAuthState('authenticated')
      return
    }

    // Verificar autenticación después del mount
    const authed = isAuthenticated()
    setAuthState(authed ? 'authenticated' : 'unauthenticated')

    if (!authed) {
      router.push('/auth')
    }
  }, [pathname, router])

  // Durante SSR y verificación inicial, renderizar children para evitar hydration mismatch
  if (authState === 'checking') {
    return <>{children}</>
  }

  // Si no está autenticado, no mostrar contenido (ya está redirigiendo)
  if (authState === 'unauthenticated') {
    return null
  }

  return <>{children}</>
}
