export enum Role {
    CUSTOMER = 'customer',
    OWNER = 'owner',
}

export interface UserData {
    name: string;
    email: string;
    password: string;
    role: Role;
}

export interface User {
    id: string;
    name: string;
    email: string;
    role: Role;
    password: string;
}
