import axios from 'axios';

import { PAGE_SIZE} from '@constants';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
    createRestaurant,
    deleteRestaurant,
    getRestaurant,
    getRestaurants,
    updateRestaurant,
} from '@services/restaurant.service';
import { ApiError, QueryParams, Restaurant } from '@types';

import { RestaurantState } from './restaurantSlice.types';

const initialState: RestaurantState = {
    items: [],
    selectedRestaurant: null,
    pageSize:PAGE_SIZE,
    nextCursor: null,
    hasMore: false,
    loading: false,
    error: null,
};

export const fetchRestaurants = createAsyncThunk(
    'restaurants/fetch',
    async (params: QueryParams,{rejectWithValue}) =>{ 
        try{
            return await getRestaurants(params)
        }catch (error) {
            if (axios.isAxiosError<ApiError>(error)) {
                return rejectWithValue(
                    error.response?.data.reason ??
                        "Failed to fetch Restaurants ",
                );
            }
            return rejectWithValue("Failed to fetch Restaurants");
        }
    }
);

export const saveRestaurant = createAsyncThunk(
    'restaurant/save',
    async(payload: Omit<Restaurant, 'id'|'owner_id'| 'is_open'>,{ rejectWithValue }) => {
        try {
            await createRestaurant(payload);
        } catch (error) {
            if (axios.isAxiosError<ApiError>(error)) {
                return rejectWithValue(
                    error.response?.data.reason ??
                        "Unable to create restaurant",
                );
            }
            return rejectWithValue("unable to create restaurant");
        }

    }
);

export const updateRestaurantData = createAsyncThunk(
    'restaurants/update',
    async (payload: { id: string; data: Partial<Restaurant> },{rejectWithValue}) =>{
        try {
            const restaurantData = { ...payload.data };
            delete restaurantData.email;
            delete restaurantData.contact_number;


            const restaurant = await updateRestaurant(payload.id, restaurantData );
            return restaurant;
        } catch (error) {
            if (axios.isAxiosError<ApiError>(error)) {
                return rejectWithValue(
                    error.response?.data.reason ??
                        "Unable to update restaurant",
                );
            }
            return rejectWithValue("unable to update restaurant");
        }
    }
);

export const removeRestaurant = createAsyncThunk(
    'restaurant/remove',
   async (id: string,{rejectWithValue}) => {
        try {
            await deleteRestaurant(id);
        } catch (error) {
            if (axios.isAxiosError<ApiError>(error)) {
                return rejectWithValue(
                    error.response?.data.reason ??
                        "Unable to delete restaurant",
                );
            }
            return rejectWithValue("unable to delete restaurant");
        }
    }
);

export const fetchRestaurantByID = createAsyncThunk(
    'restaurants/fetchById',
    async (id: string,
        {rejectWithValue}
    ) => {
        try {
            const restaurant = await getRestaurant(id);
            return restaurant;
        } catch (error) {
            if (axios.isAxiosError<ApiError>(error)) {
                return rejectWithValue(
                    error.response?.data.reason ??
                        "Unable to fetch restaurant",
                );
            }
            return rejectWithValue("unable to fetch restaurant");
        }
    },
);

export const RestaurantSlice = createSlice({
    name: 'Restaurant',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchRestaurants.pending, (state,action) => {
                state.loading = true;
                if(!action.meta.arg.append){
                    state.items=[]
                }
            })
            .addCase(fetchRestaurants.fulfilled, (state, action) => {
                state.loading = false;
                if(action.meta.arg.append){
                    state.items.push(...action.payload.items);
                }else{
                    state.items=action.payload.items;
                }
                state.hasMore=action.payload.has_more;
                state.nextCursor=action.payload.next_cursor;
                state.pageSize=action.payload.page_size;
            })
            .addCase(fetchRestaurants.rejected, (state) => {
                state.loading = false;
                state.error = "Failed to fetch restaurants";
            })
            .addCase(saveRestaurant.pending, (state) => {
                state.loading = true;
            })
            .addCase(saveRestaurant.fulfilled, (state) => {
                state.loading=false
            })
            .addCase(saveRestaurant.rejected, (state) => {
                state.loading=false
                state.error = "Failed to create restaurant";
            })
            .addCase(updateRestaurantData.pending, (state) => {
                state.loading=true
            })
            .addCase(updateRestaurantData.fulfilled, (state, action) => {
                state.loading=false
                state.items = state.items.map((item) =>
                    item.id === action.payload.id ? action.payload : item,
                );
            })
            .addCase(updateRestaurantData.rejected, (state) => {
                state.loading=false
                state.error="Unable to update restaurant."
            })
            .addCase(removeRestaurant.pending, (state) => {
                state.loading=true;
            })
            .addCase(removeRestaurant.fulfilled, (state, action) => {
                state.loading=false;
                state.items = state.items.filter(
                    (item) => item.id !== action.meta.arg,
                );
            })
            .addCase(removeRestaurant.rejected, (state) => {
                state.loading=false;
                state.error="Unable to delete restaurant"
            })
            .addCase(fetchRestaurantByID.pending, (state) => {
                state.loading=true;
            })
            .addCase(fetchRestaurantByID.fulfilled, (state, action) => {
                state.loading=false;
                state.selectedRestaurant = action.payload;
            })
            .addCase(fetchRestaurantByID.rejected, (state) => {
                state.loading=false;
                state.error="Unable to fetch restaurant"
            });
    },
});

export default RestaurantSlice.reducer;
