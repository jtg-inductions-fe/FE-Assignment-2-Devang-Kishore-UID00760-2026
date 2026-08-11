import { Card, Stack, styled } from '@mui/material';

export const OrderCardContainer = styled(Card)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    borderRadius: theme.spacing(2),
    padding: theme.spacing(1),
    gap: theme.spacing(1),
    [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(4),
        gap: theme.spacing(4),
    },
}));

export const OrderHeader = styled(Stack)(({ theme }) => ({
    alignItems: 'center',
    gap: theme.spacing(2),
    padding: theme.spacing(2),
}));

export const RestaurantImage = styled('img')(({ theme }) => ({
    width: '100%',
    height: theme.spacing(40),
    borderRadius: theme.spacing(4),
    objectFit: 'cover',

    [theme.breakpoints.up('sm')]: {
        height: theme.spacing(80),
    },
    [theme.breakpoints.up('lg')]: {
        height: theme.spacing(80),
    },
}));

export const RestaurantDetails = styled(Stack)({
    flex: 1,
    minWidth: 0,
});

export const OrderBody = styled(Stack)(({ theme }) => ({
    gap: theme.spacing(1.5),
    padding: theme.spacing(2),
    borderTop: `2px solid ${theme.palette.divider}`,
}));

export const OrderItem = styled(Stack)(({ theme }) => ({
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.spacing(1),
}));

export const OrderMeta = styled(Stack)(({ theme }) => ({
    gap: theme.spacing(8),
    paddingTop: theme.spacing(1.5),
    borderTop: `2px dashed ${theme.palette.divider}`,
}));

export const OrderBottom = styled(Stack)(({ theme }) => ({
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.spacing(1),
}));

export const ExpandedContent = styled(Stack)(({ theme }) => ({
    gap: theme.spacing(1.5),
    padding: theme.spacing(2),
    borderTop: `1px solid ${theme.palette.divider}`,
}));

export const PriceBreakdown = styled(Stack)(({ theme }) => ({
    gap: theme.spacing(1),
    paddingTop: theme.spacing(1.5),
    borderTop: `1px solid ${theme.palette.divider}`,
}));
