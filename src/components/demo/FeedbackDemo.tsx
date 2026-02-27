/**
 * FeedbackDemo
 * Muestra los componentes de feedback de MUI:
 * - Alert (variantes y severidades)
 * - Snackbar + Alert
 * - CircularProgress
 * - LinearProgress
 * - Skeleton
 */
import { useState } from 'react'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Divider from '@mui/material/Divider'
import LinearProgress from '@mui/material/LinearProgress'
import Skeleton from '@mui/material/Skeleton'
import Snackbar from '@mui/material/Snackbar'
import Typography from '@mui/material/Typography'

const SEVERITIES = ['success', 'info', 'warning', 'error'] as const

export default function FeedbackDemo() {
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarSeverity, setSnackbarSeverity] = useState<typeof SEVERITIES[number]>('info')

  const openSnackbar = (severity: typeof SEVERITIES[number]) => {
    setSnackbarSeverity(severity)
    setSnackbarOpen(true)
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom fontWeight={700}>
        Feedback
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={4}>
        Componentes para comunicar estados, procesos y mensajes al usuario:
        alertas, snackbars, indicadores de progreso y skeletons de carga.
      </Typography>

      {/* 1. Alert — variantes × severidades */}
      <Typography variant="h6" gutterBottom>
        Alert — Variantes
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 4 }}>
        {(['filled', 'outlined', 'standard'] as const).map((variant) => (
          <Box key={variant}>
            <Typography variant="caption" color="text.secondary" display="block" mb={1} fontFamily="monospace">
              variant="{variant}"
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {SEVERITIES.map((severity) => (
                <Alert key={severity} variant={variant} severity={severity}>
                  {severity.charAt(0).toUpperCase() + severity.slice(1)} — mensaje de estado {variant}
                </Alert>
              ))}
            </Box>
          </Box>
        ))}
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* 2. Alert con título */}
      <Typography variant="h6" gutterBottom>
        Alert con título
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 4 }}>
        <Alert severity="success">
          <AlertTitle>Éxito</AlertTitle>
          Los datos se han guardado correctamente.
        </Alert>
        <Alert severity="error" onClose={() => {}}>
          <AlertTitle>Error</AlertTitle>
          No se pudo completar la operación. Por favor intenta de nuevo.
        </Alert>
        <Alert severity="warning" action={<Button color="inherit" size="small">DESHACER</Button>}>
          <AlertTitle>Atención</AlertTitle>
          Este cambio afectará a todos los usuarios del proyecto.
        </Alert>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* 3. Snackbar */}
      <Typography variant="h6" gutterBottom>
        Snackbar
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 4 }}>
        {SEVERITIES.map((severity) => (
          <Button
            key={severity}
            variant="outlined"
            onClick={() => openSnackbar(severity)}
          >
            {severity}
          </Button>
        ))}
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          Este es un Snackbar con severidad: {snackbarSeverity}
        </Alert>
      </Snackbar>

      <Divider sx={{ my: 4 }} />

      {/* 4. CircularProgress */}
      <Typography variant="h6" gutterBottom>
        CircularProgress
      </Typography>
      <Box sx={{ display: 'flex', gap: 4, alignItems: 'center', flexWrap: 'wrap', mb: 4 }}>
        {/* Indeterminado */}
        <Box sx={{ textAlign: 'center' }}>
          <CircularProgress />
          <Typography variant="caption" display="block" mt={1}>Indeterminado</Typography>
        </Box>
        {/* Determinado */}
        {[25, 50, 75, 100].map((v) => (
          <Box key={v} sx={{ textAlign: 'center' }}>
            <CircularProgress variant="determinate" value={v} color={v === 100 ? 'success' : 'primary'} />
            <Typography variant="caption" display="block" mt={1}>{v}%</Typography>
          </Box>
        ))}
        {/* Tamaños */}
        {[24, 40, 56].map((size) => (
          <Box key={size} sx={{ textAlign: 'center' }}>
            <CircularProgress size={size} color="secondary" />
            <Typography variant="caption" display="block" mt={1}>{size}px</Typography>
          </Box>
        ))}
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* 5. LinearProgress */}
      <Typography variant="h6" gutterBottom>
        LinearProgress
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 4, maxWidth: 480 }}>
        <Box>
          <Typography variant="caption" color="text.secondary" mb={0.5} display="block">Indeterminado</Typography>
          <LinearProgress />
        </Box>
        {[30, 60, 90].map((v) => (
          <Box key={v}>
            <Typography variant="caption" color="text.secondary" mb={0.5} display="block">
              Determinado — {v}%
            </Typography>
            <LinearProgress
              variant="determinate"
              value={v}
              color={v >= 90 ? 'success' : v >= 60 ? 'warning' : 'primary'}
            />
          </Box>
        ))}
        <Box>
          <Typography variant="caption" color="text.secondary" mb={0.5} display="block">Buffer</Typography>
          <LinearProgress variant="buffer" value={60} valueBuffer={80} />
        </Box>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* 6. Skeleton */}
      <Typography variant="h6" gutterBottom>
        Skeleton
      </Typography>
      <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap', mb: 2 }}>
        {/* Skeleton de tarjeta */}
        <Box sx={{ width: 220 }}>
          <Typography variant="caption" color="text.secondary" display="block" mb={1}>
            Skeleton de Card
          </Typography>
          <Skeleton variant="rectangular" width="100%" height={118} sx={{ borderRadius: 1 }} />
          <Box sx={{ pt: 1 }}>
            <Skeleton />
            <Skeleton width="60%" />
            <Skeleton variant="text" width="80%" />
          </Box>
        </Box>
        {/* Skeleton de perfil */}
        <Box sx={{ width: 220 }}>
          <Typography variant="caption" color="text.secondary" display="block" mb={1}>
            Skeleton de Perfil
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Skeleton variant="circular" width={40} height={40} />
            <Box sx={{ flex: 1 }}>
              <Skeleton width="70%" />
              <Skeleton width="50%" />
            </Box>
          </Box>
          <Skeleton variant="rectangular" width="100%" height={60} sx={{ mt: 1, borderRadius: 1 }} />
        </Box>
        {/* Formas de Skeleton */}
        <Box>
          <Typography variant="caption" color="text.secondary" display="block" mb={1}>
            Variantes de forma
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, alignItems: 'flex-start' }}>
            <Skeleton variant="text" width={180} />
            <Skeleton variant="circular" width={40} height={40} />
            <Skeleton variant="rectangular" width={180} height={40} />
            <Skeleton variant="rounded" width={180} height={40} />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
