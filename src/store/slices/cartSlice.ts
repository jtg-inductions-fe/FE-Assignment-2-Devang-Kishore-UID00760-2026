import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem, MenuItem } from '@types';
import { readStorage, writeStorage } from '@utils/storage.ts';

interface CartState {
    items: CartItem[];
}

const CART_KEY = 'cart_items';

const initialState: CartState = {
    items: readStorage<CartItem[]>(CART_KEY, []),
};

const persist = (items: CartItem[]): void => {
    writeStorage(CART_KEY, items);
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
            persist(state.items);
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
            persist(state.items);
        },
        removeFromCart(state, action: PayloadAction<string>) {
            state.items = state.items.filter(
                (cartItem) => cartItem.item.id !== action.payload,
            );
            persist(state.items);
        },
        clearCart(state) {
            state.items = [];
            persist(state.items);
        },
    },
});

export const { addToCart, updateQuantity, removeFromCart, clearCart } =
    cartSlice.actions;

export default cartSlice.reducer;
