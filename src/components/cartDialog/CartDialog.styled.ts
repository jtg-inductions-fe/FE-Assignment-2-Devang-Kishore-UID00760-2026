import { Dialog, styled } from '@mui/material';

export const StyledCartDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialog-paper': {
        width: '100%',
        maxWidth: theme.breakpoints.values.md,
        borderRadius: theme.spacing(2),
        padding: theme.spacing(4),
    },
}));
