/**
 * ButtonsDemo
 * Muestra todas las variantes, tamaños y estados de los botones de MUI:
 * - Button (contained, outlined, text) × colores semánticos
 * - IconButton
 * - ButtonGroup
 * - Estados: normal, disabled, loading
 */
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import SendIcon from '@mui/icons-material/Send'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { useState } from 'react'
import CircularProgress from '@mui/material/CircularProgress'

const COLORS = ['primary', 'secondary', 'error', 'warning', 'info', 'success'] as const
const VARIANTS = ['contained', 'outlined', 'text'] as const
const SIZES = ['small', 'medium', 'large'] as const

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

export default function ButtonsDemo() {
  const [loading, setLoading] = useState(false)

  // Simula un loading button sin @mui/lab
  const handleLoadingClick = () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 2000)
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom fontWeight={700}>
        Buttons
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={4}>
        Variantes, tamaños, colores y estados de los botones de MUI.
        Listos para reemplazar colores con el theme custom.
      </Typography>

      {/* 1. Variantes × colores */}
      <Typography variant="h6" gutterBottom>
        Variantes × Colores
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 4 }}>
        {VARIANTS.map((variant) => (
          <Box key={variant}>
            <Typography variant="caption" color="text.secondary" display="block" mb={1} fontFamily="monospace">
              variant="{variant}"
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {COLORS.map((color) => (
                <Button key={color} variant={variant} color={color}>
                  {cap(color)}
                </Button>
              ))}
            </Box>
          </Box>
        ))}
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* 2. Tamaños */}
      <Typography variant="h6" gutterBottom>
        Tamaños
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap', mb: 4 }}>
        {SIZES.map((size) => (
          <Button key={size} variant="contained" size={size}>
            {cap(size)}
          </Button>
        ))}
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* 3. Con iconos */}
      <Typography variant="h6" gutterBottom>
        Con Iconos
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 4 }}>
        <Button variant="contained" startIcon={<SendIcon />}>
          Enviar
        </Button>
        <Button variant="outlined" endIcon={<EditIcon />}>
          Editar
        </Button>
        <Button variant="text" startIcon={<DeleteIcon />} color="error">
          Eliminar
        </Button>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* 4. Estados */}
      <Typography variant="h6" gutterBottom>
        Estados
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 4 }}>
        <Button variant="contained">Normal</Button>
        <Button variant="contained" disabled>
          Disabled
        </Button>
        {/* Loading simulado sin @mui/lab */}
        <Button
          variant="contained"
          onClick={handleLoadingClick}
          disabled={loading}
          startIcon={loading ? <CircularProgress size={16} color="inherit" /> : undefined}
          sx={{ minWidth: 110 }}
        >
          {loading ? 'Cargando…' : 'Cargar (2s)'}
        </Button>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* 5. IconButton */}
      <Typography variant="h6" gutterBottom>
        IconButton
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center', mb: 4 }}>
        {SIZES.map((size) => (
          <IconButton key={size} size={size} color="primary" title={size}>
            <FavoriteIcon fontSize={size} />
          </IconButton>
        ))}
        <IconButton color="error">
          <DeleteIcon />
        </IconButton>
        <IconButton disabled>
          <EditIcon />
        </IconButton>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* 6. Color custom: dark */}
      <Typography variant="h6" gutterBottom>
        Color custom:{' '}
        <Typography
          component="code"
          variant="caption"
          sx={{ fontFamily: 'monospace' }}
        >
          dark
        </Typography>
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={2}>
        Extendido via module augmentation — disponible en Button, IconButton, Chip y SvgIcon.
      </Typography>
      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 4 }}>
        <Button variant="contained" color="dark">Contained</Button>
        <Button variant="outlined" color="dark">Outlined</Button>
        <Button variant="text" color="dark">Text</Button>
        <Button variant="contained" color="dark" disabled>Disabled</Button>
        <IconButton color="dark"><DeleteIcon /></IconButton>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* 7. ButtonGroup */}
      <Typography variant="h6" gutterBottom>
        ButtonGroup
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 4 }}>
        <ButtonGroup variant="contained">
          <Button>Uno</Button>
          <Button>Dos</Button>
          <Button>Tres</Button>
        </ButtonGroup>
        <ButtonGroup variant="outlined" color="secondary">
          <Button>Uno</Button>
          <Button>Dos</Button>
          <Button>Tres</Button>
        </ButtonGroup>
        <ButtonGroup variant="text" orientation="vertical" sx={{ width: 'fit-content' }}>
          <Button>Arriba</Button>
          <Button>Medio</Button>
          <Button>Abajo</Button>
        </ButtonGroup>
      </Box>

    </Box>
  )
}
