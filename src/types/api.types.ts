import 'axios';

declare module 'axios' {
    interface AxiosRequestConfig {
        _retry?: boolean;
        skipAuthRefresh?: boolean;
    }
}

export interface ApiError {
    success: boolean;
    reason: string;
}
