import { generateText } from "ai"
import { openai, createOpenAI } from "@ai-sdk/openai"

/**
 * Obtiene la API key a usar (custom o del proyecto)
 * @param customApiKey - API key personalizada del usuario (opcional)
 * @returns API key a usar
 */
function getApiKey(customApiKey?: string): string {
  return customApiKey || process.env.OPENAI_API_KEY || ''
}

/**
 * Crea una instancia de OpenAI con la API key apropiada
 */
function getOpenAIInstance(customApiKey?: string) {
  const apiKey = getApiKey(customApiKey)

  if (customApiKey) {
    return createOpenAI({ apiKey: customApiKey })
  }

  return openai
}

// Tipos para el resultado del procesamiento de facturas
export interface ReceiptLineItem {
  name: string
  qty: number | null
  unitPrice: number | null
  total: number | null
}

export interface ReceiptData {
  merchant: string | null
  date: string | null
  currency: string | null
  lineItems: ReceiptLineItem[]
  subtotal: number | null
  tax: number | null
  total: number | null
  confidence: number
}

// Función para procesar imágenes de facturas usando Vercel AI SDK
export async function processReceiptImage(imageBase64: string, customApiKey?: string): Promise<ReceiptData> {
  // Eliminar el prefijo de data URL si existe
  const base64Image = imageBase64.includes(',')
    ? imageBase64.split(",")[1]
    : imageBase64

  const openaiInstance = getOpenAIInstance(customApiKey)

  const systemPrompt = `Eres un asistente especializado en extraer información de facturas de supermercado.
Tu tarea es analizar imágenes de facturas y extraer información estructurada.

REGLAS ESTRICTAS:
- Responde ÚNICAMENTE con JSON válido, sin backticks, sin texto adicional.
- Si no puedes extraer un campo, usa null. NO inventes datos.
- Los precios deben ser números (sin símbolos de moneda).
- Las cantidades deben ser números.
- La fecha debe estar en formato ISO 8601 (YYYY-MM-DD) si es posible extraerla.
- El campo "confidence" debe ser un número entre 0 y 1 indicando qué tan seguro estás de la extracción.`

  const userPrompt = `Analiza esta imagen de factura y extrae la información en este formato JSON exacto:
{
  "merchant": "Nombre del comercio o null",
  "date": "YYYY-MM-DD o null",
  "currency": "Código de moneda (USD, MXN, EUR, etc.) o null",
  "lineItems": [
    {
      "name": "Nombre del producto",
      "qty": 1,
      "unitPrice": 10.50,
      "total": 10.50
    }
  ],
  "subtotal": 100.00,
  "tax": 16.00,
  "total": 116.00,
  "confidence": 0.95
}

Extrae TODOS los productos visibles. Si un campo no es visible o legible, usa null.`

  try {
    const { text } = await generateText({
      model: openaiInstance("gpt-4o"),
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: systemPrompt + "\n\n" + userPrompt },
            { type: "image", image: base64Image }
          ]
        }
      ],
      maxTokens: 2000,
      temperature: 0.3
    })

    // Limpiar respuesta de posibles backticks
    const cleanText = text.replace(/```json\n?|\n?```/g, '').trim()

    // Validar que sea JSON válido
    if (!cleanText.startsWith('{') || !cleanText.endsWith('}')) {
      throw new Error('La respuesta no es un JSON válido')
    }

    const parsedData = JSON.parse(cleanText) as ReceiptData

    // Validar estructura mínima
    if (!Array.isArray(parsedData.lineItems)) {
      throw new Error('La respuesta no contiene lineItems válidos')
    }

    // Asegurar que confidence esté en rango válido
    if (typeof parsedData.confidence !== 'number' || parsedData.confidence < 0 || parsedData.confidence > 1) {
      parsedData.confidence = 0.5
    }

    return parsedData

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido'
    console.error("Error en processReceiptImage:", errorMessage)
    throw new Error(`Error procesando factura: ${errorMessage}`)
  }
}

