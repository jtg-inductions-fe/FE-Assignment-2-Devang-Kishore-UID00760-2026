import { Box, Card, Chip, styled, Typography } from '@mui/material';

import { Button } from '@components/button';

import { mixins } from '../../theme/foundations';

export const CardContainer = styled(Card)(({ theme }) => ({
    display: 'flex',
    alignItems: 'flex-start',
    gap: theme.spacing(5),
    flexDirection: 'column',
    padding: theme.spacing(2),
    borderRadius: theme.spacing(2),
    position: 'relative',
    boxShadow: theme.shadows[1],
    transition: '0.25s',

    '&:hover': {
        boxShadow: theme.shadows[4],
    },

    [theme.breakpoints.up('sm')]: {
        flexDirection: 'row',
        gap: theme.spacing(10),
        alignItems: 'center',
    },
}));

export const MenuImage = styled('img')<{ inStock: boolean }>(
    ({ theme, inStock }) => ({
        width: '100%',
        height: 200,
        objectFit: 'cover',
        borderRadius: theme.spacing(2),
        filter: `grayscale(${inStock ? 0 : 1})`,

        [theme.breakpoints.up('sm')]: {
            width: 180,
            height: 140,
        },

        [theme.breakpoints.up('md')]: {
            width: 240,
            height: 180,
        },
    }),
);

export const OutOfStockText = styled(Chip)(({ theme }) => ({
    position: 'absolute',
    top: theme.spacing(22),
    left: '40%',

    fontWeight: theme.typography.fontWeightMedium,
    [theme.breakpoints.up('sm')]: {
        top: theme.spacing(15),
        left: theme.spacing(10),
    },

    [theme.breakpoints.up('md')]: {
        top: theme.spacing(20),
        left: theme.spacing(15),
    },
}));

export const Content = styled(Box)(({ theme }) => ({
    flex: 1,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(1),
}));

export const Header = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: theme.spacing(1),
}));

export const Footer = styled(Box)({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 'auto',
});

export const AddMenuButton = styled(Button)(({ theme }) => ({
    borderRadius: theme.spacing(20),
}));

export const MenuTypography = styled(Typography)({
    ...mixins.lineClamp?.(2),
    width: '100%',
});

// export const MenuActions=styled(Box)(({theme})=>({
//     display:'flex',
//     flexDirection:""
//     padding:theme.spacing(1),
// }))
