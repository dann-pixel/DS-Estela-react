/**
 * ButtonsDemo
 * Muestra todas las combinaciones posibles de botones MUI:
 * - Button: variant × color × estado (normal, disabled, loading)
 * - IconButton: color × tamaño × estado
 * - ButtonGroup: variant × color × orientación
 */
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import CircularProgress from '@mui/material/CircularProgress'
import Divider from '@mui/material/Divider'
import Fab from '@mui/material/Fab'
import IconButton from '@mui/material/IconButton'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import Typography from '@mui/material/Typography'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import SendIcon from '@mui/icons-material/Send'
import FavoriteIcon from '@mui/icons-material/Favorite'
import AddIcon from '@mui/icons-material/Add'
import DownloadIcon from '@mui/icons-material/Download'
import NavigationIcon from '@mui/icons-material/Navigation'
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft'
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter'
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight'
import FormatBoldIcon from '@mui/icons-material/FormatBold'
import FormatItalicIcon from '@mui/icons-material/FormatItalic'
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined'
import { useState } from 'react'

const SEMANTIC_COLORS = ['primary', 'secondary', 'error', 'warning', 'info', 'success'] as const
const ALL_COLORS = [...SEMANTIC_COLORS, 'dark', 'inherit'] as const
const VARIANTS = ['contained', 'outlined', 'text'] as const
const SIZES = ['small', 'medium', 'large'] as const

type BtnColor = typeof ALL_COLORS[number]
type BtnVariant = typeof VARIANTS[number]

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

function ColorRow({ variant, color, disabled }: { variant: BtnVariant; color: BtnColor; disabled?: boolean }) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        px: 1.5,
        py: 1,
        borderRadius: 1,
        ...(color === 'inherit' && {
          bgcolor: 'primary.main',
        }),
      }}
    >
      <Typography
        variant="caption"
        sx={{
          fontFamily: 'monospace',
          width: 72,
          flexShrink: 0,
          color: color === 'inherit' ? 'white' : 'text.secondary',
          opacity: disabled ? 0.5 : 1,
        }}
      >
        {color}
        {disabled ? ' / dis.' : ''}
      </Typography>
      <Button
        variant={variant}
        color={color as any}
        disabled={disabled}
        size="small"
      >
        {cap(color)}
      </Button>
      <Button
        variant={variant}
        color={color as any}
        disabled={disabled}
        size="small"
        startIcon={<SendIcon />}
      >
        Con icono
      </Button>
      <Button
        variant={variant}
        color={color as any}
        disabled={disabled}
        size="small"
        endIcon={<DownloadIcon />}
      >
        End icon
      </Button>
    </Box>
  )
}

