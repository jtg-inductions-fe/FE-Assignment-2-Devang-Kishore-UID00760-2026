import { Card, Stack, styled } from '@mui/material';

import { BORDER_RADIUS } from '@constants';

export const OrderCardContainer = styled(Card)(
    ({ theme: { spacing, breakpoints } }) => ({
        display: 'flex',
        flexDirection: 'column',
        borderRadius: BORDER_RADIUS.SM,
        padding: spacing(1),
        gap: spacing(1),
        [breakpoints.up('sm')]: {
            padding: spacing(4),
            gap: spacing(4),
        },
    }),
);

export const OrderHeader = styled(Stack)(({ theme: { spacing } }) => ({
    alignItems: 'center',
    gap: spacing(2),
    padding: spacing(2),
}));

export const RestaurantImage = styled('img')(({ theme: { breakpoints } }) => ({
    width: '100%',
    maxHeight: 150,
    borderRadius: BORDER_RADIUS.SM,
    objectFit: 'cover',

    [breakpoints.up('sm')]: {
        maxHeight: 280,
    },
    [breakpoints.up('lg')]: {
        maxHeight: 380,
    },
}));

export const RestaurantDetails = styled(Stack)({
    flex: 1,
    minWidth: 0,
});

export const OrderBody = styled(Stack)(({ theme: { spacing, palette } }) => ({
    gap: spacing(1.5),
    padding: spacing(2),
    borderTop: `2px solid ${palette.divider}`,
}));

export const OrderItem = styled(Stack)(({ theme: { spacing } }) => ({
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing(1),
}));

export const OrderMeta = styled(Stack)(({ theme: { spacing, palette } }) => ({
    gap: spacing(8),
    paddingTop: spacing(1.5),
    borderTop: `2px dashed ${palette.divider}`,
}));

export const OrderBottom = styled(Stack)(({ theme: { spacing } }) => ({
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing(1),
}));

export const ExpandedContent = styled(Stack)(
    ({ theme: { spacing, palette } }) => ({
        gap: spacing(1.5),
        padding: spacing(2),
        borderTop: `1px solid ${palette.divider}`,
    }),
);

export const PriceBreakdown = styled(Stack)(
    ({ theme: { spacing, palette } }) => ({
        gap: spacing(1),
        paddingTop: spacing(1.5),
        borderTop: `1px solid ${palette.divider}`,
    }),
);
