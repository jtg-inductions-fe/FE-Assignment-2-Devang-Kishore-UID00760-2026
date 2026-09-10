import { configureStore } from '@reduxjs/toolkit';

import authReducer from './slices/auth/authSlice';
import cartReducer from './slices/cart/cartSlice';
import feedbackReducer from './slices/feedback/feedBackSlice';
import menuReducer from './slices/menu/menuSlice';
import ordersReducer from './slices/order/ordersSlice';
import profileReducer from './slices/profile/profileSlice';
import restaurantReducer from './slices/restaurant/restaurantSlice';
export const store = configureStore({
    reducer: {
        auth: authReducer,
        restaurants: restaurantReducer,
        menu: menuReducer,
        cart: cartReducer,
        orders: ordersReducer,
        feedback: feedbackReducer,
        profile: profileReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
