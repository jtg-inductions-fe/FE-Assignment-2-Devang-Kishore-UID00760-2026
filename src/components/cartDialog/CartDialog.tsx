import { Dialog } from '@mui/material';

import { CartContent } from '@components/cartContent/CartContent';
import { BORDER_RADIUS } from '@constants';
import { CartDialogProps } from '@types';

export const CartDialog = (props: CartDialogProps) => {
    const {
        open,
        items,
        onClose,
        onChange,
        onDecrease,
        onRemove,
        total,
        subtotal,
        bookingFee,
        onCheckout,
    } = props;
    return (
        <Dialog
            open={open}
            onClose={onClose}
            disableRestoreFocus
            slotProps={{
                paper: {
                    sx: {
                        width: '100%',
                        maxWidth: (theme) => theme.breakpoints.values.md,
                        borderRadius: BORDER_RADIUS.SM,
                        padding: (theme) => theme.spacing(4),
                    },
                },
            }}
        >
            <CartContent
                items={items}
                onClose={onClose}
                onChange={onChange}
                onDecrease={onDecrease}
                onRemove={onRemove}
                total={total}
                subtotal={subtotal}
                bookingFee={bookingFee}
                onCheckout={onCheckout}
            />
        </Dialog>
    );
};
