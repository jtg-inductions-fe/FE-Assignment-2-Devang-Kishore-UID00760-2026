import ordersMock from '@data/orders.json';
import type { CartItem, Order, OrderStatus, Role } from '@types';
import { readStorage, writeStorage } from '@utils/storage';

import { getRestaurant, getRestaurants } from './restaurant.service';

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

export const getOrders = async (
    userId: string,
    role: Role,
): Promise<Order[]> => {
    const orders = getStoredOrders();
    if (role === 'customer') {
        return orders.filter((order) => order.customerId === userId);
    }

    if (role === 'owner') {
        const restaurants = await getRestaurants();
        const ownerRestaurantIds = restaurants
            .filter((restaurant) => restaurant.ownerId === userId)
            .map((currentRestaurant) => currentRestaurant.id);
        return orders.filter((order) =>
            ownerRestaurantIds.includes(order.restaurantId),
        );
    }
    return [];
};

export const placeOrder = async (payload: OrderData): Promise<Order> => {
    const subtotal = payload.items.reduce(
        (sum, cartItem) => sum + cartItem.item.price * cartItem.quantity,
        0,
    );

    const orders = getStoredOrders();
    const restaurant = await getRestaurant(payload.restaurantId);
    const restaurantName = restaurant?.name;

    const order: Order = {
        id: `O${Date.now()}`,
        customerId: payload.customerId,
        restaurantId: payload.restaurantId,
        restaurantName: restaurantName ?? payload.restaurantName,
        items: payload.items,
        status: 'pending',
        subtotal,
        reason: '',
        createdAt: new Date().toISOString(),
    };

    saveOrders([order, ...orders]);
    return order;
};

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
