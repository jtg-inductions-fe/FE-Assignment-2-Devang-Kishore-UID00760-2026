import { OrderStatus } from '@types';

export const ORDER_STATUS_CONFIG = {
    pending: {
        nextStatuses: ['accepted', 'rejected'],
    },
    accepted: {
        nextStatuses: ['preparing'],
    },
    preparing: {
        nextStatuses: ['ready'],
    },
    ready: {
        nextStatuses: ['outForDelivery'],
    },
    outForDelivery: {
        nextStatuses: ['delivered'],
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
