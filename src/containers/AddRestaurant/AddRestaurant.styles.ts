import { Box, Container, Paper } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { alpha, styled } from '@mui/material/styles';

export const StyledPaper = styled(Paper)(({ theme: { spacing } }) => ({
    padding: spacing(8),
    marginTop: spacing(4),
    borderRadius: spacing(2),
}));

export const FormWrapper = styled(Box)(({ theme: { spacing } }) => ({
    marginTop: spacing(12),
}));

export const ActionWrapper = styled(Box)(({ theme: { spacing } }) => ({
    marginTop: spacing(5),
    display: 'flex',
    justifyContent: 'space-between',
}));

export const RestaurantForm = styled('form')({
    width: '100%',
});

export const AddRestaurantContainer = styled(Container)(
    ({ theme: { spacing } }) => ({
        minHeight: '100vh',
        maxWidth: 'lg',
        display: 'flex',
        padding: spacing(8),
        flexDirection: 'column',
        gap: spacing(15),
    }),
);

export const MenuCard = styled(Grid)(
    ({ theme: { spacing, shape, palette } }) => ({
        padding: spacing(8),
        borderRadius: shape.borderRadius,
        backgroundColor: alpha(palette.primary.light, 0.1),
    }),
);
