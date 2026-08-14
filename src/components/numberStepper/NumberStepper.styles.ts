import { styled, TextField } from '@mui/material';

export const StepperInput = styled(TextField)(({ theme: { spacing } }) => ({
    width: 60,

    '& input': {
        textAlign: 'center',
        padding: spacing(2),
    },
}));
