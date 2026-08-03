import type { Address, Cuisine, Day, FoodType } from '@types';
export interface MenuItemFormData {
    name: string;
    description: string;
    cuisine: Cuisine;
    category: FoodType;
    price: number;
    stock: number;
    image: string;
}

export interface AddRestaurantFormData {
    name: string;
    description: string;
    contactNumber: string;
    email: string;
    fssaiCertificateId: string;
    gstNumber: string;
    cuisines: Cuisine[];
    category: FoodType;
    image: string;
    isOpen: boolean;
    logo: string;
    address: Address;
    openingTime: string;
    closingTime: string;
    workingDays: Day[];
    menu: MenuItemFormData[];
}
