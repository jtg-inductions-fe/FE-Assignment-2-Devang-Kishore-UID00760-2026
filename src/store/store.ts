import { configureStore } from '@reduxjs/toolkit';

import snackbarReducer from '../components/snackbar/snackbarSlice';
import authReducer from '../features/auth/authSlice';
import cartReducer from '../features/cart/cartSlice';
import ordersReducer from '../features/orders/ordersSlice';
import menuReducer from '../features/restaurantDetails/menuSlice';
import restaurantReducer from '../features/restaurantDiscovery/restaurantSlice';
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