// Función legacy para compatibilidad - convierte el nuevo formato al antiguo
export async function processReceiptImageLegacy(imageBase64: string, customApiKey?: string) {
  try {
    const receiptData = await processReceiptImage(imageBase64, customApiKey)

    // Convertir al formato antiguo para compatibilidad
    return {
      products: receiptData.lineItems.map(item => ({
        name: item.name,
        quantity_units: item.qty,
        quantity_kg: null,
        unit_price: item.unitPrice,
        total_price: item.total
      }))
    }
  } catch (error) {
    console.error("Error in processReceiptImageLegacy:", error)
    return { products: [] }
  }
}

// Función para procesar datos de onboarding familiar
export async function processFamilyData(familyMembers: any[], restrictions: any[], prohibitedDishes: string[], customApiKey?: string) {
  const openaiInstance = getOpenAIInstance(customApiKey)
  const { text } = await generateText({
    model: openaiInstance("gpt-4o"),
    prompt: `
      Analiza estos datos de una familia y proporciona recomendaciones:
      
      Miembros de la familia: ${JSON.stringify(familyMembers)}
      Restricciones alimenticias: ${JSON.stringify(restrictions)}
      Platos prohibidos: ${JSON.stringify(prohibitedDishes)}
      
      Proporciona recomendaciones generales para esta familia en formato JSON:
      {
        "recommendations": [
          "Recomendación 1",
          "Recomendación 2",
          "Recomendación 3"
        ]
      }
    `,
    system:
      "Eres un nutricionista especializado en planificación de comidas familiares. Tu tarea es analizar los datos de una familia y proporcionar recomendaciones personalizadas.",
  })

  try {
    return JSON.parse(text)
  } catch (error) {
    console.error("Error parsing OpenAI response:", error)
    return { recommendations: [] }
  }
}

// Función para procesar datos de sobrantes
export async function processLeftovers(leftovers: any[], customApiKey?: string) {
  const openaiInstance = getOpenAIInstance(customApiKey)
  const { text } = await generateText({
    model: openaiInstance("gpt-4o"),
    prompt: `
      Analiza estos datos de sobrantes de comida y proporciona recomendaciones:
      
      Sobrantes: ${JSON.stringify(leftovers)}
      
      Proporciona recomendaciones para aprovechar estos sobrantes en formato JSON:
      {
        "recommendations": [
          "Recomendación 1",
          "Recomendación 2",
          "Recomendación 3"
        ]
      }
    `,
    system:
      "Eres un chef especializado en reducir el desperdicio de alimentos. Tu tarea es analizar los sobrantes de comida y proporcionar recomendaciones creativas para aprovecharlos.",
  })

  try {
    return JSON.parse(text)
  } catch (error) {
    console.error("Error parsing OpenAI response:", error)
    return { recommendations: [] }
  }
}

