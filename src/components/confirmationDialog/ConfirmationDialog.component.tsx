import {
    Button,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@mui/material';

import { actionLabels } from '@constants';

import { ConfirmationDialogProps } from './confirmationDialog.types';
import { CustomDialog } from './ConfirmDialog.styles';

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
        <CustomDialog
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
                    {actionLabels.CANCEL}
                </Button>
                <Button variant="contained" onClick={onConfirm}>
                    {confirmLabel}
                </Button>
            </DialogActions>
        </CustomDialog>
    );
};
