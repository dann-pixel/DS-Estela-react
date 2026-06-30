/**
 * LayoutDemo
 * Muestra los primitivos de layout de MUI v6:
 * - Container: centra contenido y limita el ancho máximo
 * - Stack: layouts unidimensionales (fila o columna) con spacing/divider
 * - Grid (Grid v2): layouts bidimensionales basados en 12 columnas
 */
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid2'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

function DemoBlock({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        px: 2,
        py: 1.5,
        bgcolor: 'action.hover',
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 1,
        textAlign: 'center',
      }}
    >
      <Typography variant="body2" color="text.secondary">
        {children}
      </Typography>
    </Box>
  )
}

export default function LayoutDemo() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom fontWeight={700}>
        Layout
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={4}>
        Primitivos de layout de MUI: Container para centrar y limitar ancho, Stack para
        arreglos unidimensionales (fila/columna) y Grid para layouts bidimensionales de 12 columnas.
      </Typography>

      {/* 1. Container */}
      <Typography variant="h6" gutterBottom>Container</Typography>
      <Typography variant="body2" color="text.secondary" mb={2}>
        Centra el contenido horizontalmente y limita su ancho según <code>maxWidth</code>.
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 4 }}>
        {(['sm', 'md', 'lg'] as const).map((maxWidth) => (
          <Box key={maxWidth} sx={{ bgcolor: 'background.default', border: '1px dashed', borderColor: 'divider', borderRadius: 1, py: 2 }}>
            <Typography variant="caption" sx={{ fontFamily: 'monospace', display: 'block', textAlign: 'center', mb: 1, color: 'text.secondary' }}>
              maxWidth="{maxWidth}"
            </Typography>
            <Container maxWidth={maxWidth}>
              <DemoBlock>Contenido centrado</DemoBlock>
            </Container>
          </Box>
        ))}
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* 2. Stack */}
      <Typography variant="h6" gutterBottom>Stack</Typography>
      <Typography variant="body2" color="text.secondary" mb={2}>
        Arreglo unidimensional con <code>spacing</code> y <code>divider</code> opcional.
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, mb: 4 }}>
        <Box>
          <Typography variant="caption" color="text.secondary" display="block" mb={1}>
            direction="column" (default) — spacing=2
          </Typography>
          <Stack spacing={2} sx={{ maxWidth: 320 }}>
            <DemoBlock>Item 1</DemoBlock>
            <DemoBlock>Item 2</DemoBlock>
            <DemoBlock>Item 3</DemoBlock>
          </Stack>
        </Box>

        <Box>
          <Typography variant="caption" color="text.secondary" display="block" mb={1}>
            direction="row" — spacing=2
          </Typography>
          <Stack direction="row" spacing={2}>
            <DemoBlock>Item 1</DemoBlock>
            <DemoBlock>Item 2</DemoBlock>
            <DemoBlock>Item 3</DemoBlock>
          </Stack>
        </Box>

        <Box>
          <Typography variant="caption" color="text.secondary" display="block" mb={1}>
            direction="row" con divider
          </Typography>
          <Stack direction="row" spacing={2} divider={<Divider orientation="vertical" flexItem />}>
            <DemoBlock>Item 1</DemoBlock>
            <DemoBlock>Item 2</DemoBlock>
            <DemoBlock>Item 3</DemoBlock>
          </Stack>
        </Box>

        <Box>
          <Typography variant="caption" color="text.secondary" display="block" mb={1}>
            Responsive: column en xs, row en sm+
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 2 }}>
            <DemoBlock>Item 1</DemoBlock>
            <DemoBlock>Item 2</DemoBlock>
            <DemoBlock>Item 3</DemoBlock>
          </Stack>
        </Box>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* 3. Grid */}
      <Typography variant="h6" gutterBottom>Grid (Grid v2)</Typography>
      <Typography variant="body2" color="text.secondary" mb={2}>
        Layout bidimensional de 12 columnas. Usar siempre <code>@mui/material/Grid2</code> —
        el Grid legado está deprecado en MUI v6.
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <Box>
          <Typography variant="caption" color="text.secondary" display="block" mb={1}>
            size={'{'} xs: 12, sm: 6, md: 4 {'}'} — 3 columnas en desktop
          </Typography>
          <Grid container spacing={2}>
            {[1, 2, 3].map((n) => (
              <Grid key={n} size={{ xs: 12, sm: 6, md: 4 }}>
                <DemoBlock>Columna {n}</DemoBlock>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box>
          <Typography variant="caption" color="text.secondary" display="block" mb={1}>
            Columnas asimétricas: size={'{'} xs: 12, md: 8 {'}'} + size={'{'} xs: 12, md: 4 {'}'}
          </Typography>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 8 }}>
              <DemoBlock>Contenido principal (md: 8)</DemoBlock>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <DemoBlock>Sidebar (md: 4)</DemoBlock>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  )
}
