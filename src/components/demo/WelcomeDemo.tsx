/**
 * WelcomeDemo — Página de bienvenida del Design System Estela
 *
 * Página separada (no forma parte del scroll de demos).
 * Estructura:
 *   1. Hero             — gradiente full-bleed, headline, tagline, CTAs
 *   2. Stats            — 4 métricas del sistema
 *   3. ¿Por qué?        — objetivo del proyecto con 3 pillars
 *   4. Diagrama         — flujo de implementación del paquete (5 pasos)
 *   5. Paleta de colores — swatches main / light / dark
 *   6. Tipografía       — Outfit y Instrument Sans specimen
 *   7. Componentes      — buttons + chips en modo exposición
 *   8. ¿Qué incluye?    — feature list
 */
import { useTheme, alpha, lighten } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import BuildOutlinedIcon from '@mui/icons-material/BuildOutlined'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CloudOutlinedIcon from '@mui/icons-material/CloudOutlined'
import CodeIcon from '@mui/icons-material/Code'
import DesignServicesIcon from '@mui/icons-material/DesignServices'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import PaletteOutlinedIcon from '@mui/icons-material/PaletteOutlined'
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch'
import SpeedIcon from '@mui/icons-material/Speed'
import TextFieldsIcon from '@mui/icons-material/TextFields'
import UpdateIcon from '@mui/icons-material/Update'
import WidgetsOutlinedIcon from '@mui/icons-material/WidgetsOutlined'

// ─── Props ────────────────────────────────────────────────────────────────
interface WelcomeDemoProps {
  onNavigate?: (section: string) => void
}

// ─── Helper ───────────────────────────────────────────────────────────────
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

// ─── SectionLabel ─────────────────────────────────────────────────────────
function SectionLabel({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
      <Box sx={{ color: 'primary.main', display: 'flex', fontSize: 18 }}>{icon}</Box>
      <Typography variant="overline" color="text.secondary" fontWeight={700} letterSpacing="0.12em">
        {label}
      </Typography>
    </Box>
  )
}

