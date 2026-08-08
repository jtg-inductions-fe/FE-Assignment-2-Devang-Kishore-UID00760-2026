import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
    addMenuItem,
    deleteMenuItem,
    getMenu,
    updateMenuItem,
} from '@services/menu.service';
import { FiltersData, MenuItem } from '@types';
interface MenuState {
    items: MenuItem[];
    loading: boolean;
}

const initialState: MenuState = {
    items: [],
    loading: false,
};

export const fetchMenu = createAsyncThunk(
    'menu/fetch',
    (payload: { restaurantId?: string; filters?: FiltersData }) =>
        getMenu(payload),
);
export const createMenuEntry = createAsyncThunk(
    'menu/create',
    (payload: Omit<MenuItem, 'id'>) => addMenuItem(payload),
);
export const updateMenuEntry = createAsyncThunk(
    'menu/update',
    (payload: { id: string; data: Partial<MenuItem> }) =>
        updateMenuItem(payload.id, payload.data),
);
export const removeMenuEntry = createAsyncThunk('menu/remove', deleteMenuItem);

export const menuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMenu.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchMenu.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(updateMenuEntry.fulfilled, (state, action) => {
                state.items = state.items.map((item) =>
                    item.id === action.payload.id ? action.payload : item,
                );
            })
            .addCase(createMenuEntry.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })
            .addCase(removeMenuEntry.fulfilled, (state, action) => {
                state.items = state.items.filter(
                    (item) => item.id !== action.payload,
                );
            });
    },
});

export default menuSlice.reducer;
