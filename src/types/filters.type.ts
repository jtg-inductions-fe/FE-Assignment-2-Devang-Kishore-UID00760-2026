import { FoodType } from '@types';

export interface FiltersData {
    search?: string;
    type?: FoodType;
    ownerId?: string;
}
