import { Box, Container, Paper } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { alpha, styled } from '@mui/material/styles';

export const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(8),
    marginTop: theme.spacing(4),
    borderRadius: theme.spacing(2),
}));

export const FormWrapper = styled(Box)(({ theme }) => ({
    marginTop: theme.spacing(12),
}));

export const ActionWrapper = styled(Box)(({ theme }) => ({
    marginTop: theme.spacing(5),
    display: 'flex',
    justifyContent: 'space-between',
}));

export const RestaurantForm = styled('form')({
    width: '100%',
});

export const AddRestaurantContainer = styled(Container)(({ theme }) => ({
    minHeight: '100vh',
    maxWidth: 'lg',
    display: 'flex',
    padding: theme.spacing(8),
    flexDirection: 'column',
    gap: theme.spacing(15),
}));

export const AddRestaurantHeader = styled(Box)({
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
});

export const MenuCard = styled(Grid)(({ theme }) => ({
    padding: theme.spacing(8),
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.primary.light, 0.1),
}));
