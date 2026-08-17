import { Drawer } from '@mui/material';

import { CartContent } from '@components/cartContent/CartContent';
import { BORDER_RADIUS } from '@constants';
import { CartDrawerProps } from '@types';

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
        <Drawer
            anchor="bottom"
            open={open}
            onClose={onClose}
            sx={{
                borderRadius: `${BORDER_RADIUS.SM} ${BORDER_RADIUS.SM} 0 0`,
                maxHeight: '90vh',
            }}
            PaperProps={{
                sx: {
                    sx: { width: 280, backgroundColor: 'background.default' },
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
        </Drawer>
    );
};
