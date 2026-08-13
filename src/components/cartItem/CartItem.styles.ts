import { Box, Stack, styled, Typography } from '@mui/material';

import { theme } from '@theme';

export const CartItemContainer = styled(Stack)(
    ({ theme: { spacing, breakpoints, shadows } }) => ({
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: spacing(2),
        boxShadow: shadows[2],
        padding: spacing(4),
        borderRadius: spacing(4),
        [breakpoints.up('sm')]: {
            flexDirection: 'row',
        },
    }),
);

export const CartItemImage = styled('img')(
    ({ theme: { breakpoints, shape } }) => ({
        objectFit: 'cover',
        borderRadius: shape.borderRadius,
        display: 'none',
        [breakpoints.up('sm')]: {
            width: 120,
            height: 120,
            display: 'block',
        },
    }),
);

export const CartItemDetails = styled(Box)(({ theme: { spacing } }) => ({
    flex: 1,
    minWidth: 0,
    display: 'flex',
    flexDirection: 'column',
    padding: spacing(2),
}));

export const CartItemName = styled(Typography)({
    ...theme.mixins.lineClamp?.(2),
    width: '100%',
});

export const QuantityContainer = styled(Stack)(
    ({ theme: { palette, shape } }) => ({
        flexDirection: 'row',
        alignItems: 'center',
        border: `1px solid ${palette.divider}`,
        borderRadius: shape.borderRadius,
        maxHeight: 60,
    }),
);

export const CartActions = styled(Box)({
    display: 'flex',
    alignItems: 'center',
});
