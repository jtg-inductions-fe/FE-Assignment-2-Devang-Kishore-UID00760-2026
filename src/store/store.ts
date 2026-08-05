import { configureStore } from '@reduxjs/toolkit';

import authReducer from './slices/authSlice';
import cartReducer from './slices/cartSlice';
import feedbackReducer from './slices/feedBackSlice';
import menuReducer from './slices/menuSlice';
import ordersReducer from './slices/ordersSlice';
import restaurantReducer from './slices/restaurantSlice';
export const store = configureStore({
    reducer: {
        auth: authReducer,
        restaurants: restaurantReducer,
        menu: menuReducer,
        cart: cartReducer,
        orders: ordersReducer,
        feedback: feedbackReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
