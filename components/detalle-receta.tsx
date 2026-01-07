"use client"

import { useState } from "react"
import { ArrowLeft, Share2, Heart, Clock, Users, BarChart3, Flame, ShoppingCart, Timer, Minus, Plus, Star, Leaf, Salad } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { BottomNavigation } from "./bottom-navigation"

type Ingredient = {
  name: string
  quantity: string
  unit: string
}

type Step = {
  number: number
  title: string
  description: string
  timer?: number
}

type Recipe = {
  id: string
  name: string
  tags: string[]
  image: string
  cookingTime: number
  servings: number
  difficulty: string
  calories: number
  rating: number
  reviewCount: number
  ecoTip: string
  ingredients: Ingredient[]
  steps: Step[]
}

const sampleRecipe: Recipe = {
  id: "1",
  name: "Pasta de Calabacín y Pesto",
  tags: ["BAJO DESPERDICIO", "Vegano"],
  image: "/recipe-pasta.png",
  cookingTime: 25,
  servings: 2,
  difficulty: "Fácil",
  calories: 450,
  rating: 4.8,
  reviewCount: 120,
  ecoTip: "No tires los tallos del calabacín. Guárdalos para hacer un caldo de verduras casero más tarde.",
  ingredients: [
    { name: "Calabacines grandes", quantity: "2", unit: "un." },
    { name: "Albahaca fresca", quantity: "50", unit: "g" },
    { name: "Piñones", quantity: "30", unit: "g" },
    { name: "Aceite de Oliva", quantity: "2", unit: "cdas." },
  ],
  steps: [
    {
      number: 1,
      title: "Preparar los calabacines",
      description: "Lavar bien los calabacines. Con un espiralizador o un pelador de verduras, cortar los calabacines en tiras largas tipo espagueti.",
    },
    {
      number: 2,
      title: "Tostar piñones",
      description: "En una sartén pequeña sin aceite, tostar ligeramente los piñones a fuego medio hasta que estén dorados. Cuidado de no quemarlos.",
      timer: 3,
    },
    {
      number: 3,
      title: "Mezclar y servir",
      description: "Mezclar la pasta de calabacín con el pesto casero y los piñones tostados. Servir inmediatamente.",
    },
  ],
}

interface DetalleRecetaProps {
  recipe?: Recipe
}

