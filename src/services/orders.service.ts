import ordersMock from '@data/orders.json';
import type { CartItem, Order, OrderStatus } from '@types';
import { readStorage, writeStorage } from '@utils/storage';

interface OrderData {
    customerId: string;
    restaurantId: string;
    restaurantName: string;
    items: CartItem[];
}

const ORDERS_KEY = 'orders';

/**
 * Fetches data of orders from local storage.
 * @returns Data of orders fetched from local storage.
 */
const getStoredOrders = (): Order[] =>
    readStorage<Order[]>(ORDERS_KEY, ordersMock as Order[]);

/**
 * stores data in local storage.
 * @param orders Data of order to be stored in local storage.
 */
const saveOrders = (orders: Order[]): void => {
    writeStorage(ORDERS_KEY, orders);
};

/**
 * Fetches orders form local storage.
 * @returns Data of orders.
 */
export const getOrders = (): Promise<Order[]> =>
    Promise.resolve(getStoredOrders());

/**
 * saves the order data in local storage.
 * @param payload Data of order.
 * @returns Data of order stored in local storage.
 */
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

/**
 * updated the state of order.
 * @param id Id of order to be updated.
 * @param status Status of order to be set.
 * @returns Data of order after update.
 */
export const updateOrder = async (
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
