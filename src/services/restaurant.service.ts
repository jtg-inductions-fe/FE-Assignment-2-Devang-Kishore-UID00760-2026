import restaurantMock from '@data/restaurants.json';
import { FiltersData, FoodType, Restaurant } from '@types';
import { readStorage, writeStorage } from '@utils/storage';

const RESTAURANTS_KEY = 'restaurants';

/**
 * Fetches data of all the restaurants.
 * @returns Data of all the restaurants.
 */
const getStoredRestaurants = (): Restaurant[] =>
    readStorage<Restaurant[]>(RESTAURANTS_KEY, restaurantMock as Restaurant[]);

/**
 * Stores the restaurants in local storage
 * @param restaurants Data of restaurants needs to be stored.
 */
const saveRestaurants = (restaurants: Restaurant[]): void => {
    writeStorage(RESTAURANTS_KEY, restaurants);
};

/**
 * Fetches data of all the restaurants.
 * @param filters searchbar and veg/nonVge filters.
 * @returns Promise of all the stored restaurants.
 */
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
    if (filters?.type && filters.type !== FoodType.BOTH) {
        restaurants = restaurants.filter(
            (restaurant) => restaurant.category === filters.type,
        );
    }
    if (filters?.ownerId) {
        restaurants = restaurants.filter(
            (restaurant) => restaurant.ownerId === filters.ownerId,
        );
    }

    restaurants = restaurants.sort((a: Restaurant, b: Restaurant) => {
        if (!a.isOpen && b.isOpen) {
            return 1;
        }
        if (a.isOpen && !b.isOpen) {
            return -1;
        }
        return 0;
    });

    return Promise.resolve(restaurants);
};

/**
 * Fetches data of restaurant.
 * @param id Id of restaurant whose data needs to be fetched.
 * @returns Data od restaurant.
 */
export const getRestaurant = (id: string): Promise<Restaurant | undefined> => {
    const restaurants = getStoredRestaurants();
    const currentRestaurant = restaurants.find(
        (restaurant) => restaurant.id === id,
    );

    return Promise.resolve(currentRestaurant);
};

/**
 * Adds data of restaurant in local storage.
 * @param payload Data of restaurant needs to be added in local storage.
 * @returns
 */
export const createRestaurant = (
    payload: Omit<Restaurant, 'id'>,
): Promise<Restaurant> => {
    const restaurants = getStoredRestaurants();
    const restaurant = { ...payload, id: `R${restaurants.length + 1}` };
    saveRestaurants([...restaurants, restaurant]);

    return Promise.resolve(restaurant);
};

/**
 * Updates the data of restaurant.
 * @param id Id of restaurant needs to be changed.
 * @param payload Data of restaurant which is to be changed.
 * @returns updated data of restaurant.
 */
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

/**
 *
 * @param id Id of restaurant needs to be deleted.
 * @returns Id od deleted restaurant.
 */
export const deleteRestaurant = (id: string): Promise<string> => {
    const updated = getStoredRestaurants().filter(
        (restaurant) => restaurant.id !== id,
    );

    saveRestaurants(updated);

    return Promise.resolve(id);
};
