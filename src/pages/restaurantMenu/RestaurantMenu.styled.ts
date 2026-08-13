import { Box, Grid2, styled } from '@mui/material';

export const MenuItemsContainer = styled(Grid2)(({ theme: { spacing } }) => ({
    padding: spacing(4),
}));

export const RestaurantMenuContainer = styled(Box)(
    ({ theme: { spacing } }) => ({
        padding: spacing(8, 8),
        display: 'flex',
        flexDirection: 'column',
    }),
);

export const MenuHeader = styled(Box)(({ theme: { spacing } }) => ({
    display: 'flex',
    alignItems: 'center',
    maxWidth: '100%',
    justifyContent: 'space-between',
    padding: spacing(8, 4),
}));

export const EmptyMenu = styled(Box)(({ theme: { spacing } }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: spacing(150),
    width: '100%',
    gap: spacing(2),
}));
