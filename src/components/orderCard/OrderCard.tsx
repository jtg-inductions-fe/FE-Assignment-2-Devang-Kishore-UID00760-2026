import { useState } from 'react';

import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ReplayIcon from '@mui/icons-material/Replay';
import { Chip, Divider, IconButton, Stack, Typography } from '@mui/material';

import { Button } from '@components/button';
import { ORDER_STATUS_CONFIG as orderStatusList } from '@components/orderCard/orderStatus.config';
import { CustomStepper } from '@components/stepper';
import { OrderCardProps, OrderStatus } from '@types';

import { orderCardTextContent } from './orderCard.constants';
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
} from './OrderCard.styles';

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
                        src={firstItem?.item.image_link}
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
                <Typography variant="body1">
                    {orderCardTextContent.ORDER_ID_LABEL}
                    {order.id}
                </Typography>
                <OrderItem>
                    <Stack flexDirection="row" gap={1}>
                        <Typography variant="body2">
                            {firstItem?.quantity} x {firstItem?.item.name}
                        </Typography>
                        {remainingItems > 0 && (
                            <Typography variant="body2" color="text.secondary">
                                + {remainingItems} {orderCardTextContent.MORE}
                            </Typography>
                        )}
                    </Stack>
                    {(order.status === OrderStatus.DELIVERED ||
                        order.status === OrderStatus.REJECTED) && (
                        <Chip
                            label={order.status.toUpperCase()}
                            color={
                                order.status === OrderStatus.DELIVERED
                                    ? 'success'
                                    : 'error'
                            }
                        />
                    )}
                </OrderItem>
                <OrderMeta>
                    <Typography variant="body2" color="text.secondary">
                        {orderCardTextContent.ORDER_TIME_LABEL}{' '}
                        {new Date(order.createdAt).toLocaleString('en-In')}
                    </Typography>
                    <OrderBottom>
                        <Typography variant="body2">&#8377;{total}</Typography>
                        <Stack flexDirection="row" gap={2}>
                            {order.status === OrderStatus.DELIVERED &&
                                showReorder && (
                                    <Button
                                        variant="contained"
                                        onClick={() => onReorder(order)}
                                        size="small"
                                    >
                                        <ReplayIcon fontSize="small" />{' '}
                                        {orderCardTextContent.REORDER}
                                    </Button>
                                )}
                            <IconButton
                                onClick={() => setExpended((prev) => !prev)}
                                aria-label={
                                    expanded
                                        ? orderCardTextContent.CLOSED_ARIA_LABEL
                                        : orderCardTextContent.OPENED_ARIA_LABEL
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
                    <Typography variant="h6">
                        {orderCardTextContent.ORDER_SUMMARY_HEADING}
                    </Typography>
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
                                    {cartItem.item.price_amount * cartItem.quantity}
                                </Typography>
                            </Stack>
                        ))}
                    </Stack>
                    <PriceBreakdown>
                        <Stack direction="row" justifyContent="space-between">
                            <Typography variant="h6">
                                {orderCardTextContent.SUBTOTAL_LABEL}
                            </Typography>
                            <Typography>&#8377;{order.subtotal}</Typography>
                        </Stack>
                        <Stack direction="row" justifyContent="space-between">
                            <Typography variant="h6">
                                {orderCardTextContent.BOOKING_FEE_LABEL}
                            </Typography>
                            <Typography>&#8377;{bookingFee}</Typography>
                        </Stack>
                        <Stack direction="row" justifyContent="space-between">
                            <Typography variant="h6">
                                {orderCardTextContent.TOTAL_LABEL}
                            </Typography>
                            <Typography>&#8377;{total}</Typography>
                        </Stack>
                    </PriceBreakdown>
                    {canEditStatus &&
                        !(
                            order.status === OrderStatus.DELIVERED ||
                            order.status === OrderStatus.REJECTED
                        ) && (
                            <Stack
                                flexDirection="row"
                                justifyContent="space-between"
                            >
                                {orderStatusList[order.status].nextStatuses.map(
                                    (action) => {
                                        const buttonColor =
                                            action === OrderStatus.ACCEPTED
                                                ? 'success'
                                                : action ===
                                                    OrderStatus.REJECTED
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
                    {order.status === OrderStatus.REJECTED && (
                        <>
                            <Divider />
                            <Stack flexDirection="row" gap={2}>
                                <Typography variant="body1">
                                    {
                                        orderCardTextContent.REJECTION_REASON_LABEL
                                    }
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
