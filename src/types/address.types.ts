export interface Address {
    street: string;
    city: string;
    state: string;
    pincode: string;
}

export interface AddressData extends Address {
    id: string;
}
