import { Box, styled } from '@mui/material';

export const OrderContainer = styled(Box)(({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: theme.spacing(10),
    alignItems: 'start',
    padding: theme.spacing(8, 0),
    [theme.breakpoints.up('md')]: {
        gridTemplateColumns: 'repeat(2,minmax(0,1fr))',
    },
    [theme.breakpoints.up('lg')]: {
        gridTemplateColumns: 'repeat(3,minmax(0,1fr))',
    },
}));
