import { Theme } from '@mui/material/styles';

/**
 * createAppTheme
 * Fábrica de theme que acepta el modo light/dark.
 * Centraliza toda la configuración del design system.
 */
export declare function createAppTheme(mode?: 'light' | 'dark'): Theme;

/**
 * Exportación por defecto: theme en modo light.
 * Usado cuando no se necesita soporte dinámico de dark mode.
 *
 * Para dark mode, usar createAppTheme('dark').
 */
declare const theme: Theme;
export default theme;

export { }


declare module '@mui/material/styles' {
    interface Palette {
        dark: PaletteColor;
    }
    interface PaletteOptions {
        dark?: PaletteColorOptions;
    }
}


declare module '@mui/material/Button' {
    interface ButtonPropsColorOverrides {
        dark: true;
    }
}


declare module '@mui/material/IconButton' {
    interface IconButtonPropsColorOverrides {
        dark: true;
    }
}


declare module '@mui/material/Chip' {
    interface ChipPropsColorOverrides {
        dark: true;
    }
}


declare module '@mui/material/SvgIcon' {
    interface SvgIconPropsColorOverrides {
        dark: true;
    }
}
