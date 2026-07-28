import type { Theme } from '@mui/material/styles';
import type { TypographyOptions } from '@mui/material/styles/createTypography';

import { HTML_FONT_SIZE } from '@constant';

/**
 * Creates a typography block with various styles
 * @param theme - Theme object to access the breakpoints.
 * @returns The function returns a TypographyOptions object, which includes various typography settings,
 */
const typographyStyle = (theme: Theme): TypographyOptions => ({
    fontFamily: 'Inter',
    htmlFontSize: HTML_FONT_SIZE,

    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,

    h1: {
        fontSize: theme.typography.pxToRem(32),
        fontWeight: theme.typography.fontWeightBold,
        lineHeight: 1.2,

        [theme.breakpoints.up('md')]: {
            fontSize: theme.typography.pxToRem(40),
        },
    },

    h2: {
        fontSize: theme.typography.pxToRem(24),
        fontWeight: theme.typography.fontWeightBold,
        lineHeight: 1.25,

        [theme.breakpoints.up('md')]: {
            fontSize: theme.typography.pxToRem(32),
        },
    },

    h3: {
        fontSize: theme.typography.pxToRem(22),
        fontWeight: theme.typography.fontWeightRegular,
        lineHeight: 1.25,

        [theme.breakpoints.up('md')]: {
            fontSize: theme.typography.pxToRem(28),
        },
    },

    h4: {
        fontSize: theme.typography.pxToRem(20),
        fontWeight: theme.typography.fontWeightMedium,
        lineHeight: 1.35,

        [theme.breakpoints.up('md')]: {
            fontSize: theme.typography.pxToRem(24),
        },
    },

    h5: {
        fontSize: theme.typography.pxToRem(18),
        fontWeight: theme.typography.fontWeightMedium,
        lineHeight: 1.4,

        [theme.breakpoints.up('md')]: {
            fontSize: theme.typography.pxToRem(20),
        },
    },

    h6: {
        fontSize: theme.typography.pxToRem(16),
        fontWeight: theme.typography.fontWeightMedium,
        lineHeight: 1.4,

        [theme.breakpoints.up('md')]: {
            fontSize: theme.typography.pxToRem(18),
        },
    },

    subtitle1: {
        fontSize: theme.typography.pxToRem(16),
        fontWeight: theme.typography.fontWeightMedium,
        lineHeight: 1.5,
    },

    subtitle2: {
        fontWeight: theme.typography.fontWeightMedium,
        lineHeight: 1.45,
        fontSize: theme.typography.pxToRem(14),
    },

    body1: {
        fontSize: theme.typography.pxToRem(16),
        fontWeight: theme.typography.fontWeightRegular,
        lineHeight: 1.6,
    },

    body2: {
        fontSize: theme.typography.pxToRem(14),
        fontWeight: theme.typography.fontWeightRegular,
        lineHeight: 1.6,
    },

    button: {
        fontSize: theme.typography.pxToRem(14),
        fontWeight: theme.typography.fontWeightMedium,
        lineHeight: 1.4,
        textTransform: 'none',
    },

    caption: {
        fontSize: theme.typography.pxToRem(12),
        fontWeight: theme.typography.fontWeightRegular,
        lineHeight: 1.5,
    },
    overline: {
        fontSize: theme.typography.pxToRem(12),
        fontWeight: theme.typography.fontWeightMedium,
        lineHeight: 1.5,
        textTransform: 'uppercase',
    },
});

export const typography = { typographyStyle };
