import type { Theme } from '@mui/material/styles';
import type {
    TypographyOptions,
    TypographyUtils,
} from '@mui/material/styles/createTypography';

import { HTML_FONT_SIZE } from '@constant';

/* Custom px to rem function */
const typographyUtil: TypographyUtils = {
    /**
     * Converts a pixel value to rem units.
     * @param px - The pixel value to convert.
     * @returns The equivalent value in rem units as a string.
     */
    pxToRem: (px: number) => `${px / HTML_FONT_SIZE}` + 'rem',
};

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
        fontSize: typography.typographyUtil.pxToRem(32),
        fontWeight: theme.typography.fontWeightBold,
        lineHeight: 1.2,

        [theme.breakpoints.up('md')]: {
            fontSize: typography.typographyUtil.pxToRem(40),
        },
    },

    h2: {
        fontSize: typography.typographyUtil.pxToRem(24),
        fontWeight: theme.typography.fontWeightBold,
        lineHeight: 1.25,

        [theme.breakpoints.up('md')]: {
            fontSize: typography.typographyUtil.pxToRem(32),
        },
    },

    h3: {
        fontSize: typography.typographyUtil.pxToRem(22),
        fontWeight: theme.typography.fontWeightRegular,
        lineHeight: 1.25,

        [theme.breakpoints.up('md')]: {
            fontSize: typography.typographyUtil.pxToRem(28),
        },
    },

    h4: {
        fontSize: typography.typographyUtil.pxToRem(20),
        fontWeight: theme.typography.fontWeightMedium,
        lineHeight: 1.35,

        [theme.breakpoints.up('md')]: {
            fontSize: typography.typographyUtil.pxToRem(24),
        },
    },

    h5: {
        fontSize: typography.typographyUtil.pxToRem(18),
        fontWeight: theme.typography.fontWeightMedium,
        lineHeight: 1.4,

        [theme.breakpoints.up('md')]: {
            fontSize: typography.typographyUtil.pxToRem(20),
        },
    },

    h6: {
        fontSize: typography.typographyUtil.pxToRem(16),
        fontWeight: theme.typography.fontWeightMedium,
        lineHeight: 1.4,

        [theme.breakpoints.up('md')]: {
            fontSize: typography.typographyUtil.pxToRem(18),
        },
    },

    subtitle1: {
        fontSize: typography.typographyUtil.pxToRem(16),
        fontWeight: theme.typography.fontWeightMedium,
        lineHeight: 1.5,
    },

    subtitle2: {
        fontWeight: theme.typography.fontWeightMedium,
        lineHeight: 1.45,
        fontSize: typography.typographyUtil.pxToRem(14),
    },

    body1: {
        fontSize: typography.typographyUtil.pxToRem(16),
        fontWeight: theme.typography.fontWeightRegular,
        lineHeight: 1.6,
    },

    body2: {
        fontSize: typography.typographyUtil.pxToRem(14),
        fontWeight: theme.typography.fontWeightRegular,
        lineHeight: 1.6,
    },

    button: {
        fontSize: typography.typographyUtil.pxToRem(14),
        fontWeight: theme.typography.fontWeightMedium,
        lineHeight: 1.4,
        textTransform: 'none',
    },

    caption: {
        fontSize: typography.typographyUtil.pxToRem(12),
        fontWeight: theme.typography.fontWeightRegular,
        lineHeight: 1.5,
    },
    overline: {
        fontSize: typography.typographyUtil.pxToRem(12),
        fontWeight: theme.typography.fontWeightMedium,
        lineHeight: 1.5,
        textTransform: 'uppercase',
    },
});

export const typography = { typographyStyle, typographyUtil };
