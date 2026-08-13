import { CartItem, Order } from '@types';

export interface OrdersState {
    items: Order[];
    loading: boolean;
}
export interface OrderData {
    customerId: string;
    restaurantId: string;
    restaurantName: string;
    items: CartItem[];
}
