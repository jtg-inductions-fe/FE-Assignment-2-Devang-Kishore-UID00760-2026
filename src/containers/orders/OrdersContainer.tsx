import { ChangeEvent, useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { Error, KeyboardBackspace } from '@mui/icons-material';
import { Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';

import { Orders } from '@components/orders';
import { RejectedOrderDialog } from '@components/rejectOrderDialog/RejectOrderDialog';
import { Searchbar } from '@components/searchBar';
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
import { Order, OrderStatus, OrderViewData } from '@types';

import { BackButton, EmptyOrders } from './OrdersContainer.styled';
import { ROUTES } from '../../constants';

export const OrdersContainer = () => {
    const dispatch = UseAppDispatch();
    const navigate = useNavigate();
    const orders = UseAppSelector((state) => state.orders.items);
    const user = UseAppSelector((state) => state.auth.user);
    const [rejectionOrderId, setRejectionOrderId] = useState<string | null>(
        null,
    );
    const [rejectionReason, setRejectionReason] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [orderViewData, setOrderViewData] = useState<OrderViewData[]>([]);
    const [ordersData, setOrdersData] = useState<OrderViewData[]>([]);

    useEffect(() => {
        if (!user?.id || !user.role) {
            return;
        }
        void dispatch(fetchOrders({ userId: user.id, role: user.role }));
    }, [dispatch, user]);

    useEffect(() => {
        const initialData = orders.map((order) => {
            const bookingFee = Math.round(Math.max(20, order.subtotal * 0.01));
            const total = order.subtotal + bookingFee;
            return { order, statusLabel: order.status, bookingFee, total };
        });
        setOrderViewData(initialData);
        setOrdersData(initialData);
    }, [orders]);

    const hasPermission = usePermissions();

    const ORDER_STATUS_STEPS = [
        'pending',
        'accepted',
        'preparing',
        'ready',
        'outForDelivery',
        'delivered',
    ];

    const ORDER_STATUS_DATA = [
        'Pending',
        'accepted',
        'Preparing',
        'ready',
        'out For Delivery',
        'Delivered',
    ];

    const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearchQuery(value);
        if (!searchQuery.trim()) {
            setOrdersData(orderViewData);
            return;
        }

        const data = orderViewData.filter((order) =>
            order.order.restaurantName.includes(value),
        );

        setOrdersData(data);
    };

    const searchBarProps = {
        value: searchQuery,
        placeholder: 'Search Order By Restaurant name....',
        fullWidth: true,
        onChange: handleSearch,
    };

    const handleStatusChange = (orderId: string, status: OrderStatus) => {
        if (status === 'rejected') {
            setRejectionOrderId(orderId);
            return;
        }
        void dispatch(updateOrderStatus({ id: orderId, status }));
    };

    const handleRejectConfirm = async () => {
        if (!rejectionOrderId || !rejectionReason) {
            return;
        }
        try {
            await dispatch(
                updateOrderStatus({
                    id: rejectionOrderId,
                    status: 'rejected',
                    reason: rejectionReason,
                }),
            ).unwrap();
        } catch {
            dispatch(
                showSnackbar({
                    message: 'Error while rejecting order.',
                    severity: 'error',
                }),
            );
        }

        setRejectionOrderId(null);
        setRejectionReason('');
    };

    const getOrderStepperData = (status: OrderStatus) => {
        if (status === 'rejected') {
            return {
                steps: ['pending', 'rejected'],
                activeStep: 1,
            };
        }
        return {
            steps: ORDER_STATUS_DATA,
            activeStep: ORDER_STATUS_STEPS.indexOf(status),
        };
    };

    const handleBack = () => void navigate(ROUTES.DISCOVERY);

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

    return (
        <Stack padding={8}>
            <Grid size={4}>
                <BackButton onClick={handleBack}>
                    <KeyboardBackspace />
                </BackButton>
            </Grid>
            <Grid
                container
                justifyContent="space-between"
                spacing={4}
                alignItems="center"
            >
                <Grid size={{ xs: 12, md: 6 }}>
                    <Typography variant="h3">Your Orders</Typography>
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                    <Searchbar {...searchBarProps} />
                </Grid>
            </Grid>
            {ordersData.length > 0 ? (
                <Orders
                    orders={ordersData}
                    canEditStatus={hasPermission(permissions.CAN_EDIT_STATUS)}
                    showReorder={hasPermission(permissions.SHOW_REORDER)}
                    onStatusChange={handleStatusChange}
                    onReorder={(order: Order) => void handleReorder(order)}
                    getSteps={getOrderStepperData}
                />
            ) : (
                <EmptyOrders>
                    <Error fontSize="large" color="error" />
                    <Typography variant="h3">No Order yet</Typography>
                </EmptyOrders>
            )}
            <RejectedOrderDialog
                open={Boolean(rejectionOrderId)}
                reason={rejectionReason}
                onReasonChange={setRejectionReason}
                onClose={() => {
                    setRejectionOrderId(null);
                    setRejectionReason('');
                }}
                onConfirm={() => void handleRejectConfirm()}
            />
        </Stack>
    );
};
