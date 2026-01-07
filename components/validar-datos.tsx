"use client"

import { useState } from "react"
import { ArrowLeft, Plus, Trash2, Store, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { saveValidatedProducts } from "@/app/actions"
import { BottomNavigation } from "./bottom-navigation"

type Product = {
  id: string
  name: string
  quantity: string
  unit: string
  price: string
}

export function ValidarDatos() {
  const router = useRouter()
  const [storeName] = useState("Supermercado El Sol")
  const [storeDate] = useState("24 Oct 2023")
  const [products, setProducts] = useState<Product[]>([
    { id: "1", name: "Pechuga de Pollo", quantity: "500", unit: "g", price: "4.50" },
    { id: "2", name: "Tomates", quantity: "1", unit: "kg", price: "2.20" },
    { id: "3", name: "Leche Entera", quantity: "1", unit: "L", price: "1.50" },
  ])

  const handleProductChange = (id: string, field: keyof Product, value: string) => {
    setProducts(
      products.map((product) => {
        if (product.id === id) {
          return { ...product, [field]: value }
        }
        return product
      }),
    )
  }

  const removeProduct = (id: string) => {
    setProducts(products.filter((p) => p.id !== id))
  }

  const addNewProduct = () => {
    const newId = (Number.parseInt(products[products.length - 1]?.id || "0") + 1).toString()
    setProducts([...products, { id: newId, name: "", quantity: "", unit: "u", price: "" }])
  }

  const calculateTotal = () => {
    return products.reduce((sum, p) => sum + (parseFloat(p.price) || 0), 0).toFixed(2)
  }

  const handleConfirm = async () => {
    try {
      await saveValidatedProducts(products)
      router.push("/catalogo-productos")
    } catch (error) {
      console.error("Error saving products:", error)
      router.push("/catalogo-productos")
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-surface">
      {/* Header */}
      <header className="px-4 py-4 flex items-center bg-white">
        <Button variant="ghost" size="icon" onClick={() => router.back()} className="-ml-2">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-bold ml-1">Valida tu factura</h1>
      </header>

      {/* Store Info */}
      <Card className="mx-4 mt-4 p-4 rounded-2xl border-0 bg-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Store className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Tienda</p>
              <p className="font-bold text-foreground">{storeName}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Fecha</p>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <p className="font-medium text-foreground">{storeDate}</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Products Header */}
      <div className="px-4 pt-6 pb-2 flex items-center justify-between">
        <h2 className="text-lg font-bold text-foreground">Productos detectados</h2>
        <span className="text-sm font-medium text-primary">{products.length} items</span>
      </div>

      {/* Body */}
      <main className="flex-1 px-4 pb-48 overflow-auto">
        <div className="space-y-3">
          {products.map((product) => (
            <Card key={product.id} className="p-4 rounded-2xl border-0 bg-white">
              <div className="space-y-3">
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Producto</label>
                  <Input
                    value={product.name}
                    onChange={(e) => handleProductChange(product.id, "name", e.target.value)}
                    className="h-12 rounded-xl bg-surface border-0"
                    placeholder="Nombre del producto"
                  />
                </div>
                <div className="flex gap-3 items-end">
                  <div className="flex-1">
                    <label className="text-xs text-muted-foreground mb-1 block">Cant.</label>
                    <div className="flex">
                      <Input
                        value={product.quantity}
                        onChange={(e) => handleProductChange(product.id, "quantity", e.target.value)}
                        className="h-12 rounded-l-xl rounded-r-none bg-surface border-0"
                        type="number"
                        placeholder="0"
                      />
                      <Input
                        value={product.unit}
                        onChange={(e) => handleProductChange(product.id, "unit", e.target.value)}
                        className="h-12 w-16 rounded-l-none rounded-r-xl bg-muted border-0 text-center"
                        placeholder="u"
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <label className="text-xs text-muted-foreground mb-1 block">Precio</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                      <Input
                        value={product.price}
                        onChange={(e) => handleProductChange(product.id, "price", e.target.value)}
                        className="h-12 pl-7 rounded-xl bg-surface border-0"
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-12 w-12 rounded-xl bg-primary/10 text-primary hover:bg-primary/20 flex-shrink-0"
                    onClick={() => removeProduct(product.id)}
                  >
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}

          {/* Add Product Button */}
          <button
            onClick={addNewProduct}
            className="w-full py-4 border-2 border-dashed border-border rounded-2xl text-muted-foreground flex items-center justify-center gap-2 hover:border-primary hover:text-primary transition-colors"
          >
            <Plus className="h-5 w-5" />
            <span className="font-medium">Agregar producto</span>
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="fixed bottom-16 left-0 right-0 p-4 bg-surface border-t border-border">
        <p className="text-xs text-center text-muted-foreground mb-3">
          Verifica que los precios coincidan con tu recibo
        </p>
        <div className="flex items-center justify-between mb-4">
          <span className="text-muted-foreground">Total Estimado</span>
          <span className="text-xl font-bold text-foreground">${calculateTotal()}</span>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="flex-1 h-12 rounded-xl"
            onClick={() => router.back()}
          >
            Cancelar
          </Button>
          <Button
            className="flex-1 h-12 rounded-xl bg-primary hover:bg-primary/90 text-white font-semibold"
            onClick={handleConfirm}
          >
            Confirmar
          </Button>
        </div>
      </footer>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  )
}
