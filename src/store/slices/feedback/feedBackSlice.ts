import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { SnackbarTheme } from '@types';

import { FeedBackState } from './feedBackSlice.types';

const initialState: FeedBackState = {
    snackbarOpen: false,
    snackbarMessage: '',
    snackbarSeverity: SnackbarTheme.INFO,
};

const feedbackSlice = createSlice({
    name: 'feedback',
    initialState,
    reducers: {
        showSnackbar(
            state,
            action: PayloadAction<{
                message: string;
                severity?: SnackbarTheme;
            }>,
        ) {
            state.snackbarOpen = true;
            state.snackbarMessage = action.payload.message;
            state.snackbarSeverity =
                action.payload.severity ?? SnackbarTheme.SUCCESS;
        },

        hideSnackbar(state) {
            state.snackbarOpen = false;
        },
    },
});
export const { showSnackbar, hideSnackbar } = feedbackSlice.actions;
export default feedbackSlice.reducer;
