import { Box, Grid2, styled } from '@mui/material';

export const MenuItemsContainer = styled(Grid2)(({ theme }) => ({
    padding: theme.spacing(4),
}));

export const RestaurantMenuContainer = styled(Box)(({ theme }) => ({
    padding: theme.spacing(8, 8),
    display: 'flex',
    flexDirection: 'column',
}));

export const MenuHeader = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    maxWidth: '100%',
    justifyContent: 'space-between',
    padding: theme.spacing(8, 4),
}));