// ─── Component ────────────────────────────────────────────────────────────
export default function WelcomeDemo({ onNavigate }: WelcomeDemoProps) {
  const theme = useTheme()

  // Palette items from theme — sin hardcoding de colores
  const PALETTE_ITEMS = [
    { name: 'Primary',   main: theme.palette.primary.main,   light: theme.palette.primary.light,   dark: theme.palette.primary.dark   },
    { name: 'Secondary', main: theme.palette.secondary.main, light: theme.palette.secondary.light, dark: theme.palette.secondary.dark },
    { name: 'Success',   main: theme.palette.success.main,   light: theme.palette.success.light,   dark: theme.palette.success.dark   },
    { name: 'Warning',   main: theme.palette.warning.main,   light: theme.palette.warning.light,   dark: theme.palette.warning.dark   },
    { name: 'Error',     main: theme.palette.error.main,     light: theme.palette.error.light,     dark: theme.palette.error.dark     },
    { name: 'Info',      main: theme.palette.info.main,      light: theme.palette.info.light,      dark: theme.palette.info.dark      },
  ]

  // Soft chips — mismos coeficientes que DataDisplayDemo
  const SOFT_CHIPS = [
    { color: 'primary'   as const, bg: lighten(theme.palette.primary.main,   0.82), text: theme.palette.primary.dark   },
    { color: 'secondary' as const, bg: lighten(theme.palette.secondary.main, 0.88), text: theme.palette.secondary.dark },
    { color: 'success'   as const, bg: lighten(theme.palette.success.main,   0.86), text: theme.palette.success.dark   },
    { color: 'warning'   as const, bg: lighten(theme.palette.warning.main,   0.86), text: theme.palette.warning.dark   },
    { color: 'error'     as const, bg: lighten(theme.palette.error.main,     0.87), text: theme.palette.error.dark     },
    { color: 'info'      as const, bg: lighten(theme.palette.info.main,      0.84), text: theme.palette.info.dark      },
  ]

  // Nodos del diagrama de implementación
  const DIAGRAM_NODES = [
    {
      step: '01',
      icon: <DesignServicesIcon sx={{ fontSize: 22 }} />,
      title: 'Figma DS',
      code: 'Design tokens',
      desc: 'El equipo de diseño define colores, tipografías y espaciados en el archivo oficial de Figma.',
      color: theme.palette.primary.main,
    },
    {
      step: '02',
      icon: <CodeIcon sx={{ fontSize: 22 }} />,
      title: 'theme/index.ts',
      code: 'createAppTheme()',
      desc: 'Los tokens se traducen a la API de MUI v7. Única fuente de verdad del branding técnico.',
      color: theme.palette.secondary.main,
    },
    {
      step: '03',
      icon: <BuildOutlinedIcon sx={{ fontSize: 22 }} />,
      title: 'build:theme',
      code: 'dist-theme/',
      desc: 'Vite compila el theme a un bundle ESM + CJS listo para distribución como paquete npm.',
      color: theme.palette.info.main,
    },
    {
      step: '04',
      icon: <CloudOutlinedIcon sx={{ fontSize: 22 }} />,
      title: 'GitHub Packages',
      code: '@dann-pixel/estela-theme',
      desc: 'El bundle se publica en el registry privado de la organización en GitHub.',
      color: theme.palette.success.main,
    },
    {
      step: '05',
      icon: <RocketLaunchIcon sx={{ fontSize: 22 }} />,
      title: 'Tu proyecto',
      code: 'npm install',
      desc: 'Cualquier repo React de Estela instala el paquete y arranca con branding correcto.',
      color: theme.palette.warning.main,
    },
  ]

  return (
    <Box sx={{ minHeight: '100vh' }}>

      {/* ════════════════════════════════════════════════════════════════
          1. HERO — full-bleed, sin border-radius
      ════════════════════════════════════════════════════════════════ */}
      <Box
        sx={{
          position: 'relative',
          overflow: 'hidden',
          background: `linear-gradient(135deg,
            ${theme.palette.primary.dark}   0%,
            ${theme.palette.secondary.dark} 55%,
            ${theme.palette.secondary.main} 100%)`,
          px: { xs: 4, md: 10 },
          py: { xs: 9, md: 14 },
        }}
      >
        {/* Orbes decorativos */}
        {[
          { top: -140, right: -120, size: 440, opacity: 0.06 },
          { top:   50, right:  160, size: 200, opacity: 0.04 },
          { bottom: -130, left: -90, size: 340, opacity: 0.05 },
        ].map((orb, i) => (
          <Box
            key={i}
            sx={{
              position: 'absolute',
              top:    'top'    in orb ? orb.top    : undefined,
              right:  'right'  in orb ? orb.right  : undefined,
              bottom: 'bottom' in orb ? orb.bottom : undefined,
              left:   'left'   in orb ? orb.left   : undefined,
              width:  orb.size,
              height: orb.size,
              borderRadius: '50%',
              bgcolor: alpha('#ffffff', orb.opacity),
              pointerEvents: 'none',
            }}
          />
        ))}

        {/* Badge versión */}
        <Chip
          label="v1.0.1 · MUI v7 · React + Vite"
          size="small"
          sx={{
            mb: 4,
            bgcolor: alpha('#ffffff', 0.13),
            color:   alpha('#ffffff', 0.9),
            fontWeight: 600,
            fontSize: 11,
            letterSpacing: '0.04em',
            border: `1px solid ${alpha('#ffffff', 0.22)}`,
          }}
        />

        {/* Headline — h1 usa Outfit via el theme */}
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: '2.8rem', sm: '3.8rem', md: '5.2rem' },
            fontWeight: 700,
            color: '#ffffff',
            lineHeight: 1.03,
            letterSpacing: '-0.02em',
            mb: 3,
            maxWidth: 700,
          }}
        >
          Estela
          <br />
          Design System
        </Typography>

        {/* Tagline — body text, Instrument Sans (no h6) */}
        <Typography
          variant="body1"
          sx={{
            color: alpha('#ffffff', 0.78),
            maxWidth: 520,
            mb: 6,
            lineHeight: 1.75,
            fontSize: { xs: '1rem', md: '1.125rem' },
          }}
        >
          La fuente de verdad visual de Estela. Colores, tipografía y
          componentes MUI con branding propio, listos para producción
          en cualquier proyecto React.
        </Typography>

        {/* CTAs */}
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Button
            variant="contained"
            size="large"
            endIcon={<ArrowForwardIcon />}
            onClick={() => onNavigate?.('typography')}
            sx={{
              bgcolor: '#ffffff',
              color:   theme.palette.primary.dark,
              fontWeight: 700,
              px: 3.5,
              '&:hover': { bgcolor: alpha('#ffffff', 0.92) },
            }}
          >
            Explorar componentes
          </Button>
          <Button
            variant="outlined"
            size="large"
            endIcon={<OpenInNewIcon fontSize="small" />}
            sx={{
              borderColor: alpha('#ffffff', 0.4),
              color: '#ffffff',
              px: 3.5,
              '&:hover': {
                borderColor: '#ffffff',
                bgcolor:     alpha('#ffffff', 0.1),
              },
            }}
          >
            GitHub Packages
          </Button>
        </Box>
      </Box>


      {/* ════════════════════════════════════════════════════════════════
          CONTENIDO — wrapper con padding horizontal uniforme
      ════════════════════════════════════════════════════════════════ */}
      <Box sx={{ px: { xs: 4, md: 10 }, pt: 9, pb: 14 }}>

        {/* ── 2. STATS ──────────────────────────────────────────────── */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr 1fr', md: 'repeat(4, 1fr)' },
            gap: 2,
            mb: 12,
          }}
        >
          {[
            { value: '9',   label: 'Categorías',  sub: 'Typography a Overlays'     },
            { value: '30+', label: 'Variantes',    sub: 'Colores, tamaños y estados' },
            { value: '2',   label: 'Tipografías',  sub: 'Outfit · Instrument Sans'  },
            { value: '6',   label: 'Paletas',      sub: 'Semánticas + dark custom'  },
          ].map(({ value, label, sub }) => (
            <Box
              key={label}
              sx={{
                p: 3,
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 2,
                transition: 'border-color 200ms',
                '&:hover': { borderColor: 'primary.main' },
              }}
            >
              {/* h3 usa Outfit via el theme */}
              <Typography
                variant="h3"
                sx={{ color: 'primary.main', lineHeight: 1, mb: 1 }}
              >
                {value}
              </Typography>
              <Typography variant="subtitle2" fontWeight={700} mb={0.5}>
                {label}
              </Typography>
              <Typography variant="caption" color="text.disabled" display="block">
                {sub}
              </Typography>
            </Box>
          ))}
        </Box>


        {/* ── 3. POR QUÉ ────────────────────────────────────────────── */}
        <Box sx={{ mb: 12 }}>
          <SectionLabel icon={<AutoAwesomeIcon fontSize="inherit" />} label="¿Por qué este proyecto?" />

          <Typography variant="h4" fontWeight={700} mb={2} sx={{ maxWidth: 640 }}>
            Un sistema para unificar la identidad visual de Estela
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={6} sx={{ maxWidth: 600, lineHeight: 1.8 }}>
            Estela opera en múltiples países de Latinoamérica y España con diferentes productos digitales.
            Sin un design system centralizado, cada proyecto toma sus propias decisiones visuales —
            generando inconsistencias y duplicando trabajo de diseño en todos los equipos.
          </Typography>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
              gap: 2.5,
            }}
          >
            {[
              {
                icon: <AutoAwesomeIcon />,
                color: theme.palette.primary.main,
                title: 'Consistencia visual',
                body: 'Todos los productos de Estela comparten los mismos colores, tipografías y patrones de interacción, gestionados desde un único repositorio.',
              },
              {
                icon: <SpeedIcon />,
                color: theme.palette.secondary.main,
                title: 'Velocidad de desarrollo',
                body: 'Los equipos de frontend arrancan con branding correcto desde el primer componente, sin replicar decisiones visuales en cada proyecto.',
              },
              {
                icon: <UpdateIcon />,
                color: theme.palette.success.main,
                title: 'Evolución centralizada',
                body: 'Cambiar un color o tipografía en el DS se propaga automáticamente a todos los proyectos con un simple npm update, sin abrir un PR en cada repo.',
              },
            ].map(({ icon, color, title, body }) => (
              <Box
                key={title}
                sx={{
                  p: 3.5,
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 2,
                  borderTop: `3px solid ${color}`,
                }}
              >
                <Box
                  sx={{
                    width: 44,
                    height: 44,
                    borderRadius: 2,
                    bgcolor: alpha(color, 0.1),
                    color: color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 2.5,
                  }}
                >
                  {icon}
                </Box>
                <Typography variant="subtitle1" fontWeight={700} mb={1}>
                  {title}
                </Typography>
                <Typography variant="body2" color="text.secondary" lineHeight={1.75}>
                  {body}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>


        {/* ── 4. DIAGRAMA ──────────────────────────────────────────── */}
        <Box sx={{ mb: 12 }}>
          <SectionLabel icon={<CodeIcon fontSize="inherit" />} label="Cómo funciona el paquete" />

          <Typography variant="h4" fontWeight={700} mb={2}>
            Del diseño al componente en 5 pasos
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={7} sx={{ maxWidth: 560, lineHeight: 1.8 }}>
            El theme se genera desde los tokens de Figma, se compila como paquete npm y se
            publica en GitHub Packages. Cualquier proyecto React de Estela lo instala como
            una dependencia estándar.
          </Typography>

          {/* Flow — horizontal con flechas, scroll en mobile */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              overflowX: { xs: 'auto', lg: 'visible' },
              pb: { xs: 2, lg: 0 },
            }}
          >
            {DIAGRAM_NODES.map(({ step, icon, title, code, desc, color }, i) => (
              <Box
                key={step}
                sx={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  flex: { lg: '1 1 0' },
                  flexShrink: 0,
                }}
              >
                {/* Nodo */}
                <Box
                  sx={{
                    p: 2.5,
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 2,
                    borderTop: `3px solid ${color}`,
                    minWidth: { xs: 170, md: 0 },
                    width: '100%',
                    bgcolor: 'background.paper',
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{
                      fontFamily: 'monospace',
                      color: color,
                      fontWeight: 700,
                      display: 'block',
                      mb: 1.5,
                    }}
                  >
                    {step}
                  </Typography>
                  <Box sx={{ color: color, mb: 1.5, display: 'flex' }}>
                    {icon}
                  </Box>
                  <Typography variant="subtitle2" fontWeight={700} mb={0.5}>
                    {title}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ fontFamily: 'monospace', color: color, display: 'block', mb: 1 }}
                  >
                    {code}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" display="block" lineHeight={1.6}>
                    {desc}
                  </Typography>
                </Box>

                {/* Flecha entre nodos */}
                {i < DIAGRAM_NODES.length - 1 && (
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      px: { xs: 0.75, md: 1 },
                      pt: '44px',
                      flexShrink: 0,
                      color: 'text.disabled',
                    }}
                  >
                    <ArrowForwardIcon sx={{ fontSize: 16 }} />
                  </Box>
                )}
              </Box>
            ))}
          </Box>
        </Box>


        {/* ── 5. PALETA DE COLORES ──────────────────────────────────── */}
        <Box sx={{ mb: 12 }}>
          <SectionLabel icon={<PaletteOutlinedIcon fontSize="inherit" />} label="Paleta de colores" />

          <Box sx={{ display: 'flex', gap: 1.5, overflowX: 'auto', pb: 1 }}>
            {PALETTE_ITEMS.map(({ name, main, light, dark }) => (
              <Box key={name} sx={{ flex: '1 1 0', minWidth: 100 }}>
                {/* Swatch main */}
                <Box
                  sx={{
                    height: 96,
                    bgcolor: main,
                    borderRadius: '8px 8px 0 0',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    p: 1.5,
                  }}
                >
                  <Typography sx={{ color: '#ffffff', fontWeight: 700, fontSize: 11 }}>
                    {name}
                  </Typography>
                  <Typography sx={{ color: alpha('#ffffff', 0.6), fontSize: 10, fontFamily: 'monospace' }}>
                    {main}
                  </Typography>
                </Box>
                {/* Light */}
                <Box
                  sx={{
                    height: 22,
                    bgcolor: light,
                    borderBottom: `1px solid ${alpha('#000000', 0.06)}`,
                  }}
                />
                {/* Dark */}
                <Box sx={{ height: 22, bgcolor: dark, borderRadius: '0 0 8px 8px' }} />
              </Box>
            ))}
          </Box>

          <Box sx={{ display: 'flex', gap: 3, mt: 2 }}>
            {[
              { label: '.main',  desc: 'Color principal' },
              { label: '.light', desc: 'Tono claro'      },
              { label: '.dark',  desc: 'Tono oscuro'     },
            ].map(({ label, desc }) => (
              <Box key={label} sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                <Typography variant="caption" fontFamily="monospace" color="text.secondary">
                  {label}
                </Typography>
                <Typography variant="caption" color="text.disabled">
                  — {desc}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>


        {/* ── 6. SISTEMA TIPOGRÁFICO ────────────────────────────────── */}
        <Box sx={{ mb: 12 }}>
          <SectionLabel icon={<TextFieldsIcon fontSize="inherit" />} label="Sistema tipográfico" />

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2.5 }}>

            {/* Outfit — headings */}
            <Box
              sx={{
                p: { xs: 3, md: 5 },
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 2,
                overflow: 'hidden',
              }}
            >
              <Chip
                label="Headings · h1–h6"
                size="small"
                variant="outlined"
                color="primary"
                sx={{ mb: 3, fontFamily: 'monospace', fontSize: 10 }}
              />
              {/* h2 ya usa Outfit via el theme — solo overrideamos el tamaño */}
              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: '3.2rem', md: '4.5rem' },
                  fontWeight: 700,
                  lineHeight: 1,
                  mb: 2.5,
                  letterSpacing: '-0.03em',
                }}
              >
                Outfit
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7, mb: 2 }}>
                ABCDEFGHIJKLMNOPQRSTUVWXYZ
                <br />
                abcdefghijklmnopqrstuvwxyz
                <br />
                0123456789 !@#$%&()
              </Typography>
              <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                {[300, 400, 500, 600, 700, 800].map(w => (
                  <Box
                    key={w}
                    sx={{
                      px: 1.25, py: 0.5,
                      border: '1px solid', borderColor: 'divider',
                      borderRadius: 1,
                    }}
                  >
                    <Typography
                      sx={{ fontFamily: "'Outfit', sans-serif", fontWeight: w, fontSize: 11, lineHeight: 1.6 }}
                    >
                      {w}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>

            {/* Instrument Sans — body */}
            <Box
              sx={{
                p: { xs: 3, md: 5 },
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 2,
                overflow: 'hidden',
              }}
            >
              <Chip
                label="Body · labels · botones"
                size="small"
                variant="outlined"
                color="secondary"
                sx={{ mb: 3, fontFamily: 'monospace', fontSize: 10 }}
              />
              {/* No hay variante MUI para body display text → usamos sx */}
              <Typography
                sx={{
                  fontFamily: "'Instrument Sans', sans-serif",
                  fontSize: { xs: '3.2rem', md: '4.5rem' },
                  fontWeight: 600,
                  lineHeight: 1,
                  color: 'text.primary',
                  mb: 2.5,
                  letterSpacing: '-0.02em',
                }}
              >
                Inst.
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontFamily: "'Instrument Sans', sans-serif", lineHeight: 1.7, mb: 2 }}
              >
                ABCDEFGHIJKLMNOPQRSTUVWXYZ
                <br />
                abcdefghijklmnopqrstuvwxyz
                <br />
                0123456789 !@#$%&()
              </Typography>
              <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                {[400, 500, 600, 700].map(w => (
                  <Box
                    key={w}
                    sx={{
                      px: 1.25, py: 0.5,
                      border: '1px solid', borderColor: 'divider',
                      borderRadius: 1,
                    }}
                  >
                    <Typography
                      sx={{ fontFamily: "'Instrument Sans', sans-serif", fontWeight: w, fontSize: 11, lineHeight: 1.6 }}
                    >
                      {w}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        </Box>


        {/* ── 7. COMPONENTES SHOWCASE ──────────────────────────────── */}
        <Box sx={{ mb: 12 }}>
          <SectionLabel icon={<WidgetsOutlinedIcon fontSize="inherit" />} label="Componentes" />

          {/* Buttons */}
          <Box
            sx={{
              p: { xs: 3, md: 4 },
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 2,
              mb: 2,
            }}
          >
            <Typography
              variant="caption"
              color="text.disabled"
              fontFamily="monospace"
              display="block"
              mb={3}
            >
              Button — contained · outlined · text
            </Typography>
            {(
              [
                { variant: 'contained', colors: ['primary', 'secondary', 'success', 'error', 'warning', 'info'] },
                { variant: 'outlined',  colors: ['primary', 'secondary', 'success', 'error'] },
                { variant: 'text',      colors: ['primary', 'secondary', 'success', 'error'] },
              ] as const
            ).map(({ variant, colors }) => (
              <Box key={variant} sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap', mb: 2, '&:last-child': { mb: 0 } }}>
                {colors.map(color => (
                  <Button key={color} variant={variant} color={color}>
                    {cap(color)}
                  </Button>
                ))}
              </Box>
            ))}
          </Box>

          {/* Chips */}
          <Box
            sx={{
              p: { xs: 3, md: 4 },
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 2,
            }}
          >
            <Typography
              variant="caption"
              color="text.disabled"
              fontFamily="monospace"
              display="block"
              mb={3}
            >
              Chip — filled · outlined · soft
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 1.5 }}>
              {(['primary', 'secondary', 'success', 'warning', 'error', 'info'] as const).map(c => (
                <Chip key={c} label={cap(c)} color={c} />
              ))}
            </Box>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 1.5 }}>
              {(['primary', 'secondary', 'success', 'warning', 'error', 'info'] as const).map(c => (
                <Chip key={c} label={cap(c)} color={c} variant="outlined" />
              ))}
            </Box>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {SOFT_CHIPS.map(({ color, bg, text }) => (
                <Chip key={color} label={cap(color)} sx={{ bgcolor: bg, color: text }} />
              ))}
            </Box>
          </Box>
        </Box>


        {/* ── 8. QUÉ INCLUYE ────────────────────────────────────────── */}
        <Box
          sx={{
            p: { xs: 3, md: 5 },
            bgcolor: alpha(theme.palette.primary.main, 0.04),
            border: '1px solid',
            borderColor: alpha(theme.palette.primary.main, 0.14),
            borderRadius: 2,
          }}
        >
          {/* h5 usa Outfit via el theme */}
          <Typography variant="h5" fontWeight={700} mb={1}>
            ¿Qué incluye?
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={4} sx={{ maxWidth: 480 }}>
            Un sistema completo y distribuible, listo para consumir en cualquier proyecto React de Estela.
          </Typography>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: 'repeat(3, 1fr)' },
              gap: 2,
            }}
          >
            {[
              'Paleta semántica — main · light · dark · contrastText por color',
              'Tipografía dual: Outfit para display, Instrument Sans para cuerpo',
              'Elevaciones: flat en superficies, sombra solo en overlays flotantes',
              'Botones sin uppercase, fontWeight 600, sin sombras innecesarias',
              'Chips con variante soft — pasteles calibrados individualmente',
              'Publicado en GitHub Packages como @dann-pixel/estela-theme',
            ].map((feat) => (
              <Box key={feat} sx={{ display: 'flex', gap: 1.5, alignItems: 'flex-start' }}>
                <CheckCircleIcon sx={{ color: 'primary.main', fontSize: 17, mt: '2px', flexShrink: 0 }} />
                <Typography variant="body2" color="text.secondary" lineHeight={1.75}>
                  {feat}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>

      </Box>
      {/* end padded content */}
    </Box>
  )
}
