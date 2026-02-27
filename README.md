# 🎨 DS Estela MUI — Design System

Un **Sistema de Diseño profesional** basado en **Material UI v6**, **React 19** y **TypeScript**, con tema personalizado y componentes completamente documentados.

---

## ✨ Características

- 🎯 **Tema personalizado Estela** — Colores de marca (primario teal, secundario azul) + semánticos
- 🎭 **9 secciones de demostración** — Tipografía, colores, botones, inputs, cards, feedback, navegación, data display, overlays
- 🌙 **Modo oscuro/claro** — Toggle en la barra superior
- 📱 **Responsive design** — Sidebar + layout principal adaptable
- 🔤 **Tipografía profesional** — Instrument Sans (body) + Outfit (headings)
- ✅ **TypeScript strict mode** — 100% type-safe
- 🏗️ **Código limpio** — Sin hardcoding, bien estructurado, documentado

---

## 🚀 Inicio Rápido

### 1. Clonar el repositorio

```bash
git clone https://github.com/dann-pixel/DS-Estela-react.git
cd DS-Estela-react
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Ejecutar el servidor de desarrollo

```bash
npm run dev
```

El sitio se abrirá en **http://127.0.0.1:5173**

---

## 📦 Scripts Disponibles

```bash
npm run dev            # Inicia servidor de desarrollo
npm run build          # Compila la app demo
npm run preview        # Previsualiza el build
npm run lint           # Ejecuta ESLint
npm run build:theme    # Compila el theme como paquete npm
npm run publish:theme  # Compila y publica en GitHub Packages
```

---

## 📁 Estructura del Proyecto

```
src/
├── theme/
│   └── index.ts              # Configuración MUI personalizada
├── components/demo/
│   ├── TypographyDemo.tsx    # Escala tipográfica
│   ├── ColorsDemo.tsx        # Paleta de colores
│   ├── ButtonsDemo.tsx       # Variantes de botones
│   ├── InputsDemo.tsx        # Controles de formulario
│   ├── CardsDemo.tsx         # Cards y superficies
│   ├── FeedbackDemo.tsx      # Alerts, snackbars, progress
│   ├── NavigationDemo.tsx    # Breadcrumbs, pagination, stepper
│   ├── DataDisplayDemo.tsx   # Tabla compleja (DTE)
│   └── OverlaysDemo.tsx      # Dialogs, drawers, tooltips, menus
├── App.tsx                    # Layout principal
└── main.tsx                   # Entry point + ThemeProvider
```

---

## 🎨 Paleta Estela

| Color | Código | Uso |
|-------|--------|-----|
| 🎯 Primario | `#00b5cc` | Marca principal (teal) |
| 🎯 Secundario | `#4255ff` | Color de soporte (azul) |
| 🔴 Error | `#ef4444` | Estados de error |
| ⚠️ Warning | `#f97316` | Advertencias |
| ℹ️ Info | `#0ea5e9` | Información |
| ✅ Success | `#22c55e` | Estados exitosos |
| 🌑 Dark | `#263238` | Color oscuro custom |

---

## 📖 Cómo Usar

### Navegar por las Secciones

1. **Sidebar izquierdo** — Haz clic en cualquier sección
2. **Toggle dark/light** — Botón en la barra superior (ícono de luna/sol)
3. **Scroll** — Desplázate dentro de cada sección

### Ver el Tema en Acción

El archivo `src/theme/index.ts` contiene toda la configuración:

```typescript
// Usar colores del tema en componentes
<Button color="primary" variant="contained">
  Click me
</Button>

// Acceder a valores del tema
import { useTheme } from '@mui/material/styles'

const MyComponent = () => {
  const theme = useTheme()
  return <Box sx={{ color: theme.palette.primary.main }}>Texto</Box>
}
```

---

## 🛠️ Tecnologías

- **React 19** — Framework UI
- **Material UI v6** — Componentes y theming
- **TypeScript 5.7** — Type safety
- **Vite 6** — Build tool rápido
- **Emotion** — CSS-in-JS (motor de MUI)

---

## 📋 Documentación

Se incluyen dos reportes de auditoría:

- **`AUDIT_REPORT.md`** — Análisis completo del tema, componentes y estructura
- **`AUDIT_SUMMARY.md`** — Resumen ejecutivo de hallazgos y correcciones

---

## 🤝 Contribuir

1. Crea una rama: `git checkout -b feature/mi-cambio`
2. Haz commits: `git commit -m "Descripción del cambio"`
3. Haz push: `git push origin feature/mi-cambio`
4. Abre un Pull Request

---

## 📝 Notas

- El proyecto está en **Fase 2** (tema custom implementado)
- Todas las demostraciones son **interactivas**
- El código es **production-ready**
- TypeScript en **strict mode**

---

## 📞 Contacto

- **Desarrollador:** Daniel Montero
- **Email:** daniel.montero@estela
- **Repositorio:** https://github.com/dann-pixel/DS-Estela-react

---

## 📄 Licencia

Este proyecto es parte del Sistema de Diseño Estela.

---

---

## 📦 Usar el theme en otros proyectos

El theme de Estela está publicado como paquete npm privado en **GitHub Packages**.
Cualquier proyecto React puede instalarlo y siempre tendrá la versión correcta.

### 1. Autenticarse en GitHub Packages

Necesitas un **Personal Access Token (PAT)** de GitHub con el permiso `read:packages`.

> Crear en: [github.com/settings/tokens](https://github.com/settings/tokens) → *Generate new token (classic)* → marcar `read:packages`

Agrega el token a tu `.npmrc` global (en tu máquina, **nunca en el repo**):

```bash
# ~/.npmrc  ← archivo en tu HOME, no en el proyecto
//npm.pkg.github.com/:_authToken=TU_GITHUB_TOKEN
```

### 2. Configurar el registry en el proyecto consumidor

Crea (o edita) el `.npmrc` en la **raíz del proyecto que quiere usar el theme**:

```
@dann-pixel:registry=https://npm.pkg.github.com
```

### 3. Instalar el paquete

```bash
npm install @dann-pixel/estela-theme
```

### 4. Usar en tu app

```tsx
import { ThemeProvider } from '@mui/material'
import estelaTheme from '@dann-pixel/estela-theme'

function App() {
  return (
    <ThemeProvider theme={estelaTheme}>
      <TuApp />
    </ThemeProvider>
  )
}
```

**¿Necesitas soporte dark mode?** Usa la función factory:

```tsx
import { ThemeProvider } from '@mui/material'
import { createAppTheme } from '@dann-pixel/estela-theme'

const theme = createAppTheme('dark') // o 'light'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <TuApp />
    </ThemeProvider>
  )
}
```

---

## 🚢 Publicar una nueva versión

1. Hacer cambios en `src/theme/index.ts`
2. Actualizar la versión en `package.json` (ej: `1.0.0` → `1.1.0`)
3. Autenticarse con un token con permiso `write:packages` en `~/.npmrc`
4. Correr:

```bash
npm run publish:theme
```

> ⚠️ Asegúrate de incrementar la versión antes de publicar — GitHub Packages no permite sobreescribir una versión ya publicada.

---

**Hecho con ❤️ para Estela** | 2026
