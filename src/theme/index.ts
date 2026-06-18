/**
 * src/theme/index.ts — Custom MUI Theme para DS Estela
 *
 * Configura:
 * - Paleta de marca Estela (primary, secondary, error, warning, info, success,
 *   text, background, divider, action)
 * - Grises: BlueGrey de MUI (blueGrey[50–900])
 * - Shape: borderRadius base 4 px
 * - Tipografía: Instrument Sans (body) + Outfit (headings)
 * - Iconografía: Material Symbols Outlined (variable font de Google)
 * - Elevaciones: flat para superficies estáticas, sombra para overlays flotantes
 * - Botones: sin sombra, sin textTransform uppercase
 * - TextField: variant 'filled' por defecto
 *
 * Uso:
 *   import { createAppTheme } from './theme'
 *   const theme = createAppTheme('light')   // o 'dark'
 *
 * Exportación por defecto (modo light):
 *   import theme from './theme'
 */

import { createTheme } from '@mui/material/styles'
import type { Theme, PaletteColor, PaletteColorOptions } from '@mui/material/styles'
import { blueGrey } from '@mui/material/colors'

// ── Module augmentation: color "dark" ────────────────────────────────────────
// Extiende las interfaces de MUI para que 'dark' sea un color válido en la
// paleta y en los props de los componentes que aceptan la prop color.
declare module '@mui/material/styles' {
  interface Palette      { dark: PaletteColor }
  interface PaletteOptions { dark?: PaletteColorOptions }
}
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides { dark: true }
}
declare module '@mui/material/IconButton' {
  interface IconButtonPropsColorOverrides { dark: true }
}
declare module '@mui/material/Chip' {
  interface ChipPropsColorOverrides { dark: true }
}
declare module '@mui/material/SvgIcon' {
  interface SvgIconPropsColorOverrides { dark: true }
}
// ─────────────────────────────────────────────────────────────────────────────

/**
 * createAppTheme
 * Fábrica de theme que acepta el modo light/dark.
 * Centraliza toda la configuración del design system.
 */
