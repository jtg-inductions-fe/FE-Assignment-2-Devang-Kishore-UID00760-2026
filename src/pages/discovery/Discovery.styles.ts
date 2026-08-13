import { Box, styled } from '@mui/material';

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
    height: spacing(20),
    gap: spacing(6),
    overflowX: 'scroll',
    '&::-webkit-scrollbar': {
        display: 'none',
    },
}));

export const CuisineChip = styled(Box)<{ src: string }>(
    ({ theme: { spacing, palette, breakpoints }, src }) => ({
        minWidth: spacing(30),
        height: spacing(15),
        background: `linear-gradient(rgba(49, 49, 48, 0.3), rgba(74, 74, 74, 0.4)),url(${src}) bottom left/100% auto no-repeat`,
        backgroundSize: 'cover',
        borderRadius: spacing(20),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        shrink: 0,
        color: palette.common.white,
        [breakpoints.up('md')]: {
            minWidth: spacing(40),
            minHeight: spacing(20),
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
        minHeight: spacing(120),
        color: palette.primary.contrastText,
    }),
);
