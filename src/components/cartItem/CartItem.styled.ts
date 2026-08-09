import { Box, Stack, styled, Typography } from '@mui/material';

import { mixins } from '../../theme/foundations';

export const CartItemContainer = styled(Stack)(({ theme }) => ({
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.spacing(2),
    boxShadow: theme.shadows[2],
    padding: theme.spacing(4),
    borderRadius: theme.spacing(4),
    [theme.breakpoints.up('sm')]: {
        flexDirection: 'row',
    },
}));

export const CartItemImage = styled('img')(({ theme }) => ({
    width: theme.spacing(20),
    height: theme.spacing(20),
    objectFit: 'cover',
    borderRadius: theme.shape.borderRadius,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
        width: theme.spacing(30),
        height: theme.spacing(30),
        display: 'block',
    },
}));

export const CartItemDetails = styled(Box)(({ theme }) => ({
    flex: 1,
    minWidth: 0,
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(2),
}));

export const CartItemName = styled(Typography)({
    ...mixins.lineClamp?.(2),
    width: '100%',
});

export const QuantityContainer = styled(Stack)(({ theme }) => ({
    flexDirection: 'row',
    alignItems: 'center',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    maxHeight: theme.spacing(10),
}));

export const CartActions = styled(Box)({
    display: 'flex',
    alignItems: 'center',
});
