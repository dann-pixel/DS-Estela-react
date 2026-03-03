/**
 * CardsDemo
 * Muestra las variantes de tarjetas (Card) de MUI:
 * - Card básica con CardContent
 * - Card con imagen (CardMedia)
 * - Card con acciones (CardActions)
 * - Card horizontal
 * - Card con variante outlined
 */
import { useTheme } from '@mui/material/styles'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid2'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import FavoriteIcon from '@mui/icons-material/Favorite'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import ShareIcon from '@mui/icons-material/Share'

export default function CardsDemo() {
  const theme = useTheme()

  // Paleta de colores para avatares — desde el theme
  const AVATAR_COLORS = [
    theme.palette.primary.main,
    theme.palette.success.main,
    theme.palette.error.main,
    theme.palette.secondary.main,
    theme.palette.warning.main,
  ]

  // Colores para CardMedia — desde el theme
  const CARD_COLORS = [
    theme.palette.primary.dark,
    theme.palette.success.dark,
    theme.palette.secondary.dark,
  ]
  return (
    <Box>
      <Typography variant="h4" gutterBottom fontWeight={700}>
        Cards
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={4}>
        El componente Card es un contenedor versátil de superficie. Admite subcomponentes
        como CardHeader, CardMedia, CardContent y CardActions para estructurar el contenido.
      </Typography>

      {/* 1. Cards básicas */}
      <Typography variant="h6" gutterBottom>
        Variantes de elevación
      </Typography>
      <Grid container spacing={2} mb={4}>
        {[0, 1, 2, 4, 8].map((elevation) => (
          <Grid key={elevation} size={{ xs: 12, sm: 6, md: 4 }}>
            <Card elevation={elevation}>
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  elevation={elevation}
                </Typography>
                <Typography variant="body2">
                  Tarjeta con sombra de nivel {elevation}. Las elevaciones van de 0 a 24.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                variant="outlined"
              </Typography>
              <Typography variant="body2">
                Sin sombra, con borde 1px usando el color divider del theme.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Divider sx={{ my: 4 }} />

      {/* 2. Cards con CardHeader + Media + Actions */}
      <Typography variant="h6" gutterBottom>
        Card completa (Header + Media + Content + Actions)
      </Typography>
      <Grid container spacing={2} mb={4}>
        {[
          { title: 'Diseño de Sistemas', subtitle: 'Design Systems' },
          { title: 'Componentes MUI', subtitle: 'Material UI v6' },
          { title: 'Theming Custom', subtitle: 'Emotion + MUI' },
        ].map(({ title, subtitle }, i) => (
          <Grid key={title} size={{ xs: 12, sm: 6, md: 4 }}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: AVATAR_COLORS[i] }}>
                    {title.charAt(0)}
                  </Avatar>
                }
                action={
                  <IconButton aria-label="settings">
                    <MoreVertIcon />
                  </IconButton>
                }
                title={title}
                subheader={subtitle}
              />
              {/* Bloque de color como sustituto de imagen real */}
              <CardMedia
                sx={{
                  height: 120,
                  bgcolor: CARD_COLORS[i],
                  opacity: 0.15,
                  backgroundImage: `repeating-linear-gradient(
                    45deg,
                    ${CARD_COLORS[i]}22 0px,
                    ${CARD_COLORS[i]}22 10px,
                    transparent 10px,
                    transparent 20px
                  )`,
                }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  Ejemplo de tarjeta con estructura completa: cabecera con avatar,
                  imagen de portada y área de contenido que crece para igualar alturas.
                </Typography>
              </CardContent>
              <CardActions>
                <IconButton aria-label="favorito" size="small" color="error">
                  <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="compartir" size="small">
                  <ShareIcon />
                </IconButton>
                <Button size="small" sx={{ ml: 'auto' }}>
                  Ver más
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Divider sx={{ my: 4 }} />

      {/* 3. Card horizontal */}
      <Typography variant="h6" gutterBottom>
        Card horizontal
      </Typography>
      <Card sx={{ display: 'flex', maxWidth: 480 }}>
        <Box
          sx={{
            width: 120,
            minWidth: 120,
            bgcolor: 'primary.main',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="h3" sx={{ color: 'white', opacity: 0.5 }}>
            📦
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          <CardContent>
            <Typography variant="subtitle1" fontWeight={600}>
              Componente horizontal
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Combina flexbox con CardMedia para crear layouts horizontales.
              Útil para listados compactos de resultados.
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" color="primary">
              Abrir
            </Button>
            <Button size="small" color="error">
              Eliminar
            </Button>
          </CardActions>
        </Box>
      </Card>
    </Box>
  )
}
