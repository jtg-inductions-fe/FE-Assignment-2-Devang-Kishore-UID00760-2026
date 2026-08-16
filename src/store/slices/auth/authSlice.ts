import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { login, signUp } from '@services/auth.service';
import { User } from '@types';
import { removeStorage } from '@utils/storage';

import { authSliceContent } from './authSlice.constants';
import { AuthState, UserData } from './authSlice.types';

const initialState: AuthState = {
    user: null,
    loading: false,
    error: null,
    isLoggedIn: false,
};

export const loginUser = createAsyncThunk(
    'auth/login',
    async (
        payload: { email: string; password: string },
        { rejectWithValue },
    ) => {
        try {
            return await login(payload.email, payload.password);
        } catch (error) {
            return rejectWithValue(
                error instanceof Error
                    ? error.message
                    : authSliceContent.LOGIN_FAILED_ERROR,
            );
        }
    },
);

export const signupUser = createAsyncThunk(
    'auth/signup',
    async (payload: UserData, { rejectWithValue }) => {
        try {
            return await signUp(payload);
        } catch (error) {
            return rejectWithValue(
                error instanceof Error
                    ? error.message
                    : authSliceContent.SIGNUP_FAILED_ERROR,
            );
        }
    },
);

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<User | null>) {
            state.user = action.payload;
            if (action.payload != null) {
                state.isLoggedIn = true;
            }
        },
        logout(state) {
            state.user = null;
            state.isLoggedIn = false;
            removeStorage('crt_user');
        },
        clearError(state) {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.isLoggedIn = true;
            })
            .addCase(loginUser.rejected, (state) => {
                state.loading = false;
                state.error = authSliceContent.LOGIN_FAILED_ERROR;
            })
            .addCase(signupUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(signupUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.isLoggedIn = true;
            })
            .addCase(signupUser.rejected, (state) => {
                state.loading = false;
                state.error = authSliceContent.SIGNUP_FAILED_ERROR;
            });
    },
});

export const { logout, clearError, setUser } = authSlice.actions;

export default authSlice.reducer;
