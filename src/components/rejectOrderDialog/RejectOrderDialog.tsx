import { DialogTitle } from '@mui/material';

import { Button } from '@components/button';
import { TextField } from '@components/textField';
import { actionLabels } from '@constants';
import { RejectedOrderDialogProps } from '@types';

import {
    DialogContainer,
    OrderDialogAction,
    OrderDialogContent,
} from './RejectedOrderDialog.styles';
import { rejectOrderTextContent } from './rejectOrderDialog.constants';

export const RejectedOrderDialog = (props: RejectedOrderDialogProps) => {
    const { open, onClose, onConfirm, onReasonChange, reason } = props;

    return (
        <DialogContainer open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Reject Order</DialogTitle>
            <OrderDialogContent>
                <TextField
                    multiline
                    rows={3}
                    placeholder={
                        rejectOrderTextContent.ORDER_REJECTION_REASON_PLACEHOLDER
                    }
                    value={reason}
                    onChange={(event) => onReasonChange(event.target.value)}
                />
            </OrderDialogContent>
            <OrderDialogAction>
                <Button variant="outlined" onClick={onClose} color="error">
                    {actionLabels.CANCEL}
                </Button>
                <Button
                    variant="contained"
                    disabled={!reason.trim()}
                    onClick={onConfirm}
                >
                    {rejectOrderTextContent.REJECT_ORDER_BUTTON}
                </Button>
            </OrderDialogAction>
        </DialogContainer>
    );
};
