import { CartItem } from '@types';

export enum OrderStatus {
    PENDING = 'pending',
    ACCEPTED = 'accepted',
    PREPARING = 'preparing',
    OUT_FOR_DELIVERY = 'outForDelivery',
    DELIVERED = 'delivered',
    REJECTED = 'rejected',
    READY = 'ready',
}

export interface Order {
    id: string;
    customerId: string;
    restaurantId: string;
    restaurantName: string;
    items: CartItem[];
    status: OrderStatus;
    subtotal: number;
    reason?: string;
    createdAt: string;
}

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
    steps: string[];
    activeStep: number;
}

export interface OrderViewData {
    order: Order;
    statusLabel: string;
    bookingFee: number;
    total: number;
}

export interface OrderStepperData {
    steps: string[];
    activeStep: number;
}

export interface OrdersProps {
    orders: OrderViewData[];
    canEditStatus: boolean;
    showReorder: boolean;
    onStatusChange: (orderId: string, status: OrderStatus) => void;
    onReorder: (order: Order) => void;
    getSteps: (status: OrderStatus) => OrderStepperData;
}

export interface RejectedOrderDialogProps {
    open: boolean;
    reason: string;
    onReasonChange: (reason: string) => void;
    onClose: () => void;
    onConfirm: () => void;
}
