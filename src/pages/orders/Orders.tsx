import { ChangeEvent, useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { Error, KeyboardBackspace } from '@mui/icons-material';
import { Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';

import { Orders } from '@components/orders';
import { RejectedOrderDialog } from '@components/rejectOrderDialog';
import { Searchbar } from '@components/searchBar';
import { permissions } from '@config/permissions.config';
import { ROUTES } from '@constants';
import { useAppDispatch, useAppSelector } from '@hooks/storeHooks';
import { usePermissions } from '@hooks/usePermissions';
import { clearCart } from '@store/slices/cart/cartSlice';
import { showSnackbar } from '@store/slices/feedback/feedBackSlice';
import {
    createOrder,
    fetchOrders,
    updateOrderStatus,
} from '@store/slices/order/ordersSlice';
import { Order, OrderStatus, OrderViewData, SnackbarTheme } from '@types';

import { orderStatusSteps, ordersTextContent } from './orders.constants';
import { BackButton, EmptyOrders } from './Orders.styles';

export const OrdersPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const orders = useAppSelector((state) => state.orders.items);
    const user = useAppSelector((state) => state.auth.user);
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

    const { hasPermission } = usePermissions();

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
        placeholder: ordersTextContent.SEARCH_PLACEHOLDER,
        fullWidth: true,
        onChange: handleSearch,
    };

    const handleStatusChange = (orderId: string, status: OrderStatus) => {
        if (status === OrderStatus.REJECTED) {
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
                    status: OrderStatus.REJECTED,
                    reason: rejectionReason,
                }),
            ).unwrap();
        } catch {
            dispatch(
                showSnackbar({
                    message: ordersTextContent.ORDER_REJECTION_FAILED_MESSAGE,
                    severity: SnackbarTheme.ERROR,
                }),
            );
        }

        setRejectionOrderId(null);
        setRejectionReason('');
    };

    const getOrderStepperData = (status: OrderStatus) => {
        if (status === OrderStatus.REJECTED) {
            return {
                steps: [OrderStatus.PENDING, OrderStatus.REJECTED],
                activeStep: 1,
            };
        }
        return {
            steps: orderStatusSteps,
            activeStep: orderStatusSteps.indexOf(status),
        };
    };

    const handleBack = () => void navigate(ROUTES.DISCOVERY);

    const handleReorder = async (order: Order) => {
        try {
            await dispatch(createOrder(order))
                .unwrap()
                .then(() => {
                    void dispatch(clearCart());
                });
            dispatch(
                showSnackbar({
                    message: ordersTextContent.ORDER_SUCCESS_MESSAGE,
                    severity: SnackbarTheme.SUCCESS,
                }),
            );
        } catch {
            dispatch(
                showSnackbar({
                    message: ordersTextContent.ORDER_FAILED_MESSAGE,
                    severity: SnackbarTheme.ERROR,
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
                    <Typography variant="h3">
                        {ordersTextContent.ORDERS_HEADING}
                    </Typography>
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
                    <Typography variant="h3">
                        {ordersTextContent.NO_ORDER_HEADING}
                    </Typography>
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
