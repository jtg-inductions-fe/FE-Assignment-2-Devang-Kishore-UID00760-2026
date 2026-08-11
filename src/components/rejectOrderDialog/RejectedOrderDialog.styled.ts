import { Dialog, DialogActions, DialogContent, styled } from '@mui/material';

export const DialogContainer = styled(Dialog)(({ theme }) => ({
    padding: theme.spacing(8),
}));

export const OrderDialogContent = styled(DialogContent)(({ theme }) => ({
    padding: theme.spacing(6),
}));

export const OrderDialogAction = styled(DialogActions)(({ theme }) => ({
    padding: theme.spacing(6),
}));
