# PRD - Zerowaste App

## Product Requirements Document

**Versión:** 1.0
**Fecha:** Enero 2026
**Producto:** Zerowaste - Planificador de Comidas Familiar
**Project ID:** sabor-lite (cqqqeteeowfuqndjzzvy)

---

## 1. Visión del Producto

Zerowaste es una aplicación móvil-first que ayuda a las familias a planificar sus comidas semanales de manera inteligente, reducir el desperdicio de alimentos y ahorrar dinero. Utilizando inteligencia artificial, la app genera menús personalizados basados en las preferencias familiares, restricciones dietéticas y productos disponibles.

### 1.1 Propuesta de Valor

- **Para familias** que quieren comer mejor y gastar menos
- **Zerowaste** es un asistente de cocina inteligente
- **Que** genera menús personalizados y listas de compras optimizadas
- **A diferencia de** otras apps de recetas genéricas
- **Nuestro producto** aprende de tus preferencias y reduce el desperdicio alimentario

---

## 2. Objetivos del Producto

### 2.1 Objetivos de Negocio
| Objetivo | Métrica | Target |
|----------|---------|--------|
| Adopción de usuarios | MAU (Monthly Active Users) | 10,000 en 6 meses |
| Retención | Retención D30 | >40% |
| Engagement | Menús generados/semana | >2 por usuario |
| Valor percibido | NPS | >50 |

### 2.2 Objetivos de Usuario
- Reducir tiempo de planificación de comidas en 70%
- Disminuir desperdicio de alimentos en 30%
- Ahorrar 15-20% en gastos de supermercado
- Diversificar alimentación familiar

---

## 3. Usuarios Objetivo

### 3.1 Persona Principal: "María la Planificadora"
- **Demografía:** Mujer, 30-45 años, madre de familia
- **Contexto:** Trabaja, tiene 2-3 hijos, poco tiempo para cocinar
- **Pain Points:**
  - "No sé qué cocinar cada día"
  - "Compro de más y se me echa a perder"
  - "Quiero que mi familia coma variado y saludable"
- **Goals:**
  - Planificar comidas sin estrés
  - Aprovechar mejor lo que compra
  - Descubrir recetas nuevas y fáciles

### 3.2 Persona Secundaria: "Carlos el Consciente"
- **Demografía:** Hombre, 25-35 años, vive solo o en pareja
- **Contexto:** Interesado en alimentación saludable, controla gastos
- **Pain Points:**
  - "Termino comiendo lo mismo siempre"
  - "Las recetas online son para muchas porciones"
- **Goals:**
  - Comer variado sin desperdiciar
  - Controlar presupuesto de comida

---

## 4. Funcionalidades Principales

### 4.1 Mapa de Features

