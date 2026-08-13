import { Box, IconButton, styled, Typography } from '@mui/material';

import { TextField } from '@components/textField';
import { theme } from '@theme';

export const BannerContainer = styled(Box)(
    ({ theme: { palette, spacing } }) => ({
        width: '100%',
        position: 'relative',
        color: palette.common.white,
        overflowX: 'hidden',
        borderRadius: spacing(8),
    }),
);

export const TopRow = styled(Box)(({ theme: { spacing, breakpoints } }) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: spacing(4),
    [breakpoints.up('md')]: {
        flexDirection: 'row',
        alignItems: 'center',
    },
}));

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

export const InfoRow = styled(Box)(({ theme: { spacing } }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: spacing(1),
}));

export const CuisineWrapper = styled(Box)(({ theme: { spacing } }) => ({
    display: 'flex',
    flexWrap: 'wrap',
    gap: spacing(1),
}));

export const RestaurantLogo = styled('img')(
    ({ theme: { spacing, breakpoints } }) => ({
        width: 100,
        maxHeight: 100,
        borderRadius: spacing(5),
        border: '5px solid white',
        [breakpoints.up('md')]: {
            borderRadius: spacing(10),
            width: 180,
            height: 180,
        },
    }),
);

export const BannerImage = styled('img')<{ isOpen: boolean }>(({ isOpen }) => ({
    position: 'absolute',
    inset: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    width: '100vw',
    maxHeight: '100%',
    objectFit: 'cover',
    maxWidth: 'none',
    filter: `brightness(0.2) grayscale(${isOpen ? 0 : 1})`,
    zIndex: -1,
}));

export const BannerContent = styled(Box)(
    ({ theme: { palette, spacing, breakpoints } }) => ({
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        color: palette.common.white,
        gap: spacing(10),
        padding: spacing(20, 8),
        [breakpoints.up('md')]: {
            flexDirection: 'row',
            gap: spacing(20),
        },
    }),
);

export const RestaurantInfo = styled(Box)(({ theme: { spacing } }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: spacing(4),
    minWidth: 0,
}));

export const BackButton = styled(IconButton)(({ theme: { spacing } }) => ({
    color: 'inherit',
    position: 'absolute',
    top: spacing(2),
    left: 0,
    '& svg': {
        fontSize: spacing(10),
    },
}));

export const RestaurantActions = styled(Box)(
    ({ theme: { spacing, palette } }) => ({
        marginLeft: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: spacing(6),
        color: palette.common.white,
    }),
);

export const TimeInput = styled(TextField)(({ theme: { palette } }) => ({
    '& .MuiOutlinedInput-root': {
        backgroundColor: palette.common.white,
    },
}));
