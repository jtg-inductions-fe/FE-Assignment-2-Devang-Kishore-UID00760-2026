import { styled } from '@mui/material';

import { TextField } from '../textField';

export const StyledTimeField = styled(TextField)(({ theme }) => ({
    '& .MuiOutlinedInput-root': {
        borderRadius: theme.shape.borderRadius,
        padding: theme.spacing(20),
    },
}));
