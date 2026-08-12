import { CartItem } from '@types';

export interface OrderData {
    customerId: string;
    restaurantId: string;
    restaurantName: string;
    items: CartItem[];
}
