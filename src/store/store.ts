import { configureStore } from '@reduxjs/toolkit';

import authReducer from './slices/authSlice';
import cartReducer from './slices/cartSlice';
import menuReducer from './slices/menuSlice';
import ordersReducer from './slices/ordersSlice';
import restaurantReducer from './slices/restaurantSlice';
import snackbarReducer from '../components/common/snackbar/snackbarSlice';
export const store = configureStore({
    reducer: {
        auth: authReducer,
        restaurants: restaurantReducer,
        menu: menuReducer,
        cart: cartReducer,
        orders: ordersReducer,
        snackbar: snackbarReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
