import ordersMock from '@data/orders.json';
import { Order, OrderData, OrderStatus, Role } from '@types';
import { readStorage, writeStorage } from '@utils/storage';

import { getRestaurant, getRestaurants } from './restaurant.service';

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
export const getOrders = async (
    userId: string,
    role: Role,
): Promise<Order[]> => {
    const orders = getStoredOrders();
    if (role === Role.CUSTOMER) {
        return orders.filter((order) => order.customerId === userId);
    }

    if (role === Role.OWNER) {
        const response = await getRestaurants();
        const restaurants=response.items
        const ownerRestaurantIds = restaurants
            .filter((restaurant) => restaurant.owner_id === userId)
            .map((currentRestaurant) => currentRestaurant.id);
        return orders.filter((order) =>
            ownerRestaurantIds.includes(order.restaurantId),
        );
    }
    return [];
};

/**
 * saves the order data in local storage.
 * @param payload Data of order.
 * @returns Data of order stored in local storage.
 */
export const placeOrder = async (payload: OrderData): Promise<Order> => {
    const subtotal = payload.items.reduce(
        (sum, cartItem) => sum + cartItem.item.price_amount * cartItem.quantity,
        0,
    );

    const orders = getStoredOrders();
    const restaurant = await getRestaurant(payload.restaurantId);
    const restaurantName = restaurant?.name;

    const order: Order = {
        id: `#O${Date.now()}`,
        customerId: payload.customerId,
        restaurantId: payload.restaurantId,
        restaurantName: restaurantName ?? payload.restaurantName,
        items: payload.items,
        status: OrderStatus.PENDING,
        subtotal,
        reason: '',
        createdAt: new Date().toISOString(),
    };

    saveOrders([order, ...orders]);
    return order;
};

/**
 * updated the state of order.
 * @param id Id of order to be updated.
 * @param status Status of order to be set.
 * @returns Data of order after update.
 */
export const updateOrder = (
    id: string,
    status: OrderStatus,
    reason?: string,
): Promise<Order> => {
    const orders = getStoredOrders();

    const updated = orders.map((order) =>
        order.id === id ? { ...order, status, reason } : order,
    );

    const order = updated.find((entry) => entry.id === id);

    if (!order) {
        throw new Error('order not found.');
    }

    saveOrders(updated);
    return Promise.resolve(order);
};
