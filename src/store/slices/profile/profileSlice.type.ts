import { AddressData } from '@types';

export interface ProfileState {
    addresses: AddressData[];
    loading: boolean;
    error: string | null;
}
