import { Box, Card, Chip, styled, Typography } from '@mui/material';

import { Button } from '@components/button';
import { theme } from '@theme';

export const CardContainer = styled(Card)(
    ({ theme: { spacing, shadows, breakpoints } }) => ({
        display: 'flex',
        alignItems: 'flex-start',
        gap: spacing(5),
        flexDirection: 'column',
        padding: spacing(2),
        borderRadius: spacing(2),
        position: 'relative',
        boxShadow: shadows[1],
        transition: '0.25s',

        '&:hover': {
            boxShadow: shadows[4],
        },

        [breakpoints.up('sm')]: {
            flexDirection: 'row',
            gap: spacing(10),
            alignItems: 'center',
        },
    }),
);

export const MenuImage = styled('img')<{ inStock: boolean }>(
    ({ theme: { spacing, breakpoints }, inStock }) => ({
        width: '100%',
        height: 200,
        objectFit: 'cover',
        borderRadius: spacing(2),
        filter: `grayscale(${inStock ? 0 : 1})`,

        [breakpoints.up('sm')]: {
            width: 180,
            height: 140,
        },

        [breakpoints.up('md')]: {
            width: 240,
            height: 180,
        },
    }),
);

export const OutOfStockText = styled(Chip)(
    ({ theme: { spacing, breakpoints, typography } }) => ({
        position: 'absolute',
        top: spacing(22),
        left: '40%',

        fontWeight: typography.fontWeightMedium,
        [breakpoints.up('sm')]: {
            top: spacing(15),
            left: spacing(10),
        },

        [breakpoints.up('md')]: {
            top: spacing(20),
            left: spacing(15),
        },
    }),
);

export const Content = styled(Box)(({ theme: { spacing } }) => ({
    flex: 1,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: spacing(1),
}));

export const Header = styled(Box)(({ theme: { spacing } }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: spacing(1),
}));

export const Footer = styled(Box)({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 'auto',
});

export const AddMenuButton = styled(Button)(({ theme: { spacing } }) => ({
    borderRadius: spacing(20),
}));

export const MenuTypography = styled(Typography)({
    ...theme.mixins.lineClamp?.(2),
    width: '100%',
});
