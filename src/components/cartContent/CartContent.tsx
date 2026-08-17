import CloseIcon from '@mui/icons-material/Close';
import { Divider, IconButton, Stack, Typography } from '@mui/material';

import { CartItem } from '@components/cartItem/CartItem';
import { CartSummary } from '@components/cartSummary/CartSummary';
import { CartContentProps } from '@types';

import { cartTextContent } from './cartContent.constants';
import { CartContentContainer } from './CartContent.styles';

export const CartContent = (props: CartContentProps) => {
    const {
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
    const isEmpty = items.length === 0;
    return (
        <CartContentContainer>
            <Stack direction="row" justifyContent="space-between">
                <Typography variant="h5">
                    {cartTextContent.CART_HEADING}({items.length})
                </Typography>
                <IconButton onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            </Stack>
            {isEmpty ? (
                <Stack alignItems="center" gap={4}>
                    <Typography variant="h3" color="error">
                        {cartTextContent.NO_ITEM_HEADING}
                    </Typography>
                    <Typography variant="body1">
                        {cartTextContent.NO_ITEM_SUBHEADING}
                    </Typography>
                </Stack>
            ) : (
                <>
                    <Stack spacing={6}>
                        {items.map((cartItem) => (
                            <CartItem
                                key={cartItem.item.id}
                                item={cartItem}
                                onChange={onChange}
                                onDecrease={onDecrease}
                                onRemove={onRemove}
                            />
                        ))}
                    </Stack>
                    <Divider />
                    <CartSummary
                        total={total}
                        subTotal={subtotal}
                        bookingFee={bookingFee}
                        onCheckout={onCheckout}
                    />
                </>
            )}
        </CartContentContainer>
    );
};
