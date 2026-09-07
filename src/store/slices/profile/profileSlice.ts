import axios from 'axios';

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
    addressDelete,
    createAddress,
    deleteUserProfile,
    getAddresses,
    updateAddress,
    updateUserName,
} from '@services/profile.service';
import { Address, ApiError } from '@types';

import { profileSliceContent } from './profileSlice.constants';
import { ProfileState } from './profileSlice.type';

const initialState: ProfileState = {
    addresses: [],
    loading: false,
    error: null,
};

export const fetchAddresses = createAsyncThunk(
    'profile/fetchAddresses',
    async (_, { rejectWithValue }) => {
        try {
            return await getAddresses();
        } catch (error) {
            if (axios.isAxiosError<ApiError>(error)) {
                return rejectWithValue(
                    error.response?.data.reason ??
                        profileSliceContent.ADDRESS_FETCH_ERROR,
                );
            }
            return rejectWithValue(profileSliceContent.ADDRESS_FETCH_ERROR);
        }
    },
);

export const addAddress = createAsyncThunk(
    'profile/addAddress',
    async (address: Address, { rejectWithValue }) => {
        try {
            return await createAddress(address);
        } catch (error) {
            if (axios.isAxiosError<ApiError>(error)) {
                return rejectWithValue(
                    error.response?.data.reason ??
                        profileSliceContent.ADDRESS_CREATE_ERROR,
                );
            }
            return rejectWithValue(profileSliceContent.ADDRESS_CREATE_ERROR);
        }
    },
);

export const editAddress = createAsyncThunk(
    'profile/editAddress',
    async (
        payload: { addressId: string; address: Address },
        { rejectWithValue },
    ) => {
        try {
            return await updateAddress(payload.addressId, payload.address);
        } catch (error) {
            if (axios.isAxiosError<ApiError>(error)) {
                return rejectWithValue(
                    error.response?.data.reason ??
                        profileSliceContent.ADDRESS_UPDATE_ERROR,
                );
            }
            return rejectWithValue(profileSliceContent.ADDRESS_UPDATE_ERROR);
        }
    },
);

export const deleteAddress = createAsyncThunk(
    'profile/deleteAddress',
    async (addressId: string, { rejectWithValue }) => {
        try {
            return await addressDelete(addressId);
        } catch (error) {
            if (axios.isAxiosError<ApiError>(error)) {
                return rejectWithValue(
                    error.response?.data.reason ??
                        profileSliceContent.ADDRESS_DELETE_ERROR,
                );
            }
            return rejectWithValue(profileSliceContent.ADDRESS_DELETE_ERROR);
        }
    },
);

export const updateUser = createAsyncThunk(
    'profile/updateUser',
    async (name: string, { rejectWithValue }) => {
        try {
            return await updateUserName(name);
        } catch (error) {
            if (axios.isAxiosError<ApiError>(error)) {
                return rejectWithValue(
                    error.response?.data.reason ??
                        profileSliceContent.USER_UPDATE_ERROR,
                );
            }
            return rejectWithValue(profileSliceContent.USER_UPDATE_ERROR);
        }
    },
);
export const deleteProfile = createAsyncThunk(
    'profile/deleteProfile',
    async (_, { rejectWithValue }) => {
        try {
            return await deleteUserProfile();
        } catch (error) {
            if (axios.isAxiosError<ApiError>(error)) {
                return rejectWithValue(
                    error.response?.data.reason ??
                        profileSliceContent.USER_DELETE_ERROR,
                );
            }
            return rejectWithValue(profileSliceContent.USER_DELETE_ERROR);
        }
    },
);

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        clearProfileError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAddresses.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAddresses.fulfilled, (state, action) => {
                state.loading = false;
                state.addresses = action.payload;
            })
            .addCase(fetchAddresses.rejected, (state) => {
                state.loading = false;
                state.error = profileSliceContent.ADDRESS_FETCH_ERROR;
            })
            .addCase(addAddress.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addAddress.fulfilled, (state, action) => {
                state.loading = false;
                state.addresses.push(action.payload);
            })
            .addCase(addAddress.rejected, (state) => {
                state.loading = false;
                state.error = profileSliceContent.ADDRESS_CREATE_ERROR;
            })
            .addCase(editAddress.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(editAddress.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.addresses.findIndex(
                    (address) => address.id === action.payload.id,
                );
                if (index !== -1) {
                    state.addresses[index] = action.payload;
                }
            })
            .addCase(editAddress.rejected, (state) => {
                state.loading = false;
                state.error = profileSliceContent.ADDRESS_UPDATE_ERROR;
            })
            .addCase(deleteAddress.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteAddress.fulfilled, (state, action) => {
                state.loading = false;
                state.addresses = state.addresses.filter(
                    (address) => address.id === action.payload,
                );
            })
            .addCase(deleteAddress.rejected, (state) => {
                state.loading = false;
                state.error = profileSliceContent.ADDRESS_DELETE_ERROR;
            })
            .addCase(updateUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateUser.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(updateUser.rejected, (state) => {
                state.loading = false;
                state.error = profileSliceContent.USER_UPDATE_ERROR;
            })
            .addCase(deleteProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteProfile.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(deleteProfile.rejected, (state) => {
                state.loading = false;
                state.error = profileSliceContent.USER_DELETE_ERROR;
            });
    },
});

export const { clearProfileError } = profileSlice.actions;

export default profileSlice.reducer;
