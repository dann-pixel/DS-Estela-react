# Estela Design System
## Instrucción para Claude Code

Mantén este archivo actualizado. Cada vez que hagas un cambio relevante en el proyecto — nuevo token de color, cambio en el theme, decisión técnica, dependencia nueva o algo que quedó pendiente — actualiza la sección correspondiente de este CLAUDE.md.

No es necesario documentar cambios menores. Solo lo que otro Claude (o un desarrollador) necesitaría saber para entender el estado actual del sistema.

---

## Contexto del proyecto

Estela es una empresa que opera en varios países de Latinoamérica y España. Este proyecto es el Design System oficial de Estela, construido sobre MUI v7 con branding personalizado. Su objetivo es ser la fuente de verdad técnica del sistema visual de Estela — colores, tipografía, componentes y patrones.

El proyecto tiene dos propósitos:

1. **Demo page** — vista con todos los componentes MUI principales con el branding aplicado, para validar y presentar el sistema visualmente.
2. **Paquete distribuible** — el theme compilado se publica en GitHub Packages como `@dann-pixel/estela-theme` para que cualquier proyecto React de Estela lo consuma.

---

## Stack técnico

- React + Vite + TypeScript
- Material UI v7 (`@mui/material@latest`)
- Figma MCP conectado para extracción de tokens de diseño
- GitHub Packages para distribución del theme

---

## Estructura del proyecto

```
src/
├── theme/
│   └── index.ts          ← fuente de verdad del theme, aquí se hacen todos los cambios
├── components/demo/
│   ├── TypographyDemo.tsx
│   ├── ColorsDemo.tsx
│   ├── ButtonsDemo.tsx
│   ├── InputsDemo.tsx
│   ├── CardsDemo.tsx
│   ├── FeedbackDemo.tsx
│   ├── NavigationDemo.tsx
│   ├── DataDisplayDemo.tsx
│   └── OverlaysDemo.tsx
└── App.tsx               ← layout con sidebar de navegación entre secciones

dist-theme/               ← output compilado del paquete (no editar manualmente)
vite.theme.config.ts      ← config de build para el paquete, separada del dev server
.npmrc                    ← apunta @dann-pixel al registry de GitHub Packages
```

---

## Cómo actualizar el theme

Todo cambio visual del sistema se hace en `src/theme/index.ts`. Este archivo es la única fuente de verdad — nunca hardcodear valores en los componentes demo.

### Tokens disponibles en el theme

**Paleta de colores:**
- Primary: `#00B5CC` / light: `#5FEFE8` / dark: `#006A92`
- Secondary: `#4255FF` / light: `#9CB6FF` / dark: `#2528AE`
- Dark (botón negro): `blueGrey[900]`
- Error / Warning / Info / Success con sus variantes light y dark
- Grises: paleta BlueGrey completa de MUI
- Divider: `#0000001F`

**Tipografía:**
- Headings (h1–h6): Outfit (Google Fonts)
- Body, labels, botones: Instrument Sans (Google Fonts)

**Shape:**
- Border radius base: `4px` — MUI lo escala por componente automáticamente

**Elevaciones:**
- Sin sombra en superficies estáticas: Card, Paper, Button, Chip, Alert, AppBar
- Con sombra en overlays flotantes: Modal, Dialog, Drawer, Popover, Menu, Tooltip
- Superficies sin sombra compensan con border: `1px solid divider`

**defaultProps globales:**
- TextField: `variant="filled"` en todos los inputs
- Button: sin uppercase (sentence case), sin boxShadow en todos los estados

### Agregar un nuevo token de color

1. Abrir `src/theme/index.ts`
2. Agregar el color dentro de `palette`
3. Si es un color custom (no nativo de MUI), agregar el module augmentation TypeScript:

```ts
declare module '@mui/material/styles' {
  interface Palette { nombreColor: PaletteColor }
  interface PaletteOptions { nombreColor?: PaletteColorOptions }
}
```

4. Verificar en la demo page que se refleja correctamente
5. Publicar nueva versión del paquete (ver sección siguiente)

---

## Cómo publicar una nueva versión del paquete

El paquete se llama `@dann-pixel/estela-theme` y vive en GitHub Packages. Cada vez que se actualiza el theme hay que publicar una nueva versión para que los proyectos que lo consumen puedan actualizar.

### Pasos

1. Hacer los cambios en `src/theme/index.ts`
2. Actualizar la versión en `package.json` usando semver:
   - Cambio menor (color, tipografía, spacing): `1.0.x` → patch
   - Funcionalidad nueva (nuevo token, nuevo override): `1.x.0` → minor
   - Cambio que rompe compatibilidad: `x.0.0` → major

   ```bash
   npm version patch   # 1.0.0 → 1.0.1
   npm version minor   # 1.0.0 → 1.1.0
   npm version major   # 1.0.0 → 2.0.0
   ```

3. Compilar y publicar:

   ```bash
   npm run publish:theme
   ```

   Este comando corre `build:theme` (compila a `dist-theme/`) y luego `npm publish`.

4. Verificar en GitHub — el paquete publicado es visible en: [github.com/dann-pixel?tab=packages](https://github.com/dann-pixel?tab=packages)

### Requisito de autenticación

Para publicar se necesita un Personal Access Token de GitHub con permiso `write:packages` configurado en `~/.npmrc` de la máquina:

```bash
echo "//npm.pkg.github.com/:_authToken=TU_TOKEN" >> ~/.npmrc
```

Esto se hace una sola vez por máquina.

### En los proyectos que consumen el paquete

Para recibir la nueva versión:

```bash
npm update @dann-pixel/estela-theme
```

---

## Conexión con Figma MCP

El proyecto tiene integración con Figma via MCP para extraer tokens de diseño directamente desde el DS oficial de Estela en Figma.

Cuando se reciban cambios desde Figma:

1. Pedir a Claude Code que lea el archivo de Figma y extraiga los tokens actualizados
2. Comparar con los valores actuales en `src/theme/index.ts`
3. Aplicar solo los cambios relevantes respetando la estructura de MUI
4. Publicar nueva versión del paquete

**Regla importante:** la estructura de MUI es siempre mandatoria. Si un token de Figma no coincide exactamente con la API de MUI, adaptar el valor al campo MUI correspondiente. Nunca sobreescribir la estructura del theme para adaptarla a Figma.

---

## Reglas generales

- Nunca hardcodear colores, tipografías ni espaciados fuera de `src/theme/index.ts`
- Nunca modificar `vite.config.ts` — usar `vite.theme.config.ts` para el build del paquete
- Nunca editar `dist-theme/` manualmente — se genera con `npm run build:theme`
- Siempre respetar la estructura oficial de la API de MUI v7
- Después de cualquier cambio en el theme, verificar que el demo page lo refleja correctamente

---

## Estado actual del paquete

| Campo | Valor |
|---|---|
| Versión publicada | `1.0.1` |
| Registry | `https://npm.pkg.github.com` |
| Paquete | `@dann-pixel/estela-theme` |
| Proyectos que lo consumen | `estela-firma` |
