"use client"

import { useState } from "react"
import { ArrowLeft, Check, Beef, Carrot, Milk, Egg, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { saveProductCategories } from "@/app/actions"
import { BottomNavigation } from "./bottom-navigation"

type Product = {
  id: string
  name: string
  quantity: string
  category: string
}

const categoryConfig: Record<string, { icon: typeof Beef; color: string; bgColor: string; label: string }> = {
  proteina: { icon: Beef, color: "text-primary", bgColor: "bg-primary/10", label: "Proteína" },
  verdura: { icon: Carrot, color: "text-secondary", bgColor: "bg-secondary/10", label: "Verdura" },
  lacteo: { icon: Milk, color: "text-info", bgColor: "bg-info/10", label: "Lácteo" },
  huevos: { icon: Egg, color: "text-warning", bgColor: "bg-warning/10", label: "Huevos" },
  otros: { icon: Package, color: "text-muted-foreground", bgColor: "bg-muted", label: "Otros" },
}

export function CatalogoProductos() {
  const router = useRouter()
  const [products, setProducts] = useState<Product[]>([
    { id: "1", name: "Pechuga de Pollo", quantity: "500 g", category: "proteina" },
    { id: "2", name: "Tomates", quantity: "1 kg", category: "verdura" },
    { id: "3", name: "Leche Entera", quantity: "1 L", category: "lacteo" },
    { id: "4", name: "Huevos", quantity: "12 u", category: "huevos" },
    { id: "5", name: "Arroz", quantity: "500 g", category: "otros" },
  ])

  const handleCategoryChange = (id: string, category: string) => {
    setProducts(
      products.map((product) => {
        if (product.id === id) {
          return { ...product, category }
        }
        return product
      }),
    )
  }

  const handleSave = async () => {
    try {
      await saveProductCategories(products)
      router.push("/")
    } catch (error) {
      console.error("Error saving categories:", error)
      router.push("/")
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-surface">
      {/* Header */}
      <header className="px-4 py-4 flex items-center bg-white">
        <Button variant="ghost" size="icon" onClick={() => router.back()} className="-ml-2 text-primary">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-bold ml-1">Categoriza tus productos</h1>
      </header>

      {/* Description */}
      <div className="px-4 py-4 bg-white">
        <p className="text-sm text-muted-foreground">
          Asigna una categoría a cada producto para organizar mejor tu despensa y generar listas de compra inteligentes.
        </p>
      </div>

      {/* Body */}
      <main className="flex-1 px-4 pt-4 pb-32 overflow-auto">
        <div className="space-y-3">
          {products.map((product) => {
            const config = categoryConfig[product.category] || categoryConfig.otros
            const Icon = config.icon
            return (
              <Card key={product.id} className="p-4 rounded-2xl border-0 bg-white">
                <div className="flex items-center gap-3">
                  <div className={`h-12 w-12 rounded-xl ${config.bgColor} flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`h-6 w-6 ${config.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-foreground">{product.name}</h3>
                    <p className="text-sm text-muted-foreground">{product.quantity}</p>
                  </div>
                  <Select
                    value={product.category}
                    onValueChange={(value) => handleCategoryChange(product.id, value)}
                  >
                    <SelectTrigger className={`w-32 h-10 rounded-full ${config.bgColor} border-0`}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="proteina">
                        <div className="flex items-center gap-2">
                          <Beef className="h-4 w-4 text-primary" />
                          <span>Proteína</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="verdura">
                        <div className="flex items-center gap-2">
                          <Carrot className="h-4 w-4 text-secondary" />
                          <span>Verdura</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="lacteo">
                        <div className="flex items-center gap-2">
                          <Milk className="h-4 w-4 text-info" />
                          <span>Lácteo</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="huevos">
                        <div className="flex items-center gap-2">
                          <Egg className="h-4 w-4 text-warning" />
                          <span>Huevos</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="otros">
                        <div className="flex items-center gap-2">
                          <Package className="h-4 w-4 text-muted-foreground" />
                          <span>Otros</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </Card>
            )
          })}
        </div>
      </main>

      {/* Footer */}
      <footer className="fixed bottom-16 left-0 right-0 p-4 bg-surface">
        <Button
          className="w-full h-14 rounded-2xl bg-primary hover:bg-primary/90 text-white font-semibold"
          onClick={handleSave}
        >
          <Check className="h-5 w-5 mr-2" />
          Guardar categorías
        </Button>
      </footer>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  )
}
