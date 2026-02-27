/**
 * vite.theme.config.ts
 *
 * Config EXCLUSIVA para compilar el theme como paquete npm.
 * NO modifica ni interfiere con vite.config.ts (el dev server / app demo).
 *
 * Uso:
 *   npm run build:theme   → genera dist-theme/
 *   npm run publish:theme → build + npm publish
 */
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    dts({
      include: ['src/theme'],
      outDir: 'dist-theme',
      tsconfigPath: './tsconfig.theme.json',
      rollupTypes: true,
    }),
  ],
  build: {
    lib: {
      entry: 'src/theme/index.ts',
      name: 'EstelaTheme',
      fileName: 'estela-theme',
      formats: ['es'],
    },
    outDir: 'dist-theme',
    rollupOptions: {
      // Peer deps: no se empaquetan, el consumidor las provee
      external: [
        'react',
        'react-dom',
        '@mui/material',
        '@mui/material/styles',
        '@mui/material/colors',
        '@emotion/react',
        '@emotion/styled',
      ],
    },
  },
})
