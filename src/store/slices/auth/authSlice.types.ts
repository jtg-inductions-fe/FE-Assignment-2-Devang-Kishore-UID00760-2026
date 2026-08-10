import { Role, User } from '@types';

export interface UserData {
    name: string;
    email: string;
    password: string;
    role: Role;
}

export interface AuthState {
    user: User | null;
    loading: boolean;
    error: string | null;
    isLoggedIn: boolean;
}
