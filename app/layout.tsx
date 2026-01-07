import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthWrapper } from "@/components/auth-wrapper"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Zerowaste - Planificador de Comidas Familiar",
  description: "Planifica tus comidas, reduce el desperdicio y ahorra dinero",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <AuthWrapper>
          <main className="min-h-screen max-w-md mx-auto bg-white">{children}</main>
        </AuthWrapper>
      </body>
    </html>
  )
}
