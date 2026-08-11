import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@store/store.types';
import { CartItem, MenuItem } from '@types';
import { readStorage, writeStorage } from '@utils/storage';

import { CartState } from './cartSlice.types';

const CART_KEY = 'cart_items';

const persist = (items: CartItem[]): void => {
    writeStorage(CART_KEY, items);
};

const initialState: CartState = {
    items: readStorage<CartItem[]>(CART_KEY, []),
};

export const addToCart = createAsyncThunk(
    'cart/add',
    (menuItem: MenuItem, { dispatch, getState }) => {
        dispatch(addItemToCart(menuItem));
        const cart = getState() as RootState;
        const cartItems = cart.cart.items;
        persist(cartItems);
    },
);

export const updateQuantity = createAsyncThunk(
    'cart/update',
    (payload: { itemId: string; quantity: number }, { dispatch, getState }) => {
        void dispatch(
            updateItemQuantity({
                itemId: payload.itemId,
                quantity: payload.quantity,
            }),
        );
        const cart = getState() as RootState;
        const cartItems = cart.cart.items;
        persist(cartItems);
    },
);

export const removeFromCart = createAsyncThunk(
    'cart/update',
    (id: string, { dispatch, getState }) => {
        dispatch(removeItemFromCart(id));
        const cart = getState() as RootState;
        const cartItems = cart.cart.items;
        persist(cartItems);
    },
);

export const clearCart = createAsyncThunk(
    'cart/update',
    (_, { dispatch, getState }) => {
        dispatch(clearCartItems());
        const cart = getState() as RootState;
        const cartItems = cart.cart.items;
        persist(cartItems);
    },
);

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItemToCart(state, action: PayloadAction<MenuItem>) {
            const existing = state.items.find(
                (cartItem) => cartItem.item.id === action.payload.id,
            );
            if (existing) {
                existing.quantity += 1;
            } else {
                state.items.push({ item: action.payload, quantity: 1 });
            }
        },
        updateItemQuantity(
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
        removeItemFromCart(state, action: PayloadAction<string>) {
            state.items = state.items.filter(
                (cartItem) => cartItem.item.id !== action.payload,
            );
        },
        clearCartItems(state) {
            state.items = [];
        },
    },
});

export const {
    addItemToCart,
    updateItemQuantity,
    removeItemFromCart,
    clearCartItems,
} = cartSlice.actions;

export default cartSlice.reducer;
