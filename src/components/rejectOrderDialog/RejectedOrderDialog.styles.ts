import { Dialog, DialogActions, DialogContent, styled } from '@mui/material';

export const DialogContainer = styled(Dialog)(({ theme: { spacing } }) => ({
    padding: spacing(8),
}));

export const OrderDialogContent = styled(DialogContent)(
    ({ theme: { spacing } }) => ({
        padding: spacing(6),
    }),
);

export const OrderDialogAction = styled(DialogActions)(
    ({ theme: { spacing } }) => ({
        padding: spacing(6),
    }),
);
