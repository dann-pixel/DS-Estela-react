/**
 * App.tsx — Layout principal del Design System Demo
 *
 * Estructura:
 * - Sidebar fijo a la izquierda con navegación por sección
 * - Área principal scrolleable con todas las demos
 * - Cada sección tiene un id para smooth scroll desde el sidebar
 *
 * El ThemeProvider + CssBaseline viven en main.tsx.
 * App recibe `mode` y `onToggleMode` como props para el toggle dark/light.
 */
import { useRef, useState, useCallback } from 'react'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Toolbar from '@mui/material/Toolbar'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import { alpha, useTheme } from '@mui/material/styles'
import BrushIcon from '@mui/icons-material/Brush'
import ColorLensIcon from '@mui/icons-material/ColorLens'
import FormatSizeIcon from '@mui/icons-material/FormatSize'
import HomeIcon from '@mui/icons-material/Home'
import SmartButtonIcon from '@mui/icons-material/SmartButton'
import InputIcon from '@mui/icons-material/Input'
import ViewAgendaIcon from '@mui/icons-material/ViewAgenda'
import NotificationsIcon from '@mui/icons-material/Notifications'
import RouteIcon from '@mui/icons-material/Route'
import TableChartIcon from '@mui/icons-material/TableChart'
import LayersIcon from '@mui/icons-material/Layers'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'

// Demo components
import WelcomeDemo from './components/demo/WelcomeDemo'
import TypographyDemo from './components/demo/TypographyDemo'
import ColorsDemo from './components/demo/ColorsDemo'
import ButtonsDemo from './components/demo/ButtonsDemo'
import InputsDemo from './components/demo/InputsDemo'
import CardsDemo from './components/demo/CardsDemo'
import FeedbackDemo from './components/demo/FeedbackDemo'
import NavigationDemo from './components/demo/NavigationDemo'
import DataDisplayDemo from './components/demo/DataDisplayDemo'
import OverlaysDemo from './components/demo/OverlaysDemo'

// ─── Constantes de layout ──────────────────────────────────────────────────
const SIDEBAR_WIDTH = 240
const TOPBAR_HEIGHT = 56

// ─── Secciones de navegación ───────────────────────────────────────────────
const SECTIONS = [
  { id: 'home', label: 'Inicio', icon: <HomeIcon fontSize="small" /> },
  { id: 'typography', label: 'Typography', icon: <FormatSizeIcon fontSize="small" /> },
  { id: 'colors', label: 'Colors', icon: <ColorLensIcon fontSize="small" /> },
  { id: 'buttons', label: 'Buttons', icon: <SmartButtonIcon fontSize="small" /> },
  { id: 'inputs', label: 'Inputs', icon: <InputIcon fontSize="small" /> },
  { id: 'cards', label: 'Cards', icon: <ViewAgendaIcon fontSize="small" /> },
  { id: 'feedback', label: 'Feedback', icon: <NotificationsIcon fontSize="small" /> },
  { id: 'navigation', label: 'Navigation', icon: <RouteIcon fontSize="small" /> },
  { id: 'data-display', label: 'Data Display', icon: <TableChartIcon fontSize="small" /> },
  { id: 'overlays', label: 'Overlays', icon: <LayersIcon fontSize="small" /> },
] as const

type SectionId = typeof SECTIONS[number]['id']

// ─── Props ────────────────────────────────────────────────────────────────
interface AppProps {
  /** Modo actual del theme, controlado desde main.tsx */
  mode: 'light' | 'dark'
  /** Callback para alternar entre light y dark */
  onToggleMode: () => void
}

// ─── SectionWrapper ───────────────────────────────────────────────────────
// Envuelve cada sección demo con id, padding y separador visual.
function SectionWrapper({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <Box
      id={id}
      component="section"
      sx={{
        px: { xs: 3, md: 5 },
        py: 6,
        '&:not(:last-child)': {
          borderBottom: '1px solid',
          borderColor: 'divider',
        },
        // Offset para el sticky topbar al navegar por anchor
        scrollMarginTop: `${TOPBAR_HEIGHT + 24}px`,
      }}
    >
      {children}
    </Box>
  )
}

