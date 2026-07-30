import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@mui/material';

import { ConfirmationDialogProps } from './confirmationDialog.types';

export const ConfirmDialog = ({
    open,
    title,
    message,
    confirmLabel = 'Confirm',
    onCancel,
    onConfirm,
}: ConfirmationDialogProps) => (
    <Dialog
        open={open}
        onClose={onCancel}
        aria-labelledby="confirm-dialog-title"
        role="alertdialog"
        maxWidth="lg"
    >
        <DialogTitle id="confirm-dialog-title">{title}</DialogTitle>
        <DialogContent>
            <DialogContentText>{message}</DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button color="error" onClick={onCancel}>
                Cancel
            </Button>
            <Button variant="contained" onClick={onConfirm}>
                {confirmLabel}
            </Button>
        </DialogActions>
    </Dialog>
);
