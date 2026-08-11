import { Box, IconButton, styled } from '@mui/material';

export const BackButton = styled(IconButton)(({ theme }) => ({
    color: 'inherit',
    left: 0,
    '& svg': {
        fontSize: theme.spacing(10),
    },
}));

export const EmptyOrders = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: theme.spacing(150),
    width: '100%',
    gap: theme.spacing(2),
}));
