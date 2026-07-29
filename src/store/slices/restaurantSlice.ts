import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {
    createRestaurant,
    deleteRestaurant,
    getRestaurants,
    updateRestaurant,
} from '../../services/restaurant.service';
import { Restaurant } from '../../types/index';

interface RestaurantState {
    items: Restaurant[];
    loading: boolean;
    error: string | null;
}

const initialState: RestaurantState = {
    items: [],
    loading: false,
    error: null,
};

export const fetchRestaurants = createAsyncThunk(
    'restaurants/fetch',
    getRestaurants,
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
            });
    },
});

export default RestaurantSlice.reducer;
