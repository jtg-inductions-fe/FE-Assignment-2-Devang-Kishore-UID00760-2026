import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { SnackbarState } from './snackbar.types';
import type { Snackbar } from '../../types';

const initialState: SnackbarState = {
    open: false,
    message: '',
    severity: 'info',
};

const snackbarSlice = createSlice({
    name: 'snackbar',
    initialState,
    reducers: {
        showSnackbar(
            state,
            action: PayloadAction<{ message: string; severity?: Snackbar }>,
        ) {
            state.open = true;
            state.message = action.payload.message;
            state.severity = action.payload.severity ?? 'success';
        },
        hideSnackbar(state) {
            state.open = false;
        },
    },
});
export const { showSnackbar, hideSnackbar } = snackbarSlice.actions;
export default snackbarSlice.reducer;
