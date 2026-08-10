import { useEffect } from 'react';

import { Stack, Typography } from '@mui/material';

import { Orders } from '@components/orders';
import { permissions } from '@config/permissions.config';
import { usePermissions } from '@hooks/permissionsHook';
import { UseAppDispatch, UseAppSelector } from '@hooks/storeHooks';
import { clearCart } from '@store/slices/cartSlice';
import { showSnackbar } from '@store/slices/feedBackSlice';
import {
    createOrder,
    fetchOrders,
    updateOrderStatus,
} from '@store/slices/ordersSlice';
import { Order, OrderStatus } from '@types';

export const OrdersContainer = () => {
    const dispatch = UseAppDispatch();
    const orders = UseAppSelector((state) => state.orders.items);
    const user = UseAppSelector((state) => state.auth.user);
    useEffect(() => {
        if (!user?.id || !user.role) {
            return;
        }
        void dispatch(fetchOrders({ userId: user.id, role: user.role }));
    }, [dispatch, user]);
    const hasPermission = usePermissions();
    const handleStatusChange = (orderId: string, status: OrderStatus) => {
        void dispatch(updateOrderStatus({ id: orderId, status }));
    };
    const handleReorder = async (order: Order) => {
        try {
            await dispatch(createOrder(order))
                .unwrap()
                .then(() => {
                    dispatch(clearCart());
                });
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
    const orderViewData = orders.map((order) => {
        const bookingFee = Math.round(Math.max(20, order.subtotal * 0.01));
        const total = order.subtotal + bookingFee;
        return { order, statusLabel: order.status, bookingFee, total };
    });
    return (
        <Stack padding={8}>
            <Typography variant="h3">Your Orders</Typography>
            <Orders
                orders={orderViewData}
                canEditStatus={hasPermission(permissions.CAN_EDIT_STATUS)}
                showReorder={hasPermission(permissions.SHOW_REORDER)}
                onStatusChange={handleStatusChange}
                onReorder={(order: Order) => void handleReorder(order)}
            />
        </Stack>
    );
};
