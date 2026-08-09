import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { useMediaQuery, useTheme } from '@mui/material';

import { CartDialog } from '@components/cartDialog/CartDialog';
import { CartDrawer } from '@components/cartDrawer/CartDrawer';
import { ConfirmDialog } from '@components/confirmationDialog/ConfirmationDialog';
import { UseAppDispatch, UseAppSelector } from '@hooks/storeHooks';
import {
    clearCart,
    removeFromCart,
    updateQuantity,
} from '@store/slices/cartSlice';
import { showSnackbar } from '@store/slices/feedBackSlice';
import { createOrder } from '@store/slices/ordersSlice';
import { CartContainerProps, ConfirmationDialogProps, OrderData } from '@types';

import { ROUTES } from '../../constants';

export const CartContainer = (props: CartContainerProps) => {
    const { open, onClose } = props;
    const dispatch = UseAppDispatch();
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
    const cart = UseAppSelector((state) => state.cart);
    const currentRestaurant = UseAppSelector(
        (state) => state.restaurants.selectedRestaurant,
    );
    const userId = UseAppSelector((state) => state.auth.user?.id);
    const subtotal = cart.items.reduce(
        (sum, cartItem) => sum + cartItem.item.price * cartItem.quantity,
        0,
    );
    const bookingFee = Math.max(20, Math.round(subtotal * 0.01));
    const total = subtotal + bookingFee;
    const navigate = useNavigate();
    const [dialogData, setDialogData] = useState<
        Omit<ConfirmationDialogProps, 'onCancel' | 'confirmLabel'>
    >({
        open: false,
        title: '',
        message: '',
        onConfirm: () => {},
    });

    const handleChange = (itemId: string, quantity: number) => {
        dispatch(updateQuantity({ itemId, quantity }));
    };

    const handleDecrease = (itemId: string) => {
        const cartItem = cart.items.find((item) => item.item.id === itemId);
        if (!cartItem) {
            return;
        }
        handleChange(itemId, cartItem.quantity - 1);
    };

    const handleRemove = (itemId: string) => {
        const confirmDelete = () => {
            setDialogData((state) => ({ ...state, open: !state.open }));
            dispatch(removeFromCart(itemId));
        };

        setDialogData((state) => ({
            open: !state.open,
            title: 'Delete Items',
            message: 'DO you really want to delete item ?',
            onConfirm: confirmDelete,
        }));
    };
    const handleCancel = () => {
        setDialogData((state) => ({
            open: !state.open,
            title: state.title,
            message: state.message,
            onConfirm: state.onConfirm,
        }));
    };
    const handleCheckout = async () => {
        if (!cart.items.length) {
            return;
        }
        const orderData: OrderData = {
            customerId: userId ?? '',
            restaurantId: currentRestaurant?.id ?? '',
            restaurantName: currentRestaurant?.name ?? '',
            items: cart.items,
        };
        try {
            await dispatch(createOrder(orderData))
                .unwrap()
                .then(() => {
                    dispatch(clearCart());
                });
            onClose();
            void navigate(ROUTES.ORDERS);
            dispatch(
                showSnackbar({
                    message: 'Order placed successfully.',
                    severity: 'success',
                }),
            );
        } catch {
            dispatch(
                showSnackbar({
                    message: 'Failed to order',
                    severity: 'error',
                }),
            );
        }
    };

    const cartProps = {
        open,
        items: cart.items,
        onClose,
        onChange: handleChange,
        onDecrease: handleDecrease,
        onRemove: handleRemove,
        onCheckout: handleCheckout,
        subtotal,
        bookingFee,
        total,
    };

    if (isSmallScreen) {
        return (
            <>
                <CartDrawer {...cartProps} />
                <ConfirmDialog
                    open={dialogData.open}
                    title={dialogData.title}
                    message={dialogData.message}
                    confirmLabel={'Confirm'}
                    onCancel={() => {
                        handleCancel();
                    }}
                    onConfirm={dialogData.onConfirm}
                />
            </>
        );
    }

    return (
        <>
            <CartDialog {...cartProps} />
            <ConfirmDialog
                open={dialogData.open}
                title={dialogData.title}
                message={dialogData.message}
                confirmLabel={'Confirm'}
                onCancel={() => {
                    handleCancel();
                }}
                onConfirm={dialogData.onConfirm}
            />
        </>
    );
};
