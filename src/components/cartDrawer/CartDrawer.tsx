import { CartContent } from '@components/cartContent/CartContent';
import { CartDrawerProps } from '@types';

import { StyledCartDrawer } from './CartDrawer.styled';

export const CartDrawer = (props: CartDrawerProps) => {
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
        <StyledCartDrawer anchor="bottom" open={open} onClose={onClose}>
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
        </StyledCartDrawer>
    );
};
