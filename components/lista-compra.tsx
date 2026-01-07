"use client"

import { useState } from "react"
import { ArrowLeft, ChevronDown, ChevronUp, Download, Check, Circle, Beef, Carrot, Milk, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { BottomNavigation } from "./bottom-navigation"

type Category = {
  id: string
  name: string
  icon: typeof Beef
  color: string
  bgColor: string
  expanded: boolean
  items: ShoppingItem[]
}

type ShoppingItem = {
  id: string
  name: string
  quantity: string
  checked: boolean
}

export function ListaCompra() {
  const router = useRouter()
  const [categories, setCategories] = useState<Category[]>([
    {
      id: "1",
      name: "Proteína",
      icon: Beef,
      color: "text-primary",
      bgColor: "bg-primary/10",
      expanded: true,
      items: [
        { id: "1", name: "Pechuga de Pollo", quantity: "500g", checked: false },
        { id: "2", name: "Huevos", quantity: "12 u", checked: true },
        { id: "3", name: "Salmón", quantity: "2 filetes", checked: false },
      ],
    },
    {
      id: "2",
      name: "Verduras",
      icon: Carrot,
      color: "text-secondary",
      bgColor: "bg-secondary/10",
      expanded: true,
      items: [
        { id: "4", name: "Tomates", quantity: "1 kg", checked: false },
        { id: "5", name: "Lechuga", quantity: "1 u", checked: false },
      ],
    },
    {
      id: "3",
      name: "Lácteos",
      icon: Milk,
      color: "text-info",
      bgColor: "bg-info/10",
      expanded: false,
      items: [
        { id: "6", name: "Leche", quantity: "1 L", checked: false },
        { id: "7", name: "Queso", quantity: "200 g", checked: false },
      ],
    },
    {
      id: "4",
      name: "Otros",
      icon: Package,
      color: "text-amber-700",
      bgColor: "bg-amber-100",
      expanded: false,
      items: [
        { id: "8", name: "Pan integral", quantity: "1 u", checked: false },
      ],
    },
  ])

  const toggleCategory = (categoryId: string) => {
    setCategories(
      categories.map((category) => {
        if (category.id === categoryId) {
          return { ...category, expanded: !category.expanded }
        }
        return category
      }),
    )
  }

  const toggleItem = (categoryId: string, itemId: string) => {
    setCategories(
      categories.map((category) => {
        if (category.id === categoryId) {
          return {
            ...category,
            items: category.items.map((item) => {
              if (item.id === itemId) {
                return { ...item, checked: !item.checked }
              }
              return item
            }),
          }
        }
        return category
      }),
    )
  }

  const markAll = () => {
    setCategories(
      categories.map((category) => ({
        ...category,
        items: category.items.map((item) => ({ ...item, checked: true })),
      })),
    )
  }

  const downloadPDF = () => {
    alert("Descargando lista de compra en PDF...")
  }

  const getTotalItems = (category: Category) => category.items.length

  return (
    <div className="flex flex-col min-h-screen bg-surface">
      {/* Header */}
      <header className="px-4 py-4 flex items-center justify-between bg-white">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="-ml-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-bold ml-1">Mis compras</h1>
        </div>
        <button className="text-primary font-semibold text-sm">Editar</button>
      </header>

      {/* Action Buttons */}
      <div className="px-4 py-3 flex gap-3 bg-white">
        <Card
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl border-0 bg-surface cursor-pointer hover:bg-surface/80"
          onClick={markAll}
        >
          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
            <Check className="h-4 w-4 text-primary" />
          </div>
          <span className="font-medium text-sm text-foreground">Marcar todo</span>
        </Card>
        <Card
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl border-0 bg-surface cursor-pointer hover:bg-surface/80"
          onClick={downloadPDF}
        >
          <div className="h-8 w-8 rounded-full bg-surface flex items-center justify-center">
            <Download className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="text-center">
            <span className="font-medium text-sm text-foreground">Descargar</span>
            <span className="font-medium text-sm text-foreground block">PDF</span>
          </div>
        </Card>
      </div>

      {/* Body */}
      <main className="flex-1 px-4 pt-4 pb-24 overflow-auto">
        <div className="space-y-3">
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <Card key={category.id} className="rounded-2xl border-0 bg-white overflow-hidden">
                {/* Category Header */}
                <button
                  className="w-full flex items-center justify-between p-4"
                  onClick={() => toggleCategory(category.id)}
                >
                  <div className="flex items-center gap-3">
                    <div className={`h-10 w-10 rounded-full ${category.bgColor} flex items-center justify-center`}>
                      <Icon className={`h-5 w-5 ${category.color}`} />
                    </div>
                    <span className="font-bold text-foreground">{category.name}</span>
                    <span className="h-6 w-6 rounded-full bg-surface flex items-center justify-center text-xs font-medium text-muted-foreground">
                      {getTotalItems(category)}
                    </span>
                  </div>
                  {category.expanded ? (
                    <ChevronUp className="h-5 w-5 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-muted-foreground" />
                  )}
                </button>

                {/* Items */}
                {category.expanded && (
                  <div className="px-4 pb-4">
                    <div className="border-t border-dashed border-border/50" />
                    <div className="pt-3 space-y-1">
                      {category.items.map((item, index) => (
                        <div key={item.id}>
                          <button
                            className="w-full flex items-center justify-between py-2"
                            onClick={() => toggleItem(category.id, item.id)}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                                item.checked
                                  ? "bg-primary border-primary"
                                  : "border-muted-foreground/30"
                              }`}>
                                {item.checked && <Check className="h-3 w-3 text-white" />}
                              </div>
                              <span className={`font-medium ${item.checked ? "line-through text-muted-foreground" : "text-foreground"}`}>
                                {item.name}
                              </span>
                            </div>
                            <span className={`text-sm ${item.checked ? "text-primary" : "text-muted-foreground"}`}>
                              {item.quantity}
                            </span>
                          </button>
                          {index < category.items.length - 1 && (
                            <div className="border-b border-dashed border-border/50 ml-8" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </Card>
            )
          })}
        </div>
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  )
}
