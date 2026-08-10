import { Card, Stack, styled } from '@mui/material';

export const OrderCardContainer = styled(Card)(({ theme }) => ({
    borderRadius: theme.spacing(2),
}));

export const OrderHeader = styled(Stack)(({ theme }) => ({
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing(2),
    padding: theme.spacing(2),
}));

export const RestaurantImage = styled('img')(({ theme }) => ({
    width: theme.spacing(15),
    height: theme.spacing(15),
    borderRadius: theme.spacing(1),
    objectFit: 'cover',
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
