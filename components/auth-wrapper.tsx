"use client"

import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { isAuthenticated } from "@/lib/auth"

export function AuthWrapper({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // No verificar en la página de auth
    if (pathname === '/auth') {
      return
    }

    // Verificar autenticación
    if (!isAuthenticated()) {
      router.push('/auth')
    }
  }, [pathname, router])

  // Si estamos en la página de auth, mostrar sin verificar
  if (pathname === '/auth') {
    return <>{children}</>
  }

  // Si no está autenticado, no mostrar contenido (redirigirá)
  if (!isAuthenticated()) {
    return null
  }

  return <>{children}</>
}
