/**
 * main.tsx — Entry point
 *
 * Aquí vive el ThemeProvider tal como pide el design system:
 * el theme se crea en src/theme/index.ts y se provee a toda la app.
 *
 * Root gestiona el estado del modo (light/dark) y lo pasa a App
 * como prop, manteniendo el toggle de App.tsx funcional sin
 * tener que duplicar el ThemeProvider.
 */
import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { createAppTheme } from './theme'
import App from './App.tsx'

/**
 * Root — wrapper que provee el ThemeProvider y gestiona el modo.
 * Separado del render raíz para poder usar hooks (useState).
 */
function Root() {
  const [mode, setMode] = useState<'light' | 'dark'>('light')

  // Recrea el theme cuando cambia el modo
  const theme = createAppTheme(mode)

  const handleToggleMode = () =>
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'))

  return (
    // ThemeProvider envuelve toda la aplicación con el tema personalizado
    <ThemeProvider theme={theme}>
      {/* CssBaseline normaliza los estilos del browser y aplica el color de fondo del theme */}
      <CssBaseline />
      <App mode={mode} onToggleMode={handleToggleMode} />
    </ThemeProvider>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Root />
  </StrictMode>,
)
