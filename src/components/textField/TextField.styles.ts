import { TextField } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledTextField = styled(TextField)(({ theme: { spacing } }) => ({
    '& .MuiOutlinedInput-root': {
        borderRadius: spacing(1.5),
    },
}));
