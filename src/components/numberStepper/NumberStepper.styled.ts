import { styled, TextField } from '@mui/material';

export const StepperInput = styled(TextField)(({ theme }) => ({
    width: theme.spacing(8),

    '& input': {
        textAlign: 'center',
        padding: theme.spacing(2),
    },
    [theme.breakpoints.up('sm')]: {
        width: theme.spacing(15),
    },
}));
