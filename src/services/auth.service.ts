import { ROUTES } from '@constants';
import { User, UserData } from '@types';

import { api } from './api';

/**
 * Checks user exists in local storage or not and also verifies user credentials.
 * @param email :email of user.
 * @param password :password of user.
 * @returns
 */
export const login = async (email: string, password: string): Promise<void> => {
    await api.post(
        ROUTES.API_LOGIN,
        new URLSearchParams({ username: email, password: password }),
        {
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
            },
            skipAuthRefresh: true,
        },
    );
};

/**
 * checks whether another user exists with same email or not and stores the user in local storage .
 * @param props :user data
 * @returns data of user which is added in local storage
 */
export const signUp = async (payload: UserData): Promise<void> => {
    await api.post(ROUTES.API_SIGNUP, payload, { skipAuthRefresh: true });
};

/**
 * Fetched the data of currently stored user.
 * @returns Data of user which is currently logged in.
 */
export const getCurrentUser = async (): Promise<User> => {
    const response = await api.get<User>(ROUTES.API_ME);
    return response.data;
};

export const logoutUser = async (): Promise<void> => {
    await api.post(ROUTES.API_LOGOUT);
};
