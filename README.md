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
npm run dev        # Inicia servidor de desarrollo
npm run build      # Compila para producción
npm run preview    # Previsualiza el build
npm run lint       # Ejecuta ESLint
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

**Hecho con ❤️ para Estela** | 2026
