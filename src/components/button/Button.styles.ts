import MuiButton from '@mui/material/Button';
import { styled } from '@mui/material/styles';

import { BORDER_RADIUS } from '@constants';

export const StyledButton = styled(MuiButton)(({ theme: { typography } }) => ({
    borderRadius: BORDER_RADIUS.SM,
    textTransform: 'none',
    boxShadow: 'none',
    minHeight: 48,
    fontWeight: typography.fontWeightMedium,
}));
