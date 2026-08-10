import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem, MenuItem } from '@types';
import { readStorage } from '@utils/storage';

import { CartState } from './cartSlice.types';

const CART_KEY = 'cart_items';

const initialState: CartState = {
    items: readStorage<CartItem[]>(CART_KEY, []),
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action: PayloadAction<MenuItem>) {
            const existing = state.items.find(
                (cartItem) => cartItem.item.id === action.payload.id,
            );
            if (existing) {
                existing.quantity += 1;
            } else {
                state.items.push({ item: action.payload, quantity: 1 });
            }
        },
        updateQuantity(
            state,
            action: PayloadAction<{ itemId: string; quantity: number }>,
        ) {
            state.items = state.items
                .map((cartItem) =>
                    cartItem.item.id === action.payload.itemId
                        ? { ...cartItem, quantity: action.payload.quantity }
                        : cartItem,
                )
                .filter((cartItem) => cartItem.quantity > 0);
        },
        removeFromCart(state, action: PayloadAction<string>) {
            state.items = state.items.filter(
                (cartItem) => cartItem.item.id !== action.payload,
            );
        },
        clearCart(state) {
            state.items = [];
        },
    },
});

export const { addToCart, updateQuantity, removeFromCart, clearCart } =
    cartSlice.actions;

export default cartSlice.reducer;
