import { Box, styled } from '@mui/material';

export const CartContentContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(3),
    gap: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
        gap: theme.spacing(5),
    },
}));
