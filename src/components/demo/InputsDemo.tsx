/**
 * InputsDemo
 * Muestra los controles de entrada de MUI con variant='filled' como default:
 * - TextField (estados, tipos, adornos)
 * - Select
 * - Checkbox, Radio, Switch
 * - Slider
 * - Autocomplete básico
 */
import { useState } from 'react'
import Autocomplete from '@mui/material/Autocomplete'
import Box from '@mui/material/Box'
import Checkbox from '@mui/material/Checkbox'
import Divider from '@mui/material/Divider'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import FormLabel from '@mui/material/FormLabel'
import InputAdornment from '@mui/material/InputAdornment'
import MenuItem from '@mui/material/MenuItem'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import Select from '@mui/material/Select'
import Slider from '@mui/material/Slider'
import Switch from '@mui/material/Switch'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import SearchIcon from '@mui/icons-material/Search'
import InputLabel from '@mui/material/InputLabel'

const autocompleteOptions = [
  'Diseño de sistemas',
  'Design tokens',
  'Componentes MUI',
  'Theming con Emotion',
  'TypeScript',
  'React',
  'Vite',
]

export default function InputsDemo() {
  const [selectValue, setSelectValue] = useState('option1')
  const [sliderValue, setSliderValue] = useState<number>(40)
  const [switchOn, setSwitchOn] = useState(true)

  return (
    <Box>
      <Typography variant="h4" gutterBottom fontWeight={700}>
        Inputs &amp; Form Controls
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={4}>
        Controles de formulario de MUI. Cada uno acepta las props estándar de HTML y
        se puede personalizar profundamente desde el theme.
      </Typography>

      {/* 1. TextField — estados */}
      <Typography variant="h6" gutterBottom>
        TextField — Estados
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 4 }}>
        <TextField label="Normal" defaultValue="Texto de ejemplo" size="small" />
        <TextField label="Disabled" defaultValue="Deshabilitado" disabled size="small" />
        <TextField label="Read Only" defaultValue="Solo lectura" InputProps={{ readOnly: true }} size="small" />
        <TextField label="Error" defaultValue="Valor inválido" error helperText="Este campo es requerido" size="small" />
        <TextField label="Con helper" helperText="Texto de ayuda" size="small" />
        <TextField label="Multiline" multiline rows={3} placeholder="Escribe aquí…" size="small" sx={{ minWidth: 220 }} />
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* 2. TextField — con adornos */}
      <Typography variant="h6" gutterBottom>
        TextField — Adornos
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 4 }}>
        <TextField
          label="Buscar"
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          label="Precio"
          size="small"
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
        />
        <TextField
          label="Peso"
          size="small"
          InputProps={{
            endAdornment: <InputAdornment position="end">kg</InputAdornment>,
          }}
        />
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* 3. Select */}
      <Typography variant="h6" gutterBottom>
        Select
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 4, alignItems: 'flex-start' }}>
        <FormControl size="small" sx={{ minWidth: 180 }} variant="filled">
          <InputLabel>Opción</InputLabel>
          <Select
            value={selectValue}
            label="Opción"
            onChange={(e) => setSelectValue(e.target.value)}
          >
            <MenuItem value="option1">Opción 1</MenuItem>
            <MenuItem value="option2">Opción 2</MenuItem>
            <MenuItem value="option3">Opción 3</MenuItem>
          </Select>
        </FormControl>
        <FormControl size="small" sx={{ minWidth: 180 }} variant="filled" disabled>
          <InputLabel>Deshabilitado</InputLabel>
          <Select value="option1" label="Deshabilitado">
            <MenuItem value="option1">Opción 1</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* 5. Autocomplete */}
      <Typography variant="h6" gutterBottom>
        Autocomplete
      </Typography>
      <Box sx={{ mb: 4, maxWidth: 320 }}>
        <Autocomplete
          options={autocompleteOptions}
          renderInput={(params) => (
            <TextField {...params} label="Buscar tecnología" size="small" />
          )}
        />
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* 6. Checkbox */}
      <Typography variant="h6" gutterBottom>
        Checkbox
      </Typography>
      <Box sx={{ mb: 4 }}>
        <FormGroup row>
          <FormControlLabel control={<Checkbox defaultChecked />} label="Marcado" />
          <FormControlLabel control={<Checkbox />} label="Sin marcar" />
          <FormControlLabel control={<Checkbox indeterminate />} label="Indeterminado" />
          <FormControlLabel control={<Checkbox disabled />} label="Disabled" />
          <FormControlLabel control={<Checkbox defaultChecked color="secondary" />} label="Secondary" />
          <FormControlLabel control={<Checkbox defaultChecked color="error" />} label="Error" />
        </FormGroup>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* 7. Radio */}
      <Typography variant="h6" gutterBottom>
        Radio
      </Typography>
      <Box sx={{ mb: 4 }}>
        <FormControl>
          <FormLabel>Selecciona una opción</FormLabel>
          <RadioGroup defaultValue="a" row>
            <FormControlLabel value="a" control={<Radio />} label="Opción A" />
            <FormControlLabel value="b" control={<Radio />} label="Opción B" />
            <FormControlLabel value="c" control={<Radio />} label="Opción C" />
            <FormControlLabel value="d" control={<Radio disabled />} label="Disabled" />
          </RadioGroup>
        </FormControl>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* 8. Switch */}
      <Typography variant="h6" gutterBottom>
        Switch
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 4 }}>
        <FormControlLabel
          control={
            <Switch
              checked={switchOn}
              onChange={(e) => setSwitchOn(e.target.checked)}
              color="primary"
            />
          }
          label={switchOn ? 'Activo' : 'Inactivo'}
        />
        <FormControlLabel control={<Switch defaultChecked color="secondary" />} label="Secondary" />
        <FormControlLabel control={<Switch disabled />} label="Disabled off" />
        <FormControlLabel control={<Switch defaultChecked disabled />} label="Disabled on" />
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* 9. Slider */}
      <Typography variant="h6" gutterBottom>
        Slider
      </Typography>
      <Box sx={{ maxWidth: 400, mb: 2 }}>
        <Typography variant="caption" color="text.secondary">
          Valor: {sliderValue}
        </Typography>
        <Slider
          value={sliderValue}
          onChange={(_, v) => setSliderValue(v as number)}
          valueLabelDisplay="auto"
          marks
          step={10}
        />
        <Slider defaultValue={30} color="secondary" />
        <Slider defaultValue={50} disabled />
        <Slider
          defaultValue={[20, 60]}
          valueLabelDisplay="auto"
          color="success"
        />
      </Box>
    </Box>
  )
}
