import { useState } from 'react';

import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ReplayIcon from '@mui/icons-material/Replay';
import { Chip, Divider, IconButton, Stack, Typography } from '@mui/material';

import { Button } from '@components/button';
import { CustomStepper } from '@components/strapper/CustomStepper';
import { ORDER_STATUS_CONFIG as orderStatusList } from '@config/orderStatus.config';
import { OrderCardProps } from '@types';

import {
    ExpandedContent,
    OrderBody,
    OrderBottom,
    OrderCardContainer,
    OrderHeader,
    OrderItem,
    OrderMeta,
    PriceBreakdown,
    RestaurantDetails,
    RestaurantImage,
} from './OrderCard.styled';

export const OrderCard = (props: OrderCardProps) => {
    const {
        order,
        bookingFee,
        total,
        canEditStatus,
        onReorder,
        onStatusChange,
        showReorder,
        steps,
        activeStep,
    } = props;
    const [expanded, setExpended] = useState(false);
    const firstItem = order.items[0];
    const remainingItems = order.items.length - 1;
    return (
        <OrderCardContainer>
            <Stack flexDirection="row" gap={4}>
                <OrderHeader flex={1}>
                    <RestaurantImage
                        src={firstItem?.item.image}
                        alt={order.restaurantName}
                    />
                    <RestaurantDetails>
                        <Typography variant="h5">
                            {order.restaurantName}
                        </Typography>
                    </RestaurantDetails>
                </OrderHeader>
                <Stack alignItems="center">
                    <CustomStepper
                        orientation="vertical"
                        steps={steps}
                        activeStep={activeStep}
                        alternativeLabel={false}
                    />
                </Stack>
            </Stack>
            <OrderBody>
                <Typography variant="body1">Order Id: #{order.id}</Typography>
                <OrderItem>
                    <Stack flexDirection="row" gap={1}>
                        <Typography variant="body2">
                            {firstItem?.quantity} x {firstItem?.item.name}
                        </Typography>
                        {remainingItems > 0 && (
                            <Typography variant="body2" color="text.secondary">
                                + {remainingItems} more
                            </Typography>
                        )}
                    </Stack>
                    {(order.status === 'delivered' ||
                        order.status === 'rejected') && (
                        <Chip
                            label={order.status.toUpperCase()}
                            color={
                                order.status === 'delivered'
                                    ? 'success'
                                    : 'error'
                            }
                        />
                    )}
                </OrderItem>
                <OrderMeta>
                    <Typography variant="body2" color="text.secondary">
                        Order placed on{' '}
                        {new Date(order.createdAt).toLocaleString('en-In')}
                    </Typography>
                    <OrderBottom>
                        <Typography variant="body2">&#8377;{total}</Typography>
                        <Stack flexDirection="row" gap={2}>
                            {order.status === 'delivered' && showReorder && (
                                <Button
                                    variant="contained"
                                    onClick={() => onReorder(order)}
                                    size="small"
                                >
                                    <ReplayIcon fontSize="small" /> Reorder
                                </Button>
                            )}
                            <IconButton
                                onClick={() => setExpended((prev) => !prev)}
                                aria-label={
                                    expanded ? 'Collapse order' : 'Expend order'
                                }
                            >
                                {expanded ? (
                                    <ExpandLessIcon />
                                ) : (
                                    <ExpandMoreIcon />
                                )}
                            </IconButton>
                        </Stack>
                    </OrderBottom>
                </OrderMeta>
            </OrderBody>
            {expanded && (
                <ExpandedContent>
                    <Typography variant="h6">Order Summary</Typography>
                    <Stack spacing={1}>
                        {order.items.map((cartItem) => (
                            <Stack
                                key={cartItem.item.id}
                                direction="row"
                                justifyContent="space-between"
                            >
                                <Typography variant="body2">
                                    {cartItem.quantity} x {cartItem.item.name}
                                </Typography>
                                <Typography variant="body2">
                                    &#8377;
                                    {cartItem.item.price * cartItem.quantity}
                                </Typography>
                            </Stack>
                        ))}
                    </Stack>
                    <PriceBreakdown>
                        <Stack direction="row" justifyContent="space-between">
                            <Typography variant="h6">Sub Total</Typography>
                            <Typography>&#8377;{order.subtotal}</Typography>
                        </Stack>
                        <Stack direction="row" justifyContent="space-between">
                            <Typography variant="h6">Booking Fee</Typography>
                            <Typography>&#8377;{bookingFee}</Typography>
                        </Stack>
                        <Stack direction="row" justifyContent="space-between">
                            <Typography variant="h6">Total</Typography>
                            <Typography>&#8377;{total}</Typography>
                        </Stack>
                    </PriceBreakdown>
                    {canEditStatus &&
                        !(
                            order.status === 'delivered' ||
                            order.status === 'rejected'
                        ) && (
                            <Stack
                                flexDirection="row"
                                justifyContent="space-between"
                            >
                                {orderStatusList[order.status].nextStatuses.map(
                                    (action) => {
                                        const buttonColor =
                                            action === 'accepted'
                                                ? 'success'
                                                : action === 'rejected'
                                                  ? 'error'
                                                  : 'primary';
                                        return (
                                            <Button
                                                key={action}
                                                variant="contained"
                                                onClick={() =>
                                                    void onStatusChange(action)
                                                }
                                                color={buttonColor}
                                            >
                                                {action.toUpperCase()}
                                            </Button>
                                        );
                                    },
                                )}
                            </Stack>
                        )}
                    {order.status === 'rejected' && (
                        <>
                            <Divider />
                            <Stack flexDirection="row" gap={2}>
                                <Typography variant="body1">
                                    Reason For Rejection:
                                </Typography>
                                <Typography
                                    variant="body1"
                                    color="error"
                                    flex={1}
                                >
                                    {order.reason}
                                </Typography>
                            </Stack>
                        </>
                    )}
                </ExpandedContent>
            )}
        </OrderCardContainer>
    );
};
