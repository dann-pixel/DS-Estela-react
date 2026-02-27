/**
 * NavigationDemo
 * Muestra los componentes de navegación de MUI:
 * - Tabs (horizontal y vertical)
 * - Breadcrumbs
 * - Stepper (horizontal y vertical)
 * - Pagination
 */
import { useState } from 'react'
import Box from '@mui/material/Box'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Divider from '@mui/material/Divider'
import Link from '@mui/material/Link'
import Button from '@mui/material/Button'
import Pagination from '@mui/material/Pagination'
import Step from '@mui/material/Step'
import StepContent from '@mui/material/StepContent'
import StepLabel from '@mui/material/StepLabel'
import Stepper from '@mui/material/Stepper'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import Typography from '@mui/material/Typography'
import HomeIcon from '@mui/icons-material/Home'
import FavoriteIcon from '@mui/icons-material/Favorite'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'

// Pasos para el Stepper
const STEPS = [
  { label: 'Datos personales', description: 'Ingresa tu nombre, email y contraseña.' },
  { label: 'Dirección de envío', description: 'Añade la dirección donde recibirás el pedido.' },
  { label: 'Método de pago', description: 'Selecciona tarjeta, transferencia o efectivo.' },
  { label: 'Confirmación', description: 'Revisa el resumen y confirma tu pedido.' },
]

export default function NavigationDemo() {
  const [tabValue, setTabValue] = useState(0)
  const [verticalTabValue, setVerticalTabValue] = useState(0)
  const [activeStep, setActiveStep] = useState(1)
  const [verticalStep, setVerticalStep] = useState(0)

  return (
    <Box>
      <Typography variant="h4" gutterBottom fontWeight={700}>
        Navigation
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={4}>
        Componentes para orientar al usuario dentro de la aplicación:
        pestañas, migas de pan, steppers y paginación.
      </Typography>

      {/* 1. Tabs horizontales */}
      <Typography variant="h6" gutterBottom>
        Tabs — Horizontales
      </Typography>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
        <Tabs value={tabValue} onChange={(_, v) => setTabValue(v)} aria-label="demo tabs">
          <Tab label="Resumen" />
          <Tab label="Analítica" />
          <Tab label="Configuración" />
          <Tab label="Deshabilitado" disabled />
        </Tabs>
      </Box>
      <Box sx={{ p: 2, mb: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
        <Typography variant="body2" color="text.secondary">
          Contenido del panel {tabValue + 1}
        </Typography>
      </Box>

      {/* Tabs con iconos */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
        <Tabs value={tabValue} onChange={(_, v) => setTabValue(v)} variant="scrollable" scrollButtons="auto">
          <Tab icon={<HomeIcon />} label="Inicio" iconPosition="start" />
          <Tab icon={<FavoriteIcon />} label="Favoritos" iconPosition="start" />
          <Tab icon={<LocationOnIcon />} label="Ubicación" iconPosition="start" />
        </Tabs>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* 2. Tabs verticales */}
      <Typography variant="h6" gutterBottom>
        Tabs — Verticales
      </Typography>
      <Box sx={{ display: 'flex', border: '1px solid', borderColor: 'divider', borderRadius: 2, overflow: 'hidden', mb: 4, maxWidth: 480 }}>
        <Tabs
          orientation="vertical"
          value={verticalTabValue}
          onChange={(_, v) => setVerticalTabValue(v)}
          sx={{ borderRight: 1, borderColor: 'divider', minWidth: 140 }}
        >
          <Tab label="Perfil" />
          <Tab label="Seguridad" />
          <Tab label="Notificaciones" />
          <Tab label="Facturación" />
        </Tabs>
        <Box sx={{ p: 3, flex: 1 }}>
          <Typography variant="body2" color="text.secondary">
            Panel: {['Perfil', 'Seguridad', 'Notificaciones', 'Facturación'][verticalTabValue]}
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* 3. Breadcrumbs */}
      <Typography variant="h6" gutterBottom>
        Breadcrumbs
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 4 }}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="#" onClick={(e) => e.preventDefault()}>
            Inicio
          </Link>
          <Link underline="hover" color="inherit" href="#" onClick={(e) => e.preventDefault()}>
            Productos
          </Link>
          <Typography color="text.primary">Detalle del producto</Typography>
        </Breadcrumbs>

        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="#" onClick={(e) => e.preventDefault()}>
            Dashboard
          </Link>
          <Link underline="hover" color="inherit" href="#" onClick={(e) => e.preventDefault()}>
            Configuración
          </Link>
          <Link underline="hover" color="inherit" href="#" onClick={(e) => e.preventDefault()}>
            Perfil
          </Link>
          <Typography color="text.primary">Editar</Typography>
        </Breadcrumbs>

        {/* Con maxItems */}
        <Breadcrumbs maxItems={2} aria-label="breadcrumb collapsed">
          <Link underline="hover" href="#" onClick={(e) => e.preventDefault()}>Nivel 1</Link>
          <Link underline="hover" href="#" onClick={(e) => e.preventDefault()}>Nivel 2</Link>
          <Link underline="hover" href="#" onClick={(e) => e.preventDefault()}>Nivel 3</Link>
          <Link underline="hover" href="#" onClick={(e) => e.preventDefault()}>Nivel 4</Link>
          <Typography color="text.primary">Nivel 5</Typography>
        </Breadcrumbs>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* 4. Stepper horizontal */}
      <Typography variant="h6" gutterBottom>
        Stepper — Horizontal
      </Typography>
      <Box sx={{ mb: 4 }}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {STEPS.map((step) => (
            <Step key={step.label}>
              <StepLabel>{step.label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Box sx={{ display: 'flex', gap: 1, mt: 2, justifyContent: 'center' }}>
          <Button size="small" disabled={activeStep === 0} onClick={() => setActiveStep((s) => s - 1)}>
            Anterior
          </Button>
          <Button size="small" variant="contained" disabled={activeStep === STEPS.length - 1} onClick={() => setActiveStep((s) => s + 1)}>
            Siguiente
          </Button>
        </Box>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* 5. Stepper vertical */}
      <Typography variant="h6" gutterBottom>
        Stepper — Vertical
      </Typography>
      <Box sx={{ maxWidth: 400, mb: 4 }}>
        <Stepper activeStep={verticalStep} orientation="vertical">
          {STEPS.map((step, index) => (
            <Step key={step.label}>
              <StepLabel>{step.label}</StepLabel>
              <StepContent>
                <Typography variant="body2" color="text.secondary">{step.description}</Typography>
                <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                  <Button size="small" variant="contained" onClick={() => setVerticalStep((s) => s + 1)}>
                    {index === STEPS.length - 1 ? 'Finalizar' : 'Continuar'}
                  </Button>
                  {index > 0 && (
                    <Button size="small" onClick={() => setVerticalStep((s) => s - 1)}>
                      Atrás
                    </Button>
                  )}
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {verticalStep === STEPS.length && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" color="success.main" fontWeight={600}>
              ¡Proceso completado!
            </Typography>
            <Button size="small" onClick={() => setVerticalStep(0)} sx={{ mt: 1 }}>
              Reiniciar
            </Button>
          </Box>
        )}
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* 6. Pagination */}
      <Typography variant="h6" gutterBottom>
        Pagination
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 4 }}>
        <Pagination count={10} color="primary" />
      </Box>
    </Box>
  )
}
