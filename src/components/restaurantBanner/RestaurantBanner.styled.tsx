import { Box, IconButton, styled } from '@mui/material';

import { TextField } from '@components/textField';

export const BannerContainer = styled(Box)(({ theme }) => ({
    width: '100%',
    position: 'relative',
    color: theme.palette.common.white,
    overflowX: 'hidden',
    borderRadius: theme.spacing(8),
}));

export const TopRow = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: theme.spacing(4),
    [theme.breakpoints.up('md')]: {
        flexDirection: 'row',
        alignItems: 'center',
    },
}));

export const InfoRow = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
}));

export const CuisineWrapper = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexWrap: 'wrap',
    gap: theme.spacing(1),
}));

export const RestaurantLogo = styled('img')(({ theme }) => ({
    width: 100,
    height: 100,
    borderRadius: theme.spacing(5),
    border: '5px solid white',
    [theme.breakpoints.up('md')]: {
        borderRadius: theme.spacing(10),
        width: 180,
        height: 180,
    },
}));

export const BannerImage = styled('img')<{ isOpen: boolean }>(({ isOpen }) => ({
    position: 'absolute',
    inset: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    width: '100vw',
    height: '100%',
    objectFit: 'cover',
    maxWidth: 'none',
    filter: `brightness(0.2) grayscale(${isOpen ? 0 : 1})`,
    zIndex: -1,
}));

export const BannerContent = styled(Box)(({ theme }) => ({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    color: theme.palette.common.white,
    gap: theme.spacing(10),
    padding: theme.spacing(20, 8),
    [theme.breakpoints.up('md')]: {
        flexDirection: 'row',
        gap: theme.spacing(20),
    },
}));

export const RestaurantInfo = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(4),
    minWidth: 0,
}));

export const BackButton = styled(IconButton)(({ theme }) => ({
    color: 'inherit',
    position: 'absolute',
    top: theme.spacing(2),
    left: 0,
    '& svg': {
        fontSize: theme.spacing(10),
    },
}));

export const RestaurantActions = styled(Box)(({ theme }) => ({
    marginLeft: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: theme.spacing(6),
    color: theme.palette.common.white,
}));

export const TimeInput = styled(TextField)(({ theme }) => ({
    '& .MuiOutlinedInput-root': {
        backgroundColor: theme.palette.common.white,
    },
}));
