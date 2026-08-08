import { Box, styled } from '@mui/material';

import { Button } from '@components/button';

export const DiscoveryContainer = styled(Box)(({ theme }) => ({
    padding: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    gap: theme.spacing(4),
}));

export const CuisinesSection = styled(Box)(({ theme }) => ({
    width: '100%',
    display: 'flex',
    alignItem: 'center',
    height: theme.spacing(20),
    gap: theme.spacing(6),
    overflowX: 'scroll',
    '&::-webkit-scrollbar': {
        display: 'none',
    },
}));

export const CuisineChip = styled(Box)<{ src: string }>(({ theme, src }) => ({
    minWidth: theme.spacing(30),
    height: theme.spacing(15),
    background: `linear-gradient(rgba(24, 24, 23, 0.8), rgba(27, 27, 27, 0.8)),url(${src}) bottom left/100% auto no-repeat`,
    backgroundSize: 'cover',
    borderRadius: theme.spacing(20),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    shrink: 0,
    color: theme.palette.common.white,
    [theme.breakpoints.up('md')]: {
        minWidth: theme.spacing(40),
        minHeight: theme.spacing(20),
    },
}));

export const RestaurantNotFound = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    gap: theme.spacing(5),
    minHeight: theme.spacing(120),
    color: theme.palette.primary.contrastText,
}));

export const RestaurantButton = styled(Button)(({ theme }) => ({
    borderRadius: theme.spacing(20),
}));
