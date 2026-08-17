import { OrderStatus } from '@types';

export const orderStatusSteps = [
    OrderStatus.PENDING,
    OrderStatus.ACCEPTED,
    OrderStatus.PREPARING,
    OrderStatus.READY,
    OrderStatus.OUT_FOR_DELIVERY,
    OrderStatus.DELIVERED,
];

export const ordersTextContent = {
    SEARCH_PLACEHOLDER: 'Search Order By Restaurant name....',
    ORDER_SUCCESS_MESSAGE: 'Order placed successfully.',
    ORDER_FAILED_MESSAGE: 'Failed to order',
    ORDER_REJECTION_FAILED_MESSAGE: 'Error while rejecting order.',
    ORDERS_HEADING: 'Your Orders',
    NO_ORDER_HEADING: 'No Order yet',
};
