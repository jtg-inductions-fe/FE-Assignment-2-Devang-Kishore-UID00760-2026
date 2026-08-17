import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@mui/material';

import { actionLabels } from '@constants';

import { ConfirmationDialogProps } from './confirmationDialog.types';

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
            slotProps={{
                paper: {
                    sx: {
                        borderRadius: (theme) => theme.spacing(5),
                        padding: (theme) => theme.spacing(4),
                    },
                },
                root: {
                    sx: { padding: (theme) => theme.spacing(8) },
                },
            }}
        >
            <DialogTitle
                id="confirm-dialog-title"
                sx={{
                    fontSize: (theme) => theme.typography.h3.fontSize,
                    fontWeight: (theme) => theme.typography.fontWeightBold,
                }}
            >
                {title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>{message}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button color="error" onClick={onCancel}>
                    {actionLabels.CANCEL}
                </Button>
                <Button variant="contained" onClick={onConfirm}>
                    {confirmLabel}
                </Button>
            </DialogActions>
        </Dialog>
    );
};
