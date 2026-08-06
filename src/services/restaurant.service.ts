import restaurantMock from '@data/restaurants.json';
import type { FiltersData, Restaurant } from '@types';
import { readStorage, writeStorage } from '@utils/storage';

const RESTAURANTS_KEY = 'restaurants';

const getStoredRestaurants = (): Restaurant[] =>
    readStorage<Restaurant[]>(RESTAURANTS_KEY, restaurantMock as Restaurant[]);

const saveRestaurants = (restaurants: Restaurant[]): void => {
    writeStorage(RESTAURANTS_KEY, restaurants);
};

export const getRestaurants = (
    filters?: FiltersData,
): Promise<Restaurant[]> => {
    let restaurants = getStoredRestaurants();
    if (filters?.search) {
        const search = filters.search.toLowerCase();
        restaurants = restaurants.filter((restaurant) =>
            restaurant.name.toLowerCase().includes(search),
        );
    }
    if (filters?.type && filters.type !== 'both') {
        restaurants = restaurants.filter(
            (restaurant) => restaurant.category === filters.type,
        );
    }
    if (filters?.ownerId) {
        restaurants = restaurants.filter(
            (restaurant) => restaurant.ownerId === filters.ownerId,
        );
    }
    return Promise.resolve(restaurants);
};

export const getRestaurant = (id: string): Promise<Restaurant | undefined> => {
    const restaurants = getStoredRestaurants();
    const currentRestaurant = restaurants.find(
        (restaurant) => restaurant.id === id,
    );
    return Promise.resolve(currentRestaurant);
};

export const createRestaurant = (
    payload: Omit<Restaurant, 'id'>,
): Promise<Restaurant> => {
    const restaurants = getStoredRestaurants();
    const restaurant = { ...payload, id: `R${restaurants.length + 1}` };
    saveRestaurants([...restaurants, restaurant]);
    return Promise.resolve(restaurant);
};

export const updateRestaurant = (
    id: string,
    payload: Partial<Restaurant>,
): Promise<Restaurant> => {
    const restaurants = getStoredRestaurants();

    const updated = restaurants.map((restaurant) =>
        restaurant.id === id ? { ...restaurant, ...payload } : restaurant,
    );

    const restaurant = updated.find((item) => item.id === id);

    if (!restaurant) {
        throw new Error('restaurant not found.');
    }

    saveRestaurants(updated);
    return Promise.resolve(restaurant);
};
export const deleteRestaurant = (id: string): Promise<string> => {
    const updated = getStoredRestaurants().filter(
        (restaurant) => restaurant.id !== id,
    );

    saveRestaurants(updated);
    return Promise.resolve(id);
};
