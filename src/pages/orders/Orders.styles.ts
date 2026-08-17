import { Box, IconButton, styled } from '@mui/material';

export const BackButton = styled(IconButton)(({ theme: { spacing } }) => ({
    color: 'inherit',
    left: 0,
    '& svg': {
        fontSize: spacing(10),
    },
}));

export const EmptyOrders = styled(Box)(({ theme: { spacing } }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 400,
    width: '100%',
    gap: spacing(2),
}));
