import { ROUTES } from '@constants';
import { QueryParams, Restaurant } from '@types';

import { api } from './api';
import { RestaurantListResponse } from '../types/restaurant.types';

/**
 * Fetches data of all the restaurants.
 * @param filters searchbar and veg/nonVge filters.
 * @returns Promise of all the stored restaurants paginated data.
 */
export const getRestaurants = async(
    params?: QueryParams,
): Promise<RestaurantListResponse> => {
    const response=await api.get<RestaurantListResponse>(ROUTES.API_RESTAURANTS,{params})
    return response.data;
};

/**
 * Fetches data of restaurant.
 * @param id Id of restaurant whose data needs to be fetched.
 * @returns Data od restaurant.
 */
export const getRestaurant = async(id: string): Promise<Restaurant> => {
    const response=await api.get<Restaurant>(`${ROUTES.API_RESTAURANTS}${id}`)
    return response.data;
};

/**
 * Adds data of restaurant in local storage.
 * @param payload Data of restaurant needs to be added in local storage.
 * @returns
 */
export const createRestaurant = async (
    payload: Omit<Restaurant, 'id'|"owner_id"|"is_open">,
): Promise<void> => {
    await api.post(ROUTES.API_RESTAURANTS, payload);
};

/**
 * Updates the data of restaurant.
 * @param id Id of restaurant needs to be changed.
 * @param payload Data of restaurant which is to be changed.
 * @returns updated data of restaurant.
 */
export const updateRestaurant =async (
    id: string,
    payload: Partial<Restaurant>,
): Promise<Restaurant> => {
    
    const restaurant=await api.patch<Restaurant>(`${ROUTES.API_RESTAURANTS}${id}`, payload);
    return restaurant.data

};

/**
 *
 * @param id Id of restaurant needs to be deleted.
 * @returns Id od deleted restaurant.
 */
export const deleteRestaurant =async (id: string): Promise<void> => {
    await api.delete(`${ROUTES.API_RESTAURANTS}${id}`)
};
