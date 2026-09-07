import axios from 'axios';

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
    getCurrentUser,
    login,
    logoutUser,
    signUp,
} from '@services/auth.service';
import { UserData } from '@types';
import { ApiError } from '@types';

import { authSliceContent } from './authSlice.constants';
import { AuthState } from './authSlice.types';

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
            await login(payload.email, payload.password);
            return await getCurrentUser();
        } catch (error) {
            if (axios.isAxiosError<ApiError>(error)) {
                return rejectWithValue(
                    error.response?.data.reason ??
                        authSliceContent.LOGIN_FAILED_ERROR,
                );
            }
            return rejectWithValue(authSliceContent.LOGIN_FAILED_ERROR);
        }
    },
);

export const signupUser = createAsyncThunk(
    'auth/signup',
    async (payload: UserData, { rejectWithValue }) => {
        try {
            await signUp(payload);

            await login(payload.email, payload.password);
            return await getCurrentUser();
        } catch (error) {
            if (axios.isAxiosError<ApiError>(error)) {
                return rejectWithValue(
                    error.response?.data.reason ??
                        authSliceContent.SIGNUP_FAILED_ERROR,
                );
            }
            return rejectWithValue(authSliceContent.SIGNUP_FAILED_ERROR);
        }
    },
);

export const fetchCurrentUser = createAsyncThunk(
    'users/me',
    async (_, { rejectWithValue }) => {
        try {
            const user = await getCurrentUser();
            if (!user) {
                return rejectWithValue(authSliceContent.USER_FETCH_FAILED);
            }
            return user;
        } catch (error) {
            if (axios.isAxiosError<ApiError>(error)) {
                return rejectWithValue(
                    error.response?.data.reason ??
                        authSliceContent.USER_FETCH_FAILED,
                );
            }
            return rejectWithValue(authSliceContent.USER_FETCH_FAILED);
        }
    },
);

export const logoutCurrentUser = createAsyncThunk(
    'auth/logout',
    async (_, { rejectWithValue }) => {
        try {
            await logoutUser();
        } catch (error) {
            return rejectWithValue(
                error instanceof Error
                    ? error.message
                    : authSliceContent.USER_LOGOUT_FAILED,
            );
        }
    },
);

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
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
            })
            .addCase(fetchCurrentUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCurrentUser.fulfilled, (state, action) => {
                state.loading = false;
                state.isLoggedIn = true;
                state.user = action.payload;
            })
            .addCase(fetchCurrentUser.rejected, (state) => {
                state.loading = false;
                state.user = null;
                state.isLoggedIn = false;
                state.error = authSliceContent.USER_FETCH_FAILED;
            })
            .addCase(logoutCurrentUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(logoutCurrentUser.fulfilled, (state) => {
                state.loading = false;
                state.user = null;
                state.isLoggedIn = false;
            })
            .addCase(logoutCurrentUser.rejected, (state) => {
                state.loading = false;
                state.user = null;
                state.isLoggedIn = false;
                state.error = authSliceContent.USER_FETCH_FAILED;
            });
    },
});

export const { clearError } = authSlice.actions;

export default authSlice.reducer;