// ─── App ──────────────────────────────────────────────────────────────────
export default function App({ mode, onToggleMode }: AppProps) {
  const [activeSection, setActiveSection] = useState<SectionId>('home')
  const mainRef = useRef<HTMLDivElement>(null)

  // Lee el theme del contexto provisto por ThemeProvider en main.tsx
  const theme = useTheme()

  /**
   * scrollToSection
   * - Si `id === 'home'`: simplemente cambia la vista a la página de inicio.
   * - Si venimos de 'home': las secciones demo no están montadas aún → espera
   *   un tick para que React las renderice antes de hacer scroll.
   * - Caso normal (ya estamos en secciones): scroll inmediato.
   */
  const scrollToSection = useCallback(
    (id: SectionId) => {
      const fromHome = activeSection === 'home'
      setActiveSection(id)

      if (id === 'home') return

      const doScroll = () =>
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })

      if (fromHome) {
        // Espera a que las secciones se monten
        setTimeout(doScroll, 60)
      } else {
        doScroll()
      }
    },
    [activeSection],
  )

  return (
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>

        {/* ── Sidebar ─────────────────────────────────────────────────── */}
        <Box
          component="nav"
          aria-label="Secciones del design system"
          sx={{
            width: SIDEBAR_WIDTH,
            flexShrink: 0,
            position: 'fixed',
            top: 0,
            left: 0,
            bottom: 0,
            display: 'flex',
            flexDirection: 'column',
            bgcolor: 'background.paper',
            borderRight: '1px solid',
            borderColor: 'divider',
            overflowY: 'auto',
            zIndex: 1100,
          }}
        >
          {/* Logo / Título del proyecto */}
          <Box sx={{ px: 2.5, py: 2.5, flexShrink: 0 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <BrushIcon color="primary" fontSize="small" />
              <Typography variant="subtitle1" fontWeight={700} lineHeight={1.2}>
                DS Estela
              </Typography>
            </Box>
            <Typography variant="caption" color="text.secondary">
              MUI Component Demo
            </Typography>
            <Box sx={{ mt: 1 }}>
              <Chip label="MUI v7" size="small" variant="outlined" color="primary" sx={{ fontSize: 10 }} />
            </Box>
          </Box>

          <Divider />

          {/* Links de navegación */}
          <Box component="ul" sx={{ listStyle: 'none', m: 0, p: 1, flex: 1 }}>
            {SECTIONS.map(({ id, label, icon }, index) => {
              const isActive = activeSection === id
              // Separador visual entre "Inicio" y las secciones demo
              const showDivider = index === 1
              return (
                <Box component="li" key={id}>
                  {showDivider && <Divider sx={{ my: 1 }} />}
                  <Box
                    component="button"
                    onClick={() => scrollToSection(id)}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1.5,
                      width: '100%',
                      px: 1.5,
                      py: 1,
                      border: 'none',
                      borderRadius: 1.5,
                      cursor: 'pointer',
                      textAlign: 'left',
                      bgcolor: isActive ? alpha(theme.palette.primary.main, 0.12) : 'transparent',
                      color: isActive ? 'primary.main' : 'text.secondary',
                      transition: 'background-color 150ms, color 150ms',
                      '&:hover': {
                        bgcolor: isActive
                          ? alpha(theme.palette.primary.main, 0.16)
                          : alpha(theme.palette.text.primary, 0.06),
                        color: isActive ? 'primary.main' : 'text.primary',
                      },
                    }}
                  >
                    <Box sx={{ color: 'inherit', display: 'flex' }}>{icon}</Box>
                    <Typography
                      variant="body2"
                      fontWeight={isActive ? 700 : 400}
                      sx={{ color: 'inherit' }}
                    >
                      {label}
                    </Typography>
                    {isActive && (
                      <Box
                        sx={{
                          ml: 'auto',
                          width: 4,
                          height: 4,
                          borderRadius: '50%',
                          bgcolor: 'primary.main',
                          flexShrink: 0,
                        }}
                      />
                    )}
                  </Box>
                </Box>
              )
            })}
          </Box>

          <Divider />

          {/* Footer del sidebar */}
          <Box sx={{ px: 2, py: 1.5 }}>
            <Typography variant="caption" color="text.disabled">
              Fase 2 — Custom theme
            </Typography>
          </Box>
        </Box>

        {/* ── Main content area ────────────────────────────────────────── */}
        <Box
          sx={{
            flexGrow: 1,
            ml: `${SIDEBAR_WIDTH}px`,
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
          }}
        >
          {/* Top bar */}
          <Toolbar
            sx={{
              position: 'sticky',
              top: 0,
              zIndex: 1050,
              bgcolor: 'background.paper',
              borderBottom: '1px solid',
              borderColor: 'divider',
              minHeight: `${TOPBAR_HEIGHT}px !important`,
              px: { xs: 3, md: 5 },
              gap: 2,
            }}
          >
            <Typography variant="h6" fontWeight={700} sx={{ flex: 1 }}>
              {activeSection === 'home'
                ? 'DS Estela — Design System'
                : (SECTIONS.find((s) => s.id === activeSection)?.label ?? 'Design System')}
            </Typography>

            {/* Toggle light / dark mode */}
            <Tooltip title={`Cambiar a modo ${mode === 'light' ? 'oscuro' : 'claro'}`}>
              <IconButton onClick={onToggleMode} size="small">
                {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
              </IconButton>
            </Tooltip>
          </Toolbar>

          {/* ── Contenido: Home (página separada) vs secciones demo ─── */}
          {activeSection === 'home' ? (

            /* Página de bienvenida — standalone, sin footer
               Sin overflowY para que el scroll ocurra en window */
            <Box sx={{ flex: 1 }}>
              <WelcomeDemo
                onNavigate={(id) => scrollToSection(id as SectionId)}
              />
            </Box>

          ) : (

            /* Secciones demo — scroll continuo con footer */
            <>
              <Box ref={mainRef} sx={{ flex: 1 }}>
                <SectionWrapper id="typography">
                  <TypographyDemo />
                </SectionWrapper>

                <SectionWrapper id="colors">
                  <ColorsDemo />
                </SectionWrapper>

                <SectionWrapper id="buttons">
                  <ButtonsDemo />
                </SectionWrapper>

                <SectionWrapper id="inputs">
                  <InputsDemo />
                </SectionWrapper>

                <SectionWrapper id="cards">
                  <CardsDemo />
                </SectionWrapper>

                <SectionWrapper id="feedback">
                  <FeedbackDemo />
                </SectionWrapper>

                <SectionWrapper id="navigation">
                  <NavigationDemo />
                </SectionWrapper>

                <SectionWrapper id="data-display">
                  <DataDisplayDemo />
                </SectionWrapper>

                <SectionWrapper id="overlays">
                  <OverlaysDemo />
                </SectionWrapper>
              </Box>

              {/* Footer */}
              <Box
                component="footer"
                sx={{
                  px: { xs: 3, md: 5 },
                  py: 3,
                  borderTop: '1px solid',
                  borderColor: 'divider',
                  bgcolor: 'background.paper',
                }}
              >
                <Typography variant="caption" color="text.disabled">
                  DS Estela MUI — Component Demo · Fase 2 (custom theme: Instrument Sans + Outfit)
                </Typography>
              </Box>
            </>

          )}
        </Box>
      </Box>
  )
}
