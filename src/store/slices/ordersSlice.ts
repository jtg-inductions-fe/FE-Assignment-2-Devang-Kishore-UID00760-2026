import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getOrders, placeOrder, updateOrder } from '@services/orders.service';
import { CartItem, Order, OrderStatus, Role } from '@types';
interface OrdersState {
    items: Order[];
    loading: boolean;
}

interface OrderData {
    customerId: string;
    restaurantId: string;
    restaurantName: string;
    items: CartItem[];
}

const initialState: OrdersState = {
    items: [],
    loading: false,
};

export const fetchOrders = createAsyncThunk(
    'orders/fetch',
    ({ userId, role }: { userId: string; role: Role }) =>
        getOrders(userId, role),
);

export const createOrder = createAsyncThunk(
    'orders/create',
    (payload: OrderData) => placeOrder(payload),
);
export const updateOrderStatus = createAsyncThunk(
    'orders/status',
    (payload: { id: string; status: OrderStatus; reason?: string }) =>
        updateOrder(payload.id, payload.status, payload.reason),
);
export const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrders.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.items.unshift(action.payload);
            })
            .addCase(updateOrderStatus.fulfilled, (state, action) => {
                state.items = state.items.map((order) =>
                    order.id === action.payload.id ? action.payload : order,
                );
            });
    },
});

export default ordersSlice.reducer;
