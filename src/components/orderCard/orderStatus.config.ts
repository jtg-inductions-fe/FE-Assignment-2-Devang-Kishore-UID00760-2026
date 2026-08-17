import { OrderStatus } from '@types';

export const ORDER_STATUS_CONFIG = {
    pending: {
        nextStatuses: [OrderStatus.ACCEPTED, OrderStatus.REJECTED],
    },
    accepted: {
        nextStatuses: [OrderStatus.PREPARING],
    },
    preparing: {
        nextStatuses: [OrderStatus.READY],
    },
    ready: {
        nextStatuses: [OrderStatus.OUT_FOR_DELIVERY],
    },
    outForDelivery: {
        nextStatuses: [OrderStatus.DELIVERED],
    },
    delivered: {
        nextStatuses: [],
    },
    rejected: {
        nextStatuses: [],
    },
} satisfies {
    [key in OrderStatus]: { nextStatuses: OrderStatus[] };
};