// Función para generar menú semanal
export async function generateWeeklyMenu(
  familyMembers: any[],
  restrictions: any[],
  prohibitedDishes: string[],
  products: any[],
  customApiKey?: string
) {
  const openaiInstance = getOpenAIInstance(customApiKey)
  const { text } = await generateText({
    model: openaiInstance("gpt-4o"),
    prompt: `
      Genera un menú semanal para esta familia basado en:
      
      Miembros de la familia: ${JSON.stringify(familyMembers)}
      Restricciones alimenticias: ${JSON.stringify(restrictions)}
      Platos prohibidos: ${JSON.stringify(prohibitedDishes)}
      Productos disponibles: ${JSON.stringify(products)}
      
      Proporciona un menú para los 7 días de la semana en formato JSON:
      {
        "weeklyMenu": [
          {
            "day": "Lun",
            "recipe": {
              "name": "Nombre de la receta",
              "description": "Breve descripción del plato",
              "ingredients": [
                {
                  "name": "Nombre del ingrediente",
                  "quantity": "Cantidad",
                  "unit": "Unidad de medida"
                }
              ],
              "instructions": [
                "Paso 1 de la preparación",
                "Paso 2 de la preparación"
              ],
              "cookingTime": "Tiempo de preparación en minutos",
              "servings": "Número de porciones",
              "difficulty": "Fácil/Media/Difícil",
              "nutritionalInfo": {
                "calories": "Calorías por porción",
                "protein": "Proteínas en gramos",
                "carbs": "Carbohidratos en gramos",
                "fat": "Grasas en gramos"
              }
            },
            "protein": "Proteína principal",
            "side": "Acompañamiento"
          }
        ]
      }

     IMPORTANTE:
      - Responde SOLO con el JSON, sin texto adicional ni backticks.
      - **Cada 'recipe.name' y 'recipe.description' debe tener como máximo 100 caracteres**; si son más largos, recórtalos automáticamente.
      - Asegúrate de que las recetas sean realistas y utilicen ingredientes disponibles.
      - Considera las restricciones alimenticias y platos prohibidos.
    `,
    system:
      "Eres un chef especializado en planificación de comidas familiares. Tu tarea es generar menús semanales personalizados con recetas detalladas basadas en las preferencias y restricciones de la familia, así como los productos disponibles. IMPORTANTE: Responde SOLO con el JSON, sin texto adicional ni backticks.",
  })

  try {
    // Limpiar la respuesta de posibles backticks y texto adicional
    const cleanText = text.replace(/```json\n?|\n?```/g, '').trim()
    console.log("Cleaned response:", cleanText)
    
    // Verificar si el texto comienza con un JSON válido
    if (!cleanText.startsWith('{')) {
      console.error("Invalid response format:", cleanText)
      return { weeklyMenu: [] }
    }

    const parsedData = JSON.parse(cleanText)
    
    // Verificar la estructura del JSON
    if (!parsedData.weeklyMenu || !Array.isArray(parsedData.weeklyMenu)) {
      console.error("Invalid JSON structure:", parsedData)
      return { weeklyMenu: [] }
    }

    return parsedData
  } catch (error) {
    console.error("Error parsing OpenAI response:", error)
    console.error("Raw response:", text)
    return { weeklyMenu: [] }
  }
}

// Función para generar métricas y recomendaciones
export async function generateMetrics(familyMembers: any[], products: any[], leftovers: any[], customApiKey?: string) {
  const openaiInstance = getOpenAIInstance(customApiKey)
  const { text } = await generateText({
    model: openaiInstance("gpt-4o"),
    prompt: `
      Genera métricas y recomendaciones basadas en:
      
      Miembros de la familia: ${JSON.stringify(familyMembers)}
      Productos comprados: ${JSON.stringify(products)}
      Sobrantes registrados: ${JSON.stringify(leftovers)}
      
      Proporciona métricas y recomendaciones en formato JSON:
      {
        "metrics": {
          "wastePercentage": porcentaje de desperdicio estimado,
          "estimatedSavings": ahorro estimado en pesos,
          "weeklyWaste": [porcentaje1, porcentaje2, porcentaje3, porcentaje4, porcentaje5]
        },
        "recommendations": [
          "Recomendación 1",
          "Recomendación 2",
          "Recomendación 3",
          "Recomendación 4"
        ]
      }
    `,
    system:
      "Eres un analista especializado en reducción de desperdicio alimentario y ahorro en el hogar. Tu tarea es generar métricas y recomendaciones basadas en los datos de compras y sobrantes de una familia.",
  })

  try {
    return JSON.parse(text)
  } catch (error) {
    console.error("Error parsing OpenAI response:", error)
    return {
      metrics: {
        wastePercentage: 0,
        estimatedSavings: 0,
        weeklyWaste: [0, 0, 0, 0, 0],
      },
      recommendations: [],
    }
  }
}
