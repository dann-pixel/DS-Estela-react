/**
 * ColorsDemo
 * Muestra la paleta de colores del theme de MUI:
 * - Colores semánticos (primary, secondary, error, warning, info, success)
 * - Grises del sistema
 * - Colores de texto y fondo
 */
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useTheme, lighten, darken } from '@mui/material/styles'

type PaletteName = 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success'

// Tonos numéricos para la paleta Grey (blueGrey tiene 50–900 definidos)
const TONES = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900] as const

// Rampa de 10 tonos generada desde el color `main` de cada paleta
// usando las utilidades nativas de MUI (lighten / darken)
const RAMP_STEPS: { label: string; generate: (c: string) => string }[] = [
  { label: '50',  generate: (c) => lighten(c, 0.9) },
  { label: '100', generate: (c) => lighten(c, 0.75) },
  { label: '200', generate: (c) => lighten(c, 0.6) },
  { label: '300', generate: (c) => lighten(c, 0.45) },
  { label: '400', generate: (c) => lighten(c, 0.25) },
  { label: '500', generate: (c) => c },
  { label: '600', generate: (c) => darken(c, 0.15) },
  { label: '700', generate: (c) => darken(c, 0.3) },
  { label: '800', generate: (c) => darken(c, 0.45) },
  { label: '900', generate: (c) => darken(c, 0.6) },
]

const PALETTES: { name: PaletteName; label: string }[] = [
  { name: 'primary', label: 'Primary' },
  { name: 'secondary', label: 'Secondary' },
  { name: 'error', label: 'Error' },
  { name: 'warning', label: 'Warning' },
  { name: 'info', label: 'Info' },
  { name: 'success', label: 'Success' },
]

// Tokens de color semánticos principales de MUI
const SEMANTIC_TOKENS = [
  { key: 'main', label: 'main' },
  { key: 'light', label: 'light' },
  { key: 'dark', label: 'dark' },
  { key: 'contrastText', label: 'contrastText' },
] as const

export default function ColorsDemo() {
  const theme = useTheme()

  return (
    <Box>
      <Typography variant="h4" gutterBottom fontWeight={700}>
        Colors
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={4}>
        Paleta de colores del theme por defecto de MUI. Cada paleta semántica expone
        tokens <code>main</code>, <code>light</code>, <code>dark</code> y{' '}
        <code>contrastText</code> para usar directamente en componentes.
      </Typography>

      {/* Paletas semánticas con tokens principales */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
        {PALETTES.map(({ name, label }) => (
          <Box key={name}>
            <Typography variant="subtitle2" fontWeight={700} mb={1.5} textTransform="uppercase">
              {label}
            </Typography>

            {/* Chips de main / light / dark / contrastText */}
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
              {SEMANTIC_TOKENS.map(({ key, label: tokenLabel }) => {
                const color = theme.palette[name][key]
                const isBg = key !== 'contrastText'
                return (
                  <Box
                    key={key}
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 0.5,
                      minWidth: 90,
                    }}
                  >
                    <Box
                      sx={{
                        width: 80,
                        height: 48,
                        borderRadius: 1.5,
                        bgcolor: isBg ? color : 'background.paper',
                        border: '1px solid',
                        borderColor: 'divider',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {key === 'contrastText' && (
                        <Box
                          sx={{
                            width: 40,
                            height: 40,
                            borderRadius: 1,
                            bgcolor: theme.palette[name].main,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <Typography
                            variant="caption"
                            sx={{ color: color, fontWeight: 700, fontSize: 10 }}
                          >
                            Aa
                          </Typography>
                        </Box>
                      )}
                    </Box>
                    <Typography variant="caption" color="text.secondary">
                      {tokenLabel}
                    </Typography>
                    <Typography
                      variant="caption"
                      color="text.disabled"
                      sx={{ fontFamily: 'monospace', fontSize: 10 }}
                    >
                      {typeof color === 'string' ? color.toLowerCase() : ''}
                    </Typography>
                  </Box>
                )
              })}
            </Box>

            {/* Rampa de tonos 50–900 generada desde main */}
            <Box sx={{ display: 'flex', borderRadius: 2, overflow: 'hidden', height: 36 }}>
              {RAMP_STEPS.map(({ label: toneLabel, generate }) => {
                const bg = generate(theme.palette[name].main)
                const toneNum = parseInt(toneLabel)
                return (
                  <Box
                    key={toneLabel}
                    sx={{
                      flex: 1,
                      bgcolor: bg,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    title={`${name}[${toneLabel}]: ${bg}`}
                  >
                    <Typography
                      variant="caption"
                      sx={{
                        fontSize: 9,
                        color: toneNum < 500 ? theme.palette.common.black : theme.palette.common.white,
                        opacity: toneNum < 500 ? 0.6 : 0.8,
                        fontWeight: 600,
                      }}
                    >
                      {toneLabel}
                    </Typography>
                  </Box>
                )
              })}
            </Box>
          </Box>
        ))}

        {/* Grises */}
        <Box>
          <Typography variant="subtitle2" fontWeight={700} mb={1.5} textTransform="uppercase">
            Grey
          </Typography>
          <Box sx={{ display: 'flex', borderRadius: 2, overflow: 'hidden', height: 36 }}>
            {TONES.map((tone) => {
              const bg = theme.palette.grey[tone]
              return (
                <Box
                  key={tone}
                  sx={{
                    flex: 1,
                    bgcolor: bg,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  title={`grey[${tone}]: ${bg}`}
                >
                  <Typography
                    variant="caption"
                    sx={{
                      fontSize: 9,
                      color: tone < 500 ? theme.palette.common.black : theme.palette.common.white,
                      opacity: tone < 500 ? 0.6 : 0.8,
                      fontWeight: 600,
                    }}
                  >
                    {tone}
                  </Typography>
                </Box>
              )
            })}
          </Box>
        </Box>

        {/* Tokens de texto y fondo */}
        <Box>
          <Typography variant="subtitle2" fontWeight={700} mb={2} textTransform="uppercase">
            Text &amp; Background Tokens
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            {[
              { label: 'text.primary', color: theme.palette.text.primary },
              { label: 'text.secondary', color: theme.palette.text.secondary },
              { label: 'text.disabled', color: theme.palette.text.disabled },
              { label: 'background.default', color: theme.palette.background.default },
              { label: 'background.paper', color: theme.palette.background.paper },
              { label: 'divider', color: theme.palette.divider },
            ].map(({ label, color }) => (
              <Box
                key={label}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                  p: 1.5,
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 2,
                  minWidth: 200,
                }}
              >
                <Box
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: 1,
                    bgcolor: color,
                    border: '1px solid',
                    borderColor: 'divider',
                    flexShrink: 0,
                  }}
                />
                <Box>
                  <Typography variant="caption" display="block" fontFamily="monospace">
                    {label}
                  </Typography>
                  <Typography variant="caption" color="text.disabled" fontFamily="monospace">
                    {color}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
