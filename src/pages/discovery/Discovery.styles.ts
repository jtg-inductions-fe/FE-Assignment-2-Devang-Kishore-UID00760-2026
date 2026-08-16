import { Box, styled } from '@mui/material';

import { Button } from '@components/button';
import { BORDER_RADIUS } from '@constants';

export const DiscoveryContainer = styled(Box)(({ theme: { spacing } }) => ({
    padding: spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    gap: spacing(4),
}));

export const CuisinesSection = styled(Box)(({ theme: { spacing } }) => ({
    width: '100%',
    display: 'flex',
    alignItem: 'center',
    height: 100,
    gap: spacing(6),
    overflowX: 'scroll',
    '&::-webkit-scrollbar': {
        display: 'none',
    },
}));

export const CuisineChip = styled(Box)<{ src: string }>(
    ({ theme: { palette, breakpoints }, src }) => ({
        minWidth: 120,
        height: 60,
        background: `linear-gradient(rgba(49, 49, 48, 0.3), rgba(74, 74, 74, 0.4)),url(${src}) bottom left/100% auto no-repeat`,
        backgroundSize: 'cover',
        borderRadius: BORDER_RADIUS.ROUNDED,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        shrink: 0,
        color: palette.common.white,
        [breakpoints.up('md')]: {
            minWidth: 160,
            minHeight: 80,
        },
    }),
);

export const RestaurantNotFound = styled(Box)(
    ({ theme: { spacing, palette } }) => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        gap: spacing(5),
        minHeight: 480,
        color: palette.primary.contrastText,
    }),
);

export const RestaurantButton = styled(Button)(({ theme: { spacing } }) => ({
    borderRadius: spacing(20),
}));