```
┌─────────────────────────────────────────────────────────────┐
│                     SABOOOR APP                              │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │  ONBOARDING  │  │    MENÚ      │  │   COMPRAS    │       │
│  │              │  │   SEMANAL    │  │              │       │
│  │ • Familia    │  │ • Generar IA │  │ • Lista auto │       │
│  │ • Dietas     │  │ • Ver días   │  │ • Categorías │       │
│  │ • Evitar     │  │ • Detalle    │  │ • Check items│       │
│  └──────────────┘  └──────────────┘  └──────────────┘       │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │   FACTURAS   │  │  SOBRANTES   │  │   MÉTRICAS   │       │
│  │              │  │              │  │              │       │
│  │ • Subir foto │  │ • Registrar  │  │ • Desperdicio│       │
│  │ • OCR + IA   │  │ • Sugerencias│  │ • Ahorro     │       │
│  │ • Validar    │  │              │  │ • Tendencias │       │
│  └──────────────┘  └──────────────┘  └──────────────┘       │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 4.2 Feature Priority (MoSCoW)

| Feature | Priority | Status |
|---------|----------|--------|
| Configuración familiar (Mis Gustos) | Must | ✅ Implementado |
| Generación de menú semanal con IA | Must | ✅ Implementado |
| Vista de menú semanal | Must | ✅ Implementado |
| Detalle de receta | Must | ✅ Implementado |
| Lista de compras automática | Must | 🔄 En progreso |
| Procesamiento de facturas (OCR) | Should | ✅ Implementado |
| Registro de sobrantes | Should | ✅ Implementado |
| Métricas y ahorro | Should | 🔄 En progreso |
| Favoritos de recetas | Could | 📋 Planificado |
| Compartir menú | Could | 📋 Planificado |
| Modo offline | Won't (v1) | - |

---

## 5. Requisitos Funcionales

### 5.1 RF-001: Onboarding Familiar (Mis Gustos)

**Descripción:** Configurar perfil familiar para personalizar recomendaciones.

**Criterios de Aceptación:**
- [ ] Usuario puede agregar/quitar miembros: Mamá, Papá, Adolescente, Niño
- [ ] Usuario puede seleccionar restricciones: Sin gluten, Vegetariano, Vegano, Sin lácteos, Sin nueces
- [ ] Usuario puede agregar ingredientes a evitar mediante búsqueda
- [ ] Datos se persisten en Supabase
- [ ] Al guardar, IA genera recomendaciones iniciales

**UI Reference:** `docs/_mis_gustos.png`

### 5.2 RF-002: Generación de Menú Semanal

**Descripción:** Generar menú de 7 días usando IA basado en preferencias.

**Criterios de Aceptación:**
- [ ] Usuario ingresa prompt opcional para personalizar
- [ ] IA genera menú considerando: familia, restricciones, productos disponibles
- [ ] Cada día incluye: nombre receta, tiempo, porciones, dificultad, proteína, acompañamiento
- [ ] Menú se guarda en base de datos
- [ ] Usuario puede regenerar menú

**Prompt IA:**
```
Genera un menú semanal para una familia de {n} personas.
Restricciones: {restricciones}
Evitar: {ingredientes_prohibidos}
Productos disponibles: {productos}
```

### 5.3 RF-003: Vista de Menú Semanal

**Descripción:** Visualizar menú generado organizado por días.

**Criterios de Aceptación:**
- [ ] Header muestra "Tu Menú Semanal" con botón refresh
- [ ] Muestra rango de fechas de la semana actual
- [ ] Lista vertical de días (Lunes a Domingo)
- [ ] Cada card muestra: imagen, nombre, tiempo, porciones, dificultad
- [ ] Botón "Ver más" expande ingredientes
- [ ] Botón flotante "Generar lista" navega a lista de compras
- [ ] Bottom navigation presente

**UI Reference:** `docs/menú_semanal_(generated).png`

### 5.4 RF-004: Detalle de Receta

**Descripción:** Ver información completa de una receta.

**Criterios de Aceptación:**
- [ ] Header con imagen grande de la receta
- [ ] Botones: atrás, compartir, favorito
- [ ] Badge de categoría (ej: "CENA FAMILIAR")
- [ ] Info: tiempo, porciones, dificultad, calorías
- [ ] Descripción de la receta
- [ ] Botón "Agregar a lista" con contador de ingredientes
- [ ] Lista de ingredientes con checkboxes
- [ ] Pasos de preparación numerados
- [ ] Temporizadores en pasos que lo requieran

**UI Reference:** `docs/detalle_de_receta.png`

### 5.5 RF-005: Lista de Compras

**Descripción:** Lista de compras generada automáticamente del menú.

**Criterios de Aceptación:**
- [ ] Generación automática desde ingredientes del menú
- [ ] Agrupación por categorías (Frutas, Verduras, Carnes, etc.)
- [ ] Checkbox para marcar items comprados
- [ ] Persistencia del estado de checks
- [ ] Opción de agregar items manualmente

### 5.6 RF-006: Procesamiento de Facturas

**Descripción:** Extraer productos de fotos de facturas usando OCR + IA.

**Criterios de Aceptación:**
- [ ] Usuario puede tomar foto o seleccionar de galería
- [ ] IA (GPT-4o Vision) extrae: producto, cantidad, precio
- [ ] Usuario puede validar/editar datos extraídos
- [ ] Productos se guardan en base de datos
- [ ] Productos influyen en generación de menú

### 5.7 RF-007: Registro de Sobrantes

**Descripción:** Registrar comida sobrante para recibir sugerencias.

**Criterios de Aceptación:**
- [ ] Formulario: comida, producto, cantidad
- [ ] IA genera sugerencias de reutilización
- [ ] Historial de sobrantes registrados
- [ ] Datos alimentan métricas de desperdicio

### 5.8 RF-008: Métricas y Reportes

**Descripción:** Dashboard con estadísticas de uso y ahorro.

**Criterios de Aceptación:**
- [ ] Porcentaje de desperdicio semanal
- [ ] Ahorro estimado en dinero
- [ ] Gráficos de tendencia
- [ ] Recomendaciones personalizadas de IA

---

## 6. Requisitos No Funcionales

### 6.1 Rendimiento
| Métrica | Target |
|---------|--------|
| Time to First Byte (TTFB) | <200ms |
| Largest Contentful Paint (LCP) | <2.5s |
| First Input Delay (FID) | <100ms |
| Generación de menú IA | <10s |

### 6.2 Disponibilidad
- Uptime: 99.5%
- RPO (Recovery Point Objective): 24 horas
- RTO (Recovery Time Objective): 4 horas

### 6.3 Seguridad
- Autenticación: Supabase Auth (futuro)
- Autorización: Row Level Security (RLS)
- Datos sensibles: Variables de entorno, nunca en código
- HTTPS obligatorio

### 6.4 Escalabilidad
- Usuarios concurrentes: 1,000+
- Requests/minuto: 10,000
- Almacenamiento: Supabase managed

### 6.5 Compatibilidad
- Browsers: Chrome 90+, Safari 14+, Firefox 88+
- Dispositivos: Mobile-first (iOS Safari, Android Chrome)
- Resoluciones: 320px - 768px (optimizado), 768px+ (adaptado)

---

## 7. Arquitectura Técnica

### 7.1 Stack Tecnológico

```
┌─────────────────────────────────────────────────────────────┐
│                      FRONTEND                                │
│  Next.js 16 + React 19 + TypeScript + Tailwind + Shadcn/ui  │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    SERVER ACTIONS                            │
│              app/actions.ts (Next.js 13+)                   │
└─────────────────────────────────────────────────────────────┘
                              │
              ┌───────────────┼───────────────┐
              ▼                               ▼
