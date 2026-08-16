import { CartItem } from '@types';

export interface OrderData {
    customerId: string;
    restaurantId: string;
    restaurantName: string;
    items: CartItem[];
}

export enum OrderStatus {
    PENDING = 'pending',
    ACCEPTED = 'accepted',
    PREPARING = 'preparing',
    OUT_FOR_DELIVERY = 'outForDelivery',
    DELIVERY = 'delivered',
    REJECTED = 'rejected',
}

export interface Order {
    id: string;
    customerId: string;
    restaurantId: string;
    restaurantName: string;
    items: CartItem[];
    status: OrderStatus;
    subtotal: number;
    createdAt: string;
}
