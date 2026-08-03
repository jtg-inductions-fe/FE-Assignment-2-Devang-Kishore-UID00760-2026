import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { FeedBackState, Snackbar } from '@types';

const initialState: FeedBackState = {
    snackbarOpen: false,
    snackbarMessage: '',
    snackbarSeverity: 'info',
};

const feedbackSlice = createSlice({
    name: 'feedback',
    initialState,
    reducers: {
        showSnackbar(
            state,
            action: PayloadAction<{ message: string; severity?: Snackbar }>,
        ) {
            state.snackbarOpen = true;
            state.snackbarMessage = action.payload.message;
            state.snackbarSeverity = action.payload.severity ?? 'success';
        },

        hideSnackbar(state) {
            state.snackbarOpen = false;
        },
    },
});
export const { showSnackbar, hideSnackbar } = feedbackSlice.actions;
export default feedbackSlice.reducer;
