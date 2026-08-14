import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { useMediaQuery, useTheme } from '@mui/material';

import { CartDialog } from '@components/cartDialog';
import { CartDrawer } from '@components/cartDrawer';
import { ConfirmDialog } from '@components/confirmationDialog';
import { ROUTES } from '@constants';
import { useAppDispatch, useAppSelector } from '@hooks/storeHooks';
import {
    clearCart,
    removeFromCart,
    updateQuantity,
} from '@store/slices/cart/cartSlice';
import { showSnackbar } from '@store/slices/feedback/feedBackSlice';
import { createOrder } from '@store/slices/order/ordersSlice';
import { fetchRestaurantByID } from '@store/slices/restaurant/restaurantSlice';
import {
    CartContainerProps,
    ConfirmationDialogProps,
    OrderData,
    SnackbarTheme,
} from '@types';

import { cartContent } from './cart.constants';

export const CartContainer = (props: CartContainerProps) => {
    const { open, onClose } = props;
    const dispatch = useAppDispatch();
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
    const cart = useAppSelector((state) => state.cart);
    const currentRestaurant = useAppSelector(
        (state) => state.restaurants.selectedRestaurant,
    );
    const userId = useAppSelector((state) => state.auth.user?.id);
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

    const handleChange = async (itemId: string, quantity: number) => {
        try {
            await dispatch(
                updateQuantity({ itemId, quantity: quantity }),
            ).unwrap();
        } catch (error) {
            dispatch(
                showSnackbar({
                    message: `${error as string}`,
                    severity: SnackbarTheme.ERROR,
                }),
            );
        }
    };

    const handleDecrease = (itemId: string) => {
        const cartItem = cart.items.find((item) => item.item.id === itemId);
        if (!cartItem) {
            return;
        }
        void handleChange(itemId, cartItem.quantity - 1);
    };

    const handleRemove = (itemId: string) => {
        const confirmDelete = async () => {
            setDialogData((state) => ({ ...state, open: !state.open }));
            try {
                await dispatch(removeFromCart(itemId)).unwrap();
            } catch (error) {
                dispatch(
                    showSnackbar({
                        message: `${error as string}`,
                        severity: SnackbarTheme.ERROR,
                    }),
                );
            }
        };

        setDialogData((state) => ({
            open: !state.open,
            title: `${cartContent.DELETE_ALERT_TITLE}`,
            message: `${cartContent.DELETE_ALERT_MESSAGE}`,
            onConfirm: () => void confirmDelete(),
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
        const restaurantId = cart.items[0].item.restaurantID;
        try {
            await dispatch(fetchRestaurantByID(restaurantId)).unwrap();
        } catch {
            dispatch(
                showSnackbar({
                    message: `${cartContent.FAILED_ORDER_MESSAGE}`,
                    severity: SnackbarTheme.ERROR,
                }),
            );
        }

        const orderData: OrderData = {
            customerId: userId ?? '',
            restaurantId:
                currentRestaurant?.id ?? cart.items[0].item.restaurantID,
            restaurantName: currentRestaurant?.name ?? '',
            items: cart.items,
        };
        try {
            await dispatch(createOrder(orderData))
                .unwrap()
                .then(() => {
                    void dispatch(clearCart());
                });
            onClose();
            void navigate(ROUTES.ORDERS);
            dispatch(
                showSnackbar({
                    message: `${cartContent.SUCCESS_ORDER_MESSAGE}`,
                    severity: SnackbarTheme.SUCCESS,
                }),
            );
        } catch {
            dispatch(
                showSnackbar({
                    message: `${cartContent.FAILED_ORDER_MESSAGE}`,
                    severity: SnackbarTheme.ERROR,
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
