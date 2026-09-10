import { FoodType } from '@types';

export interface QueryParams {
    search?: string;
    food_type?: FoodType;
    cursor?:string;
    page_size:number;
    append:boolean
}
