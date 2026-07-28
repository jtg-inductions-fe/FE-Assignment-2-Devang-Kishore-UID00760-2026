import ordersMock from '../../data/orders.json';
import type { CartItem, Order, OrderStatus } from '../../types';
import { readStorage, writeStorage } from '../../utils/storage';

interface OrderData {
    customerId: string;
    restaurantId: string;
    restaurantName: string;
    items: CartItem[];
}
const ORDERS_KEY = 'orders';
const getStoredOrders = (): Order[] =>
    readStorage<Order[]>(ORDERS_KEY, ordersMock as Order[]);
const saveOrders = (orders: Order[]): void => {
    writeStorage(ORDERS_KEY, orders);
};
export const getOrders = (): Promise<Order[]> =>
    Promise.resolve(getStoredOrders());
export const placeOrder = (payload: OrderData): Promise<Order> => {
    const subtotal = payload.items.reduce(
        (sum, cartItem) => sum + cartItem.item.price * cartItem.quantity,
        0,
    );
    const orders = getStoredOrders();
    const order: Order = {
        id: `O${orders.length + 1}`,
        customerId: payload.customerId,
        restaurantId: payload.restaurantId,
        restaurantName: payload.restaurantName,
        items: payload.items,
        status: 'pending',
        subtotal,
        createdAt: new Date().toISOString(),
    };
    saveOrders([order, ...orders]);
    return Promise.resolve(order);
};
export const updateOrder = (
    id: string,
    status: OrderStatus,
): Promise<Order> => {
    const orders = getStoredOrders();
    const updated = orders.map((order) =>
        order.id === id ? { ...order, status } : order,
    );
    const order = updated.find((entry) => entry.id === id);
    if (!order) {
        throw new Error('order not found.');
    }
    saveOrders(updated);
    return Promise.resolve(order);
};
