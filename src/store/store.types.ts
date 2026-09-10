import { AuthState } from './slices/auth/authSlice.types';
import { CartState } from './slices/cart/cartSlice.types';
import { FeedBackState } from './slices/feedback/feedBackSlice.types';
import { MenuState } from './slices/menu/menuSlice.types';
import { OrdersState } from './slices/order/orderSlice.types';
import { ProfileState } from './slices/profile/profileSlice.type';
import { RestaurantState } from './slices/restaurant/restaurantSlice.types';

export type RootState = {
    auth: AuthState;
    restaurants: RestaurantState;
    menu: MenuState;
    cart: CartState;
    orders: OrdersState;
    feedback: FeedBackState;
    profile: ProfileState;
};
