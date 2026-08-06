import { Avatar, Box, Card, Chip, styled, Typography } from '@mui/material';

import { mixins } from '../../theme/foundations';

export const RestaurantCardContainer = styled(Card)(({ theme }) => ({
    position: 'relative',
    overflow: 'visible',
    borderRadius: 24,
    boxShadow: theme.shadows[2],
    '&:hover': {
        boxShadow: theme.shadows[10],
    },
}));

export const RestaurantImageContainer = styled(Box)({
    position: 'relative',
});

export const RestaurantImage = styled('img')<{ open: boolean }>(({ open }) => ({
    width: '100%',
    height: 240,
    objectFit: 'cover',
    border: 24,
    display: 'block',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    filter: `grayscale(${open ? 0 : 1})`,
}));

export const RestaurantLogo = styled(Avatar)(({ theme }) => ({
    position: 'absolute',
    left: theme.spacing(3),
    bottom: -28,
    width: 64,
    height: 64,
}));
export const RestaurantContent = styled(Box)(({ theme }) => ({
    padding: theme.spacing(8, 3, 3),
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
}));

export const RestaurantHeader = styled(Box)({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
});

export const RestaurantInfo = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
});

export const RestaurantData = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
    flexWrap: 'wrap',
}));

export const RestaurantAddress = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
}));

export const VegChip = styled(Chip)({
    width: 'fit-content',
    borderRadius: 999,
});

export const StatusBadge = styled(Box)<{ open: boolean }>(
    ({ open, theme }) => ({
        position: 'absolute',
        right: theme.spacing(3),
        top: 20,
        padding: theme.spacing(1.5, 3),
        borderRadius: 999,
        color: `${theme.palette.common.white}`,
        backgroundColor: `${open ? theme.palette.secondary.main : theme.palette.grey[600]}`,
    }),
);

export const RestaurantFooter = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing(5, 3, 3),
}));

export const RestaurantTimings = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'start',
    gap: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
        flexDirection: 'row',
        alignItems: 'center',
    },
}));

export const ClosedIcon = styled(Box)(({ theme }) => ({
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: theme.spacing(15),
    top: 0,
    left: 0,
    color: theme.palette.common.white,
    width: '100%',
    height: '100%',
}));

export const EllipsisTypography = styled(Typography)({
    ...mixins.lineClamp?.(2),
    width: '100%',
});
