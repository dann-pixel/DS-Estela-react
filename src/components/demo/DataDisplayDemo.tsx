/**
 * DataDisplayDemo
 * Muestra los componentes de presentación de datos de MUI:
 * - Table (DTE — Documentos Tributarios Electrónicos, tabla real)
 * - Chip (variantes, colores, con iconos)
 * - Badge
 * - Avatar (variantes, grupos)
 * - List
 */
import { useState } from 'react'
import { useTheme, lighten } from '@mui/material/styles'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import Badge from '@mui/material/Badge'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemText from '@mui/material/ListItemText'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import TextField from '@mui/material/TextField'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import DeleteIcon from '@mui/icons-material/Delete'
import DoneIcon from '@mui/icons-material/Done'
import DownloadIcon from '@mui/icons-material/Download'
import EmailIcon from '@mui/icons-material/Email'
import FaceIcon from '@mui/icons-material/Face'
import FilterListIcon from '@mui/icons-material/FilterList'
import HistoryIcon from '@mui/icons-material/History'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import MailIcon from '@mui/icons-material/Mail'
import NotificationsIcon from '@mui/icons-material/Notifications'
import SearchIcon from '@mui/icons-material/Search'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'

// ─── Tipos ───────────────────────────────────────────────────────────────────
type ConciliacionStatus = 'Conciliado' | 'Solo Suite' | 'Con Diferencia' | 'Solo SII'
type EventoSIIStatus = 'Aceptado' | 'Reclamado'
type EventoComercialStatus = 'Aceptado' | 'Pendiente' | 'Reclamado'

interface DteRow {
  id: number
  folio: string
  tipo: number
  fechaEmision: string
  emisorNombre: string
  emisorRut: string
  valorTotal: string
  conciliacion: ConciliacionStatus
  eventoSII: EventoSIIStatus | null
  recepcionSII: string | null
  eventoComercial: EventoComercialStatus
  cedido: boolean
}

// ─── Datos de ejemplo ─────────────────────────────────────────────────────────
const DTE_ROWS: DteRow[] = [
  { id: 1,  folio: '231434', tipo: 33, fechaEmision: '15-04-2025', emisorNombre: 'Constructora ABC LTDA',     emisorRut: '25.323.245-2', valorTotal: '$2.450.000', conciliacion: 'Conciliado',      eventoSII: 'Aceptado',  recepcionSII: '18-04-2025\n13:45', eventoComercial: 'Aceptado',  cedido: true  },
  { id: 2,  folio: '231435', tipo: 33, fechaEmision: '15-04-2025', emisorNombre: 'Inmobiliaria XYZ SpA',     emisorRut: '77.654.321-0', valorTotal: '$1.890.000', conciliacion: 'Solo Suite',      eventoSII: null,        recepcionSII: null,               eventoComercial: 'Pendiente', cedido: false },
  { id: 3,  folio: '231436', tipo: 56, fechaEmision: '16-04-2025', emisorNombre: 'Servicios Tech SA',        emisorRut: '96.789.012-3', valorTotal: '$980.500',   conciliacion: 'Con Diferencia',  eventoSII: 'Reclamado', recepcionSII: '19-04-2025\n09:30', eventoComercial: 'Reclamado', cedido: false },
  { id: 4,  folio: '231437', tipo: 33, fechaEmision: '16-04-2025', emisorNombre: 'Distribuidora Norte Ltda', emisorRut: '12.345.678-9', valorTotal: '$3.200.000', conciliacion: 'Solo SII',        eventoSII: 'Aceptado',  recepcionSII: '20-04-2025\n11:00', eventoComercial: 'Pendiente', cedido: true  },
  { id: 5,  folio: '231438', tipo: 61, fechaEmision: '17-04-2025', emisorNombre: 'Empresa Sur SpA',          emisorRut: '45.678.901-2', valorTotal: '$560.000',   conciliacion: 'Conciliado',      eventoSII: 'Aceptado',  recepcionSII: '21-04-2025\n14:20', eventoComercial: 'Aceptado',  cedido: false },
  { id: 6,  folio: '231439', tipo: 33, fechaEmision: '17-04-2025', emisorNombre: 'Holding ABC SA',           emisorRut: '67.890.123-4', valorTotal: '$4.750.000', conciliacion: 'Con Diferencia',  eventoSII: 'Reclamado', recepcionSII: null,               eventoComercial: 'Reclamado', cedido: true  },
  { id: 7,  folio: '231440', tipo: 56, fechaEmision: '18-04-2025', emisorNombre: 'Consultora GH Ltda',       emisorRut: '89.012.345-6', valorTotal: '$230.000',   conciliacion: 'Conciliado',      eventoSII: 'Aceptado',  recepcionSII: '22-04-2025\n16:45', eventoComercial: 'Aceptado',  cedido: false },
  { id: 8,  folio: '231441', tipo: 33, fechaEmision: '18-04-2025', emisorNombre: 'Viñas del Maule SA',       emisorRut: '34.567.890-1', valorTotal: '$1.120.000', conciliacion: 'Solo Suite',      eventoSII: null,        recepcionSII: null,               eventoComercial: 'Pendiente', cedido: false },
  { id: 9,  folio: '231442', tipo: 61, fechaEmision: '19-04-2025', emisorNombre: 'Logística Express SpA',    emisorRut: '56.789.012-3', valorTotal: '$890.000',   conciliacion: 'Conciliado',      eventoSII: 'Aceptado',  recepcionSII: '23-04-2025\n08:00', eventoComercial: 'Aceptado',  cedido: true  },
  { id: 10, folio: '231443', tipo: 33, fechaEmision: '19-04-2025', emisorNombre: 'Minera del Pacífico SA',   emisorRut: '78.901.234-5', valorTotal: '$6.300.000', conciliacion: 'Con Diferencia',  eventoSII: 'Reclamado', recepcionSII: '24-04-2025\n10:15', eventoComercial: 'Reclamado', cedido: false },
]

