import { styled, TextField } from '@mui/material';

export const StepperInput = styled(TextField)(({ theme }) => ({
    width: theme.spacing(15),

    '& input': {
        textAlign: 'center',
        padding: theme.spacing(2),
    },
}));
