"use client"

import { Home, Calendar, ListChecks, User } from "lucide-react"
import { useRouter, usePathname } from "next/navigation"

type NavItem = {
  icon: typeof Home
  label: string
  path: string
}

const navItems: NavItem[] = [
  { icon: Home, label: "Inicio", path: "/" },
  { icon: Calendar, label: "Menú", path: "/menu-semanal" },
  { icon: ListChecks, label: "Lista", path: "/lista-compra" },
  { icon: User, label: "Perfil", path: "/configuracion" },
]

export function BottomNavigation() {
  const router = useRouter()
  const pathname = usePathname()

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/"
    return pathname.startsWith(path)
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-border z-50">
      <div className="flex items-center justify-around max-w-md mx-auto py-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const active = isActive(item.path)

          return (
            <button
              key={item.path}
              onClick={() => router.push(item.path)}
              className={`flex flex-col items-center py-2 px-6 transition-colors ${
                active ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <Icon className={`h-6 w-6 ${active ? "stroke-[2.5]" : ""}`} />
              <span className={`text-xs mt-1 ${active ? "font-semibold" : "font-medium"}`}>
                {item.label}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
