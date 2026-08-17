import { Avatar, Box, Card, Chip, styled, Typography } from '@mui/material';

import { BORDER_RADIUS } from '@constants';
import { theme } from '@theme';

export const RestaurantCardContainer = styled(Card)(
    ({ theme: { shadows } }) => ({
        position: 'relative',
        overflow: 'visible',
        borderRadius: BORDER_RADIUS.XL,
        boxShadow: shadows[2],
        '&:hover': {
            boxShadow: shadows[10],
        },
    }),
);

export const RestaurantImageContainer = styled(Box)({
    position: 'relative',
});

export const RestaurantImage = styled('img', {
    shouldForwardProp: (props) => props !== 'open',
})<{ open: boolean }>(({ open }) => ({
    width: '100%',
    height: 240,
    objectFit: 'cover',
    border: 24,
    display: 'block',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    filter: `grayscale(${open ? 0 : 1})`,
}));

export const RestaurantLogo = styled(Avatar)(({ theme: { spacing } }) => ({
    position: 'absolute',
    left: spacing(3),
    bottom: -28,
    width: 64,
    height: 64,
}));
export const RestaurantContent = styled(Box)(({ theme: { spacing } }) => ({
    padding: spacing(8, 3, 3),
    display: 'flex',
    flexDirection: 'column',
    gap: spacing(2),
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

export const RestaurantData = styled(Box)(({ theme: { spacing } }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: spacing(1),
    flexWrap: 'wrap',
}));

export const RestaurantAddress = styled(Box)(({ theme: { spacing } }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: spacing(1),
}));

export const VegChip = styled(Chip)({
    width: 'fit-content',
    borderRadius: BORDER_RADIUS.ROUNDED,
});

export const StatusBadge = styled(Box, {
    shouldForwardProp: (props) => props !== 'open',
})<{ open: boolean }>(({ open, theme: { spacing, palette } }) => ({
    position: 'absolute',
    right: spacing(3),
    top: 20,
    padding: spacing(1.5, 3),
    borderRadius: BORDER_RADIUS.ROUNDED,
    color: `${palette.common.white}`,
    backgroundColor: `${open ? palette.secondary.main : palette.grey[600]}`,
}));

export const RestaurantFooter = styled(Box)(({ theme: { spacing } }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing(5, 3, 3),
}));

export const RestaurantTimings = styled(Box)(
    ({ theme: { spacing, breakpoints } }) => ({
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'start',
        gap: spacing(3),
        [breakpoints.up('md')]: {
            flexDirection: 'row',
            alignItems: 'center',
        },
    }),
);

export const ClosedIcon = styled(Box)(({ theme: { spacing, palette } }) => ({
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: spacing(15),
    top: 0,
    left: 0,
    color: palette.common.white,
    width: '100%',
    height: '100%',
}));

export const EllipsisTypography = styled(Typography)({
    ...theme.mixins.lineClamp?.(2),
    width: '100%',
});
