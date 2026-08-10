import { PaletteOptions } from '@mui/material/styles';

import { COLORS } from '../../constants';

/* Custom Palette */
export const palette: PaletteOptions = {
    mode: 'light',
    common: {
        white: COLORS.COMMON.WHITE,
        black: COLORS.COMMON.BLACK,
    },

    primary: {
        main: COLORS.PRIMARY.MAIN,
        light: COLORS.PRIMARY.LIGHT,
        dark: COLORS.PRIMARY.DARK,
        contrastText: COLORS.PRIMARY.TEXT,
    },

    secondary: {
        main: COLORS.SECONDARY.MAIN,
        light: COLORS.SECONDARY.LIGHT,
        dark: COLORS.SECONDARY.DARK,
        contrastText: COLORS.SECONDARY.TEXT,
    },

    info: {
        main: COLORS.INFO.MAIN,
        contrastText: COLORS.INFO.TEXT,
    },

    success: {
        main: COLORS.SUCCESS.MAIN,
        contrastText: COLORS.SUCCESS.TEXT,
    },

    warning: {
        main: COLORS.WARNING.MAIN,
        contrastText: COLORS.WARNING.TEXT,
    },

    error: {
        main: COLORS.ERROR.MAIN,
        contrastText: COLORS.ERROR.TEXT,
    },

    background: {
        default: COLORS.BACKGROUND.DEFAULT,
        paper: COLORS.BACKGROUND.PAPER,
    },

    text: {
        primary: COLORS.TEXT.PRIMARY,
        secondary: COLORS.TEXT.SECONDARY,
        disabled: COLORS.TEXT.DISABLED,
    },

    divider: COLORS.DIVIDER,

    action: {
        active: COLORS.TEXT.SECONDARY,
        hover: COLORS.BACKGROUND.SUBTLE,
        selected: COLORS.PRIMARY.LIGHT,
        disabled: COLORS.TEXT.DISABLED,
        disabledBackground: COLORS.BACKGROUND.SUBTLE,
        focus: COLORS.PRIMARY.LIGHT,
    },
};