export default function ButtonsDemo() {
  const [loading, setLoading] = useState(false)
  const [alignment, setAlignment] = useState('left')
  const [formats, setFormats] = useState<string[]>(['bold'])

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
        Todas las combinaciones: variant × color × estado. Incluye colores semánticos, dark y inherit.
      </Typography>

      {/* 1. Variantes × Todos los colores × Estados */}
      {VARIANTS.map((variant) => (
        <Box key={variant} mb={4}>
          <Typography variant="h6" gutterBottom>
            variant=
            <Typography component="code" variant="inherit" sx={{ fontFamily: 'monospace' }}>
              "{variant}"
            </Typography>
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
            {ALL_COLORS.map((color) => (
              <Box key={color}>
                <ColorRow variant={variant} color={color} />
                <ColorRow variant={variant} color={color} disabled />
              </Box>
            ))}
          </Box>
          {variant !== 'text' && <Divider sx={{ mt: 3 }} />}
        </Box>
      ))}

      <Divider sx={{ my: 4 }} />

      {/* 2. Tamaños */}
      <Typography variant="h6" gutterBottom>Tamaños</Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 4 }}>
        {VARIANTS.map((variant) => (
          <Box key={variant} sx={{ display: 'flex', gap: 1, alignItems: 'center', flexWrap: 'wrap' }}>
            <Typography variant="caption" sx={{ fontFamily: 'monospace', width: 80, flexShrink: 0, color: 'text.secondary' }}>
              {variant}
            </Typography>
            {SIZES.map((size) => (
              <Button key={size} variant={variant} color="primary" size={size}>
                {cap(size)}
              </Button>
            ))}
          </Box>
        ))}
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* 3. Estados especiales */}
      <Typography variant="h6" gutterBottom>Estados especiales</Typography>
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center', mb: 4 }}>
        <Button variant="contained">Normal</Button>
        <Button variant="contained" disabled>Disabled</Button>
        <Button
          variant="contained"
          onClick={handleLoadingClick}
          disabled={loading}
          startIcon={loading ? <CircularProgress size={16} color="inherit" /> : undefined}
          sx={{ minWidth: 120 }}
        >
          {loading ? 'Cargando…' : 'Loading (2s)'}
        </Button>
        <Button variant="outlined" disabled>Outlined disabled</Button>
        <Button variant="text" disabled>Text disabled</Button>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* 4. IconButton — todos los colores */}
      <Typography variant="h6" gutterBottom>IconButton — todos los colores</Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 4 }}>
        {/* Normal */}
        <Box>
          <Typography variant="caption" color="text.secondary" display="block" mb={1}>Normal</Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center' }}>
            <IconButton color="default" title="default"><FavoriteIcon /></IconButton>
            {ALL_COLORS.filter(c => c !== 'inherit').map((color) => (
              <IconButton key={color} color={color as any} title={color}>
                <FavoriteIcon />
              </IconButton>
            ))}
            <Box sx={{ bgcolor: 'primary.main', borderRadius: '50%', display: 'inline-flex' }}>
              <IconButton color="inherit" title="inherit"><FavoriteIcon /></IconButton>
            </Box>
          </Box>
        </Box>

        {/* Disabled */}
        <Box>
          <Typography variant="caption" color="text.secondary" display="block" mb={1}>Disabled</Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center' }}>
            <IconButton color="default" disabled><FavoriteIcon /></IconButton>
            {ALL_COLORS.filter(c => c !== 'inherit').map((color) => (
              <IconButton key={color} color={color as any} disabled>
                <FavoriteIcon />
              </IconButton>
            ))}
            <IconButton color="inherit" disabled><FavoriteIcon /></IconButton>
          </Box>
        </Box>

        {/* Tamaños */}
        <Box>
          <Typography variant="caption" color="text.secondary" display="block" mb={1}>Tamaños (primary)</Typography>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            {SIZES.map((size) => (
              <IconButton key={size} size={size} color="primary" title={size}>
                <FavoriteIcon fontSize={size} />
              </IconButton>
            ))}
          </Box>
        </Box>

        {/* Variantes de acción */}
        <Box>
          <Typography variant="caption" color="text.secondary" display="block" mb={1}>Acciones comunes</Typography>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <IconButton color="primary"><AddIcon /></IconButton>
            <IconButton color="primary"><EditIcon /></IconButton>
            <IconButton color="error"><DeleteIcon /></IconButton>
            <IconButton color="success"><DownloadIcon /></IconButton>
            <IconButton color="dark"><DeleteIcon /></IconButton>
          </Box>
        </Box>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* 5. ButtonGroup */}
      <Typography variant="h6" gutterBottom>ButtonGroup</Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 4 }}>
        {VARIANTS.map((variant) => (
          <Box key={variant} sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
            <Typography variant="caption" sx={{ fontFamily: 'monospace', width: 80, flexShrink: 0, color: 'text.secondary' }}>
              {variant}
            </Typography>
            {SEMANTIC_COLORS.slice(0, 4).map((color) => (
              <ButtonGroup key={color} variant={variant} color={color} size="small">
                <Button>A</Button>
                <Button>B</Button>
                <Button>C</Button>
              </ButtonGroup>
            ))}
          </Box>
        ))}

        {/* Vertical */}
        <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap', mt: 1 }}>
          <Box>
            <Typography variant="caption" color="text.secondary" display="block" mb={1}>Vertical / contained</Typography>
            <ButtonGroup variant="contained" orientation="vertical" size="small">
              <Button>Arriba</Button>
              <Button>Medio</Button>
              <Button>Abajo</Button>
            </ButtonGroup>
          </Box>
          <Box>
            <Typography variant="caption" color="text.secondary" display="block" mb={1}>Vertical / outlined</Typography>
            <ButtonGroup variant="outlined" orientation="vertical" color="secondary" size="small">
              <Button>Arriba</Button>
              <Button>Medio</Button>
              <Button>Abajo</Button>
            </ButtonGroup>
          </Box>
          <Box>
            <Typography variant="caption" color="text.secondary" display="block" mb={1}>Disabled</Typography>
            <ButtonGroup variant="contained" disabled size="small">
              <Button>A</Button>
              <Button>B</Button>
              <Button>C</Button>
            </ButtonGroup>
          </Box>
        </Box>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* 6. ToggleButtonGroup */}
      <Typography variant="h6" gutterBottom>ToggleButtonGroup</Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mb: 4 }}>
        {/* Selección exclusiva */}
        <Box>
          <Typography variant="caption" color="text.secondary" display="block" mb={1}>
            Selección exclusiva (alignment)
          </Typography>
          <ToggleButtonGroup
            value={alignment}
            exclusive
            color="primary"
            size="small"
            onChange={(_, value) => value && setAlignment(value)}
            aria-label="alineación de texto"
          >
            <ToggleButton value="left" aria-label="alinear a la izquierda">
              <FormatAlignLeftIcon fontSize="small" />
            </ToggleButton>
            <ToggleButton value="center" aria-label="centrar">
              <FormatAlignCenterIcon fontSize="small" />
            </ToggleButton>
            <ToggleButton value="right" aria-label="alinear a la derecha">
              <FormatAlignRightIcon fontSize="small" />
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>

        {/* Selección múltiple */}
        <Box>
          <Typography variant="caption" color="text.secondary" display="block" mb={1}>
            Selección múltiple (formats)
          </Typography>
          <ToggleButtonGroup
            value={formats}
            onChange={(_, value) => setFormats(value)}
            size="small"
            aria-label="formato de texto"
          >
            <ToggleButton value="bold" aria-label="negrita">
              <FormatBoldIcon fontSize="small" />
            </ToggleButton>
            <ToggleButton value="italic" aria-label="cursiva">
              <FormatItalicIcon fontSize="small" />
            </ToggleButton>
            <ToggleButton value="underline" aria-label="subrayado">
              <FormatUnderlinedIcon fontSize="small" />
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>

        {/* Disabled */}
        <Box>
          <Typography variant="caption" color="text.secondary" display="block" mb={1}>Disabled</Typography>
          <ToggleButtonGroup value="left" exclusive disabled size="small">
            <ToggleButton value="left"><FormatAlignLeftIcon fontSize="small" /></ToggleButton>
            <ToggleButton value="center"><FormatAlignCenterIcon fontSize="small" /></ToggleButton>
            <ToggleButton value="right"><FormatAlignRightIcon fontSize="small" /></ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* 7. Fab */}
      <Typography variant="h6" gutterBottom>Fab (Floating Action Button)</Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mb: 2 }}>
        <Box>
          <Typography variant="caption" color="text.secondary" display="block" mb={1}>Colores</Typography>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <Fab color="primary" aria-label="agregar"><AddIcon /></Fab>
            <Fab color="secondary" aria-label="editar"><EditIcon /></Fab>
            <Fab color="dark" aria-label="eliminar"><DeleteIcon /></Fab>
            <Fab disabled aria-label="favorito"><FavoriteIcon /></Fab>
          </Box>
        </Box>

        <Box>
          <Typography variant="caption" color="text.secondary" display="block" mb={1}>Tamaños</Typography>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <Fab size="small" color="primary" aria-label="agregar"><AddIcon /></Fab>
            <Fab size="medium" color="primary" aria-label="agregar"><AddIcon /></Fab>
            <Fab size="large" color="primary" aria-label="agregar"><AddIcon /></Fab>
          </Box>
        </Box>

        <Box>
          <Typography variant="caption" color="text.secondary" display="block" mb={1}>Extended</Typography>
          <Fab variant="extended" color="primary">
            <NavigationIcon sx={{ mr: 1 }} />
            Navegar
          </Fab>
        </Box>
      </Box>
    </Box>
  )
}
