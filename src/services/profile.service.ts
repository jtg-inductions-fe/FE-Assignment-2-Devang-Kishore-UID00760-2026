import { ROUTES } from '@constants';
import { Address, User } from '@types';
import { AddressData } from '@types';

import { api } from './api';

export const updateUserName = async (name: string): Promise<User> => {
    const response = await api.patch<User>(ROUTES.API_ME, { full_name: name });
    return response.data;
};

export const deleteUserProfile = async (): Promise<void> => {
    await api.delete(ROUTES.API_USERS);
};

export const createAddress = async (address: Address): Promise<AddressData> => {
    const response = await api.post<AddressData>(ROUTES.API_ADDRESSES, address);
    return response.data;
};

export const updateAddress = async (
    addressId: string,
    address: Address,
): Promise<AddressData> => {
    const response = await api.patch<AddressData>(
        `${ROUTES.API_ADDRESSES}/${addressId}`,
        address,
    );
    return response.data;
};

export const addressDelete = async (addressId: string): Promise<string> => {
    await api.delete(`${ROUTES.API_ADDRESSES}/${addressId}`);
    return addressId;
};

export const getAddresses = async (): Promise<AddressData[]> => {
    const response = await api.get<AddressData[]>(ROUTES.API_ADDRESSES);
    return response.data;
};