┌─────────────────────────┐   ┌─────────────────────────────┐
│      AI SERVICES        │   │      DATABASE SERVICES       │
│   lib/openai.ts         │   │   services/supabase-service  │
│   - GPT-4o              │   │   - PostgreSQL               │
│   - Vision API          │   │   - RLS Policies             │
└─────────────────────────┘   └─────────────────────────────┘
              │                               │
              ▼                               ▼
┌─────────────────────────┐   ┌─────────────────────────────┐
│       OPENAI API        │   │         SUPABASE            │
│   api.openai.com        │   │   cqqqeteeowfuqndjzzvy      │
└─────────────────────────┘   └─────────────────────────────┘
```

### 7.2 Modelo de Datos

```sql
-- Entidades principales
family_members (id, type, count)
dietary_restrictions (id, name, is_active)
prohibited_dishes (id, name)
products (id, name, quantity_*, price, category)
weekly_menu (id, day, recipe[JSON], protein, side)
recipes (id, name, category, ingredients[JSON], steps[JSON], ...)
shopping_list (id, ingredient_name, quantity, is_purchased)
leftovers (id, meal, product, quantity)
metrics (id, waste_percentage, estimated_savings, week_number)
recommendations (id, text, type)
```

### 7.3 Flujo de Datos

```
[Usuario]
    │
    ▼ Interacción UI
[Componente React]
    │
    ▼ Trigger Action
[Server Action] ────────────────┐
    │                           │
    ▼ Procesa                   ▼ Llama IA
[Supabase Service]        [OpenAI Service]
    │                           │
    ▼ Persiste                  ▼ Genera
[PostgreSQL]              [Respuesta IA]
    │                           │
    └───────────┬───────────────┘
                │
                ▼
         [Actualiza UI]
```

---

## 8. Flujos de Usuario

### 8.1 Flujo: Primera Vez (Onboarding)

```
┌─────────┐    ┌─────────────┐    ┌─────────────┐    ┌──────────┐
│ Welcome │───▶│ Mis Gustos  │───▶│   Generar   │───▶│   Menú   │
│  Screen │    │  (config)   │    │    Menú     │    │ Semanal  │
└─────────┘    └─────────────┘    └─────────────┘    └──────────┘
                     │
                     ▼
              ┌─────────────┐
              │  Supabase   │
              │  (guardar)  │
              └─────────────┘
```

### 8.2 Flujo: Generar Menú Semanal

```
┌──────────┐    ┌─────────────┐    ┌─────────────┐    ┌──────────┐
│  Input   │───▶│   Llamar    │───▶│   Guardar   │───▶│ Mostrar  │
│  Prompt  │    │   OpenAI    │    │  Supabase   │    │   Menú   │
└──────────┘    └─────────────┘    └─────────────┘    └──────────┘
                     │
                     ▼
              ┌─────────────┐
              │ Considera:  │
              │ - Familia   │
              │ - Dietas    │
              │ - Productos │
              └─────────────┘
```

### 8.3 Flujo: Procesar Factura

```
┌──────────┐    ┌─────────────┐    ┌─────────────┐    ┌──────────┐
│  Subir   │───▶│  GPT-4o     │───▶│  Validar    │───▶│ Guardar  │
│  Imagen  │    │  Vision     │    │   Datos     │    │ Productos│
└──────────┘    └─────────────┘    └─────────────┘    └──────────┘
                     │
                     ▼
              ┌─────────────┐
              │  Extrae:    │
              │ - Producto  │
              │ - Cantidad  │
              │ - Precio    │
              └─────────────┘
