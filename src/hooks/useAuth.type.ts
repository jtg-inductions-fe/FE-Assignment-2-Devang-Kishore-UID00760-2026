import { User } from '@types';

export interface UseAuthReturn {
    user: User | null;
    isLoggedIn: boolean;
    error: string | null;
    loading: boolean;
}
