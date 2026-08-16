import { Cuisine, FoodType } from '@types';

export enum Day {
    MONDAY = 'Monday',
    TUESDAY = 'Tuesday',
    WEDNESDAY = 'Wednesday',
    THURSDAY = 'Thursday',
    FRIDAY = 'Friday',
    SATURDAY = 'Saturday',
    SUNDAY = 'Sunday',
}

export interface Address {
    street: string;
    city: string;
    state: string;
    pincode: string;
}

export interface Restaurant {
    id: string;
    ownerId: string;
    name: string;
    description?: string;
    contactNumber: string;
    email: string;
    fssaiCertificateId: string;
    gstNumber: string;
    cuisines: Cuisine[];
    category: FoodType;
    image?: string;
    logo?: string;
    address: Address;
    isOpen: boolean;
    openingTime: string;
    closingTime: string;
    workingDays: Day[];
}
