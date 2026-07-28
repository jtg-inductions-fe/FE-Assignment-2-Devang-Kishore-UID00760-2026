import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getCurrentUser, login, signUp } from './auth.service';
import { Role, User } from '../../types/index';
import { removeStorage } from '../../utils/storage';

type AuthState = {
    user: User | null;
    loading: boolean;
    error: string | null;
};

const initialState: AuthState = {
    user: getCurrentUser(),
    loading: false,
    error: null,
};
type UserData = {
    name: string;
    email: string;
    password: string;
    role: Role;
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
                error instanceof Error ? error.message : 'Login failed',
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
                error instanceof Error ? error.message : 'signup failed.',
            );
        }
    },
);

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout(state) {
            state.user = null;
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
            })
            .addCase(loginUser.rejected, (state) => {
                state.loading = false;
                state.error = 'Login failed.';
            })
            .addCase(signupUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(signupUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(signupUser.rejected, (state) => {
                state.loading = false;
                state.error = 'Signup failed.';
            });
    },
});

export const { logout, clearError } = authSlice.actions;

export default authSlice.reducer;
