import MuiButton from '@mui/material/Button';
import { styled } from '@mui/material/styles';

export const StyledButton = styled(MuiButton)(({ theme }) => ({
    borderRadius: theme.spacing(1.5),
    textTransform: 'none',
    boxShadow: 'none',
    fontWeight: theme.typography.fontWeightMedium,
    minHeight: theme.spacing(12),
}));
