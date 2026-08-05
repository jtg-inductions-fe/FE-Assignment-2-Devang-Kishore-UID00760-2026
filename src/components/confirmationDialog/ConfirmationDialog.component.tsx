import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@mui/material';

import { ConfirmationDialogProps } from '@types';

/**
 * Confirmation Dialog
 * @param props Data to be shown in confirmation box.
 * @returns Confirm dialog component.
 */
export const ConfirmDialog = (props: ConfirmationDialogProps) => {
    const {
        open,
        title,
        message,
        confirmLabel = 'Confirm',
        onCancel,
        onConfirm,
    } = props;

    return (
        <Dialog
            open={open}
            onClose={onCancel}
            aria-labelledby="confirm-dialog-title"
            aria-describedby="confirm-dialog-description"
            role="alertdialog"
            maxWidth="lg"
            disableRestoreFocus
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
};
