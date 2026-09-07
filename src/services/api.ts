import axios, { AxiosError, AxiosResponse } from 'axios';

import { ROUTES } from '@constants';
import { ApiError } from '@types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

export const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
});

export const refreshClient = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
});

let refreshPromise: Promise<void> | null = null;

api.interceptors.response.use(
    (response: AxiosResponse) => response,

    async (error: AxiosError<ApiError>) => {
        const originalRequest = error.config;

        if (
            !originalRequest ||
            error.response?.status !== 401 ||
            originalRequest.skipAuthRefresh ||
            originalRequest._retry
        ) {
            return Promise.reject(error);
        }

        originalRequest._retry = true;

        try {
            if (!refreshPromise) {
                refreshPromise = refreshClient
                    .post<void>(ROUTES.API_REFRESH)
                    .then(() => undefined)
                    .finally(() => {
                        refreshPromise = null;
                    });
            }

            await refreshPromise;

            return api(originalRequest);
        } catch (refreshError) {
            if (refreshError instanceof Error) {
                return Promise.reject(refreshError);
            }

            return Promise.reject(new Error('Token refresh failed'));
        }
    },
);
