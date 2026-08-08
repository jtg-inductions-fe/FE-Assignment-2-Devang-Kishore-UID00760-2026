import {
    Button,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@mui/material';

import { ConfirmationDialogProps } from '@types';

import { CustomDialog } from './ConfirmDialog.styled';

export const ConfirmDialog = ({
    open,
    title,
    message,
    confirmLabel = 'Confirm',
    onCancel,
    onConfirm,
}: ConfirmationDialogProps) => (
    <CustomDialog
        open={open}
        onClose={onCancel}
        aria-labelledby="confirm-dialog-title"
        role="alertdialog"
        maxWidth="lg"
        disableRestoreFocus
    >
        <DialogTitle id="confirm-dialog-title">{title}</DialogTitle>
        <DialogContent>
            <DialogContentText aria-describedby="confirm-dialog-description">
                {message}
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button color="error" onClick={onCancel}>
                Cancel
            </Button>
            <Button variant="contained" onClick={onConfirm}>
                {confirmLabel}
            </Button>
        </DialogActions>
    </CustomDialog>
);
