import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
    createRestaurant,
    deleteRestaurant,
    getRestaurant,
    getRestaurants,
    updateRestaurant,
} from '@services/restaurant.service';
import { FiltersData, Restaurant } from '@types';

import { RestaurantState } from './restaurantSlice.types';

const initialState: RestaurantState = {
    items: [],
    selectedRestaurant: null,
    loading: false,
    error: null,
};

export const fetchRestaurants = createAsyncThunk(
    'restaurants/fetch',
    (filters?: FiltersData) => getRestaurants(filters),
);

export const saveRestaurant = createAsyncThunk(
    'restaurant/save',
    (payload: Omit<Restaurant, 'id'>) => createRestaurant(payload),
);

export const updateRestaurantData = createAsyncThunk(
    'restaurants/update',
    (payload: { id: string; data: Partial<Restaurant> }) =>
        updateRestaurant(payload.id, payload.data),
);

export const removeRestaurant = createAsyncThunk(
    'restaurant/remove',
    (id: string) => deleteRestaurant(id),
);

export const fetchRestaurantByID = createAsyncThunk(
    'restaurants/fetchById',
    async (id: string) => {
        const restaurant = await getRestaurant(id);
        if (!restaurant) {
            throw new Error('Restaurant not Found');
        }
        return restaurant;
    },
);

export const RestaurantSlice = createSlice({
    name: 'Restaurant',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchRestaurants.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchRestaurants.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(saveRestaurant.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })
            .addCase(updateRestaurantData.fulfilled, (state, action) => {
                state.items = state.items.map((item) =>
                    item.id === action.payload.id ? action.payload : item,
                );
            })
            .addCase(removeRestaurant.fulfilled, (state, action) => {
                state.items = state.items.filter(
                    (item) => item.id !== action.payload,
                );
            })
            .addCase(fetchRestaurantByID.fulfilled, (state, action) => {
                state.selectedRestaurant = action.payload;
            });
    },
});

export default RestaurantSlice.reducer;
