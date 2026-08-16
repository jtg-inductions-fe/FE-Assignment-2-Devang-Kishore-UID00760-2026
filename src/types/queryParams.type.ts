import { FoodType } from '@types';

export interface QueryParams {
    search?: string;
    type?: FoodType;
    ownerId?: string;
}