export function DetalleReceta({ recipe = sampleRecipe }: DetalleRecetaProps) {
  const router = useRouter()
  const [isFavorite, setIsFavorite] = useState(false)
  const [servings, setServings] = useState(recipe.servings)
  const [checkedIngredients, setCheckedIngredients] = useState<Set<number>>(new Set())

  const toggleIngredient = (index: number) => {
    const newChecked = new Set(checkedIngredients)
    if (newChecked.has(index)) {
      newChecked.delete(index)
    } else {
      newChecked.add(index)
    }
    setCheckedIngredients(newChecked)
  }

  const adjustServings = (increment: boolean) => {
    setServings(prev => increment ? prev + 1 : Math.max(1, prev - 1))
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Hero Image */}
      <div className="relative h-64 bg-gradient-to-br from-green-200 to-green-300 flex items-center justify-center">
        <Salad className="h-32 w-32 text-secondary/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

        {/* Navigation Buttons */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30"
            onClick={() => router.back()}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30"
            >
              <Share2 className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={`h-10 w-10 rounded-full backdrop-blur-sm ${
                isFavorite ? "bg-primary text-white" : "bg-white/20 text-white hover:bg-white/30"
              }`}
              onClick={() => setIsFavorite(!isFavorite)}
            >
              <Heart className={`h-5 w-5 ${isFavorite ? "fill-current" : ""}`} />
            </Button>
          </div>
        </div>

        {/* Tags */}
        <div className="absolute bottom-4 left-4 flex gap-2">
          <span className="px-3 py-1 rounded-full bg-primary text-white text-xs font-semibold">
            {recipe.tags[0]}
          </span>
          {recipe.tags[1] && (
            <span className="px-3 py-1 rounded-full bg-white/80 text-foreground text-xs font-medium">
              {recipe.tags[1]}
            </span>
          )}
        </div>
      </div>

      {/* Content Card */}
      <div className="flex-1 -mt-6 bg-white rounded-t-3xl relative pb-24">
        <div className="px-4 py-6">
          {/* Title & Rating */}
          <h1 className="text-2xl font-bold text-foreground mb-2">{recipe.name}</h1>
          <div className="flex items-center gap-1 mb-4">
            <Star className="h-4 w-4 fill-warning text-warning" />
            <span className="font-medium text-foreground">{recipe.rating}</span>
            <span className="text-muted-foreground text-sm">({recipe.reviewCount} reseñas)</span>
          </div>

          {/* Stats Row */}
          <div className="flex justify-between mb-6">
            <div className="flex flex-col items-center">
              <div className="h-12 w-12 rounded-full bg-surface flex items-center justify-center mb-1">
                <Clock className="h-5 w-5 text-muted-foreground" />
              </div>
              <span className="text-sm font-medium text-foreground">{recipe.cookingTime} min</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="h-12 w-12 rounded-full bg-surface flex items-center justify-center mb-1">
                <Users className="h-5 w-5 text-muted-foreground" />
              </div>
              <span className="text-sm font-medium text-foreground">{recipe.servings} porciones</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="h-12 w-12 rounded-full bg-surface flex items-center justify-center mb-1">
                <BarChart3 className="h-5 w-5 text-muted-foreground" />
              </div>
              <span className="text-sm font-medium text-foreground">{recipe.difficulty}</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="h-12 w-12 rounded-full bg-surface flex items-center justify-center mb-1">
                <Flame className="h-5 w-5 text-muted-foreground" />
              </div>
              <span className="text-sm font-medium text-foreground">{recipe.calories} kcal</span>
            </div>
          </div>

          {/* Eco-Tip Card */}
          <Card className="p-4 rounded-2xl bg-secondary/10 border-0 mb-6">
            <div className="flex gap-3">
              <div className="h-8 w-8 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0">
                <Leaf className="h-4 w-4 text-secondary" />
              </div>
              <div>
                <p className="font-semibold text-secondary text-sm mb-1">Eco-Tip</p>
                <p className="text-sm text-accent leading-relaxed">{recipe.ecoTip}</p>
              </div>
            </div>
          </Card>

          {/* Ingredients Section */}
          <section className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-foreground">Ingredientes</h2>
              <button className="text-primary text-sm font-medium">Ver todos</button>
            </div>

            {/* Servings Selector */}
            <div className="flex items-center gap-4 mb-4">
              <span className="text-sm text-muted-foreground">Porciones:</span>
              <div className="flex items-center gap-2 bg-surface rounded-full px-2 py-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full"
                  onClick={() => adjustServings(false)}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center font-semibold">{servings}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full"
                  onClick={() => adjustServings(true)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Ingredients List */}
            <div className="space-y-3">
              {recipe.ingredients.map((ingredient, index) => (
                <button
                  key={index}
                  onClick={() => toggleIngredient(index)}
                  className="w-full flex items-center justify-between py-2"
                >
                  <div className="flex items-center gap-3">
                    <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                      checkedIngredients.has(index)
                        ? "bg-primary border-primary"
                        : "border-muted-foreground/30"
                    }`}>
                      {checkedIngredients.has(index) && (
                        <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <span className={`font-medium ${checkedIngredients.has(index) ? "line-through text-muted-foreground" : "text-foreground"}`}>
                      {ingredient.name}
                    </span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {ingredient.quantity} {ingredient.unit}
                  </span>
                </button>
              ))}
            </div>
          </section>

          {/* Add to Shopping List Button */}
          <Button className="w-full h-14 rounded-2xl bg-primary hover:bg-primary/90 text-white font-semibold mb-8">
            <ShoppingCart className="h-5 w-5 mr-2" />
            Agregar a lista de compras
          </Button>

          {/* Preparation Section */}
          <section>
            <h2 className="text-lg font-bold text-foreground mb-4">Preparación</h2>
            <div className="space-y-6">
              {recipe.steps.map((step) => (
                <div key={step.number} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold text-white">{step.number}</span>
                    </div>
                    {step.number < recipe.steps.length && (
                      <div className="w-0.5 flex-1 bg-primary/20 mt-2" />
                    )}
                  </div>
                  <div className="flex-1 pb-4">
                    <h3 className="font-semibold text-foreground mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                    {step.timer && (
                      <button className="flex items-center gap-2 mt-3 px-4 py-2 rounded-full border border-primary text-primary text-sm font-medium">
                        <Timer className="h-4 w-4" />
                        Iniciar {step.timer}:00 min
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  )
}
