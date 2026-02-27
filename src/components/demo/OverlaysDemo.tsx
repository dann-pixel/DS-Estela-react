/**
 * OverlaysDemo
 * Muestra los componentes de tipo overlay de MUI:
 * - Dialog (Modal)
 * - Drawer (temporal y permanente)
 * - Tooltip (variantes y posiciones)
 * - Popover
 * - Menu
 */
import { useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Popover from '@mui/material/Popover'
import TextField from '@mui/material/TextField'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import CloseIcon from '@mui/icons-material/Close'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import ContentCutIcon from '@mui/icons-material/ContentCut'
import ContentPasteIcon from '@mui/icons-material/ContentPaste'
import HomeIcon from '@mui/icons-material/Home'
import InboxIcon from '@mui/icons-material/Inbox'
import SettingsIcon from '@mui/icons-material/Settings'

// Posiciones de tooltip a mostrar
const TOOLTIP_PLACEMENTS = [
  'top-start', 'top', 'top-end',
  'left', 'right',
  'bottom-start', 'bottom', 'bottom-end',
] as const

export default function OverlaysDemo() {
  // Dialog state
  const [dialogOpen, setDialogOpen] = useState(false)
  const [formDialogOpen, setFormDialogOpen] = useState(false)

  // Drawer state
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [drawerAnchor, setDrawerAnchor] = useState<'left' | 'right' | 'top' | 'bottom'>('left')

  // Popover state
  const [popoverAnchor, setPopoverAnchor] = useState<HTMLButtonElement | null>(null)

  // Menu state
  const [menuAnchor, setMenuAnchor] = useState<HTMLButtonElement | null>(null)

  return (
    <Box>
      <Typography variant="h4" gutterBottom fontWeight={700}>
        Overlays
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={4}>
        Componentes que se superponen al contenido principal: diálogos, cajones laterales,
        tooltips, popovers y menús contextuales.
      </Typography>

      {/* 1. Dialog */}
      <Typography variant="h6" gutterBottom>
        Dialog
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 4 }}>
        {/* Dialog simple */}
        <Button variant="outlined" onClick={() => setDialogOpen(true)}>
          Abrir diálogo simple
        </Button>
        <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
          <DialogTitle>
            Confirmar acción
            <IconButton
              aria-label="close"
              onClick={() => setDialogOpen(false)}
              sx={{ position: 'absolute', right: 8, top: 8 }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              ¿Estás seguro de que deseas continuar con esta acción?
              Esta operación no se puede deshacer una vez confirmada.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDialogOpen(false)}>Cancelar</Button>
            <Button onClick={() => setDialogOpen(false)} variant="contained" color="error">
              Confirmar
            </Button>
          </DialogActions>
        </Dialog>

        {/* Dialog con formulario */}
        <Button variant="outlined" onClick={() => setFormDialogOpen(true)}>
          Diálogo con formulario
        </Button>
        <Dialog
          open={formDialogOpen}
          onClose={() => setFormDialogOpen(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Crear nuevo proyecto</DialogTitle>
          <DialogContent>
            <DialogContentText mb={2}>
              Completa los datos para crear un nuevo proyecto en el sistema.
            </DialogContentText>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField label="Nombre del proyecto" fullWidth size="small" />
              <TextField label="Descripción" fullWidth size="small" multiline rows={3} />
              <TextField label="URL del repositorio" fullWidth size="small" />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setFormDialogOpen(false)}>Cancelar</Button>
            <Button onClick={() => setFormDialogOpen(false)} variant="contained">
              Crear
            </Button>
          </DialogActions>
        </Dialog>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* 2. Drawer */}
      <Typography variant="h6" gutterBottom>
        Drawer
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 4 }}>
        {(['left', 'right', 'top', 'bottom'] as const).map((anchor) => (
          <Button
            key={anchor}
            variant="outlined"
            onClick={() => { setDrawerAnchor(anchor); setDrawerOpen(true) }}
          >
            Drawer {anchor}
          </Button>
        ))}
      </Box>
      <Drawer
        anchor={drawerAnchor}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box
          sx={{
            width: ['top', 'bottom'].includes(drawerAnchor) ? 'auto' : 280,
            p: 2,
          }}
          role="presentation"
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">Menú lateral</Typography>
            <IconButton onClick={() => setDrawerOpen(false)} size="small">
              <CloseIcon />
            </IconButton>
          </Box>
          <Divider />
          <List>
            {[
              { text: 'Inicio', icon: <HomeIcon /> },
              { text: 'Bandeja', icon: <InboxIcon /> },
              { text: 'Configuración', icon: <SettingsIcon /> },
            ].map(({ text, icon }) => (
              <ListItem key={text} disablePadding>
                <ListItemButton onClick={() => setDrawerOpen(false)}>
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      <Divider sx={{ my: 4 }} />

      {/* 3. Tooltips */}
      <Typography variant="h6" gutterBottom>
        Tooltip — Posiciones
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, auto)',
          gap: 2,
          width: 'fit-content',
          mb: 4,
        }}
      >
        {TOOLTIP_PLACEMENTS.map((placement) => (
          <Tooltip key={placement} title={`placement="${placement}"`} placement={placement} arrow>
            <Button variant="outlined" size="small" sx={{ fontSize: 11, minWidth: 110 }}>
              {placement}
            </Button>
          </Tooltip>
        ))}
      </Box>

      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 4 }}>
        <Tooltip title="Deshabilitado" disableHoverListener>
          <span>
            <Button disabled>No tiene tooltip</Button>
          </span>
        </Tooltip>
        <Tooltip title="Con flecha" arrow>
          <Button variant="contained">Con arrow</Button>
        </Tooltip>
        <Tooltip
          title={
            <Box>
              <Typography variant="caption" fontWeight={700}>Tooltip enriquecido</Typography>
              <Typography variant="caption" display="block">Puede contener JSX</Typography>
            </Box>
          }
          arrow
        >
          <Button variant="outlined">Tooltip JSX</Button>
        </Tooltip>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* 4. Popover */}
      <Typography variant="h6" gutterBottom>
        Popover
      </Typography>
      <Box sx={{ mb: 4 }}>
        <Button
          variant="outlined"
          onClick={(e) => setPopoverAnchor(e.currentTarget)}
        >
          Abrir Popover
        </Button>
        <Popover
          open={Boolean(popoverAnchor)}
          anchorEl={popoverAnchor}
          onClose={() => setPopoverAnchor(null)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        >
          <Box sx={{ p: 2, maxWidth: 280 }}>
            <Typography variant="subtitle2" fontWeight={700} gutterBottom>
              ¿Qué es un Popover?
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Un Popover es un diálogo flotante anclado a un elemento.
              Se usa para mostrar información adicional sin interrumpir el flujo.
            </Typography>
            <Button size="small" sx={{ mt: 1 }} onClick={() => setPopoverAnchor(null)}>
              Cerrar
            </Button>
          </Box>
        </Popover>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* 5. Menu */}
      <Typography variant="h6" gutterBottom>
        Menu
      </Typography>
      <Box>
        <Button
          variant="outlined"
          onClick={(e) => setMenuAnchor(e.currentTarget)}
        >
          Abrir menú contextual
        </Button>
        <Menu
          anchorEl={menuAnchor}
          open={Boolean(menuAnchor)}
          onClose={() => setMenuAnchor(null)}
        >
          <MenuItem onClick={() => setMenuAnchor(null)}>
            <ListItemIcon><ContentCutIcon fontSize="small" /></ListItemIcon>
            <ListItemText>Cortar</ListItemText>
            <Typography variant="caption" color="text.secondary" ml={2}>⌘X</Typography>
          </MenuItem>
          <MenuItem onClick={() => setMenuAnchor(null)}>
            <ListItemIcon><ContentCopyIcon fontSize="small" /></ListItemIcon>
            <ListItemText>Copiar</ListItemText>
            <Typography variant="caption" color="text.secondary" ml={2}>⌘C</Typography>
          </MenuItem>
          <MenuItem onClick={() => setMenuAnchor(null)}>
            <ListItemIcon><ContentPasteIcon fontSize="small" /></ListItemIcon>
            <ListItemText>Pegar</ListItemText>
            <Typography variant="caption" color="text.secondary" ml={2}>⌘V</Typography>
          </MenuItem>
          <Divider />
          <MenuItem onClick={() => setMenuAnchor(null)} sx={{ color: 'error.main' }}>
            <ListItemIcon><CloseIcon fontSize="small" color="error" /></ListItemIcon>
            <ListItemText>Eliminar</ListItemText>
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  )
}
