import { DialogTitle } from '@mui/material';

import { Button } from '@components/button';
import { TextField } from '@components/textField';
import { RejectedOrderDialogProps } from '@types';

import {
    DialogContainer,
    OrderDialogAction,
    OrderDialogContent,
} from './RejectedOrderDialog.styles';

export const RejectedOrderDialog = (props: RejectedOrderDialogProps) => {
    const { open, onClose, onConfirm, onReasonChange, reason } = props;
    return (
        <DialogContainer open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Reject Order</DialogTitle>
            <OrderDialogContent>
                <TextField
                    multiline
                    rows={3}
                    placeholder="Rejection reason"
                    value={reason}
                    onChange={(event) => onReasonChange(event.target.value)}
                />
            </OrderDialogContent>
            <OrderDialogAction>
                <Button variant="outlined" onClick={onClose} color="error">
                    {' '}
                    Cancel
                </Button>
                <Button
                    variant="contained"
                    disabled={!reason.trim()}
                    onClick={onConfirm}
                >
                    Reject Order
                </Button>
            </OrderDialogAction>
        </DialogContainer>
    );
};
