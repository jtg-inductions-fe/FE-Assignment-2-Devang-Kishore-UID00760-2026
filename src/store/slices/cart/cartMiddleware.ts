import { Middleware } from '@reduxjs/toolkit';
import { RootState } from '@store/store.types';
import { CartItem } from '@types';
import { writeStorage } from '@utils/storage';

import {
    addToCart,
    clearCart,
    removeFromCart,
    updateQuantity,
} from './cartSlice';

const CART_KEY = 'cart_items';

const persist = (items: CartItem[]): void => {
    writeStorage(CART_KEY, items);
};

export const cartMiddleware: Middleware = (store) => (next) => (action) => {
    const result = next(action);
    if (
        addToCart.match(action) ||
        updateQuantity.match(action) ||
        removeFromCart.match(action) ||
        clearCart.match(action)
    ) {
        const state = store.getState() as RootState;
        const cartItems = state.cart.items;
        persist(cartItems);
    }
    return result;
};