export function createAppTheme(mode: 'light' | 'dark' = 'light'): Theme {
  return createTheme({

    // ── Paleta ────────────────────────────────────────────────────────────────
    palette: {
      mode,

      // ── Colores de marca ──────────────────────────────────────────────────
      primary: {
        main: '#00b5cc',
        light: '#5fefe8',
        dark: '#006a92',
        contrastText: '#ffffff',
      },
      secondary: {
        main: '#4255ff',
        light: '#9cb6ff',
        dark: '#2528ae',
        contrastText: '#ffffff',
      },

      // ── Colores semánticos ────────────────────────────────────────────────
      error: {
        main: '#ef4444',
        light: '#fca5a5',
        dark: '#b91c1c',
        contrastText: '#ffffff',
      },
      warning: {
        main: '#f97316',
        light: '#fdba74',
        dark: '#c2410c',
        contrastText: '#ffffff',
      },
      info: {
        main: '#0ea5e9',
        light: '#7dd3fc',
        dark: '#0369a1',
        contrastText: '#ffffff',
      },
      success: {
        main: '#22c55e',
        light: '#86efac',
        dark: '#15803d',
        contrastText: '#ffffff',
      },

      // ── Color custom: dark ────────────────────────────────────────────────
      // blueGrey[950] no existe en el tipo Color de MUI → fallback '#000000'.
      dark: {
        main:         blueGrey[900],
        light:        blueGrey[700],
        dark:         (blueGrey as Record<number, string | undefined>)[950] ?? '#000000',
        contrastText: '#ffffff',
      },

      // ── Texto (modo light) ────────────────────────────────────────────────
      // Valores en hex-alpha: #101426 con opacidad de/99/61 = 87%/60%/38%
      ...(mode === 'light' && {
        text: {
          primary:   '#101426de',
          secondary: '#10142699',
          disabled:  '#10142661',
        },

        // ── Fondos (modo light) ─────────────────────────────────────────────
        background: {
          default: '#ffffff',
          paper:   '#ffffff',
        },

        // ── Divisor (modo light) ────────────────────────────────────────────
        divider: '#0000001f',

        // ── Estados de acción (modo light) ──────────────────────────────────
        action: {
          active:            '#0000008f',
          hover:             '#0000000a',
          selected:          '#00000014',
          disabled:          '#00000061',
          disabledBackground:'#0000001f',
          focus:             '#0000001f',
        },
      }),

      // ── Grises: BlueGrey custom (tokens de Figma) ───────────────────────
      // Valores extraídos del DS oficial de Figma — difieren de los de MUI.
      // Acceso: theme.palette.grey[300], theme.palette.grey[500], etc.
      grey: {
        ...blueGrey,
        50:  '#F7F9FC',
        100: '#EDF1F7',
        200: '#E4E9F2',
        300: '#C5CEE0',
        400: '#8F9BB3',
        500: '#2E3A59',
        600: '#222B45',
        700: '#192038',
        800: '#151A30',
        900: '#101426',
      },
    },

    // ── Shape ─────────────────────────────────────────────────────────────────
    // MUI usa este valor base y lo multiplica internamente para cada componente
    // (Button: ×1, Card: ×2, Dialog: ×3, etc.). No sobreescribir por componente.
    shape: {
      borderRadius: 4,
    },

    // ── Tipografía ────────────────────────────────────────────────────────────
    typography: {
      // Base: Instrument Sans para todo el cuerpo de texto
      fontFamily: "'Instrument Sans', sans-serif",

      // Display / headings: Outfit
      h1: { fontFamily: "'Outfit', sans-serif" },
      h2: { fontFamily: "'Outfit', sans-serif" },
      h3: { fontFamily: "'Outfit', sans-serif" },
      h4: { fontFamily: "'Outfit', sans-serif" },
      h5: { fontFamily: "'Outfit', sans-serif" },
      h6: { fontFamily: "'Outfit', sans-serif" },

      // El resto hereda Instrument Sans del fontFamily base:
      // subtitle1, subtitle2, body1, body2, button, caption, overline
    },

    // ── Componentes ───────────────────────────────────────────────────────────
    components: {

      // ── Iconografía: Material Symbols Outlined ──────────────────────────────
      // Configura el componente <Icon> de MUI para usar Material Symbols Outlined
      // en lugar de los Material Icons por defecto.
      // Requiere la fuente cargada en index.html.
      MuiIcon: {
        defaultProps: {
          baseClassName: 'material-symbols-outlined',
        },
      },

      // ── Paper: superficies vs. overlays ─────────────────────────────────────
      // Regla: elevation ≤ 2  → superficie estática → sin sombra + borde sutil
      //        elevation > 2  → overlay flotante    → mantiene sombra nativa
      //
      // Ejemplos que mantienen sombra (elevation > 2):
      //   Dialog (24), Menu (8), Popover (8), Drawer (16), Snackbar (6)
      //
      // Ejemplos sin sombra (elevation ≤ 2):
      //   Paper default (2), TableContainer (1), MobileStepper (0)
      MuiPaper: {
        styleOverrides: {
          root: ({ theme, ownerState }) => ({
            ...(ownerState.variant === 'elevation' &&
              (ownerState.elevation ?? 1) <= 2 && {
                boxShadow: 'none',
                border: `1px solid ${theme.palette.divider}`,
              }),
          }),
        },
      },

      // ── Card: siempre flat con borde ────────────────────────────────────────
      // Card extiende Paper. Este override es explícito para garantizar que
      // todas las Cards (independientemente del elevation prop) sean flat.
      MuiCard: {
        styleOverrides: {
          root: ({ theme }) => ({
            boxShadow: 'none',
            border: `1px solid ${theme.palette.divider}`,
          }),
        },
      },

      // ── AppBar: flat con borde inferior ─────────────────────────────────────
      // AppBar usa elevation=4 por defecto (fuera del threshold de Paper).
      // Se sobreescribe explícitamente para un estilo de app bar limpio.
      MuiAppBar: {
        defaultProps: {
          elevation: 0,
        },
        styleOverrides: {
          root: ({ theme }) => ({
            boxShadow: 'none',
            borderBottom: `1px solid ${theme.palette.divider}`,
          }),
        },
      },

      // ── Button: sin sombra, sentence case, peso 600 ─────────────────────────
      // disableElevation: elimina la sombra de los botones "contained" de forma declarativa.
      // styleOverrides: cubre todos los estados (default, hover, active, focus) por seguridad.
      // textTransform: 'none' → el texto respeta el casing del código (no force uppercase).
      // fontWeight 600 → etiquetas más legibles y con más presencia visual.
      MuiButton: {
        defaultProps: {
          disableElevation: true,
        },
        styleOverrides: {
          root: {
            textTransform: 'none',
            fontWeight: 600,
            boxShadow: 'none',
            '&:hover': { boxShadow: 'none' },
            '&:active': { boxShadow: 'none' },
            '&:focus': { boxShadow: 'none' },
            '&.Mui-focusVisible': { boxShadow: 'none' },
          },
        },
      },

      // ── TextField: variant filled por defecto ───────────────────────────────
      // El variant "filled" ofrece mejor affordance en formularios densos
      // vs. "outlined". Se puede sobreescribir por instancia con variant="outlined".
      MuiTextField: {
        defaultProps: {
          variant: 'filled',
        },
      },

      // ── Alert: sin sombra ────────────────────────────────────────────────────
      MuiAlert: {
        styleOverrides: {
          root: {
            boxShadow: 'none',
          },
        },
      },

      // ── Chip: sin sombra, peso 500 ───────────────────────────────────────────
      // fontWeight 500 → etiquetas más legibles que el 400 por defecto de MUI,
      // sin llegar al peso de los botones (600).
      MuiChip: {
        styleOverrides: {
          root: {
            boxShadow: 'none',
            fontWeight: 500,
          },
        },
      },

    },
  })
}

/**
 * Exportación por defecto: theme en modo light.
 * Usado cuando no se necesita soporte dinámico de dark mode.
 *
 * Para dark mode, usar createAppTheme('dark').
 */
const theme = createAppTheme('light')
export default theme
