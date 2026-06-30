/**
 * TypographyDemo
 * Muestra todas las variantes tipográficas del theme de MUI.
 * Útil para revisar la escala de texto antes de aplicar un theme custom.
 */
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'

// Variantes oficiales de MUI Typography
const variants = [
  { variant: 'h1', label: 'h1 · Heading 1' },
  { variant: 'h2', label: 'h2 · Heading 2' },
  { variant: 'h3', label: 'h3 · Heading 3' },
  { variant: 'h4', label: 'h4 · Heading 4' },
  { variant: 'h5', label: 'h5 · Heading 5' },
  { variant: 'h6', label: 'h6 · Heading 6' },
  { variant: 'subtitle1', label: 'subtitle1 · Subtítulo grande' },
  { variant: 'subtitle2', label: 'subtitle2 · Subtítulo pequeño' },
  { variant: 'body1', label: 'body1 · Texto principal' },
  { variant: 'body2', label: 'body2 · Texto secundario' },
  { variant: 'button', label: 'button · Botón' },
  { variant: 'caption', label: 'caption · Pie de foto' },
  { variant: 'overline', label: 'overline · Etiqueta' },
] as const

export default function TypographyDemo() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Typography
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={4}>
        Escala tipográfica completa del theme de MUI. Cada variante tiene un tamaño,
        peso y line-height predefinidos que se pueden sobreescribir en el theme.
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {variants.map(({ variant, label }, index) => (
          <Box key={variant}>
            {/* Muestra la variante junto a su etiqueta identificadora */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'baseline',
                gap: 2,
                flexWrap: 'wrap',
              }}
            >
              <Typography variant={variant} sx={{ flexShrink: 0 }}>
                {label}
              </Typography>
              <Typography variant="caption" color="text.disabled" sx={{ fontFamily: 'monospace' }}>
                variant="{variant}"
              </Typography>
            </Box>
            {index < variants.length - 1 && <Divider sx={{ mt: 2 }} />}
          </Box>
        ))}
      </Box>

      {/* Ejemplo de texto en contexto */}
      <Box
        sx={{
          mt: 6,
          p: 3,
          bgcolor: 'grey.50',
          borderRadius: 2,
          border: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Typography variant="overline" color="text.secondary">
          Ejemplo en contexto
        </Typography>
        <Typography variant="h5" gutterBottom mt={1}>
          Título de sección representativo
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          Subtítulo que aporta contexto adicional al contenido principal
        </Typography>
        <Typography variant="body1" paragraph>
          Este es un párrafo de cuerpo principal (body1). Se usa para el texto de lectura
          principal en la interfaz. El interlineado y el tamaño están optimizados para
          la legibilidad en pantallas digitales.
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Texto secundario (body2) para notas, metadatos o información de apoyo menos relevante.
        </Typography>
        <Typography variant="caption" display="block" color="text.disabled" mt={1}>
          caption · Publicado el 26 de febrero de 2026
        </Typography>
      </Box>
    </Box>
  )
}
