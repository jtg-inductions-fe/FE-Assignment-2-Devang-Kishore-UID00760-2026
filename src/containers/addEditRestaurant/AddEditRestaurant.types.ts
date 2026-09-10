import { Address, Cuisine, Day, FoodType } from '@types';
export interface MenuItemFormData {
    name: string;
    description?: string;
    cuisine: Cuisine;
    food_type: FoodType;
    price_amount: number;
    stock: number;
    image_link?: string;
}

export interface AddRestaurantFormData {
    name: string;
    description?: string;
    country_code:string;
    contact_number: string;
    email: string;
    cuisines: Cuisine[];
    food_type: FoodType;
    image_link?: string;
    is_available: boolean;
    logo_link?: string;
    address: Address;
    opening_time: string;
    closing_time: string;
    working_days: Day[];
}
