import { Address, Cuisine, FoodType } from '@types';

export enum Day {
    MONDAY = 'Monday',
    TUESDAY = 'Tuesday',
    WEDNESDAY = 'Wednesday',
    THURSDAY = 'Thursday',
    FRIDAY = 'Friday',
    SATURDAY = 'Saturday',
    SUNDAY = 'Sunday',
}

export interface Restaurant {
    id: string;
    owner_id: string;
    name: string;
    description?: string;
    country_code:string;
    contact_number: string;
    email: string;
    cuisines: Cuisine[];
    food_type: FoodType;
    image_link?: string;
    logo_link?: string;
    address: Address;
    is_available: boolean;
    is_open:boolean;
    opening_time: string;
    closing_time: string;
    working_days: Day[];
}

export interface PaginationResponse<T>{
    items:T[];
    page_size:number;
    next_cursor:string|null;
    has_more:boolean;
}

export type RestaurantListResponse=PaginationResponse<Restaurant>