// ─── Lookup de colores ────────────────────────────────────────────────────────
const CONCILIACION_COLOR: Record<ConciliacionStatus, 'success' | 'default' | 'warning' | 'primary'> = {
  'Conciliado':     'success',
  'Solo Suite':     'default',
  'Con Diferencia': 'warning',
  'Solo SII':       'primary',
}

const EVENTO_SII_COLOR: Record<EventoSIIStatus, 'success' | 'warning'> = {
  'Aceptado': 'success',
  'Reclamado': 'warning',
}

const EVENTO_COMERCIAL_DOT: Record<EventoComercialStatus, string> = {
  'Aceptado': 'success.main',
  'Pendiente': 'warning.main',
  'Reclamado': 'error.main',
}

const EVENTO_COMERCIAL_TEXT: Record<EventoComercialStatus, 'success.main' | 'warning.main' | 'error.main'> = {
  'Aceptado': 'success.main',
  'Pendiente': 'warning.main',
  'Reclamado': 'error.main',
}

// ─── Chips demo ───────────────────────────────────────────────────────────────
const CHIP_COLORS = ['default', 'primary', 'secondary', 'error', 'warning', 'info', 'success'] as const

// ─── Componente ───────────────────────────────────────────────────────────────
// Coeficientes de lighten ajustados por color para que el tono suave sea
// visualmente equilibrado: colores saturados necesitan más blanqueado,
// colores ya claros (primary cian, info) necesitan menos.
const SOFT_LIGHTEN: Record<typeof CHIP_COLORS[number], number> = {
  default:   0,    // usa grey directamente
  primary:   0.82, // cian brillante → pastel muy suave
  secondary: 0.88, // azul/indigo vívido → lavanda pálida
  error:     0.87, // rojo → rosa muy suave
  warning:   0.86, // naranja → melocotón claro
  info:      0.84, // azul cielo → celeste pálido
  success:   0.86, // verde → menta suave
}

