import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getCurrentUser, login, signUp } from '@services/auth.service';
import { Role, User } from '@types';
import { removeStorage } from '@utils/storage';

interface AuthState {
    user: User | null;
    loading: boolean;
    error: string | null;
    isLoggedIn: boolean;
}

const initialState: AuthState = {
    user: getCurrentUser(),
    loading: false,
    error: null,
    isLoggedIn: false,
};
interface UserData {
    name: string;
    email: string;
    password: string;
    role: Role;
}

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
                state.error = 'Login failed.';
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
                state.error = 'Signup failed.';
            });
    },
});

export const { logout, clearError } = authSlice.actions;

export default authSlice.reducer;
