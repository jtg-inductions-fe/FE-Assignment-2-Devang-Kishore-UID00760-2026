import { Address } from '@types';

export enum Role {
    CUSTOMER = 'CUSTOMER',
    OWNER = 'RESTAURANT_OWNER',
}

export interface UserData {
    full_name: string;
    email: string;
    password: string;
    role: Role;
    address: Address;
}

export interface User extends UserData {
    id: string;
    balance_amount: string;
}
