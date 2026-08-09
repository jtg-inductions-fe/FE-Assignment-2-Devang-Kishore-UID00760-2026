import { CartContent } from '@components/cartContent/CartContent';
import { CartDialogProps } from '@types';

import { StyledCartDialog } from './CartDialog.styled';

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
        <StyledCartDialog open={open} onClose={onClose} disableRestoreFocus>
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
        </StyledCartDialog>
    );
};
