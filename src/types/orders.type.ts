import { CartItem, Order, OrderStatus } from '@types';

export interface OrderData {
    customerId: string;
    restaurantId: string;
    restaurantName: string;
    items: CartItem[];
}

export interface OrderStatusSelectProps {
    value: OrderStatus;
    onChange: (status: OrderStatus) => void;
}

export interface OrderCardProps {
    order: Order;
    statusLabel: string;
    bookingFee: number;
    total: number;
    canEditStatus: boolean;
    showReorder: boolean;
    onStatusChange: (status: OrderStatus) => void;
    onReorder: (order: Order) => void;
}

export interface OrderViewData {
    order: Order;
    statusLabel: string;
    bookingFee: number;
    total: number;
}

export interface OrdersProps {
    orders: OrderViewData[];
    canEditStatus: boolean;
    showReorder: boolean;
    onStatusChange: (orderId: string, status: OrderStatus) => void;
    onReorder: (order: Order) => void;
}