```

---

## 9. Diseño UI/UX

### 9.1 Design System

**Colores:**
```css
--primary: hsl(17, 90%, 55%)      /* Naranja */
--background: hsl(0, 0%, 98%)     /* Gris claro */
--foreground: hsl(222, 84%, 5%)   /* Casi negro */
--muted: hsl(210, 40%, 96%)       /* Gris suave */
--border: hsl(214, 32%, 91%)      /* Bordes */
```

**Tipografía:**
- Font: Inter (Google Fonts)
- Headings: Bold, 2xl-lg
- Body: Regular, base-sm

**Componentes:**
- Shadcn/ui como base
- Border radius: 0.75rem (rounded-2xl)
- Cards con sombra suave
- Botones redondeados

**Iconografía:**
- Lucide React icons
- Tamaño estándar: 20-24px

### 9.2 Pantallas Principales

| Pantalla | Ruta | Componente |
|----------|------|------------|
| Welcome/Home | `/` | `welcome-screen.tsx` |
| Mis Gustos | `/configuracion` | `onboarding-familiar.tsx` |
| Menú Semanal | `/menu-semanal` | `menu-semanal.tsx` |
| Detalle Receta | `/receta` | `detalle-receta.tsx` |
| Lista Compras | `/lista-compra` | `lista-compra.tsx` |
| Subir Factura | `/subir-factura` | `subir-factura.tsx` |
| Sobrantes | `/sobrantes` | `registro-sobrantes.tsx` |
| Métricas | `/metricas` | `metricas.tsx` |

### 9.3 Navegación

**Bottom Navigation (4 items):**
1. Inicio (`/`)
2. Menú (`/menu-semanal`)
3. Lista (`/lista-compra`)
4. Perfil (`/configuracion`)

---

## 10. Métricas de Éxito

### 10.1 KPIs de Producto

| Métrica | Definición | Target |
|---------|------------|--------|
| Activation Rate | % usuarios que generan primer menú | >60% |
| Weekly Engagement | Usuarios que generan menú/semana | >50% |
| Feature Adoption | % uso de cada feature | >30% |
| Task Completion | % tareas completadas sin error | >95% |

### 10.2 KPIs de Negocio

| Métrica | Definición | Target |
|---------|------------|--------|
| CAC | Costo adquisición cliente | <$5 |
| LTV | Valor de vida del cliente | >$50 |
| Churn Rate | Tasa de abandono mensual | <10% |
| Referral Rate | % usuarios que refieren | >20% |

---

## 11. Roadmap

### Fase 1: MVP (Actual)
- [x] Onboarding familiar
- [x] Generación de menú con IA
- [x] Vista de menú semanal
- [x] Detalle de receta
- [x] Procesamiento de facturas
- [x] Registro de sobrantes
- [ ] Lista de compras funcional
- [ ] Métricas básicas

### Fase 2: Mejoras (Q2 2026)
- [ ] Sistema de favoritos
- [ ] Historial de menús
- [ ] Compartir menú/recetas
- [ ] Notificaciones push
- [ ] Autenticación de usuarios

### Fase 3: Expansión (Q3 2026)
- [ ] Múltiples perfiles familiares
- [ ] Integración con supermercados
- [ ] Recetas de la comunidad
- [ ] Modo offline (PWA)
- [ ] Versión iOS/Android nativa

---

## 12. Riesgos y Mitigaciones

| Riesgo | Impacto | Probabilidad | Mitigación |
|--------|---------|--------------|------------|
| Costos de OpenAI elevados | Alto | Media | Caching, rate limiting, modelos más económicos |
| Baja adopción | Alto | Media | Onboarding simplificado, valor inmediato |
| Recetas no aptas | Medio | Baja | Validación humana, feedback loop |
| Problemas de OCR | Medio | Media | Validación manual, múltiples intentos |
| Downtime Supabase | Alto | Baja | Backups, plan de contingencia |

---

## 13. Glosario

| Término | Definición |
|---------|------------|
| Menú Semanal | Plan de comidas para 7 días generado por IA |
| Mis Gustos | Configuración de preferencias familiares |
| Sobrantes | Comida no consumida que puede reutilizarse |
| OCR | Reconocimiento óptico de caracteres (facturas) |
| RLS | Row Level Security (seguridad de Supabase) |
| Server Actions | Funciones del servidor en Next.js 13+ |

---

## Apéndice A: Referencias de Diseño

Los prototipos de UI se encuentran en `docs/`:
- `_welcome_(empty_state).png` - Pantalla de inicio
- `_mis_gustos.png` - Configuración familiar
- `menú_semanal_(generated).png` - Vista de menú
- `detalle_de_receta.png` - Detalle de receta

---

*Documento generado para el proyecto Zerowaste - Enero 2026*