export default function DataDisplayDemo() {
  const theme = useTheme()
  const [chips, setChips] = useState(['React', 'TypeScript', 'MUI', 'Vite', 'Emotion'])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [selected, setSelected] = useState<number[]>([])
  const [search, setSearch] = useState('')

  // Genera el sx del chip "soft": fondo pastel + texto oscuro de la paleta
  const getSoftSx = (color: typeof CHIP_COLORS[number]) => {
    if (color === 'default') {
      return {
        bgcolor: theme.palette.grey[100],
        color: theme.palette.grey[700],
      }
    }
    return {
      bgcolor: lighten(theme.palette[color].main, SOFT_LIGHTEN[color]),
      color: theme.palette[color].dark,
    }
  }

  const allSelected  = selected.length === DTE_ROWS.length
  const someSelected = selected.length > 0 && !allSelected

  const toggleAll = () =>
    setSelected(allSelected ? [] : DTE_ROWS.map((r) => r.id))

  const toggleRow = (id: number) =>
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )

  const visibleRows = DTE_ROWS.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

  return (
    <Box>
      <Typography variant="h4" gutterBottom fontWeight={700}>
        Data Display
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={4}>
        Componentes para presentar datos estructurados: tablas, etiquetas (chips),
        indicadores (badges), avatares y listas.
      </Typography>

      {/* ── 1. Table — DTE ──────────────────────────────────────────────────── */}
      <Typography variant="h6" gutterBottom>
        Table — Documentos Tributarios Electrónicos
      </Typography>

      <Paper variant="outlined" sx={{ mb: 4 }}>

        {/* Toolbar */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            px: 2,
            py: 1.5,
            borderBottom: '1px solid',
            borderColor: 'divider',
            flexWrap: 'wrap',
          }}
        >
          {/* Búsqueda */}
          <TextField
            placeholder="Buscar folio"
            size="small"
            variant="outlined"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ width: 200 }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" sx={{ color: 'text.disabled' }} />
                  </InputAdornment>
                ),
              },
            }}
          />
          <Button variant="outlined" size="small">
            Buscar
          </Button>

          <Box sx={{ flex: 1 }} />

          {/* Rechazos técnicos */}
          <Badge variant="dot" color="warning">
            <Button variant="text" size="small" color="inherit" sx={{ color: 'text.secondary' }}>
              Rechazos técnicos
            </Button>
          </Badge>

          {/* Exportar CSV */}
          <Button variant="outlined" size="small" startIcon={<DownloadIcon />}>
            Exportar CSV
          </Button>

          {/* Filtrar */}
          <Button variant="contained" size="small" startIcon={<FilterListIcon />}>
            Filtrar
          </Button>
        </Box>

        {/* Tabla */}
        <TableContainer sx={{ overflowX: 'auto' }}>
          <Table size="small" aria-label="tabla de documentos tributarios" sx={{ minWidth: 1380 }}>
            <TableHead>
              <TableRow
                sx={{
                  '& th': {
                    fontWeight: 700,
                    bgcolor: 'grey.50',
                    color: 'text.secondary',
                    fontSize: '0.7rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    borderBottom: '2px solid',
                    borderColor: 'divider',
                    whiteSpace: 'nowrap',
                    py: 1.25,
                  },
                }}
              >
                <TableCell padding="checkbox">
                  <Checkbox
                    size="small"
                    checked={allSelected}
                    indeterminate={someSelected}
                    onChange={toggleAll}
                  />
                </TableCell>
                <TableCell>Folio</TableCell>
                <TableCell align="center">Tipo</TableCell>
                <TableCell>Fecha emisión</TableCell>
                <TableCell>Emisor</TableCell>
                <TableCell align="right">Valor total</TableCell>
                <TableCell align="center">Estado conciliación</TableCell>
                <TableCell align="center">Evento SII</TableCell>
                <TableCell>Recepción SII</TableCell>
                <TableCell>Evento comercial</TableCell>
                <TableCell align="center">Cesión</TableCell>
                <TableCell align="center">Acciones</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {visibleRows.map((row) => {
                const isSelected = selected.includes(row.id)
                return (
                  <TableRow
                    key={row.id}
                    hover
                    selected={isSelected}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    {/* Checkbox */}
                    <TableCell padding="checkbox">
                      <Checkbox
                        size="small"
                        checked={isSelected}
                        onChange={() => toggleRow(row.id)}
                      />
                    </TableCell>

                    {/* Folio */}
                    <TableCell>
                      <Typography variant="body2" fontWeight={600}>
                        {row.folio}
                      </Typography>
                    </TableCell>

                    {/* Tipo — círculo con número */}
                    <TableCell align="center">
                      <Box
                        sx={{
                          width: 32,
                          height: 32,
                          borderRadius: '50%',
                          border: '1.5px solid',
                          borderColor: 'text.secondary',
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.7rem',
                          fontWeight: 700,
                          color: 'text.primary',
                        }}
                      >
                        {row.tipo}
                      </Box>
                    </TableCell>

                    {/* Fecha emisión */}
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {row.fechaEmision}
                      </Typography>
                    </TableCell>

                    {/* Emisor */}
                    <TableCell>
                      <Typography variant="body2" fontWeight={600} lineHeight={1.3}>
                        {row.emisorNombre}
                      </Typography>
                      <Typography variant="caption" color="text.disabled">
                        {row.emisorRut}
                      </Typography>
                    </TableCell>

                    {/* Valor total */}
                    <TableCell align="right">
                      <Typography variant="body2" fontWeight={600} sx={{ fontVariantNumeric: 'tabular-nums' }}>
                        {row.valorTotal}
                      </Typography>
                    </TableCell>

                    {/* Estado conciliación */}
                    <TableCell align="center">
                      <Chip
                        label={row.conciliacion}
                        size="small"
                        color={CONCILIACION_COLOR[row.conciliacion]}
                        variant="outlined"
                        icon={row.conciliacion === 'Con Diferencia' ? <WarningAmberIcon /> : undefined}
                        sx={{ fontWeight: 500, fontSize: '0.7rem' }}
                      />
                    </TableCell>

                    {/* Evento SII */}
                    <TableCell align="center">
                      {row.eventoSII ? (
                        <Chip
                          label={row.eventoSII}
                          size="small"
                          color={EVENTO_SII_COLOR[row.eventoSII]}
                          icon={
                            row.eventoSII === 'Aceptado'
                              ? <CheckCircleOutlineIcon />
                              : <WarningAmberIcon />
                          }
                          sx={{ fontWeight: 500, fontSize: '0.7rem' }}
                        />
                      ) : (
                        <Typography variant="body2" color="text.disabled">—</Typography>
                      )}
                    </TableCell>

                    {/* Recepción SII */}
                    <TableCell>
                      {row.recepcionSII ? (
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{ whiteSpace: 'pre-line', lineHeight: 1.5 }}
                        >
                          {row.recepcionSII}
                        </Typography>
                      ) : (
                        <Typography variant="body2" color="text.disabled">—</Typography>
                      )}
                    </TableCell>

                    {/* Evento comercial */}
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                        <Box
                          sx={{
                            width: 8,
                            height: 8,
                            borderRadius: '50%',
                            bgcolor: EVENTO_COMERCIAL_DOT[row.eventoComercial],
                            flexShrink: 0,
                          }}
                        />
                        <Typography
                          variant="body2"
                          fontWeight={500}
                          color={EVENTO_COMERCIAL_TEXT[row.eventoComercial]}
                        >
                          {row.eventoComercial}
                        </Typography>
                      </Box>
                    </TableCell>

                    {/* Cesión */}
                    <TableCell align="center">
                      {row.cedido ? (
                        <Chip
                          label="Cedido"
                          size="small"
                          variant="outlined"
                          icon={<InfoOutlinedIcon />}
                          sx={{ fontWeight: 500, fontSize: '0.7rem' }}
                        />
                      ) : (
                        <Typography variant="body2" color="text.disabled">—</Typography>
                      )}
                    </TableCell>

                    {/* Acciones */}
                    <TableCell align="center" sx={{ whiteSpace: 'nowrap' }}>
                      <Button
                        size="small"
                        variant="text"
                        endIcon={<ChevronRightIcon />}
                        sx={{ fontSize: '0.75rem', px: 0.5 }}
                      >
                        Ver más
                      </Button>
                      <Tooltip title="Descargar documento">
                        <IconButton size="small">
                          <DownloadIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Historial">
                        <IconButton size="small">
                          <HistoryIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Paginación */}
        <TablePagination
          component="div"
          count={456}
          page={page}
          onPageChange={(_, newPage) => setPage(newPage)}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10))
            setPage(0)
          }}
          rowsPerPageOptions={[10, 25, 50]}
          labelRowsPerPage="Filas por página:"
          labelDisplayedRows={({ from, to, count }) => `${from}–${to} de ${count}`}
        />
      </Paper>

      <Divider sx={{ my: 4 }} />

      {/* ── 2. Chips ─────────────────────────────────────────────────────────── */}
      <Typography variant="h6" gutterBottom>
        Chip — Colores y Variantes
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 2 }}>
        {(['filled', 'outlined'] as const).map((variant) => (
          <Box key={variant}>
            <Typography variant="caption" color="text.secondary" display="block" mb={1} fontFamily="monospace">
              variant="{variant}"
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {CHIP_COLORS.map((color) => (
                <Chip key={color} label={color.charAt(0).toUpperCase() + color.slice(1)} color={color} variant={variant} />
              ))}
            </Box>
          </Box>
        ))}

        {/* Variante soft: fondo pastel ~100 + texto oscuro de la paleta */}
        <Box>
          <Typography variant="caption" color="text.secondary" display="block" mb={1} fontFamily="monospace">
            variant="soft" <Typography component="span" variant="caption" color="text.disabled">(custom sx)</Typography>
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {CHIP_COLORS.map((color) => (
              <Chip
                key={color}
                label={color.charAt(0).toUpperCase() + color.slice(1)}
                sx={getSoftSx(color)}
              />
            ))}
          </Box>
        </Box>
      </Box>

      <Typography variant="h6" gutterBottom mt={3}>
        Chip — Con iconos y deleteable
      </Typography>
      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
        <Chip icon={<FaceIcon />} label="Con icono" />
        <Chip icon={<DoneIcon />} label="Completado" color="success" />
        <Chip avatar={<Avatar>A</Avatar>} label="Con avatar" variant="outlined" />
        {chips.map((chip) => (
          <Chip
            key={chip}
            label={chip}
            onDelete={() => setChips((prev) => prev.filter((c) => c !== chip))}
            color="primary"
            variant="outlined"
          />
        ))}
        {chips.length === 0 && (
          <Typography variant="caption" color="text.disabled">
            Todos los chips eliminados
          </Typography>
        )}
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* ── 3. Badge ─────────────────────────────────────────────────────────── */}
      <Typography variant="h6" gutterBottom>
        Badge
      </Typography>
      <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap', mb: 4 }}>
        <Box sx={{ textAlign: 'center' }}>
          <Badge badgeContent={4} color="primary">
            <MailIcon />
          </Badge>
          <Typography variant="caption" display="block" mt={1}>primary</Typography>
        </Box>
        <Box sx={{ textAlign: 'center' }}>
          <Badge badgeContent={99} color="error">
            <NotificationsIcon />
          </Badge>
          <Typography variant="caption" display="block" mt={1}>error (99)</Typography>
        </Box>
        <Box sx={{ textAlign: 'center' }}>
          <Badge badgeContent={1000} max={999} color="secondary">
            <ShoppingCartIcon />
          </Badge>
          <Typography variant="caption" display="block" mt={1}>max=999</Typography>
        </Box>
        <Box sx={{ textAlign: 'center' }}>
          <Badge variant="dot" color="success">
            <MailIcon />
          </Badge>
          <Typography variant="caption" display="block" mt={1}>dot</Typography>
        </Box>
        <Box sx={{ textAlign: 'center' }}>
          <Badge badgeContent={5} color="warning">
            <IconButton size="small">
              <EmailIcon />
            </IconButton>
          </Badge>
          <Typography variant="caption" display="block" mt={1}>sobre botón</Typography>
        </Box>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* ── 4. Avatar ────────────────────────────────────────────────────────── */}
      <Typography variant="h6" gutterBottom>
        Avatar
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mb: 4 }}>
        <Box>
          <Typography variant="caption" color="text.secondary" display="block" mb={1}>
            Variantes (letra, icono, imagen)
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <Avatar>A</Avatar>
            <Avatar sx={{ bgcolor: 'secondary.main' }}>AG</Avatar>
            <Avatar><FaceIcon /></Avatar>
            <Avatar sx={{ bgcolor: 'error.main' }}>EL</Avatar>
            <Avatar sx={{ bgcolor: 'success.main' }}>CT</Avatar>
          </Box>
        </Box>
        <Box>
          <Typography variant="caption" color="text.secondary" display="block" mb={1}>
            Tamaños
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <Avatar sx={{ width: 24, height: 24, fontSize: 12 }}>S</Avatar>
            <Avatar sx={{ width: 40, height: 40 }}>M</Avatar>
            <Avatar sx={{ width: 56, height: 56, fontSize: 24 }}>L</Avatar>
            <Avatar sx={{ width: 72, height: 72, fontSize: 32 }}>XL</Avatar>
          </Box>
        </Box>
        <Box>
          <Typography variant="caption" color="text.secondary" display="block" mb={1}>
            AvatarGroup
          </Typography>
          <AvatarGroup max={4}>
            {(['primary.main', 'success.main', 'error.main', 'secondary.dark', 'warning.main', 'info.main'] as const).map((color, i) => (
              <Avatar key={color} sx={{ bgcolor: color }}>
                {String.fromCharCode(65 + i)}
              </Avatar>
            ))}
          </AvatarGroup>
        </Box>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* ── 5. List ──────────────────────────────────────────────────────────── */}
      <Typography variant="h6" gutterBottom>
        List
      </Typography>
      <Paper variant="outlined" sx={{ maxWidth: 360 }}>
        <List disablePadding>
          {[
            { name: 'Ana García',    role: 'Diseñadora',       color: 'primary.main'  },
            { name: 'Luis Martínez', role: 'Developer',        color: 'success.main'  },
            { name: 'Sofía López',   role: 'Product Manager',  color: 'error.main'    },
          ].map((item, index) => (
            <Box key={item.name}>
              <ListItem
                secondaryAction={
                  <IconButton edge="end" aria-label="delete" size="small">
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                }
              >
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: item.color }}>
                    {item.name.charAt(0)}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={item.name} secondary={item.role} />
              </ListItem>
              {index < 2 && <Divider component="li" />}
            </Box>
          ))}
        </List>
      </Paper>
    </Box>
  )
}
