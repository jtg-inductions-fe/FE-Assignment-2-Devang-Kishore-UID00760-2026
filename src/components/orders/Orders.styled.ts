import { Box, styled } from '@mui/material';

export const OrderContainer = styled(Box)(({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: theme.spacing(10),
    padding: theme.spacing(8, 0),
    [theme.breakpoints.up('sm')]: {
        gridTemplateColumns: 'repeat(2,minmax(0,1fr))',
    },
}));
