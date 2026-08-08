import { alpha } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { styled } from '@mui/material/styles';

export const MenuCard = styled(Grid)(({ theme }) => ({
    padding: theme.spacing(8),
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(`${theme.palette.primary.light}`, 0.1),
}));
