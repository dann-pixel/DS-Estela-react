import { createTheme as a } from "@mui/material/styles";
import { blueGrey as t } from "@mui/material/colors";
function r(o = "light") {
  return a({
    // ── Paleta ────────────────────────────────────────────────────────────────
    palette: {
      mode: o,
      // ── Colores de marca ──────────────────────────────────────────────────
      primary: {
        main: "#00b5cc",
        light: "#5fefe8",
        dark: "#006a92",
        contrastText: "#ffffff"
      },
      secondary: {
        main: "#4255ff",
        light: "#9cb6ff",
        dark: "#2528ae",
        contrastText: "#ffffff"
      },
      // ── Colores semánticos ────────────────────────────────────────────────
      error: {
        main: "#ef4444",
        light: "#fca5a5",
        dark: "#b91c1c",
        contrastText: "#ffffff"
      },
      warning: {
        main: "#f97316",
        light: "#fdba74",
        dark: "#c2410c",
        contrastText: "#ffffff"
      },
      info: {
        main: "#0ea5e9",
        light: "#7dd3fc",
        dark: "#0369a1",
        contrastText: "#ffffff"
      },
      success: {
        main: "#22c55e",
        light: "#86efac",
        dark: "#15803d",
        contrastText: "#ffffff"
      },
      // ── Color custom: dark ────────────────────────────────────────────────
      // blueGrey[950] no existe en el tipo Color de MUI → fallback '#000000'.
      dark: {
        main: t[900],
        light: t[700],
        dark: t[950] ?? "#000000",
        contrastText: "#ffffff"
      },
      // ── Texto (modo light) ────────────────────────────────────────────────
      // Valores en hex-alpha: #101426 con opacidad de/99/61 = 87%/60%/38%
      ...o === "light" && {
        text: {
          primary: "#101426de",
          secondary: "#10142699",
          disabled: "#10142661"
        },
        // ── Fondos (modo light) ─────────────────────────────────────────────
        background: {
          default: "#ffffff",
          paper: "#ffffff"
        },
        // ── Divisor (modo light) ────────────────────────────────────────────
        divider: "#0000001f",
        // ── Estados de acción (modo light) ──────────────────────────────────
        action: {
          active: "#0000008f",
          hover: "#0000000a",
          selected: "#00000014",
          disabled: "#00000061",
          disabledBackground: "#0000001f",
          focus: "#0000001f"
        }
      },
      // ── Grises: BlueGrey custom (tokens de Figma) ───────────────────────
      // Valores extraídos del DS oficial de Figma — difieren de los de MUI.
      // Acceso: theme.palette.grey[300], theme.palette.grey[500], etc.
      grey: {
        ...t,
        50: "#F7F9FC",
        100: "#EDF1F7",
        200: "#E4E9F2",
        300: "#C5CEE0",
        400: "#8F9BB3",
        500: "#2E3A59",
        600: "#222B45",
        700: "#192038",
        800: "#151A30",
        900: "#101426"
      }
    },
    // ── Shape ─────────────────────────────────────────────────────────────────
    // MUI usa este valor base y lo multiplica internamente para cada componente
    // (Button: ×1, Card: ×2, Dialog: ×3, etc.). No sobreescribir por componente.
    shape: {
      borderRadius: 4
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
      h6: { fontFamily: "'Outfit', sans-serif" }
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
          baseClassName: "material-symbols-outlined"
        }
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
          root: ({ theme: e, ownerState: f }) => ({
            ...f.variant === "elevation" && (f.elevation ?? 1) <= 2 && {
              boxShadow: "none",
              border: `1px solid ${e.palette.divider}`
            }
          })
        }
      },
      // ── Card: siempre flat con borde ────────────────────────────────────────
      // Card extiende Paper. Este override es explícito para garantizar que
      // todas las Cards (independientemente del elevation prop) sean flat.
      MuiCard: {
        styleOverrides: {
          root: ({ theme: e }) => ({
            boxShadow: "none",
            border: `1px solid ${e.palette.divider}`
          })
        }
      },
      // ── AppBar: flat con borde inferior ─────────────────────────────────────
      // AppBar usa elevation=4 por defecto (fuera del threshold de Paper).
      // Se sobreescribe explícitamente para un estilo de app bar limpio.
      MuiAppBar: {
        defaultProps: {
          elevation: 0
        },
        styleOverrides: {
          root: ({ theme: e }) => ({
            boxShadow: "none",
            borderBottom: `1px solid ${e.palette.divider}`
          })
        }
      },
      // ── Button: sin sombra, sentence case, peso 600 ─────────────────────────
      // disableElevation: elimina la sombra de los botones "contained" de forma declarativa.
      // styleOverrides: cubre todos los estados (default, hover, active, focus) por seguridad.
      // textTransform: 'none' → el texto respeta el casing del código (no force uppercase).
      // fontWeight 600 → etiquetas más legibles y con más presencia visual.
      MuiButton: {
        defaultProps: {
          disableElevation: !0
        },
        styleOverrides: {
          root: {
            textTransform: "none",
            fontWeight: 600,
            boxShadow: "none",
            "&:hover": { boxShadow: "none" },
            "&:active": { boxShadow: "none" },
            "&:focus": { boxShadow: "none" },
            "&.Mui-focusVisible": { boxShadow: "none" }
          }
        }
      },
      // ── TextField: variant filled por defecto ───────────────────────────────
      // El variant "filled" ofrece mejor affordance en formularios densos
      // vs. "outlined". Se puede sobreescribir por instancia con variant="outlined".
      MuiTextField: {
        defaultProps: {
          variant: "filled"
        }
      },
      // ── Alert: sin sombra ────────────────────────────────────────────────────
      MuiAlert: {
        styleOverrides: {
          root: {
            boxShadow: "none"
          }
        }
      },
      // ── Chip: sin sombra, peso 500 ───────────────────────────────────────────
      // fontWeight 500 → etiquetas más legibles que el 400 por defecto de MUI,
      // sin llegar al peso de los botones (600).
      MuiChip: {
        styleOverrides: {
          root: {
            boxShadow: "none",
            fontWeight: 500
          }
        }
      },
      // ── Accordion: superficie estática, flat con borde ──────────────────────
      // Accordion extiende Paper (elevation 1 por defecto). Se sobreescribe para
      // seguir la misma regla que Card: sin sombra, borde sutil con divider.
      // '&:before' es la línea divisoria nativa que MUI dibuja entre acordeones
      // apilados; se quita porque el borde ya cumple esa función visualmente.
      MuiAccordion: {
        styleOverrides: {
          root: ({ theme: e }) => ({
            boxShadow: "none",
            border: `1px solid ${e.palette.divider}`,
            "&:before": { display: "none" },
            "&:not(:last-of-type)": { borderBottom: "none" }
          })
        }
      }
    }
  });
}
const s = r("light");
export {
  r as createAppTheme,
  s as default
};
