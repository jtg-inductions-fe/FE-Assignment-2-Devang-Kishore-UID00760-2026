import MuiButton from '@mui/material/Button';
import { styled } from '@mui/material/styles';

export const StyledButton = styled(MuiButton)(
    ({ theme: { typography, spacing } }) => ({
        borderRadius: spacing(1.5),
        textTransform: 'none',
        boxShadow: 'none',
        minHeight: 48,
        fontWeight: typography.fontWeightMedium,
    }),
);
