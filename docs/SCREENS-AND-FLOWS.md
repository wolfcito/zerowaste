# Zerowaste - Pantallas y Flujos de Usuario

Documentación completa para diseñadores de Figma.

---

## Índice

1. [Navegación Principal](#navegación-principal)
2. [Pantallas](#pantallas)
3. [Flujos de Usuario](#flujos-de-usuario)
4. [Componentes Reutilizables](#componentes-reutilizables)
5. [Sistema de Colores](#sistema-de-colores)

---

## Navegación Principal

### Bottom Navigation (Fijo en todas las pantallas)

| Tab | Icono | Ruta | Etiqueta |
|-----|-------|------|----------|
| 1 | Home | `/` | Inicio |
| 2 | Utensils | `/menu-semanal` | Menú |
| 3 | ClipboardList | `/lista-compra` | Lista |
| 4 | User | `/configuracion` | Perfil |

**Estilos:**
- Fondo blanco con borde superior
- Tab activo: color primario (naranja)
- Tab inactivo: gris muted

---

## Pantallas

### 1. HOME (Pantalla Principal)

**Ruta:** `/`
**Componente:** `welcome-screen.tsx`

```
┌─────────────────────────────────────┐
│ [Logo] Zerowaste              [Menu ▼]│
├─────────────────────────────────────┤
│                                     │
│  tu chefcito...                     │
│                                     │
│ ┌─────────────────────────────┬───┐ │
│ │ Genera el menú para esta... │ 📖│ │
│ └─────────────────────────────┴───┘ │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │  🍽️  FAVORITO DE LA SEMANA     │ │
│ │  Pollo al horno con verduras   │ │
│ │  Descripción del plato...      │ │
│ └─────────────────────────────────┘ │
│                                     │
│ ┌───────────┐  ┌───────────┐       │
│ │ ❤️ Gustos │  │ 🍴 Menú   │       │
│ └───────────┘  └───────────┘       │
│ ┌───────────┐  ┌───────────┐       │
│ │ 📄 Factura│  │ 📊 Reporte│       │
│ └───────────┘  └───────────┘       │
│                                     │
│ ┌─────────────┐ ┌─────────────┐    │
│ │    Lista    │ │  Sobrantes  │    │
│ └─────────────┘ └─────────────┘    │
│                                     │
├─────────────────────────────────────┤
│  🏠    🍴    📋    👤              │
└─────────────────────────────────────┘
```

**Elementos:**
- Header con logo y menú dropdown
- Barra de búsqueda con botón de generar menú
- Card de favorito de la semana (gradient teal)
- Grid 2x2 de accesos rápidos
- Botones de acción (Lista, Sobrantes)
- Bottom Navigation

**Acciones:**
| Elemento | Acción | Destino |
|----------|--------|---------|
| Barra búsqueda | Genera menú con IA | `/menu-semanal` |
| Card Favorito | Ver receta | `/receta` |
| Card Gustos | Configurar | `/configuracion` |
| Card Menú | Ver menú | `/menu-semanal` |
| Card Factura | Subir | `/subir-factura` |
| Card Reporte | Métricas | `/metricas` |
| Botón Lista | Lista compra | `/lista-compra` |
| Botón Sobrantes | Registrar | `/sobrantes` |

---

### 2. MENÚ SEMANAL

**Ruta:** `/menu-semanal`
**Componente:** `menu-semanal.tsx`

```
┌─────────────────────────────────────┐
│  Tu Menú Semanal              [🔄] │
│  📅 Semana del 6 - 12 Ene          │
├─────────────────────────────────────┤
│                                     │
│  LUNES ●                            │
│ ┌─────────────────────────────────┐ │
│ │ 🍲  Pollo al horno         [⬜] │ │
│ │     ⏱ 45min  👥4  🟢Fácil      │ │
│ │     Proteína + Ensalada         │ │
│ │     ▼ Ver más                   │ │
│ │  ┌─────────────────────────┐    │ │
│ │  │ • Pollo - 1 kg          │    │ │
│ │  │ • Papas - 500g          │    │ │
│ │  │ • Zanahorias - 300g     │    │ │
│ │  └─────────────────────────┘    │ │
│ └─────────────────────────────────┘ │
│                                     │
│  MARTES                             │
│ ┌─────────────────────────────────┐ │
│ │ 🍝  Pasta boloñesa         [⬜] │ │
│ │     ⏱ 30min  👥4  🟡Media      │ │
│ └─────────────────────────────────┘ │
│                                     │
│         [🛒 Generar lista]          │
│                                     │
├─────────────────────────────────────┤
│  🏠    🍴    📋    👤              │
└─────────────────────────────────────┘
```

**Elementos:**
- Header con título y botón refresh
- Indicador de semana con rango de fechas
- Lista de días (Lunes-Domingo)
- Cards de receta expandibles
- Botón flotante "Generar lista"

**Card de Receta (Expandible):**
- Emoji del plato
- Nombre de la receta
- Stats: tiempo, porciones, dificultad
- Proteína + acompañamiento
- Toggle "Ver más/menos"
- Lista de ingredientes (expandido)
- Botón maximizar → detalle

**Dificultad (colores):**
- 🟢 Fácil (verde)
- 🟡 Media (amarillo)
- 🔴 Difícil (rojo)

---

### 3. DETALLE DE RECETA

**Ruta:** `/receta`
**Componente:** `detalle-receta.tsx`

```
┌─────────────────────────────────────┐
│ [←]                      [↗] [♡]   │
│                                     │
│           🍝                        │
│      (Hero gradient)                │
│                                     │
├─────────────────────────────────────┤
│  ┌─────────────────────────────────┐│
│  │ CENA FAMILIAR                   ││
│  │                                 ││
│  │ Pasta Boloñesa                  ││
│  │                                 ││
│  │ ⏱45min 👥4 📊Media 🔥450cal    ││
│  │                                 ││
│  │ Descripción de la receta...    ││
│  │                                 ││
│  │ [➕ Agregar a lista (5)]  [▶]  ││
│  │                                 ││
│  │ Para la pasta:                  ││
│  │ ○ Pasta         500g            ││
│  │ ● Carne molida  400g  ✓        ││
│  │ ○ Tomates       300g            ││
│  │ ○ Cebolla       1 unidad        ││
│  │                                 ││
│  │ Pasos de preparación:           ││
│  │ ① Preparar ingredientes         ││
│  │    Cortar la cebolla...         ││
│  │ ② Cocinar la carne    ⏱15min   ││
│  │    En una sartén...             ││
│  │ ③ Mezclar todo                  ││
│  │    Agregar la pasta...          ││
│  │ ✓ ¡Listo para servir!           ││
│  └─────────────────────────────────┘│
├─────────────────────────────────────┤
│  🏠    🍴    📋    👤              │
└─────────────────────────────────────┘
```

**Elementos:**
- Hero con gradient (amber → orange)
- Navegación: back, share, favorite
- Badge de categoría
- Info row: tiempo, porciones, dificultad, calorías
- Botón "Agregar a lista" con contador
- Lista de ingredientes con checkboxes
- Pasos numerados con timers opcionales

**Interacciones:**
- Click ingrediente → toggle checked
- Click ♡ → toggle favorito
- Click "Agregar a lista" → añade ingredientes no marcados

---

### 4. LISTA DE COMPRAS

**Ruta:** `/lista-compra`
**Componente:** `lista-compra.tsx`

```
┌─────────────────────────────────────┐
│ [←]  Mis compras                    │
├─────────────────────────────────────┤
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ Proteína                    [▼] │ │
│ ├─────────────────────────────────┤ │
│ │ ☐ Pollo                   1 kg  │ │
│ │ ☑ Carne molida           400g  │ │
│ │ ☐ Pescado                500g  │ │
│ └─────────────────────────────────┘ │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ Verduras                    [▲] │ │
│ └─────────────────────────────────┘ │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ Lácteos                     [▲] │ │
│ └─────────────────────────────────┘ │
│                                     │
│                                     │
│ ┌───────────┐ ┌───────────────────┐ │
│ │  Marcar   │ │ ⬇ Descargar lista│ │
│ └───────────┘ └───────────────────┘ │
│                                     │
├─────────────────────────────────────┤
│  🏠    🍴    📋    👤              │
└─────────────────────────────────────┘
```

**Elementos:**
- Header con back y título
- Secciones por categoría (acordeón)
- Items con checkbox y cantidad
- Botón "Marcar" (marcar todos)
- Botón "Descargar lista" (exportar PDF)

**Categorías:**
- Proteína
- Verduras
- Lácteos
- Otros

---

### 5. REGISTRO DE SOBRANTES

**Ruta:** `/sobrantes`
**Componente:** `registro-sobrantes.tsx`

```
┌─────────────────────────────────────┐
│ [←]  Reporte de sobras              │
├─────────────────────────────────────┤
│                                     │
│ ┌─────────────────────────────────┐ │
│ │  Comida:    [Almuerzo      ▼]  │ │
│ │  Producto:  [Arroz          ]  │ │
│ │  Cantidad:  [200g           ]  │ │
│ │                      [+ Agregar]│ │
│ └─────────────────────────────────┘ │
│                                     │
│  Sobrantes del día                  │
│ ┌─────────────────────────────────┐ │
│ │ Comida   │ Producto │ Cant │    │ │
│ ├──────────┼──────────┼──────┼────┤ │
│ │ Almuerzo │ Arroz    │ 200g │ ✨ │ │
│ │ Cena     │ Pollo    │ 150g │ ✨ │ │
│ └─────────────────────────────────┘ │
│                                     │
│  ┌─────────────────────────────────┐│
│  │      Guardar sobrantes         ││
│  └─────────────────────────────────┘│
│                                     │
├─────────────────────────────────────┤
│  🏠    🍴    📋    👤              │
└─────────────────────────────────────┘
```

**Elementos:**
- Formulario rápido (comida, producto, cantidad)
- Botón agregar
- Tabla de sobrantes del día
- Botón "Ver remix" (✨) para sugerencias IA
- Botón guardar

**Dropdown Comida:**
- Desayuno
- Almuerzo
- Cena

---

### 6. SUBIR FACTURA

**Ruta:** `/subir-factura`
**Componente:** `subir-factura.tsx`

```
┌─────────────────────────────────────┐
│ [←]  Nueva factura                  │
├─────────────────────────────────────┤
│                                     │
│  Estado: UPLOAD                     │
│ ┌ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┐ │
│                                     │
│ │         [📤]                   │ │
│      Arrastra y suelta tu           │
│ │    factura aquí                │ │
│                                     │
│ └ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┘ │
│                                     │
│  ┌─────────────────────────────────┐│
│  │      Seleccionar imagen        ││
│  └─────────────────────────────────┘│
│                                     │
│  ┌─────────────────────────────────┐│
│  │      Procesar factura          ││
│  └─────────────────────────────────┘│
│                                     │
│  Estado: PROCESSING                 │
│ ┌─────────────────────────────────┐ │
│ │           [🔄]                  │ │
│ │    Procesando con IA...         │ │
│ │  Estamos extrayendo los datos   │ │
│ └─────────────────────────────────┘ │
│                                     │
├─────────────────────────────────────┤
│  🏠    🍴    📋    👤              │
└─────────────────────────────────────┘
```

**Estados:**
1. **Upload:** Área de drop + botones
2. **Processing:** Spinner + mensaje de carga
3. **Success:** Redirige a `/validar-datos`
4. **Error:** Muestra alerta roja

---

### 7. VALIDAR DATOS DE FACTURA

**Ruta:** `/validar-datos`
**Componente:** `validar-datos.tsx`

```
┌─────────────────────────────────────┐
│ [←]  Valida tu factura              │
├─────────────────────────────────────┤
│                                     │
│  Producto      │ Cantidad │ Precio  │
│ ───────────────┼──────────┼──────── │
│  [Pollo      ] │ [1      ]│ [15.00]│
│  [Arroz      ] │ [2      ]│ [3.50 ]│
│  [Tomates    ] │ [500    ]│ [2.00 ]│
│                                     │
│  ┌─────────────────────────────────┐│
│  │     + Agregar producto         ││
│  └─────────────────────────────────┘│
│                                     │
│                                     │
│  ┌───────────┐ ┌───────────────────┐│
│  │ Cancelar  │ │     Confirmar    ││
│  └───────────┘ └───────────────────┘│
│                                     │
├─────────────────────────────────────┤
│  🏠    🍴    📋    👤              │
└─────────────────────────────────────┘
```

**Elementos:**
- Tabla editable de productos
- Inputs: nombre, cantidad, precio
- Botón agregar producto
- Cancelar → vuelve atrás
- Confirmar → `/catalogo-productos`

---

### 8. CATEGORIZAR PRODUCTOS

**Ruta:** `/catalogo-productos`
**Componente:** `catalogo-productos.tsx`

```
┌─────────────────────────────────────┐
│ [←]  Categoriza tus productos       │
├─────────────────────────────────────┤
│                                     │
│  Pollo              [Proteína    ▼] │
│ ─────────────────────────────────── │
│  Arroz              [Otros       ▼] │
│ ─────────────────────────────────── │
│  Tomates            [Verdura     ▼] │
│ ─────────────────────────────────── │
│  Leche              [Lácteo      ▼] │
│ ─────────────────────────────────── │
│                                     │
│                                     │
│  ┌─────────────────────────────────┐│
│  │      Guardar categorías        ││
│  └─────────────────────────────────┘│
│                                     │
├─────────────────────────────────────┤
│  🏠    🍴    📋    👤              │
└─────────────────────────────────────┘
```

**Categorías disponibles:**
- Proteína
- Verdura
- Lácteo
- Huevos
- Otros

---

### 9. MÉTRICAS Y AHORRO

**Ruta:** `/metricas`
**Componente:** `metricas.tsx`

```
┌─────────────────────────────────────┐
│ [←]  Métricas y ahorro              │
├─────────────────────────────────────┤
│                                     │
│  ┌─────────────────────────────────┐│
│  │          Actualizar            ││
│  └─────────────────────────────────┘│
│                                     │
│  ┌───────────────┐ ┌───────────────┐│
│  │  Desperdicio  │ │    Ahorro     ││
│  │     12%       │ │    $45.00     ││
│  │ vs 25% prom.  │ │   este mes    ││
│  └───────────────┘ └───────────────┘│
│                                     │
│  Evolución del desperdicio          │
│  ┌─────────────────────────────────┐│
│  │  ▓▓    ▓▓                       ││
│  │  ▓▓ ▓▓ ▓▓ ▓▓ ▓▓                 ││
│  │  S1 S2 S3 S4 S5                 ││
│  └─────────────────────────────────┘│
│                                     │
│  Recomendaciones                    │
│  • Usa las yemas sobrantes para...  │
│  • El pollo sobrante puede...       │
│  • Congela el arroz sobrante...     │
│                                     │
├─────────────────────────────────────┤
│  🏠    🍴    📋    👤              │
└─────────────────────────────────────┘
```

**Elementos:**
- Botón actualizar métricas
- KPI cards (2 columnas)
- Gráfico de barras (evolución semanal)
- Lista de recomendaciones IA

---

### 10. CONFIGURACIÓN / MIS GUSTOS

**Ruta:** `/configuracion`
**Componente:** `onboarding-familiar.tsx`

```
┌─────────────────────────────────────┐
│ [←]       Mis gustos                │
│           ○ ● ○ ○                   │
├─────────────────────────────────────┤
│                                     │
│  Configuremos tu hogar              │
│  Para recomendarte lo mejor...      │
│                                     │
│  ¿Quiénes comen en casa?            │
│ ┌─────────────────────────────────┐ │
│ │ 👩 Mamá           [-] 1 [+]    │ │
│ │ 👨 Papá           [-] 1 [+]    │ │
│ │ 🧑 Adolescente    [-] 0 [+]    │ │
│ │ 👶 Niño           [-] 0 [+]    │ │
│ └─────────────────────────────────┘ │
│                                     │
│  ¿Alguna alergia o dieta especial?  │
│  ┌────────────┐ ┌────────────┐      │
│  │ Sin gluten │ │Vegetariano●│      │
│  └────────────┘ └────────────┘      │
│  ┌────────────┐ ┌────────────┐      │
│  │   Vegano   │ │Sin lácteos │      │
│  └────────────┘ └────────────┘      │
│                                     │
│  ¿Qué ingredientes evitamos?        │
│  ┌─────────────────────────────────┐│
│  │ 🔍 Escribe aquí, ej. Cebolla...││
│  └─────────────────────────────────┘│
│  [Hígado ✕] [Picante ✕]             │
│                                     │
│  ┌─────────────────────────────────┐│
│  │    Guardar y continuar    →    ││
│  └─────────────────────────────────┘│
├─────────────────────────────────────┤
│  🏠    🍴    📋    👤              │
└─────────────────────────────────────┘
```

**Secciones:**

1. **Miembros de familia:**
   - Mamá 👩, Papá 👨, Adolescente 🧑, Niño 👶
   - Botones +/- para cantidad

2. **Restricciones dietéticas (multi-select):**
   - Sin gluten, Vegetariano, Vegano, Sin lácteos, Sin nueces

3. **Ingredientes a evitar:**
   - Input de búsqueda
   - Tags removibles (verde)

---

## Flujos de Usuario

### Flujo A: Primera Configuración

```
HOME → Card "Gustos" → CONFIGURACIÓN
  ↓
Ajustar familia (+/- miembros)
  ↓
Seleccionar dietas
  ↓
Agregar ingredientes a evitar
  ↓
"Guardar y continuar" → HOME
```

### Flujo B: Generar Menú Semanal

```
HOME → Escribir en barra de búsqueda
  ↓
(Procesa con IA)
  ↓
MENÚ SEMANAL
  ↓
Click "Ver más" → Ver ingredientes
  ↓
Click [⬜] maximizar → DETALLE RECETA
```

### Flujo C: Ver Receta Completa

```
MENÚ SEMANAL → Click maximizar en receta
  ↓
DETALLE RECETA
  ↓
Marcar ingredientes como obtenidos
  ↓
Click "Agregar a lista" → Añade a lista de compras
```

### Flujo D: Generar Lista de Compras

```
MENÚ SEMANAL → Click "Generar lista"
  ↓
LISTA DE COMPRAS
  ↓
Expandir categorías
  ↓
Toggle items comprados
  ↓
"Descargar lista" → PDF
```

### Flujo E: Procesar Factura

```
HOME → Card "Factura"
  ↓
SUBIR FACTURA → Seleccionar imagen
  ↓
"Procesar factura" (IA extrae datos)
  ↓
VALIDAR DATOS → Editar/corregir
  ↓
"Confirmar"
  ↓
CATEGORIZAR PRODUCTOS → Asignar categorías
  ↓
"Guardar categorías" → HOME
```

### Flujo F: Registrar Sobrantes

```
HOME → Botón "Sobrantes"
  ↓
REGISTRO SOBRANTES
  ↓
Seleccionar comida + ingresar producto + cantidad
  ↓
"Agregar" → Añade a la tabla
  ↓
(Opcional) "Ver remix" → Sugerencias IA
  ↓
"Guardar sobrantes" → HOME
```

### Flujo G: Ver Métricas

```
HOME → Card "Reporte"
  ↓
MÉTRICAS
  ↓
Ver KPIs (desperdicio, ahorro)
  ↓
Ver gráfico de evolución
  ↓
Leer recomendaciones IA
  ↓
(Opcional) "Actualizar" → Recalcula métricas
```

---

## Componentes Reutilizables

### Botones

| Tipo | Estilo | Uso |
|------|--------|-----|
| Primary | Fondo naranja, texto blanco | Acciones principales |
| Outline | Borde, fondo transparente | Acciones secundarias |
| Ghost | Sin borde ni fondo | Iconos, navegación |

### Cards

| Tipo | Características |
|------|-----------------|
| Quick Access | Icono + label, click → navega |
| Recipe | Expandible, emoji + stats + ingredientes |
| KPI | Título + valor grande + subtítulo |

### Inputs

| Tipo | Uso |
|------|-----|
| Search | Barra con icono lupa |
| Text | Inputs de formulario |
| Number | Cantidades, precios |
| Select/Dropdown | Categorías, opciones |

### Estados

| Estado | Visual |
|--------|--------|
| Loading | Spinner + texto |
| Error | Alerta roja |
| Success | Redirige o feedback |
| Empty | Mensaje + CTA |

---

## Sistema de Colores

### Paleta Principal

| Color | HSL | Uso |
|-------|-----|-----|
| Primary (Naranja) | HSL(17, 90%, 55%) | Botones, acentos, activos |
| Background | Blanco | Fondos principales |
| Card | Gris claro | Fondos de cards |
| Text Primary | Negro/Gris oscuro | Títulos, texto principal |
| Text Muted | Gris medio | Subtítulos, placeholders |
| Border | Gris claro | Bordes, separadores |

### Colores Semánticos

| Color | Uso |
|-------|-----|
| Verde | Fácil, éxito, tags ingredientes |
| Amarillo | Dificultad media |
| Rojo | Difícil, errores, eliminar |
| Teal | Card favorito (gradient) |
| Amber/Orange | Hero receta (gradient) |

### Estados de Dificultad

```
🟢 Fácil   → Verde (#22C55E)
🟡 Media   → Amarillo (#EAB308)
🔴 Difícil → Rojo (#EF4444)
```

---

## Especificaciones Técnicas

- **Viewport:** Mobile-first (max 768px)
- **Border Radius:** 16-24px en cards
- **Spacing:** Sistema de 4px (4, 8, 12, 16, 24, 32)
- **Typography:** Inter font
- **Icons:** Lucide React
- **Bottom Nav Height:** ~64px

---

## Notas para el Diseñador

1. **Idioma:** Todo el texto es en español
2. **Mobile-first:** Diseñar para 375px y escalar
3. **Emojis:** Se usan como placeholders para imágenes de platos
4. **Estados vacíos:** Considerar pantallas sin datos
5. **Loading states:** Todas las acciones con IA muestran spinner
6. **Navegación:** Bottom nav siempre visible excepto en modales


Y la paleta deberíamos reemplazar por la siguiente:
Equilibrio perfecto entre “food” y “tech”, con neutros limpios y verde controlado.

Brand

Primary / Orange (brand): #F8672E (tu HSL aprox.)

Secondary / Fresh green: #2DBE7E (fresco, no neón)

Accent / Deep green (para énfasis): #137A4C

Neutrales

Background: #FFFFFF

Surface (cards): #F7F8FA

Border: #E6E8EC

Text primary: #111827

Text secondary: #4B5563

Estados

Success: #2DBE7E

Warning: #F59E0B

Error: #EF4444

Info: #2563EB

Uso típico: naranja para CTA principal, verde para “zero waste / completado”, y los neutros para que todo se vea “app seria”.